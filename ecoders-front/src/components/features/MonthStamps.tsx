import { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
// import Stamp from "./Stamp";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];


function MonthStamps () {
    const [ value, onChange ] = useState<Value>(new Date());


  return (
    <div>
        <Calendar
            onChange={onChange}
            value={value}
            />
    </div>
  );
}

export default MonthStamps;