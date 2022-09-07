import Image from "next/image";
import Link from "next/link";

import logo from "../../public/svg/logo.svg";
import styles from "./header.module.scss";

import Weather from "../weather/index";

function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.nav__list}>
          <li className={`${styles.nav__list__item}`}>ABO</li>
          <li className={`${styles.nav__list__item}`}>SHOP</li>
          <li className={`${styles.nav__list__item}`}>AKADEMIE</li>
          <li className={`${styles.nav__list__item}`}>JOBS</li>
          <li
            className={`${styles.nav__list__item} ${styles.categoryNav__list__item_more}`}
          >
            MEHR
          </li>
          <li className={`${styles.nav__list__item}`}>
            <Weather />
          </li>
        </ul>
        <ul className={styles.nav__list}>
          <li className={`${styles.nav__list__item}`}>E-PAPER</li>
          <li className={`${styles.nav__list__item}`}>AUDIO</li>
          <li className={`${styles.nav__list__item}`}>APPS</li>
          <li className={`${styles.nav__list__item}`}>ARCHIV</li>
          <li className={`${styles.nav__list__item}`}>
            MERKLISTE{" "}
            <i
              className={
                styles.nav__list__item__bookmarkIcon + " aicon-bookmark"
              }
            ></i>
          </li>
          <li className={`${styles.nav__list__item}`}>ANMELDEN</li>
        </ul>
      </nav>

      <div className={styles.subnav}>
        <Link href="/" className={styles.subnav__logo}>
          <a>
            <Image className={styles.subnav__logo__svg} src={logo} alt="Logo" priority/>
          </a>
        </Link>
        <div className={styles.subnav__search}>
          <input className={styles.subnav__search__input} placeholder="Suche" />
          <button className={styles.subnav__search__button}>
            <i className="aicon-search"></i>
          </button>
        </div>
      </div>

      <div className={styles.categoryNav}>
        <ul className={styles.categoryNav__list}>
          <li className={`${styles.categoryNav__list__item}`}>Politik</li>
          <li className={`${styles.categoryNav__list__item}`}>Gesellschaft</li>
          <li className={`${styles.categoryNav__list__item}`}>Wirtschaft</li>
          <li
            className={`${styles.categoryNav__list__item}  ${styles.categoryNav__list__item_more}`}
          >
            Kultur
          </li>
          <li className={`${styles.categoryNav__list__item}`}>Wissen</li>
          <li
            className={`${styles.categoryNav__list__item}  ${styles.categoryNav__list__item_more}`}
          >
            Gesundheit
          </li>
          <li className={`${styles.categoryNav__list__item}`}>Digital</li>
          <li
            className={`${styles.categoryNav__list__item}  ${styles.categoryNav__list__item_more}`}
          >
            Campus
          </li>
          <li className={`${styles.categoryNav__list__item}`}>Sinn</li>
          <li className={`${styles.categoryNav__list__item}`}>ZEITmagazin</li>
          <li
            className={`${styles.categoryNav__list__item}  ${styles.categoryNav__list__item_more}`}
          >
            mehr
          </li>
          <li
            className={`${styles.categoryNav__list__item}  ${styles.categoryNav__list__item__zplusIcon}`}
          >
            <i className="aicon-zplus"></i>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
