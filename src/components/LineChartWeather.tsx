import Paper from '@mui/material/Paper';
import { LineChart } from '@mui/x-charts/LineChart';
import DatosTabla from "../interface/datosTabla.tsx";

export default function LineChartWeather(props: DatosTabla) {
    return (
        <Paper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column'
            }}
        >

            {/* Componente para un gráfico de líneas */}
            <LineChart
                width={600}
                height={400}
                series={[
                    { data: props.ylabel, label: props.label,
                    },
                ]}
                xAxis={[{ scaleType: 'point', data: props.xlabel }]}
            />
        </Paper>
    );
}