import { useState, useEffect } from "react";
import {
  Box,
  Divider,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Parallax, Pagination, Navigation } from "swiper/modules";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import bookService from '../../shared/service/Book';
import SwiperView from "../../shared/plugins/SwiperView";
import Load from '../../shared/plugins/Load';

const MySwal = withReactContent(Swal);

const truncateText = (text, length) => {
  return text.length > length ? `${text.slice(0, length)}...` : text;
};

export default function HomeUser() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const data = await bookService.getAllBooks();
      setBooks(data);
    } catch (error) {
      console.error('Error al obtener los libros:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleCardClick = (book) => {
    MySwal.fire({
      html: (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
          }}
        >
          <Box sx={{ flex: 1, mr: 2 }}>
            <img
              src={book.image_url}
              alt={book.title}
              style={{ width: "100%", borderRadius: "10px" }}
            />
          </Box>

          <Box sx={{ flex: 2 }}>
            <Typography variant="h5" fontWeight="bold">
              {book.title}
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
              {book.gener.split(',').map((genre, index) => (
                <Box
                  key={index}
                  sx={{
                    backgroundColor:
                      genre === "Fantasy" ? "#FF5733" : "#FFC300",
                    borderRadius: "15px",
                    padding: "2px 8px",
                    fontSize: "0.8rem",
                    color: "#fff",
                  }}
                >
                  {genre}
                </Box>
              ))}
            </Box>
            <Typography variant="body2" sx={{ mt: 2 }}>
              {truncateText(book.description, 100)}
            </Typography>
            <button
              onClick={() => {
                MySwal.fire({
                  title: 'Descargando libro...',
                  text: 'Tu libro está en proceso de descarga.',
                  icon: 'info',
                  showConfirmButton: false,
                  timer: 2000, // Duración de la alerta en milisegundos
                  willClose: () => {
                    window.open(book.pdf_url, '_blank'); // Abre el PDF en una nueva pestaña
                  }
                });
              }}
              style={{
                marginTop: "20px",
                padding: "10px 40px",
                backgroundColor: "#28A745",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "1rem",
                fontWeight: "bold",
              }}
            >
              Leer
            </button>
          </Box>
        </Box>
      ),
      showConfirmButton: false,
      width: "600px",
      padding: "20px",
      background: "#fff",
      backdrop: "rgba(0,0,0,0.4)",
      customClass: {
        popup: "rounded-lg",
      },
    });
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Load />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: "auto", flexGrow: 1, mx: "auto", mt: 4 }}>
      <SwiperView />
      <Typography
          variant="h5"
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
      <Grid container spacing={2} sx={{ mt: 2, mb: 2 }}>
        {books.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book.id_book}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                borderRadius: "10px",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                height: "100%",
                overflow: "hidden",
              }}
              onClick={() => handleCardClick(book)}
            >
              <CardMedia
                component="img"
                image={book.image_url}
                alt={book.title}
                sx={{
                  width: "30%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "10px 0 0 10px",
                }}
              />
              <CardContent
                sx={{
                  flex: "1",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: "16px",
                }}
              >
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  component="div"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {truncateText(book.title, 25)}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    height: "60px",
                  }}
                >
                  {truncateText(book.description, 100)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}