import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function CardLibro({ image, title, categories, description }) {
  const navigate = useNavigate();

  const handleClickLeer = () => {
    navigate("/reading");
  };
  
  return (
    <div style={{
      width: '200px', 
      margin: '10px',
      border: '1px solid #e0e0e0',
      borderRadius: '10px',
      overflow: 'hidden',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    }}>
      <img src={image} alt={title} style={{ width: '100%', height: 'auto' }} />
      <div style={{ padding: '10px' }}>
        <div style={{ fontSize: '1em', fontWeight: 'bold', marginBottom: '5px' }}>{title}</div>
        <div style={{ color: '#757575', fontSize: '0.8em', marginBottom: '5px' }}>{categories}</div>
        <div style={{ fontSize: '0.8em', marginBottom: '10px' }}>{description}</div>
        <div style={{ textAlign: 'center' }}>
          <Button variant="contained" color="primary" onClick={handleClickLeer}>
            Leer
          </Button>
        </div>
      </div>
    </div>
  );
}
