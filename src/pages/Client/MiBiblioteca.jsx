import React, { useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";

export default function MiBiblioteca() {
  const [books, setBooks] = useState([]);

  const addBook = (newBook) => {
    setBooks([...books, newBook]);
  };

  return (
    <Container>
      <Grid
        container
        spacing={3}
        style={{ padding: "20px", marginTop: "20px" }}
      >
        {books.map((book, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ maxWidth: 250 }}>
              <CardMedia
                component="img"
                height="180"
                image={book.image}
                alt={book.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {book.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {book.category}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {book.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" variant="contained" color="success">
                  Leer
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* Button to add a new book (for demonstration) */}
      <Button
        variant="contained"
        color="primary"
        onClick={() =>
          addBook({
            title: "Nuevo Libro",
            category: "Categoría",
            description: "Descripción del nuevo libro",
            image: "URL_de_la_imagen",
          })
        }
      >
        Agregar Libro
      </Button>
    </Container>
  );
}
