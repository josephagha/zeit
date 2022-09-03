import styles from "./breadcrumb.module.scss";
import Link from "next/link";

function Breadcrumb({ currentPageTitle, parentPage= "", currentPageSlug } = props) {
  return (
    <div className={styles.breadcrumb}>
      <Link href={"/"}>
        <a className={styles.breadcrumb_link}>
          <i className={styles.icon + " aicon-home"}></i>
        </a>
      </Link>
      <i className={styles.breadcrumb_separator + " aicon-angle-right"}></i>
      <Link href={"/" + parentPage+ currentPageSlug}>
        <a className={"typography_caption2-bold " + styles.breadcrumb_currentLink}>
          {currentPageTitle}
        </a>
      </Link>
    </div>
  );
}

export default Breadcrumb;
