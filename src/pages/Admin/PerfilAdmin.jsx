import React, { useState, useEffect } from "react";
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Typography,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    IconButton,
    InputAdornment,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { jwtDecode } from 'jwt-decode';
import authService from '../../shared/service/AuthContext';
import userService from '../../shared/service/Users';
import Load from '../../shared/plugins/Load'


const MySwal = withReactContent(Swal);

export default function PerfilAdmin() {
    const [loading, setLoading] = useState(true);
    const [datos, setDatos] = useState({
        id_user: "",
        name: "",
        lastname: "",
        second_lastname: "",
        email: "",
        phone: "",
        id_rol: "",
        status: true,
    });

    const [formData, setFormData] = useState({
        name: "",
        lastname: "",
        second_lastname: "",
        email: "",
        phone: "",
        id_rol: "",
    });

    const [open, setOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('id_token');
                if (!token) {
                    console.error('Token de acceso no disponible.');
                    return;
                }

                const decodedToken = jwtDecode(token);
                const email = decodedToken.email;
                if (!email) {
                    console.error('No se pudo obtener el correo electrónico del token.');
                    return;
                }

                const userData = await authService.getUserByEmail(email);
                setDatos(userData);
                setFormData({
                    name: userData.name,
                    lastname: userData.lastname,
                    second_lastname: userData.second_lastname,
                    email: userData.email,
                    phone: userData.phone,
                    id_rol: userData.id_rol,
                });
                setLoading(false); // Stop loading once data is fetched
              } catch (error) {
                console.error('Error al obtener el perfil del usuario:', error);
                setLoading(false); // Stop loading if there's an error
              }
        };

        fetchUserProfile();
    }, []);

    const handleEditClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = async () => {
        setOpen(false);

        const result = await MySwal.fire({
            title: "Confirmar",
            text: "¿Estás seguro de que deseas guardar los cambios?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#1F2D40",
            confirmButtonText: "Sí, guardar",
            cancelButtonText: "Cancelar",
            cancelButtonColor: "#ff0000",
        });

        if (result.isConfirmed) {
            try {
                const updatedUser = {
                    id_user: datos.id_user,
                    ...formData,
                };
                await userService.updateUser(updatedUser);

                setDatos({
                    ...datos,
                    ...formData,
                });

                // Muestra un mensaje de éxito
                MySwal.fire({
                    title: "Guardado",
                    text: "Los datos han sido actualizados",
                    icon: "success",
                    confirmButtonColor: "#1F2D40",
                });
            } catch (error) {
                MySwal.fire({
                    title: "Error",
                    text: "No se pudieron guardar los cambios.",
                    icon: "error",
                    confirmButtonColor: "#1F2D40",
                });
            }
        }
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    if (loading) {
        return (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <Load />
          </Box>
        );
      }

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="50vh" // Full height of the viewport
        >
            <Card sx={{ width: "100%" }}>
                <CardHeader
                    title="Datos Personales"
                    sx={{
                        padding: 2,
                        backgroundColor: "#1F2D40",
                        color: "#fff",
                        fontWeight: "bold",
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                    action={
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "#fff",
                                color: "#000",
                                marginRight: 2,
                            }}
                            startIcon={<EditIcon />}
                            onClick={handleEditClick}
                        >
                            Editar Datos
                        </Button>
                    }
                />
                <Divider />
                <CardContent
                    sx={{
                        padding: 2,
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                    }}
                >
                    <Box display="flex" justifyContent="space-between">
                        <Typography
                            variant="body2"
                            sx={{ color: "text.secondary", fontWeight: "bold" }}
                        >
                            Nombre
                        </Typography>
                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
                            {datos.name} {datos.lastname} {datos.second_lastname}
                        </Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                        <Typography
                            variant="body2"
                            sx={{ color: "text.secondary", fontWeight: "bold" }}
                        >
                            Correo Electrónico
                        </Typography>
                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
                            {datos.email}
                        </Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                        <Typography
                            variant="body2"
                            sx={{ color: "text.secondary", fontWeight: "bold" }}
                        >
                            Teléfono
                        </Typography>
                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
                            {datos.phone}
                        </Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                        <Typography
                            variant="body2"
                            sx={{ color: "text.secondary", fontWeight: "bold" }}
                        >
                            Rol
                        </Typography>
                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
                            Administrador
                        </Typography>
                    </Box>
                </CardContent>

                {/* Dialog for Editing */}
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle
                        sx={{
                            backgroundColor: "#1F2D40",
                            color: "#fff",
                            marginBottom: 2,
                        }}
                    >
                        Editar Datos
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Nombre"
                            type="text"
                            fullWidth
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                        <TextField
                            margin="dense"
                            id="lastname"
                            label="Apellido Paterno"
                            type="text"
                            fullWidth
                            value={formData.lastname}
                            onChange={handleInputChange}
                        />
                        <TextField
                            margin="dense"
                            id="second_lastname"
                            label="Apellido Materno"
                            type="text"
                            fullWidth
                            value={formData.second_lastname}
                            onChange={handleInputChange}
                        />
                        <TextField
                            margin="dense"
                            id="email"
                            label="Correo Electrónico"
                            type="email"
                            fullWidth
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        <TextField
                            margin="dense"
                            id="phone"
                            label="Teléfono"
                            type="text"
                            fullWidth
                            value={formData.phone}
                            onChange={handleInputChange}
                        />
                        <TextField
                            margin="dense"
                            id="id_rol"
                            label="Rol"
                            type="text"
                            fullWidth
                            value={formData.id_rol}
                            onChange={handleInputChange}
                        />
                        <TextField
                            margin="dense"
                            id="password"
                            label="Contraseña"
                            type={showPassword ? "text" : "password"}
                            fullWidth
                            value={formData.password}
                            onChange={handleInputChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancelar
                        </Button>
                        <Button onClick={handleSave} color="primary">
                            Guardar
                        </Button>
                    </DialogActions>
                </Dialog>
            </Card>
        </Box>
    );
}
