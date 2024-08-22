import {
  Button,
  TextField,
  IconButton,
  InputAdornment,
  Box,
} from "@mui/material";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Swal from "sweetalert2";
import authService from '../../shared/service/AuthContext'
import Logo from "../../assets/images/user.png";

export default function Register() {
  
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [secondLastname, setSecondLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState({});

  const validateEmail = (email) => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return regex.test(email);
  };

  const validateRequiredFields = () => {
    return email && name && lastname && phone;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateRequiredFields()) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Todos los campos son obligatorios, excepto el segundo apellido',
      });
      return;
    }

    if (!validateEmail(email)) {
      setError({ error: true, message: "Formato de email incorrecto" });
      return;
    }

    setError({ error: false, message: "" });
    const userDetails = {
      email,
      name,
      lastname,
      second_lastname: secondLastname,
      phone_number: phone,
      id_rol: 2,
      status: true
    };

    try {
      const response = await authService.signUp(userDetails);
      Swal.fire({
        position: "center",
        icon: "success",
        title: response.message,
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        navigate("/login");
      });
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error al registrar",
        text: error.message,
        showConfirmButton: true,
      });
    }
  };

  return (
    <Box display="flex" justifyContent="center">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 3,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.4)",
          borderRadius: 2,
          backgroundColor: "white",
          maxWidth: 550,
          width: "100%",
          marginTop: '50px',
        }}
      >
        <Box sx={{ flexGrow: 1, alignItems: "center" }}>
          <img src={Logo} alt="Logo" style={{ height: "80px" }} />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            width: "100%",
            gap: 2,
          }}
        >
          <TextField
            id="name"
            label="Nombre"
            type="text"
            variant="outlined"
            fullWidth
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="lastname"
            label="Apellido Paterno"
            type="text"
            variant="outlined"
            fullWidth
            required
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            width: "100%",
            gap: 2,
            mt: 2,
          }}
        >
          <TextField
            id="secondLastname"
            label="Apellido Materno"
            type="text"
            variant="outlined"
            fullWidth
            required
            value={secondLastname}
            onChange={(e) => setSecondLastname(e.target.value)}
          />
          <TextField
            id="email"
            label="Correo"
            type="email"
            variant="outlined"
            fullWidth
            required
            helperText={error.message}
            error={error.error}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            width: "100%",
            gap: 2,
            mt: 2,
          }}
        >
     <TextField
  id="phone"
  label="Teléfono"
  type="tel"
  variant="outlined"
  fullWidth
  required
  value={phone}
  onChange={(e) => {
    const input = e.target.value;
    // Permitir solo números y un máximo de 10 caracteres
    if (/^\d{0,10}$/.test(input)) {
      setPhone(input);
    }
  }}
/>
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
        >
          Registrarse
        </Button>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            mt: 2,
          }}
        >
          <NavLink to="/login" variant="body2">
            ¿Ya tienes una cuenta? Inicia sesión
          </NavLink>
        </Box>
      </Box>
    </Box>
  );
}