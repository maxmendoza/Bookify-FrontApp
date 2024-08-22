import { useState } from "react";
import {
  AppBar,
  Drawer,
  Toolbar,
  IconButton,
  Button,
  Typography,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { NavLink, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAuth } from "../../../AuthContext";
import NavListDrawer from "./NavListDrawer";
import Swal from "sweetalert2"; 


export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const { logout } = useAuth();  

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Cerrando sesión",
      text: "Se está cerrando la sesión...",
      icon: "info",
      showConfirmButton: false, // Oculta el botón de confirmación
      timer: 2000, // Cierra la alerta después de 2 segundos
      didClose: () => {
        logout(); 
        navigate('/login'); 
      }
    });
  };


  return (
    <>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#1F2D40", color: "#FFFF" }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            size="large"
            onClick={() => setOpen(true)}
            sx={{ display: { xs: "flex", sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
            <Box>
              <Button
                color="inherit"
                component={NavLink}
                sx={{
                  mr: 2,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ cursor: "pointer", textAlign: "center" }}
                >
                  Bookify
                </Typography>
              </Button>
            </Box>
            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <NavLink
                to="client/user"
                style={({ isActive }) => ({
                  marginRight: "16px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textDecoration: "none",
                  borderBottom: isActive ? "4px solid" : "none",
                  color: "inherit",
                })}
              >
                <Typography
                  variant="h7"
                  sx={{ cursor: "pointer", textAlign: "center" }}
                >
                  Biblioteca
                </Typography>
              </NavLink>
              <NavLink
                to="client/search"
                style={({ isActive }) => ({
                  marginRight: "16px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textDecoration: "none",
                  borderBottom: isActive ? "4px solid" : "none",
                  color: "inherit",
                })}
              >
                <Typography
                  variant="h7"
                  sx={{ cursor: "pointer", textAlign: "center" }}
                >
                  Buscar
                </Typography>
              </NavLink>
              <NavLink
                to="client/profile"
                style={({ isActive }) => ({
                  marginRight: "16px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textDecoration: "none",
                  borderBottom: isActive ? "4px solid" : "none",
                  color: "inherit",
                })}
              >
                <Typography
                  variant="h7"
                  sx={{ cursor: "pointer", textAlign: "center" }}
                >
                  Perfil
                </Typography>
              </NavLink>
            </Box>
          </Box>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Button
              color="inherit"
              onClick={handleMenuOpen}
              startIcon={<AccountCircleIcon />}
            >
              Mi cuenta
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        open={open}
        anchor="left"
        onClose={() => setOpen(false)}
        sx={{ display: { xs: "flex", sm: "none" } }}
      >
        <Box>
          <Card
            sx={{
              backgroundColor: "#f0f0f0",
              boxShadow: "none",
              textAlign: "center",
            }}
          >
            <CardContent>
              <Typography variant="h5" color="textPrimary" fontWeight="bold">
                BOOKIFY
              </Typography>
            </CardContent>
          </Card>
          <TextField
            variant="outlined"
            placeholder="Search..."
            size="small"
            sx={{ mt: 2, ml: 2, width: "85%" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <NavListDrawer NavLink={NavLink} setOpen={setOpen} />
      </Drawer>
    </>
  );
}
