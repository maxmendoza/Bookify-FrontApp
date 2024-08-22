import React, { useEffect, useState } from "react";
import {
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

const MySwal = withReactContent(Swal);

export default function MoreBooks() {
  const [romanticBooks, setRomanticBooks] = useState([]);
  const [fictionBooks, setFictionBooks] = useState([]);
  const [dramaBooks, setDramaBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const romanticBooks = await bookService.getRomantic();
        const fictionBooks = await bookService.getFiction();
        const dramaBooks = await bookService.getDrama();

        setRomanticBooks(romanticBooks);
        setFictionBooks(fictionBooks);
        setDramaBooks(dramaBooks);
      } catch (error) {
        console.error("Error al obtener los libros:", error);
      }
    };

    fetchBooks();
  }, []);

  const handlePreview = (book) => {
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
          {book.thumbnail && (
            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={book.thumbnail}
                alt={book.title}
                style={{ width: "200px", height: "300", objectFit: "cover" }}
              />
            </Box>
          )}
        </Box>
      ),
      scrollbarPadding: false,
    });
  };

  const renderBooks = (books, category) => (
    <Box sx={{ marginBottom: "40px" }}>
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{ color: "#F05600" }}
      >
        {category}
      </Typography>
      <Divider
        sx={{
          marginBottom: "20px",
          borderBottomWidth: 4,
          borderBottomColor: "#F05600",
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
                height: "320px",
                width: "250px",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                transition: "box-shadow 0.3s ease-in-out",
                "&:hover": {
                  boxShadow: "0px 8px 40px rgba(0, 0, 0, 0.2)",
                },
              }}
              onClick={() => handlePreview(book)}
            >
              <CardMedia
                component="img"
                height="140"
                image={book.thumbnail}
                alt={book.title}
                sx={{ objectFit: "cover" }}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h6" // Cambiado a h6 para aumentar el tamaño
                  component="div"
                  sx={{ fontWeight: "bold",}} // Negritas y alineación
                >
                  {book.title}
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
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );

  return (
    <Box sx={{ padding: "20px" }}>
      {renderBooks(romanticBooks, "Romance")}
      {renderBooks(fictionBooks, "Fiction")}
      {renderBooks(dramaBooks, "Drama")}
    </Box>
  );
}
