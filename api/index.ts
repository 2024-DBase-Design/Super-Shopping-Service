import { PrismaClient } from '@prisma/client';
import express from 'express';
import customerRoutes from './routes/customerRoutes';
// import staffRoutes from './routes/staffRoutes';
// import productRoutes from './routes/productRoutes';
// import warehouseRoutes from './routes/warehouseRoutes';
// import supplierRoutes from './routes/supplierRoutes';
// import stockRoutes from './routes/stockRoutes';

export const prisma = new PrismaClient();
const port = 5431;
const app = express();

app.use(express.json());

app.use('/customers', customerRoutes);
// app.use('/staff', staffRoutes);
// app.use('/products', productRoutes);
// app.use('/warehouses', warehouseRoutes);
// app.use('/suppliers', supplierRoutes);
// app.use('/stock', stockRoutes);

app.listen(port, () => console.log('REST API server ready at: http://localhost:' + port));
