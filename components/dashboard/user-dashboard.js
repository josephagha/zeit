import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import Header from "../layout/Header";
import Breadcrumb from "../sharing/breadcrumb";
import styles from "./user-dashboard.module.scss";

function UserProfile() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  async function changePasswordHandler(passwordData) {
    const response = await fetch("/api/user/change-password", {
      method: "PATCH",
      body: JSON.stringify(passwordData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
  }

  return (
    <section className="container">
      <Header />
      <Breadcrumb currentPageTitle="dashboard" currentPageSlug="dashboard" />
      <div className={styles.div_container}>
        <div className={styles.content}>
          <div className={styles.linkContainer}>
            <Link href={"/dashboard/new-project"}>
              <a className={styles.link}>
                <i className={styles.link_icon + " aicon-angle-right"}></i>
                <div className={styles.link_text + " typography_body1"}>
                  Neues Projekt hinzufügen
                </div>
              </a>
            </Link>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.linkContainer}>
            <Link href={"/dashboard/new-subproject"}>
              <a className={styles.link}>
                <i className={styles.link_icon + " aicon-angle-right"}></i>
                <div className={styles.link_text + " typography_body1"}>
                  Neues Teilprojekt hinzufügen
                </div>
              </a>
            </Link>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.linkContainer}>
            <Link href={"/dashboard/edit-projects"}>
              <a className={styles.link}>
                <i className={styles.link_icon + " aicon-angle-right"}></i>
                <div className={styles.link_text + " typography_body1"}>
                Projekt bearbeiten
                </div>
              </a>
            </Link>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.linkContainer}>
            <Link href={"/dashboard/edit-subprojects"}>
              <a className={styles.link}>
                <i className={styles.link_icon + " aicon-angle-right"}></i>
                <div className={styles.link_text + " typography_body1"}>
                Teilprojekt bearbeiten
                </div>
              </a>
            </Link>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.linkContainer}>
            <Link href={"/dashboard/new-password"}>
              <a className={styles.link}>
                <i className={styles.link_icon + " aicon-angle-right"}></i>
                <div className={styles.link_text + " typography_body1"}>
                  Passwort ändern
                </div>
              </a>
            </Link>
          </div>
        </div>
      </div>

      {/*  <ChangePasswordForm onChangePassword={changePasswordHandler} />
      <AddNewProject />
      <AddNewSubproject />
      <Footer /> */}
    </section>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default UserProfile;
