import React, { useState, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import bookService from '../../shared/service/Book';
import Load from '../../shared/plugins/Load';

const SearchBar = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  display: "flex",
  alignItems: "center",
  border: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "100%",
      "&:focus": {
        width: "100%",
      },
    },
  },
}));

export default function SearchComponent() {
  const [query, setQuery] = useState("");
  const [allBooks, setAllBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const books = await bookService.getBooksGoogle();
        setAllBooks(books);
        setFilteredBooks(books);
      } catch (error) {
        console.error('Error al obtener libros:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se pudieron obtener los libros.',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleSearch = () => {
    if (query) {
      const result = allBooks.filter(book =>
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        (book.description || "").toLowerCase().includes(query.toLowerCase())
      );
      setFilteredBooks(result);
    } else {
      setFilteredBooks(allBooks);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const truncateText = (text, length) => {
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  const showAlert = (book) => {
    Swal.fire({
      width: "50%",
      html: `
        <div style="display: flex; align-items: center;">
          <img src="${book.thumbnail}" alt="${book.title}" style="width: 200px; height: 300px; margin-right: 20px;" />
          <div style="flex: 1;">
            <h2>${book.title}</h2>
            <p>${book.description || "No description available."}</p>
          </div>
        </div>
      `,
      showConfirmButton: true,
      confirmButtonText: "Leer",
      confirmButtonColor: '#6A4000',
    })
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Load />
      </Box>
    );
  }


  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <SearchBar>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <IconButton onClick={handleSearch} color="inherit">
          <SearchIcon />
        </IconButton>
      </SearchBar>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {filteredBooks.map((book, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{ display: "flex", cursor: "pointer" }}
              onClick={() => showAlert(book)}
            >
              <CardMedia
                component="img"
                sx={{ width: 150 }}
                image={book.thumbnail}
                alt={book.title}
              />
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {truncateText(book.title, 20)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {truncateText(book.description, 100)}
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}