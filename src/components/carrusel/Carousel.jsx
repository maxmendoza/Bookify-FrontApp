import React, { useState } from "react";
import { Box, Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import libros from "../../pages/Books/ListLibro";

const Carousel = ({ onLeerClick }) => {
  const [indiceActual, setIndiceActual] = useState(0);

  const siguienteImagen = () => {
    const nuevoIndice = (indiceActual + 1) % libros.length;
    setIndiceActual(nuevoIndice);
  };

  const anteriorImagen = () => {
    const nuevoIndice = (indiceActual - 1 + libros.length) % libros.length;
    setIndiceActual(nuevoIndice);
  };

  return (
    <Box sx={{ width: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8f8f8', padding: '40px 20px' }}>
      <Card style={{ position: 'relative', width: '60%', backgroundColor: '#e0e0e0', borderRadius: '10px', overflow: 'hidden', minHeight: '500px', paddingLeft: '20%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', height: '100%' }}>
          <CardMedia
            component="img"
            image={libros[indiceActual].src}
            title={libros[indiceActual].alt}
            style={{ width: 'auto', maxHeight: '100%', borderRadius: '10px', margin: '0 auto' }}
          />
        </Box>
        <CardContent style={{
          textAlign: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <Typography variant="h5" component="h2" style={{ margin: '10px 0' }}>
            {libros[indiceActual].title}
          </Typography>
          <Typography variant="subtitle1" component="h3" style={{ margin: '10px 0' }}>
            {libros[indiceActual].category}
          </Typography>
          <Typography variant="body2" style={{ margin: '10px 0' }}>
            {libros[indiceActual].description}
          </Typography>
          <Button
            variant="contained"
            style={{
              backgroundColor: '#28a745',
              color: '#fff',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
              marginTop: '20px'
            }}
            onClick={() => onLeerClick(libros[indiceActual])}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#218838'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#28a745'}
          >
            LEER MÁS
          </Button>
        </CardContent>
        <Box style={{
          position: 'absolute',
          top: '50%',
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          transform: 'translateY(-50%)'
        }}>
          <Button
            variant="contained"
            style={{
              backgroundColor: '#007bff',
              color: '#fff',
              padding: '15px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease'
            }}
            onClick={anteriorImagen}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0067cc'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
          >
            &#9664; {/* Flecha izquierda */}
          </Button>
          <Button
            variant="contained"
            style={{
              backgroundColor: '#007bff',
              color: '#fff',
              padding: '15px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease'
            }}
            onClick={siguienteImagen}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0067cc'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
          >
            &#9654; {/* Flecha derecha */}
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default Carousel;
