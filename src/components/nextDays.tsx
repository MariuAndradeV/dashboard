import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import NextDaysItem from "../interface/nextDaysItem.tsx";
import theme from "../config/theme.ts";

{
  /* Hooks */
}
import { useEffect, useState } from "react";

interface MyProp {
  itemsIn: NextDaysItem[];
}

export default function NextDays(props: MyProp) {
  let [rows, setRows] = useState<NextDaysItem[]>([]);

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

      {rows.map((row, idx) => (
        <TableRow
          key={idx}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <TableCell component="th" scope="row"> {row.dayNextDays} </TableCell>
          <TableCell>{row.tempNextDays}</TableCell>
          <TableCell>
            <img
              src= {row.imgNextDays}
              alt= "Weather Icon"
              style={{ width: "50px", height: "50px" }}
            />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
