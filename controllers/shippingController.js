// controllers/shippingController.js
const axios = require('axios');
const CustomerOrder = require("../models/CustomerOrder");

// Shiprocket API Configuration
const SHIPROCKET_BASE_URL = 'https://apiv2.shiprocket.in/v1/external';

// ✅ Get Shiprocket authentication token
const getShiprocketToken = async () => {
  try {
    // If you have direct token in env
    if (process.env.SHIPROCKET_TOKEN) {
      return process.env.SHIPROCKET_TOKEN;
    }
    
    // Otherwise login with email/password
    const response = await axios.post('https://apiv2.shiprocket.in/v1/external/auth/login', {
      email: process.env.SHIPROCKET_EMAIL || 'hello@havbit.in',
      password: process.env.SHIPROCKET_PASSWORD
    });
    
    return response.data.token;
  } catch (error) {
    console.error('❌ Shiprocket login error:', error.response?.data || error.message);
    throw error;
  }
};

// ✅ Create shipment in Shiprocket
exports.createShiprocketShipment = async (req, res) => {
  try {
    const { orderId } = req.params;
    
    // Find order
    const order = await CustomerOrder.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    // Check if shipment already exists
    if (order.shiprocketOrderId || order.awbCode) {
      return res.status(400).json({
        success: false,
        message: 'Shipment already created for this order'
      });
    }
    
    // Check if order is confirmed
    if (order.orderStatus !== 'Confirmed') {
      return res.status(400).json({
        success: false,
        message: 'Order must be confirmed before creating shipment'
      });
    }
    
    // Get token
    const token = await getShiprocketToken();
    
    // Prepare order items for Shiprocket
    const orderItemsForSR = order.orderItems.map(item => ({
      name: item.productName || 'Product',
      sku: item.productId?.toString() || 'SKU-001',
      units: item.qty,
      selling_price: item.price,
      discount: 0,
      tax: 0,
      hsn: 999999
    }));
    
    // Prepare shipment data
    const shipmentData = {
      order_id: order._id.toString(),
      order_date: new Date(order.createdAt).toISOString().split('T')[0],
      pickup_location: 'Primary',
      channel_id: '', // Leave empty for default
      comment: 'Order from HAVBIT',
      reseller_name: 'HAVBIT',
      billing_customer_name: order.shippingAddress?.name || 'Customer',
      billing_last_name: '',
      billing_address: order.shippingAddress?.address || '',
      billing_address_2: '',
      billing_city: order.shippingAddress?.city || '',
      billing_pincode: order.shippingAddress?.pincode || '',
      billing_state: order.shippingAddress?.state || '',
      billing_country: 'India',
      billing_email: order.shippingAddress?.email || '',
      billing_phone: order.shippingAddress?.phone || '',
      shipping_is_billing: true,
      shipping_customer_name: order.shippingAddress?.name || 'Customer',
      shipping_last_name: '',
      shipping_address: order.shippingAddress?.address || '',
      shipping_address_2: '',
      shipping_city: order.shippingAddress?.city || '',
      shipping_pincode: order.shippingAddress?.pincode || '',
      shipping_country: 'India',
      shipping_state: order.shippingAddress?.state || '',
      shipping_email: order.shippingAddress?.email || '',
      shipping_phone: order.shippingAddress?.phone || '',
      order_items: orderItemsForSR,
      payment_method: order.paymentMethod === 'cod' ? 'COD' : 'Prepaid',
      shipping_charges: order.shippingCharge || 0,
      giftwrap_charges: 0,
      transaction_charges: 0,
      total_discount: order.discount || 0,
      sub_total: order.amount,
      length: 10,
      breadth: 10,
      height: 10,
      weight: 0.5
    };
    
    console.log('Creating Shiprocket shipment for order:', orderId);
    console.log('Shipment data:', JSON.stringify(shipmentData, null, 2));
    
    // Create shipment in Shiprocket
    const response = await axios.post(
      `${SHIPROCKET_BASE_URL}/orders/create/adhoc`,
      shipmentData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log('Shiprocket response:', response.data);
    
    if (response.data && response.data.order_id) {
      // Update order with Shiprocket details
      order.shiprocketOrderId = response.data.order_id;
      order.shiprocketShipmentId = response.data.shipment_id;
      order.shiprocketStatus = response.data.status;
      order.awbCode = response.data.awb_code;
      order.courierName = response.data.courier_name;
      order.courierCompanyId = response.data.courier_company_id;
      order.trackingUrl = response.data.tracking_url;
      order.orderStatus = 'Shipped'; // Update order status to Shipped
      
      await order.save();
      
      return res.json({
        success: true,
        message: 'Shipment created successfully',
        shipment: response.data
      });
    }
    
    throw new Error('Failed to create shipment');
    
  } catch (error) {
    console.error('❌ Shiprocket shipment error:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: error.response?.data?.message || error.message
    });
  }
};

