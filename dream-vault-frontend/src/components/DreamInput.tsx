import styles from "./DreamInput.module.css"
import { useState } from 'react';

export type DreamCardProps = {
    id: number,
    title: string,
    description: string,
}

type DreamInputProps = {
    card: DreamCardProps;
    save: (card: DreamCardProps) => void;
    cancel: (card: DreamCardProps) => void;
};

export default function DreamInput({card, save, cancel}: DreamInputProps){
    const [title, setTitle] = useState(card.title);
    const [description, setDescription] = useState(card.description);

    return(
        <div className={styles.dreamInput}>
            <input
                className={styles.title}
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title your dream"
            />

            <textarea
                className={styles.description}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your dream..."
            />

            <div className={styles.buttons}>
                <button className={styles.button} onClick={() => {save({...card, title:title, description:description});}}>Save</button>
                <button className={styles.button} onClick={() => cancel(card)}>Cancel</button>
            </div>
        </div>
    )
}