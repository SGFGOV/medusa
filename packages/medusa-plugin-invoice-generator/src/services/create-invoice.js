const fs = require("fs");
const PDFDocument = require("pdfkit");

function createInvoice(invoice, path) {
  let doc = new PDFDocument({ size: "A4", margin: 50 });

  generateHeader(doc,invoice);
  generateCustomerInformation(doc, invoice);
  generateInvoiceTable(doc, invoice);
  generateFooter(doc,invoice);

  doc.end();
  doc.pipe(fs.createWriteStream(path));
}

function generateHeader(doc,invoice) {
  doc
    .image(invoice.logo, 50, 45, { width: 50 })
    .fillColor("#444444")
    .fontSize(20)
    .text(invoice.seller_name, 110, 57)
    .fontSize(10)
    .text(invoice.seller_name, 200, 50, { align: "right" })
    .text(invoice.seller_address_line_1, 200, 65, { align: "right" })
    .text(invoice.seller_address_line_2, 200, 80, { align: "right" })
    .text(invoice.seller_GST, 200, 95, { align: "right" })
    .moveDown();
}

function generateCustomerInformation(doc, invoice) {
  doc
    .fillColor("#444444")
    .fontSize(20)
    .text(invoice.type, 50, 160);

  generateHr(doc, 185);

  const customerInformationTop = 200;
  const line_spacing = 15;

  doc
    .fontSize(10)
    .text("Invoice Number:", 50, customerInformationTop)
    .font("Helvetica-Bold")
    .text(invoice.invoice_nr, 150, customerInformationTop)
    .font("Helvetica")
    .text(invoice.order_nr, 150, customerInformationTop+line_spacing)
    .text(invoice.order_id, 150, customerInformationTop+line_spacing)
    .text("Invoice Date:", 50, customerInformationTop + line_spacing*2)
    .text(formatDate(invoice.date), 150, customerInformationTop + line_spacing*2)
    .text("Balance Due:", 50, customerInformationTop + line_spacing*3)
    .text(
      formatCurrency(invoice.subtotal - invoice.paid),
      150,
      customerInformationTop + line_spacing*3
    )

    .font("Helvetica-Bold")
    .text(invoice.billing.name, 300, customerInformationTop)
    .font("Helvetica")
    .text(invoice.billing.address, 300, customerInformationTop + line_spacing)
    .text(
      invoice.billing.city +
        ", " +
        invoice.billing.state +
        ", " +
        invoice.billing.country,
      300,
      customerInformationTop + line_spacing*2
    )
    .font("Helvetica-Bold")
    .text("GSTIN", 300, customerInformationTop+ line_spacing *3)
    .font("Helvetica")
    .text(invoice.gstin, 300, customerInformationTop+ line_spacing *3)
    .text(invoice.shipping.address, 300, customerInformationTop + line_spacing*4)
    .font("Helvetica-Bold")
    .text(invoice.shipping.name, 300, customerInformationTop+ line_spacing*5)
    .font("Helvetica")
    .text(invoice.shipping.address, 300, customerInformationTop + line_spacing*6)
    .text(
      invoice.shipping.city +
        ", " +
        invoice.shipping.state +
        ", " +
        invoice.shipping.country,
      300,
      customerInformationTop +line_spacing *4
    )
    
    .moveDown();

  generateHr(doc, 252);
}

function generateInvoiceTable(doc, invoice) {
  let i;
  const invoiceTableTop = 330;

  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    invoiceTableTop,
    "Item",
    "Description",
    "Unit Cost",
    "Quantity",
    "Line Total"
  );
  generateHr(doc, invoiceTableTop + 20);
  doc.font("Helvetica");

  for (i = 0; i < invoice.items.length; i++) {
    const item = invoice.items[i];
    const position = invoiceTableTop + (i + 1) * 30;
    generateTableRow(
      doc,
      position,
      item.item,
      item.description,
      formatCurrency(item.amount / item.quantity),
      item.quantity,
      formatCurrency(item.amount,invoice.currency??"INR")
    );

    generateHr(doc, position + 20);
  }

  const subtotalPosition = invoiceTableTop + (i + 1) * 30;
  generateTableRow(
    doc,
    subtotalPosition,
    "",
    "",
    "Subtotal",
    "",
    formatCurrency(invoice.subtotal)
  );

  const paidToDatePosition = subtotalPosition + 20;
  generateTableRow(
    doc,
    paidToDatePosition,
    "",
    "",
    "Paid To Date",
    "",
    formatCurrency(invoice.paid)
  );

  const duePosition = paidToDatePosition + 25;
  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    duePosition,
    "",
    "",
    "Balance Due",
    "",
    formatCurrency(invoice.subtotal - invoice.paid)
  );
  doc.font("Helvetica");
}

function generateFooter(doc,invoice) {
  doc
    .fontSize(10)
    .text(
      invoce.footertext,
      50,
      780,
      { align: "center", width: 500 }
    );
}

function generateTableRow(
  doc,
  y,
  item,
  description,
  unitCost,
  quantity,
  lineTotal
) {
  doc
    .fontSize(10)
    .text(item, 50, y)
    .text(description, 150, y)
    .text(unitCost, 280, y, { width: 90, align: "right" })
    .text(quantity, 370, y, { width: 90, align: "right" })
    .text(lineTotal, 0, y, { align: "right" });
}

function generateHr(doc, invoice) {
  doc
    .strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(50, y)
    .lineTo(550, y)
    .stroke();
}

function formatCurrency(cents,currency) {
    if (currency!="YEN")
    {
    return `${currency}  ${(cents / 100).toFixed(2)}`;
    }
else
    {

        return `${currency} ${cents}`
    }
}

function formatDate(date) 
{
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return day + "/" + month + "/" + year;
}

module.exports = {
  createInvoice
};