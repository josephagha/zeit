import Link from "next/link";
import styles from "./projectCard.module.scss";

function ProjectCard({ data } = props) {
  const { slug, icon, title, accomplished, pages } = data;

  return (
    <div className={styles.div_container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <i
            className={
              styles.header_icon + " " + "aicon-"+icon + " icon48px textAIDAgrey_darker"
            }
          ></i>
          <p className={styles.header_title + " typography_body1-bold"}>
            {title}
          </p>
        </div>
        <div className={styles.infos}>
          <div className={styles.infos_info}>
            <p className={"typography_caption1 " + styles.info_title}>
              Subprojects
            </p>
            <div className={styles.info_facts}>
              <i className={styles.info_facts_icon + " aicon-layer-group"}></i>
              <p className={styles.info_facts_title + " typography_body1"}>
                {pages.length}
              </p>
            </div>
          </div>
          <div className={styles.infos_info}>
            <p className={"typography_caption1 " + styles.info_title}>Pages</p>
            <div className={styles.info_facts}>
              <i className={styles.info_facts_icon + " aicon-file-text"}></i>
              <p className={styles.info_facts_title + " typography_body1"}>
                {pages.length}
              </p>
            </div>
          </div>
          <div className={styles.infos_info}>
            <p className={"typography_caption1 " + styles.info_title}>
              Accomplished
            </p>
            <div className={styles.info_facts}>
              <i className={styles.info_facts_icon + " aicon-grid"}></i>
              <p className={styles.info_facts_title + " typography_body1"}>
                {accomplished}%
              </p>
            </div>
          </div>
        </div>
        <div className={styles.linkContainer}>
          <Link href={"/project/" + slug}>
            <a className={styles.link}>
              <i className={styles.link_icon + " aicon-angle-right"}></i>
              <div className={styles.link_text + " typography_body1"}>
                Projekt im Detail
              </div>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
