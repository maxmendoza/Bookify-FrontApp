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
import bookService from '../../shared/service/Book';
import Load from '../../shared/plugins/Load';
import SwiperView from '../../shared/plugins/SwiperView';

export default function Home() {
  const [books,] = useState([]);
  const [, setActiveStep] = useState(0);
  const [actionBooks, setActionBooks] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const maxSteps = 3;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const actionBooksData = await bookService.getFantasy(); // Usa la función del servicio
        setActionBooks(actionBooksData);
      } catch (error) {
        console.error("Error fetching action books data: ", error);
      }finally{
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prevActiveStep) =>
        prevActiveStep === maxSteps - 1 ? 0 : prevActiveStep + 1
      );
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, [maxSteps]);

  const handleCardClick = (pdfUrl) => {
    navigate("/reading", { state: { pdfUrl } });
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
      <SwiperView/>
      <Typography variant="h4" fontWeight="bold" sx={{ mt: 4, color: '#81B622' }}>
        Fantasía
      </Typography>
      <Divider sx={{ marginBottom: "20px", borderBottomWidth: 4, borderBottomColor: '#81B622' }} />
      {actionBooks.length > 0 && (
        <Grid container spacing={2} sx={{ mt: 2, mb: 2 }}>
          {actionBooks.map((book, index) => (
            <Grid item xs={12} sm={6} md={2} key={index}>
              <Card
                sx={{ height: 400 }}
                onClick={() => handleCardClick(book.pdfUrl)}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={book.thumbnail} // Cambia 'src' a 'thumbnail'
                  alt={book.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="subtitle1" component="div">
                    {book.title}
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary">
                    {book.authors?.join(", ")} // Muestra los autores como una cadena separada por comas
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
