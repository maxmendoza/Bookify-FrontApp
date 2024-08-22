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
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../AuthContext";

import NavListDrawer from "./NavListDrawer";

export default function NavBar({ }) {
    const [open, setOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        navigate(`/search?q=${searchQuery}`);
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
                                to="/"
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
                                to="/Home"
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
                                    Libros
                                </Typography>
                            </NavLink>
                            <NavLink
                                to="/catalogue"
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
                                    Catálogo
                                </Typography>
                            </NavLink>
                        </Box>
                    </Box>
                    <Box sx={{ display: { xs: "none", sm: "block" } }}>
                        <Button
                            color="inherit"
                            component={NavLink}
                            to="/login"
                            startIcon={<AccountCircleIcon />}
                        >
                            Mi cuenta
                        </Button>
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