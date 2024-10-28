import React from "react";
import invoiceImage from "../../../assets/img/profile-cover.jpg";
const InvoiceContent = () => {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center mt-3">
        <div className="col-xl-9 col-12 invoice p-5">
          <div id="">
            <div className="d-flex invoice_title">
              <div className="d-flex justify-content-center align-items-center">
                <img src={invoiceImage} />
              </div>
              <div>
                <h4>MINT ADMIN.</h4>
                <div>112 Washington Square</div>
                <div>New York, USA</div>
                <div style={{ color: "#111827" }} className="fw-bold">
                  company@themesberg.com
                </div>
              </div>
            </div>
            <div className="invoice_content mt-5">
              <div className="invoice_content_header">
                <h1>Invoice #300500</h1> <h3>Paid</h3>
              </div>
              <div className="invoice_content_info mt-5">
                <div className="col-8">
                  <h4>Client Information:</h4>
                  <div>Henry M. Pike</div>
                  <div>Themesberg LLC</div>
                  <div>311 West Mechanic Lane Middletown, NY 10940</div>
                  <div style={{ color: "#111827" }} className="fw-bold">
                    name@company.com
                  </div>
                </div>
                <div className="justify-content-between d-flex col-3 me-6">
                  <div>
                    <div className="fw-bolder">Invoice No.</div>
                    <div className="fw-bolder">Date issued:</div>
                    <div className="fw-bolder">Due Date:</div>
                  </div>
                  <div>
                    <div>300500</div>
                    <div>28/09/2023</div>
                    <div>28/10/2023</div>
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">ITEM</th>
                      <th scope="col">DESCRIPTION</th>
                      <th scope="col">PRICE</th>
                      <th scope="col">QTY</th>
                      <th scope="col">TOTAL</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Origin License</td>
                      <td>Extended License</td>
                      <td>@$999,00</td>
                      <td>1</td>
                      <td>$999.00</td>
                    </tr>
                    <tr>
                      <td>Custom Services</td>
                      <td>Instalation and Customization (cost per hour)</td>
                      <td>$150,00</td>
                      <td>20</td>
                      <td>$3000.00</td>
                    </tr>
                    <tr>
                      <td>Hosting</td>
                      <td>1 year subcription</td>
                      <td>$499,00</td>
                      <td>1</td>
                      <td>$499.00</td>
                    </tr>
                    <tr>
                      <td>Hosting</td>
                      <td>1 year subcription</td>
                      <td>$499,00</td>
                      <td>1</td>
                      <td>$499.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="d-flex justify-content-end mt-5">
                <div className="col-4">
                  <table class="table-clear table">
                    <tbody>
                      <tr>
                        <td className="text-right px-5">
                          <strong className="fw-bolder">Subtotal</strong>
                        </td>
                        <td className="text-left">$8497.00</td>
                      </tr>
                      <tr>
                        <td className="text-right px-5">
                          <strong className="fw-bolder">Discount (20%)</strong>
                        </td>
                        <td className="text-left">$1699.40</td>
                      </tr>
                      <tr>
                        <td className="text-right px-5">
                          <strong className="fw-bolder">VAT (10%) </strong>
                        </td>
                        <td className="text-left">$679.76</td>
                      </tr>
                      <tr>
                        <td className="text-right px-5">
                          <strong className="fw-bolder">Total</strong>
                        </td>
                        <td className="text-left">$7477.36</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div>
                <h4 className="fw-bolder">Payments to:</h4>
                <div>payment@volt.com</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default InvoiceContent;
