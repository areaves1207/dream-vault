import styles from './NewDreamCard.module.css'

type NewDreamCardProps = {
    onClick: () => void;
};

export default function NewDreamCard({ onClick }: NewDreamCardProps){
    return(
        <div className={styles.card} onClick={onClick}>
            Add a new dream
        </div>
    )
}