import DatePicker from 'react-datepicker'
import { useState } from 'react'
import DatePickerProps from '../../interfaces/datepicker.props.interface'

function MyDatePicker(props: DatePickerProps) {
  const [date, setDate] = useState(new Date())
  const handleSetDate = (value: Date) => {
    setDate(value)
    props.liftingDatePickerValueUp(value)
  }

  return (
    <DatePicker
      selected={date}
      onChange={(date: Date) => handleSetDate(date)}
      id={props.id}
    />
  )
}

export default MyDatePicker
