import { Link as RouterLink } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Box,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Error404 from "../../assets/images/Error404.png";

export default function NotFound() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container // Tamaño máximo del contenedor
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: isSmallScreen ? "column-reverse" : "row",
      }}
    >
      {/* Texto de Error 404 */}
      <Box
        sx={{
          textAlign: "left",
          maxWidth: isSmallScreen ? "100%" : "50%",
          padding: "0 1rem",
        }}
      >
        <Typography
          variant="h1"
          color="textPrimary"
          sx={{ fontFamily: "Roboto", fontWeight: 900 }}
        >
          404
        </Typography>
        <Typography
          variant="h5"
          color="textSecondary"
          paragraph
          sx={{ fontFamily: "Roboto", fontWeight: 900 }}
        >
          ¡Oops! La página que estás buscando no fue encontrada.
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
        src={Error404}
        alt="Error 404"
        style={{
          width: isSmallScreen ? "80%" : "40%",
          height: "auto",
        }}
      />
    </Container>
  );
}
