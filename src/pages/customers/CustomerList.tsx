import {
    DataGrid,
    GridColDef,
    GridToolbar,
} from "@mui/x-data-grid";
import {
    DeleteForeverRounded,
    EditRounded,
    VisibilityRounded,
} from "@mui/icons-material";
import {
    Box,
    IconButton,
    Container,
    Typography,
    Avatar,
    Paper,
} from "@mui/material";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import moment from "moment";
import { useTheme } from "@mui/material";


const CustomersView = ({
    customers,
    setSelectedCustomer,
    setOpen,
    setOpenConfirm,
}: any) => {
    const theme = useTheme();
    const columns: GridColDef[] = [
        {
            field: "fullName",
            headerName: "Customer",
            minWidth: 150,
            renderCell: (params: any) => {
                const { row } = params;
                const { fullName, phoneNumber } = row;
                return (
                    <>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <Avatar
                                sx={{
                                    width: "40px",
                                    height: "40px",
                                    marginRight: "10px",
                                    backgroundColor: theme.palette.primary.main,
                                    fontSize: "0.9rem",
                                    borderRadius: "20%",
                                }}
                            >
                                {fullName.charAt(0).toUpperCase() +
                                    fullName.charAt(fullName.indexOf(" ") + 1).toUpperCase()}
                            </Avatar>
                            <Typography variant="body1">{fullName}</Typography>
                        </Box>
                    </>
                );
            },
        },
        {
            field: "phoneNumber",
            headerName: "Phone Number",
            minWidth: 200,
            renderCell: (params: any) => {
                const { row } = params;
                const { phoneNumber } = row;
                return (
                    <>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <LocalPhoneOutlinedIcon
                                sx={{
                                    fontSize: "1.5rem",
                                    marginRight: "10px",
                                }}
                            />
                            <Typography variant="body1">{phoneNumber}</Typography>
                        </Box>
                    </>
                );
            },
        },
        {
            field: "email",
            headerName: "Email",
            minWidth: 100,
        },
        {
            field: "address",
            headerName: "Address",
            minWidth: 100,
        },
        {
            field: "city",
            headerName: "City",
            minWidth: 100,

        },
        {
            field: "paymentMethod",
            headerName: "Payment Method",
            minWidth: 100,
        },
        {
            field: "createdAt",
            headerName: "Created At",
            minWidth: 100,
            renderCell: (params: any) => {
                const { row } = params;
                const { createdAt } = row;
                return (
                    <>
                        <Typography variant="body1">
                            {moment(createdAt).format("DD MMM YYYY")}
                        </Typography>
                    </>
                );
            },
        },
        {
            field: "actions",
            headerName: "Actions",
            minWidth: 100,
            renderCell: (params: any) => {
                const { row } = params;
                return (
                    <>
                        <IconButton
                            onClick={() => {
                                setSelectedCustomer(row);
                                setOpen(true);
                            }}
                        >
                            <EditRounded />
                        </IconButton>
                        <IconButton
                            onClick={() => {
                                setSelectedCustomer(row);
                                setOpenConfirm(true);
                            }}
                        >
                            <DeleteForeverRounded />
                        </IconButton>
                    </>
                );
            },
        },
    ];


    const rows = customers?.customer?.map((item: any) => {
        return {
            id: item?._id,
            fullName: item?.fullName,
            phoneNumber: item?.phoneNumber,
            email: item?.email,
            address: item?.address,
            city: item?.city,
            paymentMethod: item?.paymentMethod,
        };
    });
    return (
        <Container maxWidth="lg">
            <Paper sx={{ background: theme.palette.background.paper }} variant="outlined">
                <DataGrid
                    rows={rows}
                    columns={columns}
                    rowsPerPageOptions={[5, 10, 20]}
                    pagination
                    autoHeight
                    checkboxSelection
                    components={{
                        Toolbar: GridToolbar,
                    }}
                />
            </Paper>
        </Container>
    );
};


export default CustomersView;
