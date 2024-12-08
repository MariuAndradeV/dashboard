import './App.css'

import IndicatorWeather from './components/IndicatorWeather';
import TableWeather from './components/TableWeather';
import ControlWeather from './components/ControlWeather';
import LineChartWeather from './components/LineChartWeather';
import SunIndicator from './components/sunIndicator';
import SideNav from './components/SideNav';
import Items from './interface/item.tsx';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
// Grid version 2
import Grid from '@mui/material/Grid2' 

 {/* Hooks */ }
import { useEffect, useState } from 'react'; 


interface Indicator {
  title?: string;
  image?: string;
  subtitle?: string;
  value?: string;
}

interface Item {
  dateStart: String;
  dateEnd: String; 
  rainProb: String;
  humidity: String;
  description: String;
}

let name = '', 
    description = '', 
    rainProb = '', 
    windSpeed = '', 
    windSpeedUnit = '', 
    temp = '', 
    tempUnit = '', 
    feels_like = '', 
    humidity = '', 
    pressure = '', 
    sunrise = '', 
    sunset = '', 
    city = '', 
    country = '', 
    dt_txt = '',
    dateStart = '',
    dateEnd = '';



function App() {  
  {/* Variable de estado y función de actualización */}
  let [indicators, setIndicators] = useState<Indicator[]>([])
  let [items, setItems] = useState<Item[]>([])
  let [owm, setOWM] = useState(localStorage.getItem("openWeatherMap"))


  {/* Hook: useEffect */}
  useEffect(()=>{

    let request = async () => {

        {/* Referencia a las claves del LocalStorage: openWeatherMap y expiringTime */}
        let savedTextXML = localStorage.getItem("openWeatherMap") || "";
        let expiringTime = localStorage.getItem("expiringTime");

        {/* Obtenga la estampa de tiempo actual */}
        let nowTime = (new Date()).getTime();

        {/* Verifique si es que no existe la clave expiringTime o si la estampa de tiempo actual supera el tiempo de expiración */}
        if(expiringTime === null || nowTime > parseInt(expiringTime)) {
          {/* Request */}
          let API_KEY = "478ff9a97de78a1a3cbffeaeeeabb20b"
          let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=${API_KEY}`)
          let savedTextXML = await response.text();

          console.log(savedTextXML)

          {/* Tiempo de expiración */}
          let hours = 0.01
          let delay = hours * 3600000
          let expiringTime = nowTime + delay


          {/* En el LocalStorage, almacene el texto en la clave openWeatherMap, estampa actual y estampa de tiempo de expiración */}
          localStorage.setItem("openWeatherMap", savedTextXML)
          localStorage.setItem("expiringTime", expiringTime.toString())
          localStorage.setItem("nowTime", nowTime.toString())

          {/* DateTime */}
          localStorage.setItem("expiringDateTime", new Date(expiringTime).toString())
          localStorage.setItem("nowDateTime", new Date(nowTime).toString())

          {/* Modificación de la variable de estado mediante la función de actualización */ }
          setOWM( savedTextXML )
        }

        {/* Valide el procesamiento con el valor de savedTextXML */}
        if( savedTextXML ) {
          {/* XML Parser */}
          const parser = new DOMParser();
          const xml = parser.parseFromString(savedTextXML, "application/xml");
          
          {/* Arreglo para agregar los resultados */}

          let dataToIndicators : Indicator[] = new Array<Indicator>();
          let dataToItems : Item[] = new Array<Item>();
          
          
          {/* 
              Análisis, extracción y almacenamiento del contenido del XML 
              en el arreglo de resultados
          */}
          
          name = xml.getElementsByTagName("name")[0].innerHTML || ""
          let location = xml.getElementsByTagName("location")[1]
          let location1 = xml.getElementsByTagName("location")[0]
          /*let time = xml.getElementsByTagName("forecast")[0].getElementsByTagName("time")
          console.log(time)
          description = time.getElementsByTagName("symbol")[0].getAttribute("name") || ""
          rainProb = time.getElementsByTagName("precipitation")[0].getAttribute("probability") || ""
          
          windSpeed = `${time.getElementsByTagName("windSpeed")[0].getAttribute("mps") || ""} ${time.getElementsByTagName("windSpeed")[0].getAttribute("unit") || ""}`.trim(); 

          temp = time.getElementsByTagName("temperature")[0].getAttribute("value") || ""
          tempUnit = time.getElementsByTagName("temperature")[0].getAttribute("unit") || ""
          feels_like = time.getElementsByTagName("feels_like")[0].getAttribute("value") || ""
          
          pressure = `${time.getElementsByTagName("pressure")[0].getAttribute("value") || ""} ${time.getElementsByTagName("pressure")[0].getAttribute("unit") || ""}`.trim();

          humidity = `${time.getElementsByTagName("humidity")[0].getAttribute("value") || ""} ${time.getElementsByTagName("humidity")[0].getAttribute("unit") || ""}`.trim();
          
          /*sunrise = xml.getElementsByTagName("sun")[0].getAttribute("rise") || ""
          sunset = xml.getElementsByTagName("sun")[0].getAttribute("set") || ""
          
          city = location1.getElementsByTagName("name")[0].innerHTML || ""
          country = location1.getElementsByTagName("country")[0].innerHTML || ""
          
          dt_txt = `${time.getAttribute("from") || ""} ${time.getAttribute("to") || ""}`.trim();
          dateStart = time.getAttribute("from") || "";
          dateEnd = time.getAttribute("to") || ""; */


          {/* Modificación de la variable de estado mediante la función de actualización */}
          setIndicators( dataToIndicators)

            for (let i = 0; i < 6; i++){
              let time = xml.getElementsByTagName("forecast")[0].getElementsByTagName("time")[i]
              description = time.getElementsByTagName("clouds")[0].getAttribute("all") || ""
              rainProb = time.getElementsByTagName("precipitation")[0].getAttribute("probability") || ""
              humidity = `${time.getElementsByTagName("humidity")[0].getAttribute("value") || ""} ${time.getElementsByTagName("humidity")[0].getAttribute("unit") || ""}`.trim();

              dateStart = time.getAttribute("from") || "";
              dateStart = dateStart.split("T")[1]; // "12:00:00"

              dateEnd = time.getAttribute("to") || "";   
              dateEnd = dateEnd.split("T")[1]; // "12:00:00"

              
              dataToItems.push({ dateStart, dateEnd, rainProb, humidity, description });
              setItems(dataToItems);
            }

          



        }
    } 
    request();

  },[owm])

  let renderIndicators = () => {
    return indicators
            .map(
                (indicator, idx) => (
                    <Grid key={idx} size={{ xs: 12, xl: 3 }}>
                        <IndicatorWeather 
                            title={indicator["title"]} 
                            image={indicator["image"]} 
                            subtitle={indicator["subtitle"]} 
                            value={indicator["value"]} />
                    </Grid>
                )
            )
  }

  return (
    <Box>
      <SideNav/>

      <Typography variant="h5" sx={{textAlign: 'left', mb: 1}}>Today overview: </Typography>

      <Grid container spacing={5}>
          {/* Indicadores */}
          <Grid size={{ xs: 12, xl: 3 }}>  
            <IndicatorWeather title={'Wind Speed'} image={'dashboard/img/wind.png'} subtitle={"Unidad 1"} value={windSpeed} /> 
          </Grid> 

          <Grid size={{ xs: 12, xl: 3 }}>
            <IndicatorWeather title={'Rain Chance'} image={'dashboard/img/rainy.png'} subtitle={'Unidad 2'} value={rainProb} />
          </Grid>
          
          <Grid size={{ xs: 12, xl: 3 }}> 
            <IndicatorWeather title={'Huminity'} image={'dashboard/img/humidity.png'} subtitle={'Unidad 3'} value={humidity} />
          </Grid>
          
          <Grid size={{ xs: 12, xl: 3 }}> 
            <IndicatorWeather title={'Atmospheric Pressure'} image={'dashboard/img/flexibility.png'} subtitle={'Unidad 4'} value= {pressure} />
          </Grid>

          {/* Tabla */}
          <Grid size={{ xs: 12, xl: 8 }}>
            {/* Grid Anidado */}
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, xl: 3 }}>
                <ControlWeather/>
              </Grid>
              <Grid size={{ xs: 12, xl: 9 }}>
              <TableWeather itemsIn={ items } />

              </Grid>
            </Grid>
          </Grid>

          {/* Gráfico */}
          <Grid size={{ xs: 12, xl: 4 }}>
            <LineChartWeather/>
          </Grid>
          {renderIndicators()}

          <Grid>
            <SunIndicator title={'Sunrise'} image={'dashboard/img/sunrise (1).png'} value= {sunrise} />
          </Grid>
          <Grid>
            <SunIndicator title={'Sunset'} image={'dashboard/img/sunset (1).png'} value= {sunset} />
          </Grid>

      </Grid>

    </Box>

)
}

export default App
/*npm run dev*/ 