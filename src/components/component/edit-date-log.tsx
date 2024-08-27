import { SetStateAction, useRef } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "../ui/button";

const EditDateLog = (
  { date, setDate, doTheHonours }: { date: Date | null, setDate: React.Dispatch<SetStateAction<Date | null>>, doTheHonours: () => void }
) => {
  const dateRef = useRef<DatePicker>(null);
  const editDate = () => {
    if (dateRef.current) {
      (dateRef.current.setFocus as () => void)();
    }
  }
  return (
    <div className="flex">
      <DatePicker
        selected={date}
        onChange={(date: Date | null) => setDate(date)}
        className="p-2 w-32 pl-7 border-none focus:border-none focus:outline-none"
        ref={dateRef}
      />
      <Button className="mr-3" onClick={editDate}>
        Edit
      </Button>
      <Button onClick={doTheHonours}>
        View
      </Button>
    </div>
  )
}
export default EditDateLog;

