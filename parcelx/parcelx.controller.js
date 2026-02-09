const service = require('./parcelx.service');

exports.createOrder = async (req, res) => {
  try {
    const data = await service.createOrder(req.body);
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.cancelOrder = async (req, res) => {
  try {
    const data = await service.cancelOrder(req.body.waybill);
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.trackShipment = async (req, res) => {
  try {
    const data = await service.trackShipment(req.params.awb);
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.pickupRequest = async (req, res) => {
  try {
    const data = await service.requestPickup(req.body);
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.ndrAction = async (req, res) => {
  try {
    const data = await service.ndrAction(req.body);
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.ndrShipments = async (req, res) => {
  try {
    const data = await service.getNdrShipments(req.query);
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
