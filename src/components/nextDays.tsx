import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';

interface Indicator {
    title?: string;
    image?: string;
    subtitle?: string;
    value?: string;
}

export default function IndicatorWeather(config: Indicator) {
    return (
        <Box>
            <Grid container spacing={2} columns={24}>
                <Grid size={8}>
                <Typography>Dia1</Typography>
                </Grid>

                <Grid container size={16}>
                <Grid size={12}>
                    <Typography>2</Typography>
                </Grid>
                <Grid size={12}>
                    <Typography>foto</Typography>
                </Grid>
                </Grid>

                <Grid size={8}>
                <Typography>Dia2</Typography>
                </Grid>

                <Grid container columns={12} size={16}>
                <Grid size={6}>
                    <Typography>5</Typography>
                </Grid>
                <Grid size={6}>
                    <Typography>foto</Typography>
                </Grid>
                </Grid>
                <Grid size={8}>
                <Typography>Dia3</Typography>
                </Grid>

                <Grid container size={16}>
                <Grid size={12}>
                    <Typography>2</Typography>
                </Grid>
                <Grid size={12}>
                    <Typography>foto</Typography>
                </Grid>
                </Grid>

                <Grid size={8}>
                <Typography>Dia4</Typography>
                </Grid>

                <Grid container columns={12} size={16}>
                <Grid size={6}>
                    <Typography>5</Typography>
                </Grid>
                <Grid size={6}>
                    <Typography>foto</Typography>
                </Grid>
                </Grid>

            </Grid>

        </Box>
    )
}