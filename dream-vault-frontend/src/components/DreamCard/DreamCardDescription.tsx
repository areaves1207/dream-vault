import styles from "./DreamCardDescription.module.css";

type DescriptionText = {
  text: string;
};

function DreamCardDescription({ text }: DescriptionText) {
  return (
    <div className={styles.description}>
      {text ? text : "Missing Description"}
    </div>
  );
}

export default DreamCardDescription;
