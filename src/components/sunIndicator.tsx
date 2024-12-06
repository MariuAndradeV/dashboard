import Typography from '@mui/material/Typography';
import { Card, CardContent, CardMedia} from '@mui/material';

interface Indicator {
    title?: string;
    image?: string;
    value?: string;
}

export default function sunIndicator(config: Indicator) {
    return (
        <Card sx={{ maxWidth: 340, pt:4, bgcolor: 'warning.main' }}>
            <CardMedia sx={{ height: 50, width: 50, objectFit: 'contain', margin:'0 auto'}}
            image= {config.image}
            title="green iguana"
            />

            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                {config.title} 
                </Typography>
                
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                {config.value}
                </Typography>
            </CardContent>

        </Card>
    )
}