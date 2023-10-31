const express = require('express');
const app = express();
require('dotenv').config();
const {connectMongoDB} = require('./src/mongoDB/connect')
const rutas = require('./src/routes/index')
var cors = require('cors')
connectMongoDB()
// Configuración de Express
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//rutas
app.use('/api/empleados',rutas.empleadosRoutes)
app.use('/api/login',rutas.loginRoutes);
app.use('/api/signup',rutas.signupRoutes);
app.use('/api/client',rutas.clientRoutes);
app.use('/api/proveedor',rutas.proveedoresRoutes);
app.use('/api/empresa',rutas.empresaRoutes);
app.use('/api/packing',rutas.packingRoutes);
app.use('/api/puertos',rutas.puertosRoutes);
app.use("/api/payment-terms",rutas.paymentTermsRoutes);
app.use("/api/products",rutas.productsRoutes);
app.use("/api/consignee",rutas.consigneeRoutes);
app.use("/api/operation",rutas.operationRoutes);
app.use("/api/forwarder",rutas.forwarderRoutes);
const PORT = process.env.PORT || 8081;
app.listen(PORT, function() {
    console.log('Servidor iniciado en el puerto ' + PORT);
  });