const client = require("./parcelx.client");

/* ================= CREATE SHIPMENT IN PARCELX ================= */
exports.createShipment = async (orderData) => {
  try {
    console.log("🚀 Creating shipment in ParcelX for order:", orderData._id);
    
    // Get pickup location from multiple possible sources
    const pickupLocationId = orderData.pickupLocationId || 
                           orderData.parcelxData?.pick_address_id || 
                           orderData.pick_address_id || 
                           "90533";
    
    console.log("📍 Pickup Location ID:", pickupLocationId);
    
    // Format phone number (remove any non-digit characters)
    const formatPhone = (phone) => {
      if (!phone) return '';
      return phone.toString().replace(/\D/g, '').substring(0, 10);
    };

    // Get weight from order data
    const packageWeight = orderData.parcelxData?.weight || 
                         orderData.package_weight || 
                         0.5;
    
    console.log("⚖️ Package Weight:", packageWeight, "kg");

    // IMPORTANT: ParcelX v3 requires specific payload structure
    const payload = {
      order_id: orderData._id.toString(),
      channel_order_id: orderData._id.toString(),
      payment_type: orderData.paymentMethod === 'cod' ? 'COD' : 'PREPAID',
      cod_amount: orderData.paymentMethod === 'cod' ? Math.round(orderData.totalPayable) : 0,
      customer_name: orderData.shippingAddress?.name?.substring(0, 50) || 'Customer',
      customer_phone: formatPhone(orderData.shippingAddress?.phone) || '9999999999',
      customer_email: orderData.shippingAddress?.email?.substring(0, 100) || '',
      customer_address: (orderData.shippingAddress?.address || '').substring(0, 200),
      customer_city: orderData.shippingAddress?.city?.substring(0, 50) || '',
      customer_state: orderData.shippingAddress?.state?.substring(0, 50) || '',
      customer_pincode: (orderData.shippingAddress?.pincode || '').toString().substring(0, 6),
      product_name: (orderData.orderItems?.map(item => item.productName).join(', ') || 'Product').substring(0, 100),
      quantity: orderData.orderItems?.reduce((sum, item) => sum + (parseInt(item.qty) || 1), 0) || 1,
      invoice_value: Math.round(orderData.totalPayable),
      package_weight: packageWeight, // in kg (required, min 0.1)
      package_length: orderData.parcelxData?.dimensions?.length || 15,  // in cm
      package_breadth: orderData.parcelxData?.dimensions?.breadth || 10,
      package_height: orderData.parcelxData?.dimensions?.height || 5,
      seller_name: "HAVBIT",
      seller_phone: "1234567890",
      seller_address: "Business Address",
      seller_city: "City",
      seller_state: "State",
      seller_pincode: "123456",
      seller_country: "IN",
      pickup_location_id: pickupLocationId, // ✅ YOUR WAREHOUSE PICKUP ID
      // Additional required fields
      order_type: "forward", // "forward" or "rto"
      invoice_number: `INV-${Date.now()}-${orderData._id.toString().slice(-6)}`,
      description: "Health & Wellness Products",
      // Optional but recommended
      customer_country: "IN",
      seller_gstin: "", // Optional
      hsn_code: "", // Optional
      customer_alternate_phone: "", // Optional
      generate_awb: true // ✅ Ensure AWB is generated
    };

    console.log("📦 Sending to ParcelX API:", {
      endpoint: "/order",
      pickup_location_id: payload.pickup_location_id,
      order_id: payload.order_id,
      payment_type: payload.payment_type,
      cod_amount: payload.cod_amount,
      weight: payload.package_weight
    });

    // According to ParcelX v3 docs, endpoint should be "/order"
    const response = await client.post("/order", payload);
    
    console.log("✅ ParcelX API Response:", {
      status: response.status,
      data: response.data
    });
    
    if (response.data.status === true) {
      // Handle different response formats
      let awbNumber = null;
      let courierName = null;
      let parcelxOrderId = null;
      
      if (response.data.data) {
        // New format: response.data.data contains the shipment details
        awbNumber = response.data.data.waybill_number || 
                    response.data.data.awb_number || 
                    response.data.data.awb;
        courierName = response.data.data.courier_name || 
                      response.data.data.courier || 
                      "ParcelX Partner";
        parcelxOrderId = response.data.data.order_id || 
                         response.data.data.parcelx_order_id;
      } else if (response.data.awb_number) {
        // Old format: directly in response.data
        awbNumber = response.data.awb_number;
        courierName = response.data.courier_name || "ParcelX Partner";
        parcelxOrderId = response.data.order_id;
      } else if (response.data.waybill_number) {
        // Alternative format
        awbNumber = response.data.waybill_number;
        courierName = response.data.courier_name || "ParcelX Partner";
      }
      
      console.log("🎉 Shipment Created Successfully:", {
        awbNumber,
        courierName,
        parcelxOrderId
      });
      
      return {
        status: true,
        data: {
          awb_number: awbNumber,
          courier_name: courierName,
          order_id: parcelxOrderId || orderData._id.toString(),
          waybill_number: awbNumber,
          shipment_data: response.data
        }
      };
    } else {
      console.error("❌ ParcelX API returned false status:", response.data);
      throw new Error(response.data.message || response.data.responsemsg || "ParcelX API failed");
    }
    
  } catch (error) {
    console.error("❌ ParcelX shipment creation failed:", {
      message: error.message,
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      headers: error.config?.headers
    });
    
    // Return a structured error
    return {
      status: false,
      message: error.message,
      apiError: error.response?.data,
      statusCode: error.response?.status
    };
  }
};

