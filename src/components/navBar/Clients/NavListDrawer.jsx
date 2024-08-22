import "./NavBar";
import {
    List,
    ListItemText,
    ListItem,
    ListItemButton,
    ListItemIcon,
    Box,
} from "@mui/material";
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
                            <ListItemText>Home</ListItemText>
                        </ListItemButton>
                    </ListItem>
                </List>
            </nav>
        </Box>
    );
}