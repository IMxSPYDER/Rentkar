const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    orderNumber: { type: String, required: true },
    customer: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
    },
    area: { type: String, required: true },
    items: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    status: {
      type: String,
      enum: ['pending', 'assigned', 'picked', 'delivered'],
      default: 'pending',
    },
    scheduledFor: { type: String, required: true }, // Ensure it's required
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'DeliveryPartner' },
    totalAmount: { type: Number, required: true }, // Ensure it's calculated and passed
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });
  
  module.exports = mongoose.model('Order', OrderSchema);
  