// ✅ Get shipment details
exports.getShipmentDetails = async (req, res) => {
  try {
    const { orderId } = req.params;
    
    const order = await CustomerOrder.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    if (!order.shiprocketOrderId) {
      return res.status(404).json({
        success: false,
        message: 'No shipment found for this order'
      });
    }
    
    const token = await getShiprocketToken();
    
    const response = await axios.get(
      `${SHIPROCKET_BASE_URL}/orders/show/${order.shiprocketOrderId}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    
    res.json({
      success: true,
      shipment: response.data
    });
    
  } catch (error) {
    console.error('❌ Get shipment error:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: error.response?.data?.message || error.message
    });
  }
};

// ✅ Track shipment by AWB
exports.trackShipment = async (req, res) => {
  try {
    const { awbCode } = req.params;
    
    if (!awbCode) {
      return res.status(400).json({
        success: false,
        message: 'AWB code is required'
      });
    }
    
    const token = await getShiprocketToken();
    
    const response = await axios.get(
      `${SHIPROCKET_BASE_URL}/courier/track/awb/${awbCode}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    
    res.json({
      success: true,
      tracking: response.data
    });
    
  } catch (error) {
    console.error('❌ Track shipment error:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: error.response?.data?.message || error.message
    });
  }
};

// ✅ Check serviceability
exports.checkServiceability = async (req, res) => {
  try {
    const { pickupPostcode, deliveryPostcode, weight, cod } = req.query;
    
    if (!pickupPostcode || !deliveryPostcode) {
      return res.status(400).json({
        success: false,
        message: 'Pickup and delivery postcodes are required'
      });
    }
    
    const token = await getShiprocketToken();
    
    const response = await axios.get(
      `${SHIPROCKET_BASE_URL}/courier/serviceability`,
      {
        params: {
          pickup_postcode: pickupPostcode,
          delivery_postcode: deliveryPostcode,
          weight: weight || 0.5,
          cod: cod || 0,
          order_id: 'temp_order_' + Date.now()
        },
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    
    res.json({
      success: true,
      serviceability: response.data
    });
    
  } catch (error) {
    console.error('❌ Serviceability check error:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: error.response?.data?.message || error.message
    });
  }
};

// ✅ Generate shipping label
exports.generateShippingLabel = async (req, res) => {
  try {
    const { orderId } = req.params;
    
    const order = await CustomerOrder.findById(orderId);
    if (!order || !order.shiprocketOrderId) {
      return res.status(404).json({
        success: false,
        message: 'Order or shipment not found'
      });
    }
    
    const token = await getShiprocketToken();
    
    const response = await axios.get(
      `${SHIPROCKET_BASE_URL}/courier/generate/label`,
      {
        params: {
          shipment_id: order.shiprocketShipmentId || [order.shiprocketShipmentId]
        },
        headers: {
          'Authorization': `Bearer ${token}`
        },
        responseType: 'arraybuffer'
      }
    );
    
    // Set appropriate headers for PDF
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="shipping-label-${order._id}.pdf"`
    });
    
    res.send(response.data);
    
  } catch (error) {
    console.error('❌ Generate label error:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: error.response?.data?.message || error.message
    });
  }
};

// ✅ Cancel shipment
exports.cancelShipment = async (req, res) => {
  try {
    const { orderId } = req.params;
    
    const order = await CustomerOrder.findById(orderId);
    if (!order || !order.shiprocketOrderId) {
      return res.status(404).json({
        success: false,
        message: 'Order or shipment not found'
      });
    }
    
    const token = await getShiprocketToken();
    
    const response = await axios.post(
      `${SHIPROCKET_BASE_URL}/orders/cancel`,
      {
        ids: [order.shiprocketOrderId]
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    
    // Update order status
    order.orderStatus = 'Cancelled';
    order.shiprocketStatus = 'CANCELLED';
    await order.save();
    
    res.json({
      success: true,
      message: 'Shipment cancelled successfully',
      result: response.data
    });
    
  } catch (error) {
    console.error('❌ Cancel shipment error:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: error.response?.data?.message || error.message
    });
  }
};

// ✅ Get all couriers
exports.getAllCouriers = async (req, res) => {
  try {
    const token = await getShiprocketToken();
    
    const response = await axios.get(
      `${SHIPROCKET_BASE_URL}/courier`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    
    res.json({
      success: true,
      couriers: response.data
    });
    
  } catch (error) {
    console.error('❌ Get couriers error:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: error.response?.data?.message || error.message
    });
  }
};

// ✅ Handle Shiprocket webhook
exports.handleShiprocketWebhook = async (req, res) => {
  try {
    const webhookData = req.body;
    console.log('📦 Shiprocket Webhook Received:', webhookData);
    
    // Extract AWB code from webhook
    const awbCode = webhookData.awb_code;
    const status = webhookData.status;
    const orderId = webhookData.order_id;
    
    if (!awbCode || !orderId) {
      return res.status(400).json({ success: false, message: 'Invalid webhook data' });
    }
    
    // Find order by Shiprocket order ID
    const order = await CustomerOrder.findOne({ shiprocketOrderId: orderId });
    if (!order) {
      console.log('Order not found for Shiprocket ID:', orderId);
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    
    // Update order status based on webhook
    if (status === 'DELIVERED') {
      order.orderStatus = 'Delivered';
      order.deliveredDate = new Date();
      order.paymentStatus = 'Success'; // For COD orders
    } else if (status === 'SHIPPED') {
      order.orderStatus = 'Shipped';
    } else if (status === 'OUT FOR DELIVERY') {
      order.orderStatus = 'Processing';
    } else if (status === 'CANCELLED') {
      order.orderStatus = 'Cancelled';
    }
    
    // Update Shiprocket status
    order.shiprocketStatus = status;
    
    await order.save();
    
    console.log(`✅ Order ${order._id} updated to ${status}`);
    
    res.json({ success: true, message: 'Webhook processed' });
    
  } catch (error) {
    console.error('❌ Webhook error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = exports;
