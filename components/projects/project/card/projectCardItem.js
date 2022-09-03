import styles from "./projectCardItem.module.scss";
import Badge from "../../../sharing/badge";

const ProjectCardItem = ({ data } = props) => {
  const {
    title,
    projectTitle,
    projectStatus,
    description,
    touchPoint,
    requestedBy,
    workOnIt,
    projectLink,
    workSteps,
    note,
  } = data;

  const { mobile, desktop, tv } = touchPoint;
  const {
    wireframe,
    desktopDesign,
    mobileDesign,
    testDesign,
    componentDesc,
    testDesignAfterImplementing,
  } = workSteps;

  return (
    <div className={styles.tab}>
      {/* radio checkbox */}
      <input type="checkbox" id={title} name={projectTitle} />
      <label htmlFor={title}>
        <span className={styles.title}>
          <i className={"aicon-chevron-up " + styles.title_arrow}></i>
          <p className="typography_body2">{title}</p>
        </span>
        <span className={styles.tab_statusInfo}>
          {mobile ? (
            <i className={"aicon-smartphone " + styles.tab_statusInfo_icon}></i>
          ) : null}
          {desktop ? (
            <i className={styles.tab_statusInfo_iconSeparator}></i>
          ) : null}
          {desktop ? (
            <i className={`aicon-desktop ${styles.tab_statusInfo_icon}`}></i>
          ) : null}
          {tv ? <i className={styles.tab_statusInfo_iconSeparator}></i> : null}
          {tv ? (
            <i className={"aicon-tv " + styles.tab_statusInfo_icon}></i>
          ) : null}
          <Badge status={projectStatus} />
        </span>
      </label>
      <div className="typography_body2">
        {description}
        <span className="typography_in-block"></span>
        Angefordert von:{" "}
        <strong className="typography_body2-bold textAIDAgrey_darker">
          {requestedBy}
        </strong>
        <br />
        Bearbeitet von:{" "}
        <strong className="typography_body2-bold typography_white-space textAIDAgrey_darker">
          {workOnIt}
        </strong>
        <span className="typography_in-block"></span>
        <a
          className={styles.projectLink}
          href={projectLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          Link zum Projekt auf Figma
        </a>
        <ul className={styles.descList}>
          <li>
            <i className={`aicon-check ${wireframe || "textAIDAgrey"}`}></i>{" "}
            Wireframe für das Konzept
          </li>
          <li>
            <i className={`aicon-check ${desktopDesign || "textAIDAgrey"}`}></i>{" "}
            Design für kleinen Bildschirm
          </li>
          <li>
            <i className={`aicon-check ${mobileDesign || "textAIDAgrey"}`}></i>{" "}
            Design für große Bildschirme
          </li>
          <li>
            <i className={`aicon-check ${testDesign || "textAIDAgrey"}`}></i>{" "}
            Design testing
          </li>
          <li>
            <i className={`aicon-check ${componentDesc || "textAIDAgrey"}`}></i>{" "}
            Komponentenbeschreibung
          </li>
          <li>
            <i
              className={`aicon-check ${
                testDesignAfterImplementing || "textAIDAgrey"
              }`}
            ></i>{" "}
            Komponententest nach der Implementierung
          </li>
        </ul>
        {note.length <= 0 ? (
          true
        ) : (
          <>
            <p className={styles.note}>
              <i className={styles.note_icon + " aicon-info-circle"}></i>
              {note}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectCardItem;
