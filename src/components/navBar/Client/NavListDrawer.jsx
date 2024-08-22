import "./NavBar";
import {
  List,
  ListItemText,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Box,
} from "@mui/material";
import PropTypes from "prop-types";

export default function NavListDrawer({ NavLink, setOpen }) {
  return (
    <Box
      sx={{
        width: 250,
      }}
    >
      <nav>
        <List>
          <ListItem disablePadding>
            <ListItemButton
              component={NavLink}
              to="/"
              onClick={() => setOpen(false)}
            >
              <ListItemIcon></ListItemIcon>
              <ListItemText>Inicio</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
}

NavListDrawer.propTypes = {
  setOpen: PropTypes.func.isRequired,
  NavLink: PropTypes.elementType.isRequired, 
};
