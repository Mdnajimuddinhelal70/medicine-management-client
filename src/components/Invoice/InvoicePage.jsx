// import React from 'react';
// import { jsPDF } from 'jspdf';
// import 'jspdf-autotable'; // For generating tables in PDF
// import logo from '../../assets/research.png'; // Replace with your logo path

// const InvoicePage = ({ user, purchase }) => {
//   const generatePDF = () => {
//     const doc = new jsPDF();

//     // Add logo
//     doc.addImage(logo, 'PNG', 10, 10, 50, 20); // Adjust position and size

//     // Add user information
//     doc.setFontSize(12);
//     doc.text(`Name: ${user.name}`, 10, 40);
//     doc.text(`Email: ${user.email}`, 10, 50);

//     // Add purchase information
//     doc.autoTable({
//       startY: 60,
//       head: [['Item', 'Quantity', 'Price']],
//       body: purchase.items.map(item => [item?.name, item?.quantity, `$${item.price.toFixed(2)}`]),
//       foot: [['Total', '', `$${purchase.total.toFixed(2)}`]],
//     });

//     // Save the PDF
//     doc.save('invoice.pdf');
//   };

//   return (
//     <div className="invoice-page">
//       <h1>Invoice</h1>
//       <div className="invoice-header">
//         <img src={logo} alt="Website Logo" className="logo" />
//       </div>
//       <div className="invoice-info">
//         <h2>User Information</h2>
//         <p>Name: {user.name}</p>
//         <p>Email: {user.email}</p>
//       </div>
//       <div className="invoice-purchase">
//         <h2>Purchase Information</h2>
//         <table>
//           <thead>
//             <tr>
//               <th>Item</th>
//               <th>Quantity</th>
//               <th>Price</th>
//             </tr>
//           </thead>
//           <tbody>
//             {purchase.items.map((item, index) => (
//               <tr key={index}>
//                 <td>{item.name}</td>
//                 <td>{item.quantity}</td>
//                 <td>${item.price.toFixed(2)}</td>
//               </tr>
//             ))}
//           </tbody>
//           <tfoot>
//             <tr>
//               <td colSpan="2">Total</td>
//               <td>${purchase.total.toFixed(2)}</td>
//             </tr>
//           </tfoot>
//         </table>
//       </div>
//       <button onClick={generatePDF} className="btn-print">
//         Download as PDF
//       </button>
//     </div>
//   );
// };

// export default InvoicePage;


const InvoicePage = () => {
  return (
    <div>
      
    </div>
  );
};

export default InvoicePage;