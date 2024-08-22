import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import bookService from '../../shared/service/Book';

// Configuración del worker para pdfjs
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function Reading() {
  const location = useLocation();
  const { bookId } = location.state || {}; // Obtener el ID del libro desde el estado
  const [book, setBook] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);

  // Obtener el libro por ID cuando el componente se monta o el bookId cambia
  useEffect(() => {
    const fetchBook = async () => {
      try {
        if (bookId) {
          const response = await bookService.getBookById(bookId);
          setBook(response);
          console.log('Book buscado', response); // Debug: Verificar la respuesta
        }
      } catch (error) {
        console.error("Error al obtener el libro:", error);
      }
    };

    fetchBook();
  }, [bookId]);

  // Funciones para hacer zoom
  const zoomIn = () => {
    setScale(prevScale => prevScale + 0.1);
  };

  const zoomOut = () => {
    setScale(prevScale => Math.max(0.1, prevScale - 0.1)); // Asegurar que el zoom no sea negativo o demasiado pequeño
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          padding: "10px",
          border: "2px solid #1F2D40", // Asegurarse de tener un borde definido
          backgroundColor: "#1F2D40",
          color: "#fff"
        }}
      >
        <div style={{ fontSize: "24px", fontWeight: "bold" }}>Bookfy</div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <button
            onClick={zoomIn}
            style={{
              margin: "0 5px",
              padding: "5px 10px",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            A+
          </button>
          <button
            onClick={zoomOut}
            style={{
              margin: "0 5px",
              padding: "5px 10px",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            A-
          </button>
        </div>
      </div>
      <div
        style={{
          width: "80%",
          height: "80vh",
          overflow: "auto",
          border: "2px solid #1F2D40",
          marginTop: "20px",
          padding: "10px",
        }}
      >
        {book && book.pdf_url ? (
          <Document
            file={book.pdf_url}
            onLoadSuccess={() => setPageNumber(1)}
            onLoadError={error => {
              console.error("Error al cargar el PDF:", error);
              setError("Error al cargar el PDF. Intenta de nuevo más tarde."); // Establecer mensaje de error
            }}
          >
            <Page pageNumber={pageNumber} scale={scale} />
          </Document>
        ) : (
          <div>No PDF available for this book.</div>
        )}
      </div>
    </div>
  );
}
