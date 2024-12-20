import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import Itemm from "../interface/item.tsx";
import theme from "../config/theme.ts";

{
  /* Hooks */
}
import { useEffect, useState } from "react";

interface MyProp {
  itemsIn: Itemm[];
}

export default function BasicTable(props: MyProp) {
  let [rows, setRows] = useState<Itemm[]>([]);

  useEffect(() => {
    setRows(props.itemsIn);
  }, [props]);

  return (
    <TableBody
      sx={{
        bgcolor: theme.palette.info.contrastText,
        "& .MuiTableCell-root": {
          textAlign: "center",
          verticalAlign: "middle",
        },
      }}
    >
      <TableRow>
        <TableCell>From</TableCell>
        <TableCell>To</TableCell>
        <TableCell>Temp (K)</TableCell>
        <TableCell>Rain Prob. (%)</TableCell>
        <TableCell>Wind Speed (m/s)</TableCell>
        <TableCell>Humidity (%)</TableCell>
        <TableCell>Pressure (hPa)</TableCell>
      </TableRow>
      {rows.map((row, idx) => (
        <TableRow
          key={idx}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <TableCell component="th" scope="row">
            {row.dateStart}
          </TableCell>
          <TableCell>{row.dateEnd}</TableCell>
          <TableCell>{row.temp}</TableCell>
          <TableCell>{row.rainProb}</TableCell>
          <TableCell>{row.windSpeedC}</TableCell>
          <TableCell>{row.humedad}</TableCell>
          <TableCell>{row.pressureC}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
