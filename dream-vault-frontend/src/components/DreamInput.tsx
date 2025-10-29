import styles from "./DreamInput.module.css"
import { useState } from 'react';

type DreamInputProps = {
    initTitle: string;
    initDescription: string;
    save: (title: string, description: string) => void;
    cancel: () => void;
};

export default function DreamInput({initTitle, initDescription, save, cancel}: DreamInputProps){
    const [title, setTitle] = useState(initTitle);
    const [description, setDescription] = useState(initDescription);

    return(
        <div className={styles.dreamInput}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <div className={styles.buttons}>
                <button onClick={() => save(title, description)}>Save</button>
                <button onClick={() => cancel()}>Cancel</button>
            </div>
        </div>
    )
}