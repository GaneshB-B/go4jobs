import { TableRow, TableCell } from '@mui/material'

{/* Hover Table Row */}
export const HoverTableRow = (props) => {
  return (
    <TableRow hover>
      {props.children}
    </TableRow>
  )
}

{/* Centered Table Cell */}
export const CenteredTableCell = (props) => {
  return (
    <TableCell align='center' colSpan={props.colSpan}>
      {props.children}
    </TableCell>
  )
}
