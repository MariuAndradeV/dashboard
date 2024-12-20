import { Box, Typography, Stack } from "@mui/material";
import theme from "../config/theme.ts";

import { useState, useEffect } from "react";

import { Card, CardContent, CardMedia, TextField } from "@mui/material";

interface Indicator {
  lugar?: string;
  temp?: string;
  feels_like?: string;
  description2?: string;
  img?: string;
  sunrise?: string;
  sunset?: string;
}

export default function AppHeader(config: Indicator) {
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value); // Actualiza el valor del estado
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      // Acciones al presionar Enter
      console.log("Buscar:", searchValue);
      // Aquí puedes llamar a una función o realizar una acción con el valor
    }
  };

  const [fechaHora, setFechaHora] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFechaHora(new Date());
    }, 1000); // Actualiza cada segundo

    return () => clearInterval(intervalId);
  }, []);

  const fechaFormateada =
    fechaHora.toDateString() + ", " + fechaHora.toLocaleTimeString();

  return (
    <Box
      sx={{
        bgcolor: theme.palette.primary.main,
        p: 3,
        color: "white",
        mb: 2,
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        sx={{
          justifyContent: "space-between",
          alignItems: "flex-start",
          borderBottom: "2px solid white", // Línea inferior
          paddingBottom: "1rem",
        }}
      >
        <Typography sx={styles.logo}>@WEATHER360</Typography>
        <Typography sx={styles.fecha}>{fechaFormateada}</Typography>
      </Stack>

      <Box
        sx={{
          mt: 2,
          display: "flex",
          flexDirection: 'column',
          justifyContent: "center", // Centrado horizontal o vertical según el diseño
          alignItems: "center", // Centrado horizontal o vertical según el diseño
        }}
      >
        <Box sx={styles.center}>
          <Typography sx={styles.lugar}>{config.lugar}</Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 1,
            }}
          >
            <TextField
              variant="outlined"
              value={searchValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown} // Detecta la tecla Enter
              sx={{
                maxWidth: "1000px",
                backgroundColor: "white",
                borderRadius: 1,
              }}
              placeholder="Search"
            />
          </Box>
        </Box>

        <Stack
          direction="row"
          spacing={3}
          sx={{
            mt: 2,
            justifyContent: "space-around",
            alignItems: "stretch",
            width: 900,
          }}
        >
          <Box sx={{ ...styles.center, ...styles.shadow }}>
            <Typography sx={styles.tempText}>Temp:</Typography>
            <Typography sx={styles.temp}>{config.temp} K </Typography>
            <Typography sx={styles.feels_like}>
              Feels like: {config.feels_like} K
            </Typography>
          </Box>

          <Card
            sx={{
              maxWidth: 340,
              pt: 4,
              bgcolor: theme.palette.primary.main,
            }}
          >
            <CardMedia
              sx={{
                height: 50,
                width: 50,
                objectFit: "contain",
                margin: "0 auto",
              }}
              image={config.img}
              title="logo"
            />
            <CardContent>
              <Typography
                variant="body1"
                sx={{ color: theme.palette.info.contrastText }}
              >
                {config.description2}
              </Typography>
            </CardContent>
          </Card>

          <Card
            sx={{
              maxWidth: 340,
              pt: 4,
              bgcolor: theme.palette.primary.main,
            }}
          >
            <CardMedia
              sx={{
                height: 50,
                width: 50,
                objectFit: "contain",
                margin: "0 auto",
              }}
              image="dashboard/img/sunrise (1).png"
              title="green iguana"
            />
            <CardContent>
              <Typography
                variant="body1"
                sx={{ color: theme.palette.info.contrastText }}
              >
                {config.sunrise}
              </Typography>
            </CardContent>
          </Card>

          <Card
            sx={{
              maxWidth: 340,
              pt: 4,
              bgcolor: theme.palette.primary.main,
            }}
          >
            <CardMedia
              sx={{
                height: 50,
                width: 50,
                objectFit: "contain",
                margin: "0 auto",
              }}
              image="dashboard/img/sunset (1).png"
              title="green iguana"
            />
            <CardContent>
              <Typography
                variant="body1"
                sx={{ color: theme.palette.info.contrastText }}
              >
                {config.sunset}
              </Typography>
            </CardContent>
          </Card>
        </Stack>
      </Box>
    </Box>
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
  logo: {
    color: "white",
    fontWeight: "bold",
  },
  fecha: {
    color: "white",
  },
  lugar: {
    fontWeight: "bold",
    fontSize: 40,
  },
  tempText: {
    fontSize: 20,
    marginBottom: -1,
  },
  temp: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#DAE38D",
  },
  feels_like: {
    fontSize: 15,
    color: "#C0C0C0",
    fontWeight: "medium",
  },
  shadow: {
    borderRadius: "5px",
    boxShadow: "0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)",
    padding: 1,
    maxWidth: 400,
  },
};
