import Typography from "@mui/material/Typography";
import { Card, CardContent, CardMedia } from "@mui/material";
import theme from "../config/theme.ts";

interface Indicator {
  title?: string;
  image?: string;
  value?: string;
}

export default function IndicatorWeather(config: Indicator) {
  return (
    <Card
      sx={[
        { maxWidth: 200, pt: 4, bgcolor: theme.palette.secondary.main, m: 1 },
        styles.center,
      ]}
    >
      <CardMedia
        sx={{ height: 35, width: 35, objectFit: "contain", margin: "0 auto" }}
        image={config.image}
        title="icon"
      />

      <CardContent>
        <Typography gutterBottom component="div">
          {config.title}
        </Typography>
        <Typography sx={{ color: "text.secondary" }}>{config.value}</Typography>
      </CardContent>
    </Card>
  );
}

/** @type {import("@mui/material").SxProps} */
const styles = {
  center: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
};
