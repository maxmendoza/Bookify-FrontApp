import { Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const DetailedCardLibro = ({ image, title, categories, description, onClose }) => {
  return (
    <div style={{
      display: 'flex',
      border: '1px solid #ddd',
      borderRadius: '8px',
      overflow: 'hidden',
      position: 'relative'
    }}>
      <img 
        src={image} 
        alt={title} 
        style={{
          width: '40%',
          objectFit: 'cover',
          float: 'left',
          marginRight: '20px'
        }} 
      />
      <div style={{
        padding: '20px',
        width: '100%',
        position: 'relative'
      }}>
        <IconButton 
          style={{
            position: 'absolute',
            top: '0',
            left: '95%',
            margin: '10px',
            zIndex: 10
          }} 
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
        <div 
          style={{
            fontSize: '1.5em',
            fontWeight: 'bold',
            marginBottom: '10px'
          }} 
          id="detailed-book-card-title"
        >
          {title}
        </div>
        <div style={{ marginBottom: '20px' }}>
          <span 
            style={{
              fontWeight: 'bold',
              marginRight: '10px'
            }}
          >
            Categorías:
          </span>
          {categories.split(', ').map((category, index) => (
            <div 
              key={index} 
              style={{
                display: 'inline-block',
                backgroundColor: '#f0f0f0',
                borderRadius: '5px',
                padding: '5px 10px',
                marginRight: '5px'
              }}
            >
              {category}
            </div>
          ))}
        </div>
        <div 
          style={{ marginBottom: '20px' }} 
          id="detailed-book-card-description"
        >
          {description}
        </div>
        <div 
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '20px'
          }}
        >
          <Button variant="contained" color="success">Leer</Button>
        </div>
      </div>
    </div>
  );
};

export default DetailedCardLibro;
