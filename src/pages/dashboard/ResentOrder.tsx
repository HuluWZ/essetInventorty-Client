import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Avatar, Button, Card, CardActions, CardContent, Chip, Divider, Grid, Menu, MenuItem, Typography } from '@mui/material';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import moment from 'moment';
import { Link } from 'react-router-dom';


// ===========================|| DASHBOARD - RECENT ORDER ||=========================== //


const RecentOrder = ({ orders }: any) => {
    const theme: any = useTheme();

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Card sx={{
                height: '100%',
                transition: '0.3s',
                borderRadius: '10px',
                boxShadow: '0px 0px 80px 0px rgb(0 0 0 / 10%)',
                '&:hover': {
                    boxShadow: '0px 0px 80px 0px rgb(0 0 0 / 30%)'
                }
            }}>
                <CardContent>
                    <Grid container spacing={9}>
                        <Grid item xs={12}>
                            <Grid container alignContent="center" justifyContent="space-between">
                                <Grid item>
                                    <Typography variant="h5">Recent Order</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            {/* show only 5 orders sort by created date */}
                            {orders?.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5).map((order: any) => (
                                <Grid container spacing={3} key={order._id}>
                                    <Grid item xs={12}>
                                        <Grid container alignItems="center" justifyContent="space-between">
                                            <Grid item>
                                                <Typography variant="subtitle1" color="inherit">
                                                    {order.fullName}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Grid container alignItems="center" justifyContent="space-between">
                                                    <Grid item>
                                                        <Typography variant="subtitle1" color="inherit">
                                                            {order.paymentMethod}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Avatar
                                                            variant="rounded"
                                                            sx={{
                                                                width: 16,
                                                                height: 16,
                                                                borderRadius: '50px',
                                                                backgroundColor: order.status === 'success' ? theme.palette.success : theme.palette.light,
                                                                color: order.status === 'success' ? theme.palette.success : theme.palette.dark,
                                                                ml: 1
                                                            }}
                                                        >
                                                            {order.status === 'Approved' ? (
                                                                <Chip size="small" sx={{ backgroundColor: theme.palette.success.main, color: theme.palette.success }} />
                                                            ) : order.status === 'Pending' ? (
                                                                <Chip size="small" sx={{ backgroundColor: theme.palette.warning.main, color: theme.palette.warning }} />
                                                            ) : order.status === 'Rejected' ? (
                                                                <Chip size="small" sx={{ backgroundColor: theme.palette.error.main, color: theme.palette.error }} />
                                                            ) : (
                                                                <Chip size="small" sx={{ backgroundColor: theme.palette.error.main, color: theme.palette.error }} />
                                                            )}
                                                        </Avatar>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container alignItems="center" justifyContent="space-between">
                                            <Grid item>
                                                <Typography variant="caption" color="secondary">
                                                    {moment(order.createdAt).fromNow()}
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="subtitle2" color="inherit">
                                                    Payment Method
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Divider />
                                    </Grid>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>

                </CardContent>
                <CardActions sx={{ p: 1.25, pt: 0, justifyContent: 'center' }}>
                    <Button size="small" disableElevation>
                        <Link to="/app/orders" style={{ textDecoration: 'none', color: 'inherit' }}>
                            View All
                        </Link>
                        <ChevronRightOutlinedIcon />
                    </Button>
                </CardActions>
            </Card>
        </>
    );
};

export default RecentOrder
