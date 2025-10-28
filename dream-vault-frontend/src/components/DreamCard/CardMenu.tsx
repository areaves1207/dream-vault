import styles from './CardMenu.module.css'

type MenuProps = {
    onEdit: () => void;
    onDelete: () => void;
    onClose: () => void;
};

export default function MenuButton({onEdit, onDelete, onClose}: MenuProps){
    return(
        <ul className={styles.ul}>
            <li className={styles.li} onClick={() => {onEdit(); onClose();}}>Edit</li>
            <li className={styles.li} onClick={() => {onDelete(); onClose()}}>Delete</li>
        </ul>
    )
}