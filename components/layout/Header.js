import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

import logo from "../../public/svg/logo.svg";
import styles from "./header.module.scss";

function Header() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  function logoutHandler() {
    signOut();
  }

  return (
    <header className={styles.header}>
      <Link href="/">
        <a>
          <Image src={logo} alt="Logo" />
        </a>
      </Link>
      <nav className={styles.nav}>
        <input className={styles.input} type="checkbox" id="menu" name="menu" />
        <label className={styles.label} htmlFor="menu">
          <i className={"aicon-menu " + styles.title_arrow}></i>
        </label>
        <div className={styles.content}>
          <div className={styles.menuItem}>
            <Link href="/">Projektübersicht</Link>
          </div>
          {status !== "authenticated" && !loading && (
            <div className={styles.menuItem}>
              <Link href="/auth">Login</Link>
            </div>
          )}
          {status === "authenticated" && (
            <div className={styles.menuItem}>
              <Link href="/dashboard">Dashboard</Link>
            </div>
          )}
          {status === "authenticated" && (
            <div className={styles.menuItem}>
              <span className={"separator "}></span>

              <button className={styles.button} onClick={logoutHandler}>
                <i className={"aicon-exit " + styles.icon}></i> Logout
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
