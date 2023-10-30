const mongoose = require("mongoose");

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
      correspondentBank:String
    },
  },
  seller: {
    nombre: String,
    direccion: String,
    direccion2: String,
    pais: String,
    taxId: String,
    refNumber: String,
    plantNumber:String,
    brand:String
  },
  buyer: {
    nombre:String,
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
      quantityCartons:Number,
      unitPricePurchase: Number,
      unitPriceSale: Number,
      amountSale: Number,
      amountPurchase: Number,
      netWeight:Number,
      grossWeight:Number,
    },
  ],
  totalPurchase: Number,
  totalSale: Number,
  totalNetWeight: Number,
  totalQuantityCartons:Number,
  totalGrossWeight: Number,
  productionDate: String,
  operationType:String,
  comisionMarketing:Number,
  comisionPurchase:Number,
  comisionSale:Number,
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
const fieldsLogisticaSchema = new mongoose.Schema({
    ShippingLine: String,
    freightForwarder:String,
    bookingNr:String,
    voyageNr:String,
    insuranceAmount:Number,
    freightAmount:Number,
    eta:String,
    etd:String,
    vesselName:String,
    containerNr:String,
    blNr:String,
    seals:String,
    grossWeight:Number,
    netWeight:Number,
    quantityCartons:Number,
    awbNr:String,
    telexRelease:String
});
const fieldsDocsSchema = new mongoose.Schema({
  date: String,
  responsable:String,
  documentRequested: [{ label: String, value: String, copias: String }],
  terminosFlete:String,
  instruccionsToIssue: String,
  tipoContenedor: String,
  descriptionGoods: String,
  descriptionGoods2: String,
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
const fieldsContableFinanciera = new mongoose.Schema({

})
// Esquema principal
const objetoSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
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
    fields:fieldsLogisticaSchema,
  },
  contableFinanciera: {
    title: String,
    completed: Number,
    fields:fieldsContableFinanciera,
  },
  status: String,
});

const OperationModel = mongoose.model("Operation", objetoSchema);

module.exports = OperationModel;
