# Smart Delivery Management System

The **Smart Delivery Management System** is a modern web-based platform designed to streamline delivery operations. It empowers businesses to efficiently manage delivery partners, track order statuses, and optimize operations with features like smart order assignment and performance tracking.

---

## Features

### Partner Management
- **Partner Registration:** Add new delivery partners via an admin form.
- **Profile Editing:** Update partner details, delivery areas, and shifts.
- **Shift Scheduling:** Define and manage working hours for partners.
- **Partner List View:** Overview of all partners and their statuses.

### Order Processing
- **Orders Dashboard:** View and manage all orders with filters.
- **Status Tracking:** Monitor order progress from pending to delivered.
- **Order Assignment:** Assign orders to delivery partners manually or automatically.
- **Assignment History:** Logs of all assignments with timestamps and status.

### Dashboard Overview
- **Key Metrics:** Total orders, active partners, and more.
- **Active Orders Map:** Real-time geospatial view of ongoing deliveries.
- **Partner Availability:** Overview of partner statuses (available, busy, offline).

---

## API Routes

### Partner Routes
- **GET /api/partners:** Fetch all delivery partners.
- **POST /api/partners:** Add a new delivery partner.
- **PUT /api/partners/[id]:** Update a delivery partner's details.
- **DELETE /api/partners/[id]:** Remove a delivery partner.

### Order Routes
- **GET /api/orders:** Fetch all orders.
- **POST /api/orders/assign:** Assign an order to a delivery partner.
- **PUT /api/orders/[id]/status:** Update an order's status.

---

## Installation and Setup

### Prerequisites
- **Node.js**  
- **MongoDB**  
- **Git**  

### Steps
1. **Clone the Repository:**  
   ```bash
   git clone https://github.com/IMxSPYDER/Rentkar.git

2. **Navigate to the Backend Directory:**  
   ```bash
   cd backend

3. **Install Backend Dependencies:**  
   ```bash
   npm install

4. **Navigate to the Frontend Directory:**  
   ```bash
   cd ../smart-delivery-app

5. **Install Frontend Dependencies**  
   ```bash
   npm install

6. **Start the Application:**
   a. **Backend:** 
      ```bash
      node app.js
b. **Frontend:**
      ```bash
      npm run dev
