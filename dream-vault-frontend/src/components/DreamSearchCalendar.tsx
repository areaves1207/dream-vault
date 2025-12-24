import Calendar from "react-calendar";
import type { Dream } from "../types";
import { useMemo, useState } from "react";
import style from "./DreamSearchCalendar.module.css";

type CardListProps = {
  dreams: Dream[];
  onSelectDream: (selectedDreams: Dream[]) => void;
};

export default function DreamSearchCalendar({
  dreams,
  onSelectDream,
}: CardListProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const dreamDates = useMemo(() => {
    const map = new Map<string, Dream[]>();
    dreams.forEach((dream) => {
      const day = dream.date.slice(0, 10);
      if (!map.has(day)) map.set(day, []);
      map.get(day)?.push(dream);
    });
    return map;
  }, [dreams]);

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      const isoDate = date.toISOString().slice(0, 10);
      if (dreamDates.has(isoDate)) {
        return <div className={style.dot} />;
      }
    }
    return null;
  };

  return (
    <div className={style.wrapper}>
      <Calendar
        value={selectedDate}
        onChange={(date) => {
          setSelectedDate(new Date(date as Date));
          const isoDate = (date as Date).toISOString().slice(0, 10);
          if (dreamDates.has(isoDate)) {
            onSelectDream(dreamDates.get(isoDate) as Dream[]);
          }
        }}
        tileContent={tileContent}
        minDetail="year"
        maxDetail="month"
      />
    </div>
  );
}
