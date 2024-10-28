import React from "react";
import InvoiceContent from "../../components/order/invoice/InvoiceContent";
import TitleInvoice from "../../components/order/invoice/TitleInvoice";
import "./style.scss";
import ExportInvoice from "../../components/order/invoice/ExportInvoice";
import generatePDF from "react-to-pdf";

const options = {
  filename: "invoice.pdf",
  page: {
    margin: 20,
  },
};

const getTargetElement = () => document.getElementById("export-invoice");

const downloadPdf = () => generatePDF(getTargetElement, options);

const Invoice = () => {
  return (
    <>
      <div>
        <TitleInvoice />
        <ExportInvoice downloadPdf={downloadPdf} />
        <InvoiceContent />
      </div>
    </>
  );
};
export default Invoice;
