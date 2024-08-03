import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Grid, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import { Chip } from '@mui/joy';
import { CssVarsProvider } from '@mui/joy/styles';
const Item = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    boxShadow: 'none',
    borderRadius: 0,
    '&:hover': {
        boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)',
    },
}));

const ItemMedia = styled(CardMedia)(({ theme }) => ({
    height: 300,
    backgroundSize: 'fit',

}));


const ProductInfo = ({ product }: any) => {
    const theme = useTheme();
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
                <Item>
                    <ItemMedia
                        image={product && product[0].image}
                        title={product && product[0].name}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h3" component="div">
                            {product && product[0].name}
                        </Typography>
                        <Typography variant="body2" color={theme.palette.mode === 'dark' ? 'secondary' : 'text.primary'}>
                            {product && product[0].description}
                        </Typography>
                    </CardContent>
                </Item>
            </Grid>
            <Grid item xs={12} md={12}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={3}>
                        <Item>
                            <Typography variant="body1" color={theme.palette.mode === 'dark' ? '#fff' : 'text.primary'}>
                                <Box fontWeight="fontWeightBold" m={1}>
                                    Product Code:
                                </Box>
                            </Typography>
                            <Typography variant="body2" color={theme.palette.mode === 'dark' ? '#fff' : 'text.primary'} >
                                <Box fontWeight="fontWeightBold" m={1}>
                                    {product && product[0]._id.substring(0, 8)}
                                </Box>
                            </Typography>
                        </Item>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Item>
                            <Typography variant="body1" color={theme.palette.mode === 'dark' ? '#fff' : 'text.primary'}>
                                <Box fontWeight="fontWeightBold" m={1}>
                                    Category:
                                </Box>
                            </Typography>
                            <Typography variant="body2" color={theme.palette.mode === 'dark' ? '#fff' : 'text.primary'}>
                                <Box fontWeight="fontWeightBold" m={1}>
                                    {product && product[0].category.name}
                                </Box>
                            </Typography>
                        </Item>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Item>
                            <Typography variant="body1" color={theme.palette.mode === 'dark' ? '#fff' : 'text.primary'}>
                                <Box fontWeight="fontWeightBold" m={1}>
                                    Price:
                                </Box>
                            </Typography>
                            <Typography variant="body2" color={theme.palette.mode === 'dark' ? '#fff' : 'text.primary'}>
                                <Box fontWeight="fontWeightBold" m={1}>
                                    {product && product[0].buyingPrice}
                                </Box>
                            </Typography>
                        </Item>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Item>
                            <Typography variant="body1" color={theme.palette.mode === 'dark' ? '#fff' : 'text.primary'}>
                                <Box fontWeight="fontWeightBold" m={1}>
                                    Quantity:
                                </Box>
                            </Typography>
                            <Typography variant="body2" color={theme.palette.mode === 'dark' ? '#fff' : 'text.primary'}>
                                <Box fontWeight="fontWeightBold" m={1}>
                                    {product && product[0].initialQuantity}
                                </Box>
                            </Typography>
                        </Item>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Item>
                            <Typography variant="body1" color={theme.palette.mode === 'dark' ? '#fff' : 'text.primary'}>
                                <Box fontWeight="fontWeightBold" m={1}>
                                    Description:
                                </Box>
                            </Typography>
                            <Typography variant="body2" color={theme.palette.mode === 'dark' ? '#fff' : 'text.primary'}>
                                <Box fontWeight="fontWeightBold" m={1}>
                                    {product && product[0].description}
                                </Box>
                            </Typography>
                        </Item>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Item>
                            <Typography variant="body1" color={theme.palette.mode === 'dark' ? '#fff' : 'text.primary'}>
                                <Box fontWeight="fontWeightBold" m={1}>
                                    Model:
                                </Box>
                            </Typography>
                            <Typography variant="body2" color={theme.palette.mode === 'dark' ? '#fff' : 'text.primary'}>
                                <Box fontWeight="fontWeightBold" m={1}>
                                    {product && product[0].model}
                                </Box>
                            </Typography>
                        </Item>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Item>
                            <Typography variant="body1" color={theme.palette.mode === 'dark' ? '#fff' : 'text.primary'}>
                                <Box fontWeight="fontWeightBold" m={1}>
                                    Stock Alert:
                                </Box>
                            </Typography>
                            <Typography variant="body2" color={theme.palette.mode === 'dark' ? '#fff' : 'text.primary'}>
                                <Box fontWeight="fontWeightBold" m={1}>
                                    <CssVarsProvider>
                                        <Chip
                                            variant="soft"
                                            color="success"
                                            size="sm"
                                        >
                                            {product && product[0].stockAlert}
                                        </Chip>
                                    </CssVarsProvider>

                                </Box>
                            </Typography>
                        </Item>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Item>
                            <Typography variant="body1" color={theme.palette.mode === 'dark' ? '#fff' : 'text.primary'}>
                                <Box fontWeight="fontWeightBold" m={1}>
                                    Category:
                                </Box>
                            </Typography>
                            <Typography variant="body2" color={theme.palette.mode === 'dark' ? '#fff' : 'text.primary'}>
                                <Box fontWeight="fontWeightBold" m={1}>
                                    <CssVarsProvider>
                                        <Chip
                                            variant="soft"
                                            color="info"
                                            size="sm"
                                        >
                                            {product && product[0].category.name}
                                        </Chip>
                                    </CssVarsProvider>

                                </Box>
                            </Typography>
                        </Item>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default ProductInfo