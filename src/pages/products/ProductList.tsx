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
import { Box, IconButton, Container, Grid, Paper } from "@mui/material";
import { useTheme } from "@mui/material";
import { Link, useParams } from "react-router-dom";

const ProductsView = ({
    products,
    setSelectedProduct,
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
            field: "model",
            headerName: "Model",
            width: 150,
        },
        {
            field: "sellingPrice",
            headerName: "Selling Price",
            width: 150,
        },
        {
            field: "initialQuantity",
            headerName: "Quantity",
            width: 150,
        },
        {
            field: "stockAlert",
            headerName: "Stock Alert",
            width: 150,
        },
        {
            field: "category",
            headerName: "Category",
            width: 150,
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
                            alignItems: "center",
                        }}
                    >
                        <IconButton
                            onClick={() => {
                                setSelectedProduct(params.row);
                                setOpen(true);
                            }}
                        >
                            <EditRounded />
                        </IconButton>
                        <IconButton
                            onClick={() => {
                                setSelectedProduct(params.row);
                                setOpenConfirm(true);
                            }}
                        >
                            <DeleteForeverRounded />
                        </IconButton>
                        <IconButton component={Link} to={`${params.row.id}`}>
                            <VisibilityRounded />
                        </IconButton>
                    </Box>
                );
            },
        },
    ];

    const rows: GridRowsProp = products?.product?.map((product: any) => {
        return {
            id: product._id,
            name: product.name,
            model: product.model,
            buyingPrice: product.buyingPrice,
            sellingPrice: product.sellingPrice,
            initialQuantity: product.initialQuantity,
            stockAlert: product.stockAlert,
            category: product.category.name,
            storeLocation: product.storeLocation,
            description: product.description,
            image: product.image,
            colors: Object.values(product.colors).join(" , "),
            sizes: Object.values(product.sizes).join(" , "),
        };
    });

    return (
        <Container maxWidth="lg">
            <Paper sx={{ background: theme.palette.background.paper }} variant="outlined">

                <DataGrid
                    rows={rows}
                    columns={columns}
                    pagination
                    rowsPerPageOptions={[5, 10, 20]}
                    checkboxSelection
                    autoHeight
                    initialState={{
                        pagination: {
                            pageSize: 10,
                        },
                    }}
                    components={{
                        Toolbar: GridToolbar,
                    }}
                    sx={{
                        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.05)",
                    }}
                />
            </Paper>
        </Container>
    );
};

export default ProductsView;
