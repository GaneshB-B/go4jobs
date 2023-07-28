import { TextField } from '@mui/material'
import { handleStatusChange } from '../../common/helpers'

export const StatusSelector = (props) => {
  return (
    <TextField
      fullWidth
      label="Status Filter"
      onChange={(e) => handleStatusChange(e, props.handler)}
      select
      SelectProps={{ native: true }}
      value={props.default}
      variant="outlined"
    >
      {
        props.list.map((option) => (
          <option
            key={option.id}
            value={option.id}
          >
            {option.status}
          </option>
        ))
      }
    </TextField>
  )
}
