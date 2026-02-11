const axios = require('axios');
const Vendor = require('../models/Vendor');

class ParcelXService {
  constructor() {
    this.baseURL = 'https://app.parcelx.in/api/v3';
    
    // Create authentication token
    const accessKey = process.env.PARCELX_ACCESS_KEY || '';
    const secretKey = process.env.PARCELX_SECRET_KEY || '';
    
    console.log('🔐 ParcelX Auth Keys:', {
      accessKey: accessKey ? `${accessKey.substring(0, 10)}...` : 'MISSING',
      secretKey: secretKey ? `${secretKey.substring(0, 10)}...` : 'MISSING'
    });
    
    if (!accessKey || !secretKey) {
      console.error('❌ PARCELX_ACCESS_KEY or PARCELX_SECRET_KEY missing in .env');
    }
    
    const authToken = Buffer.from(`${accessKey}:${secretKey}`).toString('base64');
    
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        'access-token': authToken,
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    });
    
    this.setupInterceptors();
  }
  
  setupInterceptors() {
    this.client.interceptors.request.use(
      (config) => {
        console.log(`🚀 ParcelX ${config.method.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        console.error('❌ ParcelX Request Error:', error.message);
        return Promise.reject(error);
      }
    );
    
    this.client.interceptors.response.use(
      (response) => {
        console.log(`✅ ParcelX ${response.status} ${response.config.url}`);
        return response;
      },
      (error) => {
        console.error('❌ ParcelX Response Error:', {
          message: error.message,
          url: error.config?.url,
          status: error.response?.status,
          data: error.response?.data
        });
        return Promise.reject(error);
      }
    );
  }
  
  // ================= VENDOR WAREHOUSE MANAGEMENT =================
  async createVendorWarehouse(vendorId, warehouseData) {
    try {
      console.log(`🏭 Creating ParcelX warehouse for vendor: ${vendorId}`);
      
      // Get vendor details
      const vendor = await Vendor.findById(vendorId);
      if (!vendor) {
        throw new Error('Vendor not found');
      }
      
      // Prepare warehouse payload
      const payload = {
        address_title: warehouseData.address_title || `${vendor.shopName || vendor.name} Warehouse`,
        sender_name: warehouseData.sender_name || vendor.name,
        full_address: warehouseData.full_address || 
                     `${warehouseData.address}, ${warehouseData.city}, ${warehouseData.state}`,
        phone: warehouseData.phone || vendor.phone,
        pincode: warehouseData.pincode
      };
      
      console.log('📦 Warehouse payload:', payload);
      
      // Create warehouse in ParcelX
      const response = await this.client.post('/create_warehouse', payload);
      
      console.log('📦 ParcelX response:', response.data);
      
      if (response.data.status === true && response.data.data?.pick_address_id) {
        const warehouseId = response.data.data.pick_address_id;
        
        // Update vendor with warehouse info
        vendor.parcelxWarehouseId = warehouseId;
        vendor.isParcelxIntegrated = true;
        vendor.warehouseAddress = {
          address: warehouseData.address,
          city: warehouseData.city,
          state: warehouseData.state,
          pincode: warehouseData.pincode,
          phone: warehouseData.phone || vendor.phone,
          contactPerson: warehouseData.sender_name || vendor.name
        };
        vendor.parcelxWarehouseData = response.data;
        vendor.warehouseCreatedAt = new Date();
        vendor.parcelxLastSync = new Date();
        
        await vendor.save();
        
        console.log(`✅ Warehouse created successfully for vendor ${vendorId}: ${warehouseId}`);
        
        return {
          success: true,
          warehouseId: warehouseId,
          vendor: {
            id: vendor._id,
            name: vendor.name,
            shopName: vendor.shopName
          },
          data: response.data
        };
      } else {
        throw new Error(response.data.responsemsg || 'Warehouse creation failed');
      }
    } catch (error) {
      console.error(`❌ Create warehouse error for vendor ${vendorId}:`, error.message);
      return {
        success: false,
        error: error.message,
        vendorId: vendorId
      };
    }
  }
  
  async getVendorWarehouse(vendorId) {
    try {
      const vendor = await Vendor.findById(vendorId);
      
      if (!vendor || !vendor.parcelxWarehouseId) {
        return {
          success: false,
          error: 'Warehouse not found for vendor',
          vendorId: vendorId
        };
      }
      
      return {
        success: true,
        warehouseId: vendor.parcelxWarehouseId,
        warehouseData: vendor.warehouseAddress,
        vendor: {
          id: vendor._id,
          name: vendor.name,
          shopName: vendor.shopName
        }
      };
    } catch (error) {
      console.error(`❌ Get warehouse error for vendor ${vendorId}:`, error.message);
      return {
        success: false,
        error: error.message,
        vendorId: vendorId
      };
    }
  }
  
  // ================= CREATE VENDOR SHIPMENT =================
  async createVendorShipment(vendorId, orderData, items) {
    try {
      console.log(`🚚 Creating shipment for vendor: ${vendorId}`);
      
      // Get vendor and warehouse
      const vendor = await Vendor.findById(vendorId);
      if (!vendor) {
        throw new Error('Vendor not found');
      }
      
      // Check if vendor has warehouse
      if (!vendor.parcelxWarehouseId) {
        throw new Error('Vendor warehouse not setup. Please setup warehouse first.');
      }
      
      const warehouseId = vendor.parcelxWarehouseId;
      
      // Calculate vendor totals
      const vendorSubtotal = items.reduce((sum, item) => 
        sum + (item.price * item.qty), 0);
      const vendorQuantity = items.reduce((sum, item) => sum + item.qty, 0);
      
      // Prepare products array for ParcelX
      const products = items.map(item => ({
        product_sku: item.productId?.toString() || 'SKU-' + Date.now(),
        product_name: item.productName || 'Product',
        product_value: item.price.toString(),
        product_hsnsac: item.hsnCode || '',
        product_taxper: 0,
        product_category: item.category || 'General',
        product_quantity: item.qty.toString(),
        product_description: item.description || ''
      }));
      
      // Calculate weight
      const totalWeight = Math.max(items.length * 0.5, 0.2);
      
      // Format phone
      const formatPhone = (phone) => {
        if (!phone) return '9999999999';
        return phone.toString().replace(/\D/g, '').substring(0, 10);
      };
      
      // Prepare shipment payload
      const payload = {
        client_order_id: `${orderData._id}_${vendorId}_${Date.now()}`,
        consignee_emailid: orderData.shippingAddress?.email || 'test@example.com',
        consignee_pincode: orderData.shippingAddress?.pincode,
        consignee_mobile: formatPhone(orderData.shippingAddress?.phone),
        consignee_phone: '',
        consignee_address1: orderData.shippingAddress?.address,
        consignee_address2: orderData.shippingAddress?.landmark || '',
        consignee_name: orderData.shippingAddress?.name || 'Customer',
        invoice_number: `INV-${Date.now()}-${vendorId.toString().slice(-6)}`,
        express_type: 'surface',
        pick_address_id: warehouseId,
        return_address_id: '',
        cod_amount: orderData.paymentMethod === 'cod' ? 
          Math.round(vendorSubtotal).toString() : '0',
        tax_amount: '0',
        mps: '0',
        courier_type: 0,
        courier_code: '',
        products: products,
        address_type: 'Home',
        payment_mode: orderData.paymentMethod === 'cod' ? 'COD' : 'Prepaid',
        order_amount: vendorSubtotal.toFixed(2),
        extra_charges: '0',
        shipment_width: ['10'],
        shipment_height: ['10'],
        shipment_length: ['10'],
        shipment_weight: [totalWeight.toFixed(1)]
      };
      
      console.log(`📦 Sending to ParcelX for vendor ${vendorId} from ${vendor.warehouseAddress?.city}`);
      
      // Create shipment in ParcelX
      const response = await this.client.post('/order/create_order', payload);
      
      console.log('✅ ParcelX response:', {
        status: response.data.status,
        message: response.data.responsemsg
      });
      
      if (response.data.status === true) {
        const data = response.data.data || response.data;
        const awbNumber = data.awb_number || data.awb;
        const orderNumber = data.order_number;
        const courierName = data.courier_name || 'ParcelX';
        
        return {
          success: true,
          data: data,
          awbNumber: awbNumber,
          orderNumber: orderNumber,
          courierName: courierName,
          fullResponse: response.data,
          vendor: {
            id: vendorId,
            name: vendor.shopName || vendor.name,
            warehouseId: warehouseId,
            city: vendor.warehouseAddress?.city
          }
        };
      } else {
        throw new Error(response.data.responsemsg || 'Shipment creation failed');
      }
    } catch (error) {
      console.error(`❌ Create shipment error for vendor ${vendorId}:`, error.message);
      return {
        success: false,
        error: error.message,
        vendorId: vendorId
      };
    }
  }
  
  // ================= TRACKING =================
  async trackShipment(awbNumber) {
    try {
      const response = await this.client.get('/track_order', {
        params: { awb: awbNumber }
      });
      
      return {
        success: response.data.status === true,
        data: response.data.data || [],
        currentStatus: response.data.current_status,
        awb: awbNumber
      };
    } catch (error) {
      console.error('❌ Track shipment error:', error.message);
      return {
        success: false,
        error: error.message,
        awb: awbNumber
      };
    }
  }
  
  async getShipmentDetails(awbNumber) {
    try {
      const response = await this.client.get('/shipments-details', {
        params: { awb: awbNumber }
      });
      
      return {
        success: response.data.status === true,
        data: response.data.data,
        awb: awbNumber
      };
    } catch (error) {
      console.error('❌ Get shipment details error:', error.message);
      return {
        success: false,
        error: error.message,
        awb: awbNumber
      };
    }
  }
  
  // ================= LABEL GENERATION =================
  async getLabel(awbNumber) {
    try {
      const response = await this.client.get('/label-api', {
        params: { awb: awbNumber },
        responseType: 'arraybuffer'
      });
      
      return {
        success: true,
        data: Buffer.from(response.data),
        contentType: response.headers['content-type'] || 'application/pdf',
        filename: `AWB-${awbNumber}.pdf`
      };
    } catch (error) {
      console.error('❌ Get label error:', error.message);
      return {
        success: false,
        error: error.message,
        awb: awbNumber
      };
    }
  }
  
  // ================= PINCODE CHECK =================
  async checkPincode(pincode) {
    try {
      const response = await this.client.get('/pincode-api', {
        params: { pincode }
      });
      
      return {
        success: response.data.status === true,
        data: response.data.data,
        pincode: pincode
      };
    } catch (error) {
      console.error('❌ Check pincode error:', error.message);
      return {
        success: false,
        error: error.message,
        pincode: pincode
      };
    }
  }
  
  // ================= CANCEL SHIPMENT =================
  async cancelShipment(awbNumber, reason = 'Order cancelled') {
    try {
      const response = await this.client.post('/order/cancel', {
        awb: awbNumber,
        reason: reason
      });
      
      return {
        success: response.data.status === true,
        message: response.data.responsemsg,
        awb: awbNumber
      };
    } catch (error) {
      console.error('❌ Cancel shipment error:', error.message);
      return {
        success: false,
        error: error.message,
        awb: awbNumber
      };
    }
  }
  
  // ================= TEST CONNECTION =================
  async testConnection() {
    try {
      // Test API connectivity by getting warehouse list
      const response = await this.client.get('/warehouse-list');
      return {
        success: response.data.status === true,
        message: 'ParcelX API connection successful',
        data: response.data,
        timestamp: new Date()
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        timestamp: new Date()
      };
    }
  }
}

module.exports = new ParcelXService();
