const mongoose = require('mongoose');

const AssignmentSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
  partnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'DeliveryPartner' },
  timestamp: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ['success', 'failed'],
  },
  reason: String,
});

module.exports = mongoose.model('Assignment', AssignmentSchema);
