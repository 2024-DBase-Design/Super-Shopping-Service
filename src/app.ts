import express from "express";
import bodyParser from "body-parser";
import customerRoutes from "./routes/customerRoutes";
// import staffRoutes from "./routes/staffRoutes";
import productRoutes from "./routes/productRoutes";
// import warehouseRoutes from "./routes/warehouseRoutes";
// import supplierRoutes from "./routes/supplierRoutes";
// import deliveryRoutes from "./routes/deliveryRoutes";

const app = express();

app.use(bodyParser.json());

app.use("/customers", customerRoutes);
// app.use("/staff", staffRoutes);
app.use("/products", productRoutes);
// app.use("/warehouses", warehouseRoutes);
// app.use("/suppliers", supplierRoutes);
// app.use("/delivery", deliveryRoutes);

export default app;
