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
    cancel: () => void;
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
            />

            <textarea
                className={styles.description}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <div className={styles.buttons}>
                <button onClick={() => {save({...card, title:title, description:description});}}>Save</button>
                <button onClick={() => cancel()}>Cancel</button>
            </div>
        </div>
    )
}