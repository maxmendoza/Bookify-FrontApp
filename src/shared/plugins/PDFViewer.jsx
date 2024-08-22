import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

const PDFViewer = () => {
  const pdfUrl = 'https://res.cloudinary.com/db5zuwucd/image/upload/v1724157933/pdfbook/gw34xkdlrpqw2s0cigic.pdf';
  const fileName = 'libro.pdf';

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = fileName; // Nombre del archivo cuando se descargue
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <h1>Descargar PDF</h1>
      <button onClick={handleDownload}>
        Descargar PDF
      </button>
    </div>
  );
};

export default PDFViewer;
