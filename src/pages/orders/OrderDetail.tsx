import React from 'react'
import { useTheme } from "@mui/material";
import { useParams } from "react-router-dom";
import LoadingComponent from "../../components/LoadingComponent";
import { useQuery } from 'react-query';
import { getOrder } from '../../api/ordersApi';
import { Box, Button, Card, Container, CardContent, CardHeader, Divider, Grid, Typography, Paper } from '@mui/material';
import PageView from "../../components/PageView";
import { styled } from '@mui/system';
import moment from 'moment';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import Chip from '@mui/joy/Chip';
import { CheckCircleOutlineRounded, ErrorOutlineRounded, HourglassEmptyRounded, LocalShippingRounded } from '@mui/icons-material';
import { CssVarsProvider } from '@mui/joy/styles';

const TimelineItemStyled = styled(TimelineItem)(({ theme }) => ({
    '&:before': {
        flex: 0,
        padding: 0,
    },
    '&:after': {
        flex: 0,
        padding: 0,
    },
}));

const OrderDetail = () => {
    const theme: any = useTheme();
    const { id }: any = useParams();
    const { isLoading, data, isError } = useQuery(['order', id], () => getOrder(id));

    if (isLoading) {
        return (
            <PageView title="Order Detail">
                <LoadingComponent />
            </PageView>
        )
    }

    if (isError) {
        return (
            <PageView title="Order Detail">
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <Typography variant="h4" color="textSecondary" gutterBottom>
                        Something went wrong!
                    </Typography>
                </Box>
            </PageView>
        )
    }

    const order = data.order[0];

    return (
        <PageView title="Order Detail" backPath="/orders">
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={6}>
                        <Card sx={{ height: '100%' }} variant="outlined">
                            <CardHeader
                                title="Order Information"
                                subheader={
                                    <Typography variant="caption" color="secondary" gutterBottom>
                                        {order._id.slice(0, 4)}
                                    </Typography>
                                }
                            />
                            <Divider />
                            <CardContent>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6} lg={6}>
                                        <Typography variant="body1" color={theme.palette.mode === 'dark' ? 'textPrimary' : 'textSecondary'} gutterBottom>
                                            Order ID
                                        </Typography>
                                        <Typography variant="body1" color="textPrimary" gutterBottom>
                                            {order._id.slice(0, 4)}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={6}>
                                        <Typography variant="body1" color={theme.palette.mode === 'dark' ? 'textPrimary' : 'textSecondary'} gutterBottom>
                                            Order Date
                                        </Typography>
                                        <Typography variant="body1" color="textPrimary" gutterBottom>
                                            {moment(order.createdAt).fromNow()}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={6}>
                                        <Typography variant="body1" color={theme.palette.mode === 'dark' ? 'textPrimary' : 'textSecondary'} gutterBottom>
                                            Order Status
                                        </Typography>
                                        <CssVarsProvider>
                                            {order.status === 'Pending' && (
                                                <Chip
                                                    variant="soft"
                                                    color="danger"
                                                    size='sm'
                                                    startDecorator={<HourglassEmptyRounded />}
                                                >
                                                    {order.status}
                                                </Chip>
                                            ) || order.status === 'Approved' && (
                                                <Chip
                                                    variant="soft"
                                                    color="success"
                                                    size='sm'
                                                    startDecorator={<CheckCircleOutlineRounded />}
                                                >
                                                    {order.status}
                                                </Chip>
                                            ) || order.status === 'Rejected' && (
                                                <Chip
                                                    variant="soft"
                                                    size='sm'
                                                    startDecorator={<ErrorOutlineRounded />}
                                                >
                                                    {order.status}
                                                </Chip>
                                            )}
                                        </CssVarsProvider>
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={6}>
                                        <Typography variant="body1" color={theme.palette.mode === 'dark' ? 'textPrimary' : 'textSecondary'} gutterBottom>
                                            Order Total
                                        </Typography>
                                        <Typography variant="body1" color="textPrimary" gutterBottom>
                                            {order.items.reduce((acc: any, item: any) => {
                                                let accPrice = acc + item.product.sellingPrice * item.quantity;
                                                return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'ETB' }).format(accPrice);
                                            }, 0)}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                        <Card sx={{ height: '100%' }} variant="outlined">
                            <CardHeader
                                title="Customer Information"
                                subheader={
                                    <Typography variant="caption" color="secondary" gutterBottom>
                                        {order.fullName}
                                    </Typography>
                                }
                            />
                            <Divider />
                            <CardContent>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6} lg={6}>
                                        <Typography variant="body1" color={theme.palette.mode === 'dark' ? 'textPrimary' : 'textSecondary'} gutterBottom>
                                            Customer Name
                                        </Typography>
                                        <Typography variant="body2" color="textPrimary" gutterBottom>
                                            {order.fullName}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={6}>
                                        <Typography variant="body1" color={theme.palette.mode === 'dark' ? 'textPrimary' : 'textSecondary'} gutterBottom>
                                            Customer Email
                                        </Typography>
                                        <Typography variant="body2" color="textPrimary" gutterBottom>
                                            {order.email}

                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={6}>
                                        <Typography variant="body1" color={theme.palette.mode === 'dark' ? 'textPrimary' : 'textSecondary'} gutterBottom>
                                            Customer Phone
                                        </Typography>
                                        <Typography variant="body2" color="textPrimary" gutterBottom>
                                            {order.phoneNumber}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={6}>
                                        <Typography variant="body1" color={theme.palette.mode === 'dark' ? 'textPrimary' : 'textSecondary'} gutterBottom>
                                            Customer Address
                                        </Typography>
                                        <Typography variant="body2" color="textPrimary" gutterBottom>
                                            {order.address}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12}>
                        <Card sx={{ height: '100%' }} variant="outlined">
                            <CardHeader
                                title="Order Items"
                                subheader={
                                    <Typography variant="body1" color="secondary" gutterBottom>
                                        {order.items.length} Items
                                    </Typography>
                                }
                            />
                            <Divider />
                            <CardContent>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={12} lg={12}>
                                        <Timeline>
                                            {order.items.map((item: any) => (
                                                <TimelineItemStyled key={item._id}>
                                                    <TimelineOppositeContent sx={{ m: 'auto 0' }}>
                                                        <Typography variant="body2" color="textPrimary">
                                                            Quantity: {item.quantity}
                                                        </Typography>
                                                    </TimelineOppositeContent>
                                                    <TimelineSeparator>
                                                        <TimelineDot color={item.quantity > 1 ? 'warning' : 'primary'} />
                                                        <TimelineConnector />
                                                    </TimelineSeparator>
                                                    <TimelineContent>
                                                        <Typography>{item.product.name}</Typography>
                                                    </TimelineContent>
                                                </TimelineItemStyled>
                                            ))}
                                        </Timeline>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </PageView>
    )
}

export default OrderDetail