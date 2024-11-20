import React, { useRef } from "react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import logo from "../../assets/logo/logo.png"; // Ensure the logo path is correct

const OrderModal = ({ isOpen, onClose, order }) => {
  // If the modal is not open or there is no order data, don't render anything
  if (!isOpen || !order) return null;

  const printRef = useRef();

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      onClose();
    }
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");

    // Build the product details for the invoice
    const product = order.products[0]; // Assuming one product for this example

    const printContent = `
      <html>
        <head>
          <title>Order Invoice</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 40px;
              color: #333;
              margin: 0;
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
            }
            .header img {
              width: 100px;
            }
            .order-details {
              padding: 35px 0;
            }
            .order-details p {
              margin: 5px 0;
              line-height: 1.5;
            }
            .total {
              font-weight: bold;
              border-top: 1px solid #676767;
              padding-top: 10px;
              margin-top: 15px;
            }
            .thank-you {
              text-align: center;
              margin-top: 30px;
              font-size: 16px;
              color: #777;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <img src="${logo}" alt="Logo" />
            <h2>Order Invoice</h2>
          </div>
          <div class="order-details">
            <img src="${product.product.photos[0]}" alt="Product" style="width: 200px; height: 200px; object-fit: cover; margin-bottom: 20px;">
            <p><strong>Product Name:</strong> ${product.product.title}</p>
            <p><strong>Order Number:</strong> ${order._id.slice(-6)}</p>
            <p><strong>Status:</strong> ${order.orderStatus}</p>
            <p><strong>Purchase Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
            <p><strong>Quantity:</strong> ${product.quantity}</p>
            <p class="total"><strong>Total Price:</strong> ৳${order.totalCost}</p>
          </div>
          <div class="thank-you">
            <p>Thank you for your purchase!</p>
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();

    // Wait for the window to load before printing
    printWindow.onload = () => {
      printWindow.print();
      printWindow.close();
    };

    // Close the modal after printing
    onClose();
  };

  return (
    <div
      className="modal-overlay fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      onClick={handleOverlayClick}
    >
      <div
        className="bg-white p-8 w-[480px] rounded shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div ref={printRef} className="print-content">
          <div className="flex justify-center pt-3">
            <img
              className="w-[200px] h-[200px] object-cover mb-7"
              src={order.products[0]?.product.photos[0]}
              alt="Product"
            />
          </div>
          <h2 className="text-[24px] font-medium capitalize">
            {order.products[0]?.product.title}
          </h2>
          <p className="mt-2">
            <strong>Order Number:</strong> {order._id.slice(-6)}
          </p>
          <p className="mt-2">
            <strong>Purchase Date:</strong>{" "}
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
          <p className="mt-2">
            <strong>Status:</strong> {order.orderStatus}
          </p>
          <p className="mt-2 mb-4">
            <strong>Quantity:</strong> {order.products[0]?.quantity}
          </p>
          <p className="mt-2 border-t pt-3 flex justify-between">
            <strong>Total Price:</strong>{" "}
            <span>
              <FaBangladeshiTakaSign className="inline-block" />{" "}
              {order.totalCost}
            </span>
          </p>
        </div>

        <div className="flex justify-between mt-5">
          {order.orderStatus === "delivered" && (
            <button
              className="mt-4 px-4 py-1 rounded-md bg-primary text-white"
              onClick={handlePrint}
            >
              Print Invoice
            </button>
          )}

          <button
            className="mt-4 px-4 py-1 rounded-md bg-red-500 text-white"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
