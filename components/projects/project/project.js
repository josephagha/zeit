import styles from "./project.module.scss";
import ProjectHeader from "./projectHeader";
import ProjectCard from "./card/projectCard";
import ProjectCards from "./card/projectCards";

function Project({ data } = props) {
  const { icon, title, description, pages } = data;

  return (
    <div className={styles.div_container}>
      <ProjectHeader icon={icon} title={title} desc={description} />
      <ProjectCards pages={pages} />
    </div>
  );
}

export default Project;
