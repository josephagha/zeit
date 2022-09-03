import styles from "./projectHeader.module.scss";

function ProjectHeader({icon,title,description}=props) {
  return (
    <div className={styles.projectHeader}>
      <div className={styles.content}>
        <i className={"aicon-"+icon + " icon48px textAIDAgrey_darker"}></i>
        <div className={styles.text}>
          <p className={styles.title + " typography_hairline-large"}>{title}</p>
          <p className={styles.describe + " typography_body2"}>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default ProjectHeader;
