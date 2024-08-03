import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import GroupIcon from '@mui/icons-material/Group';
import DiscountIcon from '@mui/icons-material/Discount';
import CategoryIcon from '@mui/icons-material/Category';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { NavLink } from 'react-router-dom';
import { listItemClasses } from "@mui/material/ListItem";
import List from "@mui/material/List";
import { Typography, colors } from "@mui/material";


const listAdminItems = [
    {
        name: 'Dashboard',
        icon: <DashboardIcon />,
        path: '/app/dashboard',
    },
    {
        name: 'Categories',
        icon: <CategoryIcon />,
        path: '/app/categories',
    },
    {
        name: 'Products',
        icon: <InventoryIcon />,
        path: '/app/products',
    },
    {
        name: 'Orders',
        icon: <AddShoppingCartIcon />,
        path: '/app/orders',
    },
    {
        name: 'Sales',
        icon: <PointOfSaleIcon />,
        path: '/app/sales',
    },
    {
        name: 'Customers',
        icon: <GroupIcon />,
        path: '/app/customers',
    },
    {
        name: 'Discounts',
        icon: <DiscountIcon />,
        path: '/app/discounts',
    },
];

const listReportItems = [
    {
        name: 'Reports',
        icon: <AssessmentIcon />,
        path: '/app/reports',
        color: colors.red[500],
    },
];

export const mainListItems = (
    <React.Fragment>
        <ListSubheader inset sx={{ fontFamily: 'Montserrat' }}>
            Admin
        </ListSubheader>
        <List
            sx={{
                [`& .active, & .${listItemClasses.root}:hover`]: {
                    "& .MuiListItemIcon-root": {
                        color: colors.blue[500],
                    },
                },
            }}

        >
            {listAdminItems.map((item, index) => (
                <ListItemButton key={index} component={NavLink} to={item.path}>
                    <ListItemIcon>
                        {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.name.toUpperCase()} />
                </ListItemButton>
            ))}
        </List>


    </React.Fragment >
);


//Secondary Nav Items
export const secondaryListItems = (
    <React.Fragment>
        <ListSubheader inset sx={{ fontFamily: 'Montserrat' }}>
            Reports
        </ListSubheader>
        <List sx={{
            [`& .active, & .${listItemClasses.root}:hover`]: {
                "& .MuiListItemIcon-root": {
                    color: colors.blue[500],
                },
            },
        }}>
            {listReportItems.map((item, index) => (
                <ListItemButton key={index} component={NavLink} to={item.path}>
                    <ListItemIcon sx={{ color: item.color }}>
                        {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.name.toUpperCase()} />
                </ListItemButton>))}
        </List>
    </React.Fragment>
);




