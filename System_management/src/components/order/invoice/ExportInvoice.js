import React from "react";

const ExportInvoice = ({ downloadPdf }) => {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center">
        <div className="col-9 d-flex justify-content-end">
          <button className="btn-export" onClick={downloadPdf}>
            Export
          </button>
        </div>
      </div>
    </>
  );
};

export default ExportInvoice;
