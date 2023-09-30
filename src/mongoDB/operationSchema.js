const mongoose = require('mongoose');

// Subdocumento para los campos comerciales
const fieldsComercialSchema = new mongoose.Schema({
  orderNumber: String,
  supplierRefNumber: String,
  empresaRefNumber: String,
  empleadoBuyer: String,
  empleadoSeller: String,
  date: String,
  empresa: {
    nombre: String,
    empresa: String,
    direccion: String,
    direccion2: String,
    vatNumber: String,
    bank: {
      beneficiaryBank: String,
      bankAdress: String,
      swiftCode: String,
      beneficiaryName: String,
      beneficiaryAccountNumber: String,
    },
  },
  seller: {
    nombre: String,
    direccion: String,
    direccion2: String,
    pais: String,
    cuit: String,
    refNumber: String,
  },
  buyer: {
    direccion: String,
    direccion2: String,
    vatNumber: String,
    refNumber: String,
  },
  productos: [
    {
      id: String,
      description: String,
      packing: String,
      quantity: Number,
      unitPricePurchase: Number,
      unitPriceSale: Number,
      amountSale: Number,
      amountPurchase: Number,
    },
  ],
  totalPurchase: Number,
  totalSale: Number,
  totalWeight: Number,
  productionDate: String,
  shelfLife: String,
  destinationPort: String,
  destinationCountry: String,
  quantity: Number,
  shipmentPeriod: String,
  deliveryTermsSale: String,
  deliveryTermsPurchase: String,
  paymentTermsSale: String,
  paymentTermsPurchase: String,
  exportTo: String,
});

// Subdocumento para los campos de documentos
const fieldsDocsSchema = new mongoose.Schema({
  date: String,
  documentRequested: [String],
  instruccionsToIssue: String,
  tipoContenedor: String,
  descriptionGoods: String,
  temperature: String,
  placeBLIssue: String,
  comentarios: String,
  comentariosSeller: String,
  consignee: {
    nombre: String,
    direccion: String,
    direccion2: String,
    direccion3: String,
    country: String,
    taxId: String,
  },
  notify: {
    nombre: String,
    direccion: String,
    direccion2: String,
    direccion3: String,
    country: String,
    taxId: String,
  },
  consigneeRest: {
    nombre: String,
    direccion: String,
    direccion2: String,
    direccion3: String,
    country: String,
    taxId: String,
  },
});

// Esquema principal
const objetoSchema = new mongoose.Schema({
  id:{
    type: String,
    required: true,
    unique: true
  },
  comercial: {
    title: String,
    completed: Number,
    fields: fieldsComercialSchema,
  },
  docs: {
    title: String,
    completed: Number,
    fields: fieldsDocsSchema,
  },
  logistica: {
    title: String,
    completed: Number,
    fields: {},
  },
  contableFinanciera: {
    title: String,
    completed: Number,
    fields: {},
  },
  status: String,
});

const OperationModel = mongoose.model('Operation', objetoSchema);

module.exports = OperationModel;
