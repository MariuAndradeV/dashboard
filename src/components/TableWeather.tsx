import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import Item from '../interface/item.tsx';
import theme from '../config/theme.ts';

{/* Hooks */ }
import { useEffect, useState } from 'react'; 

interface MyProp {
  itemsIn: Item[];
}

export default function BasicTable(props: MyProp) { 
  let [rows, setRows] = useState<Item[]>([])

  useEffect( ()=> {
    setRows(props.itemsIn)
  }, [props])

  return(
    <TableBody sx={{bgcolor: theme.palette.info.contrastText}}>
       <TableRow>
          <TableCell>Hora de inicio</TableCell>
          <TableCell align="right">Hora de fin</TableCell>
          <TableCell align="right">Precipitación</TableCell>
          <TableCell align="right">Humedad</TableCell>
          <TableCell align="right">Nubosidad</TableCell>
      </TableRow>
      {rows.map((row, idx) => (
        <TableRow
          key={idx}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component="th" scope="row">
            {row.dateStart}
          </TableCell>
          <TableCell component="th" scope="row">
            {row.dateEnd}
          </TableCell>
          <TableCell component="th" scope="row">
            {row.rainProb}
          </TableCell>
          <TableCell component="th" scope="row">
            {row.humidity}
          </TableCell>
          <TableCell component="th" scope="row">
            {row.description}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>

  )



}