/* ================= CANCEL SHIPMENT ================= */
exports.cancelShipment = async (waybill) => {
  try {
    console.log("🗑️ Cancelling ParcelX shipment:", waybill);
    
    const response = await client.post("/order/cancel", { 
      waybill: waybill 
    });
    
    console.log("✅ Shipment cancellation response:", response.data);
    return response.data;
    
  } catch (error) {
    console.error("❌ Cancel shipment error:", {
      message: error.message,
      response: error.response?.data
    });
    throw error;
  }
};

/* ================= TRACK SHIPMENT ================= */
exports.trackShipment = async (awb) => {
  try {
    console.log("📊 Tracking ParcelX shipment:", awb);
    
    const response = await client.get("/shipments-details", {
      params: { awb },
    });
    
    console.log("✅ Tracking response received");
    return response.data;
    
  } catch (error) {
    console.error("❌ Track shipment error:", {
      message: error.message,
      awb: awb,
      response: error.response?.data
    });
    throw error;
  }
};

/* ================= GET AWB PDF LABEL ================= */
exports.getAWBLabel = async (awb) => {
  try {
    console.log("🏷️ Getting AWB label for:", awb);
    
    const response = await client.get("/label-api", {
      params: { awb },
      responseType: 'arraybuffer'
    });
    
    console.log("✅ AWB label received, size:", response.data.length, "bytes");
    return Buffer.from(response.data);
    
  } catch (error) {
    console.error("❌ Get AWB label error:", {
      message: error.message,
      awb: awb
    });
    throw error;
  }
};

/* ================= CHECK PINCODE SERVICEABILITY ================= */
exports.checkPincode = async (pincode) => {
  try {
    console.log("📍 Checking pincode serviceability:", pincode);
    
    const response = await client.get("/pincode-api", {
      params: { pincode }
    });
    
    console.log("✅ Pincode check response:", response.data);
    return response.data;
    
  } catch (error) {
    console.error("❌ Check pincode error:", {
      message: error.message,
      pincode: pincode
    });
    throw error;
  }
};

/* ================= TEST PARCELX CONNECTION ================= */
exports.testParcelXConnection = async () => {
  try {
    console.log("🧪 Testing ParcelX connection and warehouse...");
    
    // Test with dummy order
    const testOrder = {
      _id: "test_" + Date.now(),
      shippingAddress: {
        name: "Test Customer",
        phone: "9999999999",
        email: "test@example.com",
        address: "Test Address",
        city: "Delhi",
        state: "Delhi",
        pincode: "110001"
      },
      orderItems: [{ productName: "Test Product", qty: 1 }],
      totalPayable: 100,
      paymentMethod: "prepaid",
      pickupLocationId: "90533"
    };
    
    const result = await exports.createShipment(testOrder);
    console.log("🧪 Test Result:", result);
    return result;
  } catch (error) {
    console.error("❌ Test failed:", error);
    throw error;
  }
};

/* ================= CALCULATE RATE ================= */
exports.calculateRate = async (payload) => {
  try {
    console.log("💰 Calculating shipping rate:", payload);
    
    const response = await client.post("/rate-calculator", payload);
    return response.data;
    
  } catch (error) {
    console.error("❌ Rate calculation error:", error.message);
    throw error;
  }
};

/* ================= GET ACTIVE COURIERS ================= */
exports.getActiveCouriers = async (payload) => {
  try {
    console.log("🚚 Getting active couriers list");
    
    const response = await client.post("/active-courier-list", payload);
    return response.data;
    
  } catch (error) {
    console.error("❌ Active couriers error:", error.message);
    throw error;
  }
};

/* ================= REQUEST PICKUP ================= */
exports.requestPickup = async (payload) => {
  try {
    console.log("📦 Requesting pickup:", payload);
    
    const response = await client.post("/pickup-request", payload);
    return response.data;
    
  } catch (error) {
    console.error("❌ Pickup request error:", error.message);
    throw error;
  }
};

/* ================= NDR ACTION ================= */
exports.ndrAction = async (payload) => {
  try {
    console.log("🔄 Taking NDR action:", payload);
    
    const response = await client.post("/ndr-action", payload);
    return response.data;
    
  } catch (error) {
    console.error("❌ NDR action error:", error.message);
    throw error;
  }
};

/* ================= GET NDR SHIPMENTS ================= */
exports.getNdrShipments = async (params) => {
  try {
    console.log("📋 Getting NDR shipments:", params);
    
    const response = await client.get("/ndr-shipments", { params });
    return response.data;
    
  } catch (error) {
    console.error("❌ NDR shipments error:", error.message);
    throw error;
  }
};

/* ================= TEST API CONNECTION ================= */
exports.testConnection = async () => {
  try {
    console.log("🔌 Testing ParcelX API connection...");
    
    // Try a simple API call to test connection
    const response = await client.get("/shipments-details", {
      params: { awb: "TEST" }
    }).catch(err => {
      // Even if it fails with 404, it means API is reachable
      if (err.response) {
        return { status: err.response.status, data: err.response.data };
      }
      throw err;
    });
    
    console.log("✅ ParcelX API is reachable");
    return {
      success: true,
      message: "ParcelX API is reachable",
      response: response.data || response
    };
    
  } catch (error) {
    console.error("❌ ParcelX API connection test failed:", error.message);
    return {
      success: false,
      message: `ParcelX API connection failed: ${error.message}`,
      error: error.message
    };
  }
};
