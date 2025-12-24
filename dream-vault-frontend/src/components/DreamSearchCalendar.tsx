import Calendar from "react-calendar";
import type { Dream } from "../types";
import { useMemo, useState } from "react";

type CardListProps = {
    dreams: Dream[];
    onSelectDream: (selectedDreams: Dream[]) => void;
};

export default function DreamSearchCalendar({ dreams, onSelectDream }: CardListProps) {
  const [value, setValue] = useState<Date | null>(null);

  const dreamDates = useMemo(() => {
    const map = new Map<string, Dream[]>();
    dreams.forEach(dream => {
      const day = dream.date.slice(0, 10);
      if (!map.has(day)) map.set(day, []);
      map.get(day)?.push(dream);
    });
    return map;
  }, [dreams]);

  const tileContent = ({ date, view }:{ date: Date; view: string }) => {
    if (view === "month") {
      const isoDate = date.toISOString().slice(0, 10);
      if (dreamDates.has(isoDate)) {
        return <div className="dot" />; // style as small colored circle
      }
    }
    return null;
  };

  return (
    <Calendar
      value={value}
      onChange={(date) => {
        setValue(date as Date);
        const isoDate = (date as Date).toISOString().slice(0, 10);
        if (dreamDates.has(isoDate)) {
          onSelectDream(dreamDates.get(isoDate) as Dream[]);
        }
      }}
      tileContent={tileContent}
      minDetail="year" // allows quick month/year navigation
      maxDetail="month"
    />
  );
}
