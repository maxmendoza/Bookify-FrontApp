import { useState } from "react";
import { TextField, Button, Grid, Paper, Typography } from "@mui/material";

const CardPerfil = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastNameP: "",
    lastNameM: "",
    phone: "",
    state: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleCancel = () => {
    setFormData({
      firstName: "",
      lastNameP: "",
      lastNameM: "",
      phone: "",
      state: "",
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6}>
        <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Información Personal
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Nombre"
                  name="firstName"
                  fullWidth
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Apellido Paterno"
                  name="lastNameP"
                  fullWidth
                  value={formData.lastNameP}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Apellido Materno"
                  name="lastNameM"
                  fullWidth
                  value={formData.lastNameM}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Teléfono"
                  name="phone"
                  fullWidth
                  value={formData.phone}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Estado"
                  name="state"
                  fullWidth
                  value={formData.state}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Nombre de usuario"
                  name="username"
                  fullWidth
                  value={formData.username}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Correo electrónico"
                  name="email"
                  fullWidth
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Contraseña"
                  name="password"
                  type="password"
                  fullWidth
                  value={formData.password}
                  onChange={handleChange}
                />
              </Grid>
              <Grid
                item
                xs={12}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Button type="submit" variant="contained" color="primary">
                  Aceptar
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  color="secondary"
                  onClick={handleCancel}
                >
                  Cancelar
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default CardPerfil;
