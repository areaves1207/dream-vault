import Calendar from "react-calendar";
import styles from "./DreamInput.module.css"
import { useState } from 'react';

export type DreamCardProps = {
    id: number,
    title: string,
    description: string,
    date: Date
}

type DreamInputProps = {
    card: DreamCardProps;
    save: (card: DreamCardProps) => void;
    cancel: () => void;
};

type DateValue = Date | null;

export default function DreamInput({card, save, cancel}: DreamInputProps){
    const [title, setTitle] = useState(card.title);
    const [description, setDescription] = useState(card.description);
    const [date, setDate] = useState<DateValue>(card.date);
    const [calendarOpen, setCalendarOpen] = useState(false);


    return(
        

        <div className={styles.dreamInput}>
            {calendarOpen && <Calendar className={styles.calendar} selectRange={false} onChange={(value) => {setDate(value as Date); setCalendarOpen(false)}} value={date} minDetail="year"/>}
            <div className={styles.header}>
                <input
                    className={styles.title}
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title your dream"
                    maxLength={35}
                />
                <div className={styles.calendarSelectArea} onClick={() => setCalendarOpen(true)}>
                    <p className={styles.calendarIcon}>&#128197;</p>
                    <p className={styles.calendarText}>{date?.toLocaleDateString()}</p>
                </div>
            </div>

            <textarea
                className={styles.description}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your dream..."
            />

            <div className={styles.buttons}>
                <button className={styles.button} onClick={() => {save({...card, title:title, description:description, date:date ?? new Date(1999, 1, 1)});}}>Save</button>
                <button className={styles.button} onClick={() => cancel()}>Cancel</button>
            </div>
        </div>
    )
}