import styles from './DreamCardTitle.module.css';

type TitleText = {
    text: string;
};

function DreamCardTitle({ text }: TitleText){
    return(
        <div className={styles.title}>
            {text ? text : "Title not found"}
        </div>
    )
}

export default DreamCardTitle