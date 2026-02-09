const client = require("./parcelx.client");

/* ================= CREATE SHIPMENT IN PARCELX ================= */
exports.createShipment = async (orderData) => {
  try {
    console.log("🚀 Creating shipment in ParcelX for order:", orderData._id);
    
    // Format order data for ParcelX API
    const payload = {
      order_id: orderData._id.toString(),
      payment_type: orderData.paymentMethod === 'cod' ? 'COD' : 'PREPAID',
      amount_to_collect: orderData.paymentMethod === 'cod' ? orderData.totalPayable : 0,
      customer_name: orderData.shippingAddress?.name || '',
      customer_phone: orderData.shippingAddress?.phone || '',
      customer_email: orderData.shippingAddress?.email || '',
      customer_address: `${orderData.shippingAddress?.address || ''}, ${orderData.shippingAddress?.city || ''}, ${orderData.shippingAddress?.state || ''}`,
      customer_city: orderData.shippingAddress?.city || '',
      customer_state: orderData.shippingAddress?.state || '',
      customer_pincode: orderData.shippingAddress?.pincode || '',
      package_weight: 0.5, // Default weight (kg)
      package_length: 10,  // Default dimensions (cm)
      package_breadth: 10,
      package_height: 10,
      product_name: orderData.orderItems?.map(item => item.productName).join(', ') || 'Product',
      quantity: orderData.orderItems?.reduce((sum, item) => sum + item.qty, 0) || 1,
      invoice_value: orderData.totalPayable,
      invoice_number: `INV-${Date.now()}`,
      pickup_location: "Warehouse", // Your pickup location
      seller_name: "HAVBIT",
      seller_phone: "+911234567890",
      seller_address: "Your Business Address",
      seller_city: "Your City",
      seller_state: "Your State",
      seller_pincode: "123456",
      seller_gstin: "", // Optional
    };

    console.log("📦 Sending to ParcelX:", payload);

    const response = await client.post("/order-create", payload);
    console.log("✅ ParcelX response received:", response.data);
    
    return response.data;
  } catch (error) {
    console.error("❌ ParcelX shipment creation failed:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    throw error;
  }
};

/* ================= CANCEL SHIPMENT ================= */
exports.cancelShipment = async (waybill) => {
  try {
    const response = await client.post("/cancel-shipment", { waybill });
    return response.data;
  } catch (error) {
    console.error("Cancel shipment error:", error.message);
    throw error;
  }
};

/* ================= TRACK SHIPMENT ================= */
exports.trackShipment = async (awb) => {
  try {
    const response = await client.get("/shipments-details", {
      params: { awb },
    });
    return response.data;
  } catch (error) {
    console.error("Track shipment error:", error.message);
    throw error;
  }
};

/* ================= GET AWB PDF LABEL ================= */
exports.getAWBLabel = async (awb) => {
  try {
    const response = await client.get("/label-api", {
      params: { awb },
      responseType: 'arraybuffer'
    });
    return Buffer.from(response.data);
  } catch (error) {
    console.error("Get AWB label error:", error.message);
    throw error;
  }
};

/* ================= CHECK PINCODE SERVICEABILITY ================= */
exports.checkPincode = async (pincode) => {
  try {
    const response = await client.get("/pincode-api", {
      params: { pincode }
    });
    return response.data;
  } catch (error) {
    console.error("Check pincode error:", error.message);
    throw error;
  }
};

/* ================= OTHER PARCELX APIs (optional) ================= */
exports.calculateRate = async (payload) => {
  try {
    const response = await client.post("/rate-calculator", payload);
    return response.data;
  } catch (error) {
    console.error("Rate calculation error:", error.message);
    throw error;
  }
};

exports.getActiveCouriers = async (payload) => {
  try {
    const response = await client.post("/active-courier-list", payload);
    return response.data;
  } catch (error) {
    console.error("Active couriers error:", error.message);
    throw error;
  }
};

exports.requestPickup = async (payload) => {
  try {
    const response = await client.post("/pickup-request", payload);
    return response.data;
  } catch (error) {
    console.error("Pickup request error:", error.message);
    throw error;
  }
};

exports.ndrAction = async (payload) => {
  try {
    const response = await client.post("/ndr-action", payload);
    return response.data;
  } catch (error) {
    console.error("NDR action error:", error.message);
    throw error;
  }
};

exports.getNdrShipments = async (params) => {
  try {
    const response = await client.get("/ndr-shipments", { params });
    return response.data;
  } catch (error) {
    console.error("NDR shipments error:", error.message);
    throw error;
  }
};