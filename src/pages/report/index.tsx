import PageView from '../../components/PageView'
import { useOrg } from '../../hooks/useOrg'
import LoadingComponent from '../../components/LoadingComponent'
import { Box, Card, CardContent, CardHeader, Container, Divider, Grid, IconButton, Typography, colors, styled } from '@mui/material'
import { Email, MapRounded, PhoneAndroidTwoTone } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { useTheme } from '@mui/material'
import MainCard from '../../components/MainCard'


const CardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? "#363221" : "#f7f6f2",
    overflow: 'hidden',
    position: 'relative',
    minHeight: 285,
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        borderRadius: '50%',
        top: -30,
        right: -180,
        background: theme.palette.mode === 'dark' ? "#6b6041" : "#ae9e78",
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        width: 250,
        height: 250,
        borderRadius: '50%',
        top: -160,
        right: -130,
        background: theme.palette.mode === 'dark' ? "#a9a7a4" : "#e0d9d1",
    }
}));


const Report = () => {
    const { data, isLoading, isError } = useOrg()
    const theme = useTheme()

    if (isLoading) return (
        <PageView title="Report">
            <LoadingComponent />
        </PageView>
    )

    if (isError) return (
        <PageView title="Report">
            <Typography variant="h6" color="error">
                Error
            </Typography>
        </PageView>
    )

    return (
        <PageView title="Report">
            <Container sx={{ mb: 2 }} maxWidth="lg">
                <Grid container spacing={3} sx={{ mt: 2, mb: 1 }}>
                    <Grid item lg={8} md={6} sm={6} xs={6}>
                        {Object.values(data)?.map((org: any) => (
                            <div key={org._id} style={{ marginBottom: 16 }}>
                                <CardWrapper border={false} content={false} variant="outlined">
                                    <Box sx={{ p: 2 }}>
                                        <Typography variant="h1" color="inherit" mb={5} p={0}>
                                            {org.name}
                                        </Typography>
                                        <Divider sx={{ my: 1 }} />
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <MapRounded sx={{ mr: 1 }} />
                                                <Typography variant="body2" color="inherit">
                                                    {org.address}
                                                </Typography>

                                                <PhoneAndroidTwoTone sx={{ ml: 2, mr: 1 }} />
                                                <Typography variant="body2" color="inherit">
                                                    {org.phoneNumber}
                                                </Typography>

                                                <Email sx={{ ml: 2, mr: 1 }} />
                                                <Typography variant="body2" color="inherit">
                                                    {org.email}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </CardWrapper>
                            </div>
                        ))}

                    </Grid>
                    <Grid item lg={4} md={6} sm={4} xs={6}>
                        <Card sx={{
                            opacity: 0.8,
                            maxWidth: 450,
                            mt: 1,
                            boxShadow: 15,
                        }}>
                            <Link to="order">
                                <CardHeader
                                    title="Order Report Summary"
                                    titleTypographyProps={{ display: 'flex', justifyContent: 'flex-start', fontSize: 12 }}
                                    action={
                                        <IconButton>
                                            <KeyboardDoubleArrowRightIcon />
                                        </IconButton>
                                    }
                                />
                            </Link>
                        </Card>
                        <Card sx={{
                            opacity: 0.8,
                            maxWidth: 450,
                            mt: 5,
                            boxShadow: 15,
                        }}>
                            <Link to="sales">
                                <CardHeader
                                    title="Sales Report Summary"
                                    titleTypographyProps={{ display: 'flex', justifyContent: 'flex-start', fontSize: 12 }}
                                    action={
                                        <IconButton>
                                            <KeyboardDoubleArrowRightIcon />
                                        </IconButton>
                                    }
                                />
                            </Link>
                        </Card>
                        <Card sx={{
                            opacity: 0.8, maxWidth: 450, mt: 5,
                            boxShadow: 15,
                            boxShadowColor: colors.teal[800],
                        }}>
                            <Link to="stoke">
                                <CardHeader
                                    title="Stoke Alert Report Summary"
                                    titleTypographyProps={{ display: 'flex', justifyContent: 'flex-start', fontSize: 12 }}
                                    action={
                                        <IconButton>
                                            <KeyboardDoubleArrowRightIcon />
                                        </IconButton>
                                    }
                                />
                            </Link>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </PageView>
    )
}

export default Report
