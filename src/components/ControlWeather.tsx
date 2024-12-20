import { useState, useRef, useEffect } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

interface ControlWeatherProps {
  onSelectionChange: (selected: string) => void; // Callback para enviar el valor seleccionado
}

export default function ControlWeather({
  onSelectionChange,
}: ControlWeatherProps) {
  const descriptionRef = useRef<HTMLDivElement>(null);

  const items = [
    {
      name: "Precipitation",
      description:
        "The amount of water released from the atmosphere, in forms such as rain, snow, or hail.",
    },
    {
      name: "Humidity",
      description:
        "The concentration of water vapor present in the air, expressed as a percentage.",
    },
    {
      name: "Temperature",
      description:
        "The measure of how hot or cold the atmosphere is, typically expressed in degrees Fahrenheit.",
    },
  ];

  // Estado inicial configurado con un valor predeterminado
  const [selected, setSelected] = useState(0); // Precipitation (índice 0)

  const options = items.map((item, key) => (
    <MenuItem key={key} value={key}>
      {item["name"]}
    </MenuItem>
  ));

  const handleChange = (event: SelectChangeEvent) => {
    const idx = parseInt(event.target.value);
    setSelected(idx);

    if (descriptionRef.current !== null) {
      descriptionRef.current.innerHTML =
        idx >= 0 ? items[idx]["description"] : "";
    }

    if (idx >= 0) {
      onSelectionChange(items[idx]["name"]);
    }
  };

  // Efecto para manejar el valor inicial
  useEffect(() => {
    if (descriptionRef.current !== null) {
      descriptionRef.current.innerHTML = items[selected]["description"];
    }

    // Llamar al callback con el valor predeterminado
    onSelectionChange(items[selected]["name"]);
  }, [onSelectionChange, selected, items]);

  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography mb={2} component="h3" variant="h6" color="primary">
        Variables Meteorológicas
      </Typography>

      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="simple-select-label">Variables</InputLabel>
          <Select
            labelId="simple-select-label"
            id="simple-select"
            label="Variables"
            value={selected.toString()} // Asegurar que coincida con el estado inicial
            onChange={handleChange}
          >
            <MenuItem key="-1" value="-1" disabled>
              Seleccione una variable
            </MenuItem>
            {options}
          </Select>
        </FormControl>
      </Box>

      <Typography mt={2} component="p" color="text.secondary">
        {selected >= 0 ? items[selected]["description"] : ""}
      </Typography>

    </Paper>
  );
}
    