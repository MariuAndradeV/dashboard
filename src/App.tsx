import "./App.css";
import React from "react";
import theme from "./config/theme.ts";

import IndicatorWeather from "./components/IndicatorWeather";
import TableWeather from "./components/TableWeather";
import ControlWeather from "./components/ControlWeather";
import AppHeader from "./components/AppHeader";
import NextDays from "./components/NextDays";
import LineChartWeather from "./components/LineChartWeather";

import Itemm from "./interface/item.tsx";
import DatosTabla from "./interface/datosTabla.tsx";
import NextDaysItem from "./interface/nextDaysItem.tsx";

import { CssBaseline, Stack, ThemeProvider, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";

{
  /* Hooks */
}
import { useEffect, useState } from "react";

interface Indicator {
  title?: string;
  image?: string;
  value?: string;
}

const Precipitationlabel: number[] = [];
const Humiditylabel: number[] = [];
const Temperaturelabel: number[] = [];

let label = "a";

let xlabel: string[] = [];
let ylabel: number[] = [];

let name = "",
  description2 = "",
  windSpeed = "",
  temp = "",
  feels_like = "",
  probability = "",
  humidity = "",
  pressure = "",
  sunrise = "",
  sunset = "";

function App() {
  {
    /* Variable de estado y función de actualización */
  }
  let [items, setItems] = useState<Itemm[]>([]); /* TableWeather */
  let [day, setDay] = useState<NextDaysItem[]>([]); /* NextDay */
  let [indicators, setIndicators] = useState<Indicator[]>([]);
  let [datos, setDatos] = useState<DatosTabla[]>([]);

  let [owm, setOWM] = useState(localStorage.getItem("openWeatherMap"));

  const [selectedVariable, setSelectedVariable] = useState<string>("");

  {
    /* Hook: useEffect */
  }

  useEffect(() => {
    let request = async () => {
      {
        /* Referencia a las claves del LocalStorage: openWeatherMap y expiringTime */
      }
      let savedTextXML = localStorage.getItem("openWeatherMap") || "";
      let expiringTime = localStorage.getItem("expiringTime");

      {
        /* Obtenga la estampa de tiempo actual */
      }
      let nowTime = new Date().getTime();

      {
        /* Verifique si es que no existe la clave expiringTime o si la estampa de tiempo actual supera el tiempo de expiración */
      }
      if (expiringTime === null || nowTime > parseInt(expiringTime)) {
        {
          /* Request */
        }
        let API_KEY = "478ff9a97de78a1a3cbffeaeeeabb20b";
        let response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=${API_KEY}`
        );
        let savedTextXML = await response.text();

        {
          /* Tiempo de expiración */
        }
        let hours = 0.01;
        let delay = hours * 3600000;
        let expiringTime = nowTime + delay;

        {
          /* En el LocalStorage, almacene el texto en la clave openWeatherMap, estampa actual y estampa de tiempo de expiración */
        }
        localStorage.setItem("openWeatherMap", savedTextXML);
        localStorage.setItem("expiringTime", expiringTime.toString());
        localStorage.setItem("nowTime", nowTime.toString());

        {
          /* DateTime */
        }
        localStorage.setItem(
          "expiringDateTime",
          new Date(expiringTime).toString()
        );
        localStorage.setItem("nowDateTime", new Date(nowTime).toString());

        {
          /* Modificación de la variable de estado mediante la función de actualización */
        }
        setOWM(savedTextXML);
      }

      {
        /* Valide el procesamiento con el valor de savedTextXML */
      }
      if (savedTextXML) {
        {
          /* XML Parser */
        }
        const parser = new DOMParser();
        const xml = parser.parseFromString(savedTextXML, "application/xml");
        console.log(xml)
        {
          /* Arreglo para agregar los resultados */
        }
        let dataToIndicators: Indicator[] = new Array<Indicator>();
        let dataToItems: Itemm[] = new Array<Itemm>();
        let dataToDays: NextDaysItem[] = new Array<NextDaysItem>();
        let dataToDato: DatosTabla[] = new Array<DatosTabla>();

        {
          /* Análisis, extracción y almacenamiento del contenido del XML en el arreglo de resultados */
        }
        name = `${xml.getElementsByTagName("name")[0].innerHTML || ""} ${
          xml.getElementsByTagName("country")[0].innerHTML || ""
        }`.trim();
        
        let timeString  = xml.getElementsByTagName("sun")[0].getAttribute("rise") || "";
        timeString  = timeString.split("T")[1];

        const [hours, minutes, seconds] = timeString.split(":").map(Number); // Dividir y convertir a números

        const date = new Date();
        date.setHours(hours);
        date.setMinutes(minutes);
        date.setSeconds(seconds);
        
        // Restar 5 horas (en milisegundos)
        date.setHours(date.getHours() - 5);
        
        // Obtener la hora resultante
        sunrise = date.toTimeString().split(" ")[0]; // Devuelve solo HH:mm:ss

        let timeString2  = xml.getElementsByTagName("sun")[0].getAttribute("set") || "";
        timeString2  = timeString2.split("T")[1];

        const [hours2, minutes2, seconds2] = timeString2.split(":").map(Number); // Dividir y convertir a números

        const date2 = new Date();
        date2.setHours(hours2);
        date2.setMinutes(minutes2);
        date2.setSeconds(seconds2);
        
        // Restar 5 horas (en milisegundos)
        date2.setHours(date2.getHours() - 5);
        
        // Obtener la hora resultante
        sunset = date2.toTimeString().split(" ")[0]; // Devuelve solo HH:mm:ss
        
        let tiempo = xml
          .getElementsByTagName("forecast")[0]
          .getElementsByTagName("time")[0];

        description2 =
          tiempo.getElementsByTagName("symbol")[0].getAttribute("name") || "";

        probability =
          tiempo
            .getElementsByTagName("precipitation")[0]
            .getAttribute("probability") || "";

        windSpeed = `${
          tiempo.getElementsByTagName("windSpeed")[0].getAttribute("mps") || ""
        } ${
          tiempo.getElementsByTagName("windSpeed")[0].getAttribute("unit") || ""
        }`.trim();

        temp =
          tiempo.getElementsByTagName("temperature")[0].getAttribute("value") ||
          "";

        feels_like =
          tiempo.getElementsByTagName("feels_like")[0].getAttribute("value") ||
          "";

        pressure = `${
          tiempo.getElementsByTagName("pressure")[0].getAttribute("value") || ""
        } ${
          tiempo.getElementsByTagName("pressure")[0].getAttribute("unit") || ""
        }`.trim();

        humidity = `${
          tiempo.getElementsByTagName("humidity")[0].getAttribute("value") || ""
        } ${
          tiempo.getElementsByTagName("humidity")[0].getAttribute("unit") || ""
        }`.trim();

        {
          /* Modificación de la variable de estado mediante la función de actualización */
        }
        setIndicators(dataToIndicators);
        let daysOfWeek = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];

        for (let i = 0; i < 32; i++) {
          let nextDayTime = xml
            .getElementsByTagName("forecast")[0]
            .getElementsByTagName("time")[i];

          let timeDay = nextDayTime.getAttribute("from") || "";

          let timeActu = timeDay.split("T")[1];
          let dayDigits = timeDay.split("T")[0];

          let dayIndex = new Date(dayDigits).getDay();
          let dayNextDays = daysOfWeek[dayIndex];

          if (timeActu === "12:00:00") {
            let tempNextDays =
              nextDayTime
                .getElementsByTagName("temperature")[0]
                .getAttribute("value") || "";

            let img =
              nextDayTime
                .getElementsByTagName("symbol")[0]
                .getAttribute("name") || "";
            let imgNextDays = `dashboard/img/${img}.png`;
            dataToDays.push({
              dayNextDays,
              tempNextDays,
              imgNextDays,
            });
          }
        }

        setDay(dataToDays);

        for (let i = 0; i < 8; i++) {
          let timeTable = xml
            .getElementsByTagName("forecast")[0]
            .getElementsByTagName("time")[i];

          temp =
            timeTable
              .getElementsByTagName("temperature")[0]
              .getAttribute("value") || "";

          let dateStart = timeTable.getAttribute("from") || "";
          dateStart = dateStart.split("T")[1];

          let dateEnd = timeTable.getAttribute("to") || "";
          dateEnd = dateEnd.split("T")[1];

          let rainProb =
            timeTable
              .getElementsByTagName("precipitation")[0]
              .getAttribute("probability") || "";

          let windSpeedC =
            timeTable
              .getElementsByTagName("windSpeed")[0]
              .getAttribute("mps") || "";

          let humedad =
            timeTable
              .getElementsByTagName("humidity")[0]
              .getAttribute("value") || "";

          let pressureC =
            timeTable
              .getElementsByTagName("pressure")[0]
              .getAttribute("value") || "";

          let humedadNum = Number(humedad);
          let rainNum = Number(rainProb);
          let tempNum = Number(temp);

          xlabel.push(dateStart);

          Precipitationlabel.push(rainNum); // Generar valores aleatorios (por ejemplo, temperaturas)

          Humiditylabel.push(humedadNum); // Generar valores aleatorios (por ejemplo, temperaturas)

          Temperaturelabel.push(tempNum); // Generar valores aleatorios (por ejemplo, temperaturas)

          dataToItems.push({
            dateStart,
            dateEnd,
            temp,
            rainProb,
            windSpeedC,
            humedad,
            pressureC,
          });
        }
        setItems(dataToItems);
        setDatos(dataToDato);
      }
    };
    request();
  }, [owm]);

  const dataMap: { [key: string]: number[] } = {
    Precipitation: Precipitationlabel,
    Humidity: Humiditylabel,
    Temperature: Temperaturelabel,
  };

  const handleSelectionChange = (selected: string) => {
    ylabel = dataMap[selected] || [];
    label = selected;
    console.log("Seleccionado:", selected); // Aquí puedes manejar el valor seleccionado
    console.log("ylabel actualizado:", ylabel);
    console.log(xlabel); // Aquí puedes manejar el valor seleccionado
    setSelectedVariable(selected);
  };

  const data = {
    xlabel,
    ylabel,
    label,
  };

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppHeader
          lugar={name}
          temp={temp}
          feels_like={feels_like}
          description2={description2}
          img={`dashboard/img/${description2}.png`}
          sunrise={sunrise}
          sunset={sunset}
        />
        <Stack
          direction="row"
          spacing={2}
          sx={{
            justifyContent: "center",
            alignItems: "stretch",
          }}
        >
          <Box
            sx={{
              maxWidth: 500, // Define el ancho máximo
              margin: "0 auto", // Centra el grid horizontalmente
              padding: 2, // Opcional: agrega padding
              border: "3px solid #000000",
              textAlign: "center",
            }}
          >
            <Typography>Today's overview:</Typography>
            <Grid container spacing={2}>
              {/* Primera fila */}
              <Grid size={6}>
                <IndicatorWeather
                  title="Wind Speed"
                  image="dashboard/img/wind.png"
                  value={windSpeed}
                />
              </Grid>

              <Grid size={6}>
                <IndicatorWeather
                  title="Rain Chance"
                  image="dashboard/img/rainy.png"
                  value={probability + " %"}
                />
              </Grid>

              {/* Segunda fila */}
              <Grid size={6}>
                <IndicatorWeather
                  title="Humidity"
                  image="dashboard/img/humidity.png"
                  value={humidity}
                />
              </Grid>
              <Grid size={6}>
                <IndicatorWeather
                  title="Pressure"
                  image="dashboard/img/humidity.png"
                  value={pressure}
                />
              </Grid>
            </Grid>
          </Box>
          <Box
            sx={{
              maxWidth: 500, // Define el ancho máximo
              border: "3px solid #000000", // Opcional: estilo de borde
              padding: 2, // Agrega padding

              margin: "0 auto", // Centra el contenedor horizontalmente
              textAlign: "center", // Centra el texto internamente
              display: "flex", // Necesario para alinear elementos con flexbox
              flexDirection: "column", // Asegura que los elementos estén en columna
              alignItems: "center", // Centra horizontalmente
              justifyContent: "center", // Centra verticalmente
            }}
          >
            <Typography>Next days</Typography>
            <NextDays itemsIn={day} />
          </Box>
        </Stack>

        <Stack
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center", // Centrado horizontal o vertical según el diseño
            alignItems: "center", // Centrado horizontal o vertical según el diseño
            pb: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center", // Centrado horizontal o vertical según el diseño
              alignItems: "center", // Centrado horizontal o vertical según el diseño
            }}
          >
            <Box
              sx={{
                maxWidth: 400, // Define el ancho máximo
                mr:5,
              }}
            >
              <ControlWeather onSelectionChange={handleSelectionChange} />
            </Box>

            <Box
              sx={{
                mt: 9,
              }}
            >
              <LineChartWeather
                xlabel={data.xlabel}
                ylabel={data.ylabel}
                label={data.label}
              />
            </Box>
          </Box>
          <Box
            sx={{
              mt: 9,
            }}
          >
            <TableWeather itemsIn={items} />
          </Box>
        </Stack>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
/*npm run dev*/
