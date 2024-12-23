const express = require('express');
const connectToDatabase = require('./db');
const cors = require('cors');
const Order = require('./models/Order');
const DeliveryPartner = require('./models/DeliveryPartner');
const Assignment = require('./models/Assignment');

const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173', // The URL of your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  }));

// Connect to MongoDB
connectToDatabase();

// Add a new order
// Add a new order
app.post('/api/add/orders', async (req, res) => {
    try {
      console.log("Received order data:", req.body); // Log incoming data
      const newOrder = new Order(req.body);
      await newOrder.save();
      res.status(201).json(newOrder);
    } catch (error) {
      console.error("Error saving order:", error); // Log the error
      res.status(500).json({ error: error.message });
    }
  });
  

// Get all orders
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new partner
app.post('/api/add/partners', async (req, res) => {
  try {
    const newPartner = new DeliveryPartner(req.body);
    await newPartner.save();
    res.status(201).json(newPartner);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all partners
app.get('/api/partners', async (req, res) => {
  try {
    const partners = await DeliveryPartner.find();
    res.json(partners);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/api/partners/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    // Assuming you're using MongoDB with Mongoose
    const updatedPartner = await DeliveryPartner.findByIdAndUpdate(
      id,
      { status },
      { new: true } // Return the updated document
    );
    
    if (!updatedPartner) {
      return res.status(404).json({ message: "Partner not found" });
    }
    
    res.status(200).json(updatedPartner);
  } catch (error) {
    console.error("Error updating partner status:", error); // Log the error
    res.status(500).json({ message: "Error updating partner status" });
  }
});


// Assign order to a partner
app.post('/api/assignments', async (req, res) => {
  try {
    const { orderId, partnerId } = req.body;

    const assignment = new Assignment({ orderId, partnerId, status: 'success' });
    await assignment.save();

    // Update the order
    await Order.findByIdAndUpdate(orderId, { assignedTo: partnerId, status: 'assigned' });

    res.status(201).json(assignment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// API to get active delivery partners
app.get('/api/active-delivery-partners', async (req, res) => {
  try {
    const activePartners = await DeliveryPartner.find({ status: 'active' });
    res.status(200).json(activePartners);
  } catch (error) {
    console.error("Error fetching active partners:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
