const router = require('express').Router();
const c = require('./parcelx.controller');

router.post('/order', c.createOrder);
router.post('/order/cancel', c.cancelOrder);
router.get('/track/:awb', c.trackShipment);
router.post('/pickup', c.pickupRequest);
router.post('/ndr-action', c.ndrAction);
router.get('/ndr-shipments', c.ndrShipments);

module.exports = router;