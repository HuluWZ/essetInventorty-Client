import {
    DataGrid,
    GridRowsProp,
    GridColDef,
    GridToolbar,
} from "@mui/x-data-grid";
import {
    DeleteForeverRounded,
    EditRounded,
    VisibilityRounded,
} from "@mui/icons-material";
import { Box, IconButton, Container, Grid, Typography, Chip, Paper } from "@mui/material";
import { useTheme } from "@mui/system";
import { Link } from "react-router-dom";


const SalesView = ({
    sales,
    setSelectedSales,
    setOpen,
    setOpenConfirm,
}: any) => {
    const theme = useTheme();
    const columns: GridColDef[] = [
        {
            field: "name",
            headerName: "Name",
            width: 150,
        },
        {
            field: "customer",
            headerName: "Customer",
            width: 150,
        },
        {
            field: "description",
            headerName: "Description",
            width: 150,
        },
        {
            field: "salesDate",
            headerName: "Sales Date",
            width: 150,
            renderCell: (params: any) => {
                return <>{new Date(params.value).toLocaleDateString()}</>;
            },
        },
        {
            field: "items",
            headerName: "Items & Quantity",
            minWidth: 300,
            renderCell: (params: any) => {
                return (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                        }}
                    >
                        {params.value.map((item: any) => {
                            return (
                                <Box
                                    key={item._id}
                                    sx={{
                                        display: "block",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Chip label={item.quantity} />
                                        <Typography variant="body2" ml={1}>
                                            {item.product.name}
                                        </Typography>
                                    </Box>
                                </Box>
                            );
                        })}
                    </Box>
                );
            },
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 150,
            renderCell: (params: any) => {
                return (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-evenly",
                        }}
                    >
                        <IconButton
                            onClick={() => {
                                setSelectedSales(params.row);
                                setOpen(true);
                            }}
                        >
                            <EditRounded />
                        </IconButton>
                        <IconButton
                            onClick={() => {
                                setSelectedSales(params.row);
                                setOpenConfirm(true);
                            }}
                        >
                            <DeleteForeverRounded />
                        </IconButton>
                        <IconButton
                            component={Link}
                            to={`${params.row.id}`}
                        >
                            <VisibilityRounded />
                        </IconButton>

                    </Box>
                );
            },
        },
    ];

    const rows: GridRowsProp = sales.sales.map((item: any) => {
        return {
            id: item._id,
            name: item.name,
            customer: item.customer.fullName,
            description: item.description,
            salesDate: item.salesDate,
            items: item.items,
        };
    });

    return (
        <Container maxWidth="lg">
            <Paper sx={{ background: theme.palette.background.paper }} variant="outlined">
                <DataGrid
                    rows={rows}
                    columns={columns}
                    autoHeight
                    pagination
                    rowsPerPageOptions={[5, 10, 20]}
                    checkboxSelection
                    initialState={{
                        pagination: {
                            pageSize: 10,
                        },
                    }
                    }
                    components={{
                        Toolbar: GridToolbar,
                    }}
                />
            </Paper>
        </Container>
    );
};

export default SalesView;