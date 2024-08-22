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
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import authService from "../../shared/service/AuthContext";

export default function ChancePassword() {
    const [passwords, setPasswords] = useState({
        email: "",
        temporaryPassword: "",
        newPassword: "",
        repeatPassword: "",
    });
    const [showPasswords, setShowPasswords] = useState({
        temporaryPassword: false,
        newPassword: false,
        repeatPassword: false,
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { email, temporaryPassword, newPassword, repeatPassword } = passwords;

        if (newPassword !== repeatPassword) {
            Swal.fire({
                icon: "warning",
                text: "Las contraseñas nuevas no coinciden.",
            });
            return;
        }

        setLoading(true);
        try {
            const data = await authService.changeTemporaryPassword(
                email,
                temporaryPassword,
                repeatPassword
            );
            console.log("Respuesta del servidor:", data);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Contraseña Restablecida",
                text: data.message || "Contraseña restablecida correctamente.",
                showConfirmButton: false,
                timer: 1500,
            }).then(() => {
                navigate("/");
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
                flexDirection: "column",
                alignItems: "center",
                marginTop: '50px',
                padding: "24px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.4)",
                borderRadius: "2px",
            }}
        >
            <Typography variant="h5">Actualizar Contraseña</Typography>
            <form noValidate onSubmit={handleSubmit}>
                <Box sx={{ display: "flex", gap: 2 }}>
                    <Box>
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
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="temporaryPassword"
                            label="Contraseña Temporal"
                            type={showPasswords.confirmationCode ? "text" : "password"}
                            id="temporaryPassword"
                            autoComplete="off"
                            value={passwords.confirmationCode}
                            onChange={handlePasswordChange("temporaryPassword")}
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
                        />
                    </Box>
                    <Box>
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
                        />
                    </Box>
                </Box>
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
    );
}