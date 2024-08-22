import { Link as RouterLink } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Box,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import Error500 from "../../assets/images/Error500.png";

export default function ServerError() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: isSmallScreen ? "column-reverse" : "row",
      }}
    >
      {/* Texto de Error 500 */}
      <Box
        sx={{
          textAlign: "left",
          maxWidth: isSmallScreen ? "100%" : "50%",
        }}
      >
        <Typography
          variant="h1"
          color="textPrimary"
          // Estilo Roboto con peso 900 (Black)
          sx={{ fontFamily: "Roboto", fontWeight: 900 }}
        >
          500
        </Typography>
        <Typography
          variant="h5"
          color="textSecondary"
          paragraph
          // Estilo Roboto con peso 900 (Black)
          sx={{ fontFamily: "Roboto", fontWeight: 900 }}
        >
          ¡Oops! Algo salió mal en el servidor.
        </Typography>
        <Button
          component={RouterLink}
          to="/"
          variant="contained"
          color="primary"
        >
          Regresar a la página principal
        </Button>
      </Box>

      {/* Imagen a la derecha */}
      <img
        src={Error500}
        alt="Error 500"
        style={{
          width: isSmallScreen ? "80%" : "40%", // Ancho del 80% en pantallas pequeñas, 40% en pantallas grandes
          height: "auto", // Permite que la altura se ajuste automáticamente según el ancho
        }}
      />
    </Container>
  );
}
