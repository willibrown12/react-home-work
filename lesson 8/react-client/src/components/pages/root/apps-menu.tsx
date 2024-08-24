import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import FiberSmartRecordIcon from '@mui/icons-material/FiberSmartRecord';
import CottageIcon from '@mui/icons-material/Cottage';
import InsightsIcon from '@mui/icons-material/Insights';
import { routes } from '../../../App';
import { Link } from 'react-router-dom';
import { Logoutuser } from './service';

export default function AppMenu(props: { isOpen: boolean, setIsOpen: any }) {
    const { isOpen: open, setIsOpen: setOpen } = props
    const toggleDrawer = () => () => {
        setOpen(!open);
    };
    const isLoggedIn = localStorage.getItem("token")

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer()}>
            <List>
                {routes.filter(route => route.visible).map((route) => (
                    <ListItem key={route.label} disablePadding>
                        <Link style={{ color: "black", textDecoration: "none" }} to={route.path} >
                            <ListItemButton>
                                <ListItemIcon>
                                    {getIconsMapper(route.label)}
                                </ListItemIcon>
                                <ListItemText primary={route.label} />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                ))}
                {isLoggedIn ? <ListItem key={"logout"} >
                    <ListItemButton onClick={() => {
                        const token= localStorage.getItem("token")||""
                        Logoutuser(token)
                        localStorage.removeItem("token")
                        window.location.href = "/home"
                    }}>
                        <ListItemIcon>
                            Logout
                        </ListItemIcon>
                        <ListItemText />
                    </ListItemButton>
                </ListItem> : null}
            </List>

        </Box>
    );

    return (
        <div>
            <Button onClick={toggleDrawer()}>Menu</Button>
            <Drawer variant="persistent" hideBackdrop={true} open={true} onClose={toggleDrawer()}>
                {DrawerList}
            </Drawer>
        </div>
    );
}

const iconsMapping = {
    Home: < CottageIcon />,
    Movies: < MovieFilterIcon />,
    Statistics: <InsightsIcon />
}
function getIconsMapper(label: string) {
    // @ts-ignore
    return iconsMapping[label] || <FiberSmartRecordIcon />
}
