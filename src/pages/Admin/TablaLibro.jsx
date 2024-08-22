import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Modal,
  Box,
  TextField,
  Button,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import bookService from '../../shared/service/Book';
import Load from '../../shared/plugins/Load';
import Swal from 'sweetalert2'; 


const TablaLibros = () => {
  const [books, setBooks] = useState([]);
  const [isModalAgregarOpen, setIsModalAgregarOpen] = useState(false);
  const [isModalEditarOpen, setIsModalEditarOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(true);

  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    gener: '',
    year: '',
    description: '',
    synopsis: '',
    status: true,
    image: '',
    pdf: '', 
  });

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
  

  const handleAdd = () => {
    setBookData({
      title: '',
      author: '',
      gener: '',
      year: '',
      description: '',
      synopsis: '',
      status: true,
      image: '',
      pdf: '',
    });
    setIsModalAgregarOpen(true);
  };

  const handleEdit = (book) => {
    setSelectedBook(book);
    setBookData({
      title: book.title,
      author: book.author,
      gener: book.gener,
      year: book.year,
      description: book.description,
      synopsis: book.synopsis,
      status: book.status,
      image: book.image,
      pdf: book.pdf,
    });
    setIsModalEditarOpen(true);
  };

  const handleCloseAgregar = () => {
    setIsModalAgregarOpen(false);
  };

  const handleCloseEditar = () => {
    setIsModalEditarOpen(false);
    setSelectedBook(null); // Limpiar el libro seleccionado
  };

  const handleFileChange = async (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBookData((prevData) => ({
          ...prevData,
          [name]: reader.result.split(',')[1], // Convertir a base64
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitAgregar = async () => {
    try {
      setLoading(true);
      await bookService.createBook(bookData);
      Swal.fire('Libro agregado', 'El libro se ha agregado correctamente.', 'success');
      await fetchBooks();
      handleCloseAgregar();
    } catch (error) {
      console.error('Error al agregar el libro:', error);
      Swal.fire('Error', 'No se pudo agregar el libro.', 'error');
    } finally {
      setLoading(false);  
    }
  };

  const handleSubmitEditar = async () => {
    try {
      setLoading(true);  
      await bookService.updateBook({ ...bookData, id_book: selectedBook.id_book });
      Swal.fire('Libro actualizado', 'El libro se ha actualizado correctamente.', 'success');
      await fetchBooks(); 
      handleCloseEditar();
    } catch (error) {
      console.error('Error al actualizar el libro:', error);
      Swal.fire('Error', 'No se pudo actualizar el libro.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    return status ? 'green' : 'red';
  };


  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Load />
      </Box>
    );
  }

  return (
    <div>
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Título</TableCell>
                <TableCell>Autor</TableCell>
                <TableCell>Género</TableCell>
                <TableCell>Año</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Sinopsis</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {books.map((book) => (
                <TableRow key={book.id_book}>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.gener}</TableCell>
                  <TableCell>{book.year}</TableCell>
                  <TableCell>{book.description}</TableCell>
                  <TableCell>{book.synopsis}</TableCell>
                  <TableCell
                    sx={{ color: getStatusColor(book.status) }}
                  >
                    {book.status ? 'Activo' : 'Inactivo'}
                  </TableCell>                  <TableCell>
                    <Tooltip title="Editar">
                      <IconButton
                        color="primary"
                        onClick={() => handleEdit(book)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Tooltip title="Agregar Libro">
          <IconButton
            color="primary"
            onClick={handleAdd}
            style={{ position: 'fixed', bottom: 16, right: 16 }}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
      </Paper>

      {/* Modal Agregar Libro */}
      <Modal open={isModalAgregarOpen} onClose={handleCloseAgregar}>
        <Box
          sx={{
            width: 400,
            bgcolor: 'background.paper',
            p: 3,
            mx: 'auto',
            mt: 5,
            borderRadius: 2,
            boxShadow: 24,
          }}
        >
          <Typography variant="h6" component="h2">Agregar Libro</Typography>
          <TextField
            label="Título"
            name="title"
            value={bookData.title}
            onChange={(e) => setBookData({ ...bookData, title: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Autor"
            name="author"
            value={bookData.author}
            onChange={(e) => setBookData({ ...bookData, author: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Género"
            name="gener"
            value={bookData.gener}
            onChange={(e) => setBookData({ ...bookData, gener: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Año"
            name="year"
            value={bookData.year}
            onChange={(e) => setBookData({ ...bookData, year: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Descripción"
            name="description"
            value={bookData.description}
            onChange={(e) => setBookData({ ...bookData, description: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Sinopsis"
            name="synopsis"
            value={bookData.synopsis}
            onChange={(e) => setBookData({ ...bookData, synopsis: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Estado"
            name="status"
            type="checkbox"
            checked={bookData.status}
            onChange={() => setBookData((prevData) => ({
              ...prevData,
              status: !prevData.status,
            }))}
            margin="normal"
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
          />
          <input
            type="file"
            name="pdf"
            accept=".pdf"
            onChange={handleFileChange}
          />
          <Button variant="contained" color="primary" onClick={handleSubmitAgregar} fullWidth>
            Agregar
          </Button>
        </Box>
      </Modal>

      {/* Modal Editar Libro */}
      <Modal open={isModalEditarOpen} onClose={handleCloseEditar}>
        <Box
          sx={{
            width: 400,
            bgcolor: 'background.paper',
            p: 3,
            mx: 'auto',
            mt: 5,
            borderRadius: 2,
            boxShadow: 24,
          }}
        >
          <Typography variant="h6" component="h2">Editar Libro</Typography>
          <TextField
            label="Título"
            name="title"
            value={bookData.title}
            onChange={(e) => setBookData({ ...bookData, title: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Autor"
            name="author"
            value={bookData.author}
            onChange={(e) => setBookData({ ...bookData, author: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Género"
            name="gener"
            value={bookData.gener}
            onChange={(e) => setBookData({ ...bookData, gener: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Año"
            name="year"
            value={bookData.year}
            onChange={(e) => setBookData({ ...bookData, year: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Descripción"
            name="description"
            value={bookData.description}
            onChange={(e) => setBookData({ ...bookData, description: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Sinopsis"
            name="synopsis"
            value={bookData.synopsis}
            onChange={(e) => setBookData({ ...bookData, synopsis: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Estado"
            name="status"
            type="checkbox"
            checked={bookData.status}
            onChange={() => setBookData((prevData) => ({
              ...prevData,
              status: !prevData.status,
            }))}
            margin="normal"
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
          />
          <input
            type="file"
            name="pdf"
            accept=".pdf"
            onChange={handleFileChange}
          />
          <Button variant="contained" color="primary" onClick={handleSubmitEditar} fullWidth>
            Guardar
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default TablaLibros;
