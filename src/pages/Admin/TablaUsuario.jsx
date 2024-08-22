import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import userService from '../../shared/service/Users';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Load from '../../shared/plugins/Load';
import { jwtDecode } from 'jwt-decode';

const MySwal = withReactContent(Swal);

export default function TablaUsuario() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [authenticatedUserEmail, setAuthenticatedUserEmail] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("id_token");
        const decodedToken = jwtDecode(token);
        const email = decodedToken.email;
        if (!email) {
          console.error('No se pudo obtener el correo electrónico del token.');
          return;
        }
        setAuthenticatedUserEmail(email);

        const response = await userService.getAllUsers();
        if (response.data && Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          throw new Error('Los datos obtenidos no son un array');
        }
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
        MySwal.fire({
          title: 'Error',
          text: 'No se pudieron obtener los usuarios.',
          icon: 'error'
        });
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [newUser, setNewUser] = useState({
    email: "",
    phone_number: "",  // Correct field name
    name: "",
    lastname: "",
    second_lastname: "",
    id_rol: 1,
  });

  const handleClickOpenAdd = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAdd = () => {
    setOpenAddDialog(false);
  };

  const handleAddUser = async () => {
    setOpenAddDialog(false);

    MySwal.fire({
      title: "¿Estás seguro?",
      text: "Una vez agregado, el usuario no podrá ser editado fácilmente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1F2D40",
      cancelButtonColor: "#ff0000",
      confirmButtonText: "Sí, agregar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const addedUser = await userService.registerUser(newUser);
          setUsers([
            ...users,
            { ...addedUser, id_user: users.length + 1, status: true },
          ]);
          setNewUser({
            email: "",
            name: "",
            lastname: "",
            second_lastname: "",
            phone_number: "",  // Correct field name
            id_rol: 1,
          });

          MySwal.fire({
            title: "Usuario Agregado!",
            text: "El nuevo usuario ha sido agregado exitosamente.",
            icon: "success",
            confirmButtonColor: "#1F2D40",
          });
        } catch (error) {
          MySwal.fire({
            title: "Error",
            text: "Hubo un error al agregar el usuario.",
            icon: "error",
            confirmButtonColor: "#1F2D40",
          });
        }
      }
    });
  };

  const handleClickOpenEdit = (user) => {
    setCurrentUser(user);
    setOpenEditDialog(true);
  };

  const handleCloseEdit = () => {
    setOpenEditDialog(false);
  };

  const handleUpdateUser = async () => {
    MySwal.fire({
      title: "¿Estás seguro?",
      text: "El usuario será actualizado con los nuevos datos.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1F2D40",
      cancelButtonColor: "#ff0000",
      confirmButtonText: "Sí, actualizar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await userService.updateUser(currentUser);
          setUsers(
            users.map((user) =>
              user.id_user === currentUser.id_user ? currentUser : user
            )
          );
          MySwal.fire({
            title: "Usuario Actualizado!",
            text: "El usuario ha sido actualizado exitosamente.",
            icon: "success",
            confirmButtonColor: "#1F2D40",
          });
        } catch (error) {
          MySwal.fire({
            title: "Error",
            text: "Hubo un error al actualizar el usuario.",
            icon: "error",
            confirmButtonColor: "#1F2D40",
          });
        }
      }
    });
    setOpenEditDialog(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (currentUser) {
      setCurrentUser((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleDeleteUser = (userId) => {
    MySwal.fire({
      title: "¿Estás seguro de cambiar el estado?",
      text: "No podrás revertir esta acción.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1F2D40",
      cancelButtonColor: "#ff0000",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await userService.updateUserStatus(userId, false);
          setUsers(users.map((user) =>
            user.id_user === userId ? { ...user, status: false } : user
          ));
          MySwal.fire({
            title: "Usuario Eliminado!",
            text: "El usuario ha sido dado de baja exitosamente.",
            icon: "success",
            confirmButtonColor: "#1F2D40",
          });
        } catch (error) {
          MySwal.fire({
            title: "Error",
            text: "Hubo un error al dar de baja al usuario.",
            icon: "error",
            confirmButtonColor: "#1F2D40",
          });
        }
      }
    });
  };

  const isEditDisabled = (email) => email === authenticatedUserEmail;

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Load />
      </Box>
    );
  }

  return (
    <>
      <Container
        maxWidth={false}
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <Paper sx={{ padding: "20px", width: "80%" }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            marginBottom={2}
          >
            <Typography variant="h5">Usuarios</Typography>
            <Button variant="contained" color="primary" onClick={handleClickOpenAdd}>
              Agregar Usuario
            </Button>
          </Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Apellido Paterno</TableCell>
                  <TableCell>Apellido Materno</TableCell>
                  <TableCell>Correo</TableCell>
                  <TableCell>Teléfono</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user, index) => (
                  <TableRow key={user.id_user}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.lastname}</TableCell>
                    <TableCell>{user.second_lastname}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.status ? "Activo" : "Inactivo"}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleClickOpenEdit(user)}
                        disabled={isEditDisabled(user.email)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteUser(user.id_user)}>
                        {/* <DeleteIcon /> */}
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>

      {/* Dialogo de Agregar Usuario */}
      <Dialog open={openAddDialog} onClose={handleCloseAdd}>
        <DialogTitle>Agregar Usuario</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Email"
            name="email"
            type="email"
            fullWidth
            value={newUser.email}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Teléfono"
            name="phone_number"  // Correct field name
            type="tel"  // 'tel' is more appropriate for phone numbers
            fullWidth
            value={newUser.phone_number}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Nombre"
            name="name"
            fullWidth
            value={newUser.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Apellido Paterno"
            name="lastname"
            fullWidth
            value={newUser.lastname}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Apellido Materno"
            name="second_lastname"
            fullWidth
            value={newUser.second_lastname}
            onChange={handleChange}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Rol</InputLabel>
            <Select
              name="id_rol"
              value={newUser.id_rol}
              onChange={handleChange}
            >
              <MenuItem value={1}>Admin</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAdd}>Cancelar</Button>
          <Button onClick={handleAddUser}>Agregar</Button>
        </DialogActions>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={openEditDialog} onClose={handleCloseEdit}>
        <DialogTitle>Editar Usuario</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Email"
            name="email"
            type="email"
            fullWidth
            value={currentUser?.email || ""}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Teléfono"
            name="phone_number"  // Correct field name
            type="tel"  // 'tel' is more appropriate for phone numbers
            fullWidth
            value={currentUser?.phone_number || ""}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Nombre"
            name="name"
            fullWidth
            value={currentUser?.name || ""}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Apellido Paterno"
            name="lastname"
            fullWidth
            value={currentUser?.lastname || ""}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Apellido Materno"
            name="second_lastname"
            fullWidth
            value={currentUser?.second_lastname || ""}
            onChange={handleChange}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Rol</InputLabel>
            <Select
              name="id_rol"
              value={currentUser?.id_rol || 1}
              onChange={handleChange}
            >
              <MenuItem value={1}>Cliente</MenuItem>
              <MenuItem value={2}>Admin</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>Cancelar</Button>
          <Button onClick={handleUpdateUser}>Actualizar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
