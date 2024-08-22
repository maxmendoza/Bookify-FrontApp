import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import bookService from "../../shared/service/Book";
import Load from "../../shared/plugins/Load";
import MoreBooks from "./MoreBooks";

const MySwal = withReactContent(Swal);

export default function Catalogue() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await bookService.getAllBooks();
        if (response.data && Array.isArray(response.data)) {
          setBooks(response.data);
        } else {
          console.error("Formato de datos inesperado:", response);
        }
      } catch (error) {
        console.error("Error al obtener los libros:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Load />
      </Box>
    );
  }

  const handlePreview = (book) => {
    // Limitar la longitud de la descripción/sinopsis
    const maxLength = 500;
    const truncatedDescription =
      book.description && book.description.length > maxLength
        ? book.description.substring(0, maxLength) + "..."
        : book.description;

    MySwal.fire({
      title: book.title,
      width: "850px",
      html: (
        <Box sx={{ display: "flex", gap: "30px" }}>
          {/* Información del libro */}
          <Box
            sx={{
              flex: 2,
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <Typography variant="body1" sx={{ textAlign: "justify" }}>
              {truncatedDescription || "No hay descripción disponible."}
            </Typography>
            <Typography variant="body2" sx={{ textAlign: "justify" }}>
              <strong>Autor:</strong>{" "}
              {book.authors ? book.authors.join(", ") : "Desconocido"}
            </Typography>
            <Typography variant="body2" sx={{ textAlign: "justify" }}>
              <strong>Publicador:</strong> {book.publisher || "Desconocido"}
            </Typography>
            <Typography variant="body2" sx={{ textAlign: "justify" }}>
              <strong>Año:</strong> {book.publishedDate || "Desconocido"}
            </Typography>
          </Box>
          {/* Imagen de la portada */}
          {book.image_url && (
            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={book.image_url}
                alt={book.title}
                style={{ width: "200px", height: "300px", objectFit: "cover" }}
              />
            </Box>
          )}
        </Box>
      ),
      scrollbarPadding: false,
    });
  };

  return (
    <>
      <Box sx={{ padding: "20px" }}>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{ color: "#17A2B8" }}
        >
          Recién agregados
        </Typography>
        <Divider
          sx={{
            marginBottom: "20px",
            borderBottomWidth: 5,
            borderBottomColor: "#17A2B8",
          }}
        />
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {books.map((book, index) => (
            <Box
              key={index}
              sx={{
                flex: "1 1 200px",
                boxSizing: "border-box",
                maxWidth: "300px",
              }}
            >
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "300px",
                  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", // Sombra
                  transition: "box-shadow 0.3s ease-in-out",
                  "&:hover": {
                    boxShadow: "0px 8px 40px rgba(0, 0, 0, 0.2)", // Sombra más intensa al pasar el mouse
                  },
                }}
                onClick={() => handlePreview(book)}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={book.image_url}
                  alt={book.title}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h6" // Cambiado a h6 para aumentar el tamaño
                    component="div"
                    sx={{ fontWeight: "bold", }} // Negritas y alineación
                  >
                    {book.title}
                  </Typography>
                  <Typography variant="body2" sx={{ textAlign: "justify" }}>
                    <strong>Autor:</strong> {book.author || "Desconocido"}
                  </Typography>
                  <Typography variant="body2" sx={{ textAlign: "justify" }}>
                    <strong>Publicador:</strong>{" "}
                    {book.publisher || "Desconocido"}
                  </Typography>
                  <Typography variant="body2" sx={{ textAlign: "justify" }}>
                    <strong>Año:</strong> {book.year || "Desconocido"}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Box>
      <MoreBooks />
    </>
  );
}
