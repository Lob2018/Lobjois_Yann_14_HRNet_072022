import DatePicker from 'react-datepicker'
import { useState } from 'react'

interface Props {
  id: string
  liftingDatePickerValueUp: (value: Date) => void
}

function MyDatePicker(props: Props) {
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
