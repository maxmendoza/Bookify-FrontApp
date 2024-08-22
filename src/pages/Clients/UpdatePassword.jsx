import { useState } from "react";
import {
  CssBaseline,
  Button,
  TextField,
  Box,
  Container,
  IconButton,
  InputAdornment,
  Typography,
  Modal,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import CheckIcon from "../../assets/images/verify.gif"
import authService from '../../shared/service/AuthContext'
import Swal from "sweetalert2";


export default function UpdatePassword() {
  const [passwords, setPasswords] = useState({
    email: "",
    confirmationCode: "",
    newPassword: "",
    repeatPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    confirmationCode: false,
    newPassword: false,
    repeatPassword: false,
  });
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, confirmationCode, newPassword, repeatPassword } = passwords;
  
    if (newPassword !== repeatPassword) {
      Swal.fire({
        icon: "warning",
        text: "Las contraseñas nuevas no coinciden.",
      });
      return;
    }
  
    setLoading(true);
    try {
      const data = await authService.confirmPassword(email, confirmationCode, repeatPassword);
      console.log("Respuesta del servidor:", data);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Contraseña Restablecida",
        text: data.message || "Contraseña restablecida correctamente.",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        navigate('/');
      });
    } catch (error) {
      console.error("Error al restablecer la contraseña:", error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error",
        text: error.message || "Ocurrió un error al restablecer la contraseña.",
        showConfirmButton: true,
      });
    } finally {
      setLoading(false);
    }
  };  

  const handlePasswordChange = (prop) => (event) => {
    setPasswords({ ...passwords, [prop]: event.target.value });
  };

  const handleClickShowPassword = (prop) => () => {
    setShowPasswords({ ...showPasswords, [prop]: !showPasswords[prop] });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "80px",
      }}
    >
      <Container maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "24px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.4)",
            borderRadius: "2px",
            backgroundColor: "white",
          }}
        >
          <Typography variant="h5">Actualizar Contraseña</Typography>
          <form noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="email"
              label="Correo Electrónico"
              type="email"
              id="email"
              autoComplete="email"
              value={passwords.email}
              onChange={handlePasswordChange("email")}
              sx={{ mb: 3 }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirmationCode"
              label="Código de Verificación"
              type={showPasswords.confirmationCode ? "text" : "password"}
              id="confirmationCode"
              autoComplete="off"
              value={passwords.confirmationCode}
              onChange={handlePasswordChange("confirmationCode")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword("confirmationCode")}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPasswords.confirmationCode ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="newPassword"
              label="Contraseña Nueva"
              type={showPasswords.newPassword ? "text" : "password"}
              id="newPassword"
              autoComplete="new-password"
              value={passwords.newPassword}
              onChange={handlePasswordChange("newPassword")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword("newPassword")}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPasswords.newPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="repeatPassword"
              label="Repetir Contraseña Nueva"
              type={showPasswords.repeatPassword ? "text" : "password"}
              id="repeatPassword"
              autoComplete="new-password"
              value={passwords.repeatPassword}
              onChange={handlePasswordChange("repeatPassword")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword("repeatPassword")}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPasswords.repeatPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 2,
              }}
            >
              <Button
                type="submit"
                variant="contained"
                color="success"
                sx={{ mr: 1 }}
                disabled={loading}
              >
                Actualizar
              </Button>
              <Button variant="contained" color="error">
                Cancelar
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
    </Box>
  );
}
