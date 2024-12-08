import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import Typography from '@mui/material/Typography';
/*import theme from '../config/theme.ts';*/

export default function SideNav(){
    return(
        <Sidebar>
            <Menu>
                <MenuItem>
                    <Typography>Dashboard</Typography>
                </MenuItem>
                <MenuItem>
                    <Typography>Dashboard</Typography>
                </MenuItem>
                <MenuItem>
                    <Typography>Dashboard</Typography>
                </MenuItem>
            </Menu>
        </Sidebar>
    )
}