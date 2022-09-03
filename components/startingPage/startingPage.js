import styles from "./startingPage.module.scss";

import Header from "../layout/Header";
import Footer from "../layout/Footer";

import Projects from "../projects/projects";

function StartingPageContent() {
  // Show Link to Login page if NOT auth

  return (
    <section className="container">
      <Header />
      <p className={styles.subBoldTitle + " typography_hairline-large"}>UX/UI Team</p>
      <h1 className={styles.title + " typography_h1"}>Project Overview</h1>
      <Projects />
      <Footer />
    </section>
  );
}

export default StartingPageContent;
