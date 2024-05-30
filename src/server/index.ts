import express from "express";
import path from 'path';
import sequelize from './sequelize';
import customerRoutes from "../routes/customerRoutes";
// import staffRoutes from "./routes/staffRoutes";
import productRoutes from "../routes/productRoutes";
// import warehouseRoutes from "./routes/warehouseRoutes";
// import supplierRoutes from "./routes/supplierRoutes";
// import deliveryRoutes from "./routes/deliveryRoutes";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', '..', 'public')));

// Define the root route to serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'public', 'index.html'));
});

app.use("/customers", customerRoutes);
// app.use("/staff", staffRoutes);
app.use("/products", productRoutes);
// app.use("/warehouses", warehouseRoutes);
// app.use("/suppliers", supplierRoutes);
// app.use("/delivery", deliveryRoutes);

// Sync database and start server
sequelize.sync({ force: true }).then(() => {
  console.log('Database & tables created!');
  
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}).catch((error) => {
  console.error('Error syncing database:', (error as Error).message);
});
