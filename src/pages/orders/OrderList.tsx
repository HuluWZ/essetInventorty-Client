import React, { useState } from "react";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";
import {
  DeleteForeverRounded,
  EditRounded,
  Money,
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
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import moment from "moment";
import { useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { CssVarsProvider } from '@mui/joy/styles';
import Chip from '@mui/joy/Chip';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { HourglassBottomRounded } from "@mui/icons-material";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TeleLogo from '../../assets/images/tele.jpg';
import MoneyLogo from '../../assets/images/money-sack.png';
import CheckLogo from '../../assets/images/cash.png';
import TransferLogo from '../../assets/images/transfer.png';

const ITEM_HEIGHT = 48;

const OrdersView = ({
  orders,
  setSelectedOrder,
  setOpen,
  setOpenConfirm,
  approveOrderMutation,
}: any) => {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const columns: GridColDef[] = [
    {
      field: "fullName",
      headerName: "Customer",
      minWidth: 200,
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
                  fontSize: "0.8rem",
                  borderRadius: "20%",
                }}
              >
                {fullName.charAt(0).toUpperCase() +
                  fullName.charAt(fullName.indexOf(" ") + 1).toUpperCase()}
              </Avatar>
            </Box>
            <Box
              sx={{
                display: "block",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Typography variant="body1"
                sx={{
                  display: "flex", alignItems: "center",
                  marginBottom: "5px",
                }}
              >
                {fullName}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ display: "flex", alignItems: "center", }}
              >
                <LocalPhoneOutlinedIcon
                  fontSize="small"
                  sx={{ marginRight: "5px" }}
                />
                {phoneNumber}
              </Typography>
            </Box>
          </>
        );
      },
    },
    {
      field: "address",
      headerName: "Address",
      minWidth: 150,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 150,
    },
    {
      field: "paymentMethod",
      headerName: "Payment Method",
      minWidth: 100,
      renderCell: (params: any) => {
        const { row } = params;
        const { paymentMethod } = row;
        return (
          <>
            {paymentMethod === "Cash" ? (
              <img
                src={MoneyLogo}
                alt="cash"
                style={{ width: "30px", height: "30px" }}
              />
            ) : paymentMethod === "Credit" ? (
              <img
                src="https://img.icons8.com/color/48/000000/visa.png"
                alt="card"
                style={{ width: "30px", height: "30px" }}
              />
            ) : paymentMethod === "Transfer" ? (
              <img
                src={TransferLogo}
                alt="transfer"
                style={{ width: "30px", height: "30px" }}
              />
            ) : paymentMethod === "TeleBirr" ? (
              <img
                src={TeleLogo}
                alt="telebirr"
                style={{ width: "30px", height: "30px" }}
              />
            ) : paymentMethod === "Check" ? (
              <img
                src={CheckLogo}
                alt="check"
                style={{ width: "30px", height: "30px" }}
              />
            ) : (
              <img
                src="https://img.icons8.com/color/48/000000/cash-in-hand.png"
                alt="other"
                style={{ width: "30px", height: "30px" }}
              />
            )}
          </>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 120,
      renderCell: (params: any) => {
        const { row } = params;
        const { status } = row;
        return (
            <CssVarsProvider>
              {status === "Pending" ? (
                <Chip
                  variant="soft"
                  size="sm"
                  startDecorator={<HourglassBottomRounded />}
                  color="neutral"
                >
                  {status}
                </Chip>
              ) : status === "Approved" ? (
                <Chip
                  variant="soft"
                  size="sm"
                  color="success"
                  startDecorator={<CheckCircleOutlineIcon />}
                >
                  {status}
                </Chip>
              ) : (
                <Chip
                  variant="soft"
                  size="sm"
                  color="danger"
                  startDecorator={<HourglassBottomRounded />}
                >
                  {status}
                </Chip>
              )}
            </CssVarsProvider>
        );
      },
    },
    {
      field: "orderDate",
      headerName: "Order Date",
      minWidth: 100,
      renderCell: (params: any) => {
        const { row } = params;
        const { orderDate } = row;
        return (
          <Typography variant="body2" color="text.secondary">
            {moment(orderDate).fromNow()}
          </Typography>
        );
      },
    },
    {
      field: "description",
      headerName: "description",
      minWidth: 150,
      renderCell: (params: any) => {
        const { row } = params;
        const { description } = row;
        return (
          <Typography variant="body2" color="text.secondary">
            {description.substring(0, 20) + "..."}
          </Typography>
        );
      },
    },

    {
      field: "actions",
      headerName: "Actions",
      minWidth: 50,
      renderCell: (params: any) => {
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  background: theme.palette.background.paper,
                  boxShadow: theme.shadows[0],
                  opacity: 0.9,
                },
              }}
            >
              <MenuItem>
                <Link to={`${params.row.id}`}>
                  <VisibilityRounded sx={{ color: "primary.main" }} />
                </Link>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setOpen(true);
                  setSelectedOrder(params.row);
                }}
              >
                <EditRounded sx={{ color: "secondary.main" }} />
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setOpenConfirm(true);
                  setSelectedOrder(params.row);
                }}
              >
                <DeleteForeverRounded sx={{ color: "error.main" }} />
              </MenuItem>
              <MenuItem
                onClick={() => {
                  approveOrderMutation(params.row.id);
                }}
              >
                <CheckCircleOutlineIcon sx={{ color: "success.main" }} />
              </MenuItem>
            </Menu>

          </Box>
        );
      },
    },
  ];

  const rows: GridRowsProp = orders?.Orders?.map((item: any) => {
    return {
      id: item._id,
      fullName: item.fullName,
      phoneNumber: item.phoneNumber,
      address: item.address,
      email: item.email,
      paymentMethod: item.paymentMethod,
      status: item.status,
      orderDate: item.orderDate,
      description: item.description,
      city: item.city,
      items: item.items,
    };
  });

  return (
    <Container maxWidth="lg">
      <Paper sx={{ background: theme.palette.background.paper }} variant="outlined">
        <DataGrid
          rows={rows}
          columns={columns}
          rowsPerPageOptions={[5, 10, 20]}
          autoHeight
          pagination
          components={{
            Toolbar: GridToolbar,
          }}
          initialState={{
            pagination: {
              pageSize: 10,
            },

          }}
          checkboxSelection
        />
      </Paper>
    </Container>
  );
};

export default OrdersView;
