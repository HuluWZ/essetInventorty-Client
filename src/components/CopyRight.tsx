import { Typography } from "@mui/material";
import { Box } from "@mui/system";

const Footer = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center',flexDirection:"column", alignItems: 'center', height: '100px', backgroundColor: '' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant="h5" sx={{ color: '' }}>
                    {"Powerd by "} <strong>
                        Esset
                    </strong>
                </Typography>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
                <Typography  sx={{ color: '' }} variant="body2">
                    {`Copyright © ${new Date().getFullYear()} `}
                </Typography>
            </div>
        </Box>
    )
}

export default Footer