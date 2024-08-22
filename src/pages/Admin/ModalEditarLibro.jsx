import React, { useState, useEffect } from "react";
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Box,
    Typography,
    Input,
    useMediaQuery,
    useTheme,
} from "@mui/material";

const ModalEditarLibro = ({ open, onClose, onSubmit, bookToEdit }) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [gener, setGener] = useState("");
    const [year, setYear] = useState("");
    const [description, setDescription] = useState("");
    const [synopsis, setSynopsis] = useState("");
    const [status, setStatus] = useState(true);
    const [coverImage, setCoverImage] = useState(null);
    const [pdfFile, setPdfFile] = useState(null);

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        if (bookToEdit) {
            setTitle(bookToEdit.title);
            setAuthor(bookToEdit.author);
            setGener(bookToEdit.gener);
            setYear(bookToEdit.year);
            setDescription(bookToEdit.description);
            setSynopsis(bookToEdit.synopsis);
            setStatus(bookToEdit.status === 1);
            setCoverImage(bookToEdit.coverImage);
            setPdfFile(bookToEdit.pdfFile);
        }
    }, [bookToEdit]);

    const handleFileChange = (event, setFile) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFile(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        const updatedBookData = {
            id_book: bookToEdit.id_book,
            title,
            author,
            gener,
            year,
            description,
            synopsis,
            status,
            coverImage,
            pdfFile,
        };
        onSubmit(updatedBookData);
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" fullScreen={fullScreen}>
            <DialogTitle>Editar Libro</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Título"
                    type="text"
                    fullWidth
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Autor"
                    type="text"
                    fullWidth
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Género"
                    type="text"
                    fullWidth
                    value={gener}
                    onChange={(e) => setGener(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Año"
                    type="number"
                    fullWidth
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Descripción"
                    type="text"
                    fullWidth
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Sinopsis"
                    type="text"
                    fullWidth
                    value={synopsis}
                    onChange={(e) => setSynopsis(e.target.value)}
                />
                <Box marginTop={2}>
                    <Typography variant="body1">Estado</Typography>
                    <Button
                        variant={status ? "contained" : "outlined"}
                        color="success"
                        onClick={() => setStatus(true)}
                    >
                        Activo
                    </Button>
                    <Button
                        variant={!status ? "contained" : "outlined"}
                        color="error"
                        onClick={() => setStatus(false)}
                    >
                        Inactivo
                    </Button>
                </Box>
                <Box marginTop={2}>
                    <Typography variant="body1">Imagen de portada</Typography>
                    <Input
                        type="file"
                        inputProps={{ accept: "image/*" }}
                        onChange={(e) => handleFileChange(e, setCoverImage)}
                    />
                </Box>
                <Box marginTop={2}>
                    <Typography variant="body1">Archivo PDF</Typography>
                    <Input
                        type="file"
                        inputProps={{ accept: "application/pdf" }}
                        onChange={(e) => handleFileChange(e, setPdfFile)}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancelar
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Guardar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalEditarLibro;
