function obtenerFechaActual() {
    const hoy = new Date();
    const dia = hoy.getDate().toString().padStart(2, "0");
    const mes = (hoy.getMonth() + 1).toString().padStart(2, "0"); // Los meses comienzan en 0 (enero=0, febrero=1, etc.)
    const anio = hoy.getFullYear();
  
    return `${anio}-${mes}-${dia}`;
}
let operationObjet = {
    comercial: {
      title: "Comercial",
      completed: 0,
      fields: {
        orderNumber: "",
        supplierRefNumber: "",
        empresaRefNumber:"",
        empleadoBuyer:"",
        empleadoSeller:"",
        date: obtenerFechaActual(),
        empresa: {
          nombre: "",
          empresa: "",
          direccion: "",
          direccion2: "",
          vatNumber: "",
          bank: {
            beneficiaryBank: "",
            bankAdress: "",
            swiftCode: "",
            beneficiaryName: "",
            beneficiaryAccountNumber: "",
          },
        },
        seller: {
          nombre: "",
          direccion: "",
          direccion2: "",
          pais: "",
          cuit: "",
          refNumber: "",
        },
        buyer: {
          nombre: "",
          direccion: "",
          direccion2: "",
          vatNumber: "",
          refNumber: "",
        },
        productos: [
          {
            id: "",
            description: "",
            packing: "",
            quantity: "",
            unitPricePurchase: "",
            unitPriceSale: "",
            amountSale: "",
            amountPurchase: "",
          },
        ],
        totalPurchase: 0,
        totalSale: 0,
        totalWeight: 0,
        operationType:"",
        productionDate: "",
        shelfLife: "",
        destinationPort: "",
        destinationCountry: "",
        quantity: "",
        shipmentPeriod: "",
        deliveryTermsSale: "",
        deliveryTermsPurchase: "",
        paymentTermsSale: "",
        paymentTermsPurchase: "",
        exportTo: "",
      },
    },
    docs: {
      title: "Docs",
      completed: 0,
      fields: {
        date: obtenerFechaActual(),
        documentRequested: [],
        instruccionsToIssue: "",
        tipoContenedor:"",
        descriptionGoods:"",
        descriptionGoods2:"",
        temperature:"- 18 °C ",
        placeBLIssue:"",
        comentarios:"",
        comentariosSeller:"",
        terminosFlete:"PREPAID ABROAD",
        consignee:{
          nombre:"",
          direccion:"",
          direccion2:"",
          direccion3:"",
          country:"",
          taxId:""
        },
        notify:{
          nombre:"",
          direccion:"",
          direccion2:"",
          direccion3:"",
          country:"",
          taxId:""
        },
        consigneeRest:{
          nombre:"",
          direccion:"",
          direccion2:"",
          direccion3:"",
          country:"",
          taxId:""
        }
      },
    },
    logistica: { title: "Logistica", completed: 0,fields:{} },
    contableFinanciera: { title: "Contable financiera", completed: 0,fields:{} },
    status: "New",
  }

module.exports = operationObjet;