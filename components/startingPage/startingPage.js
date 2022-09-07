import styles from "./startingPage.module.scss";

import Header from "../layout/Header";

function StartingPageContent() {
  return (
    <section className={ `container ${styles.startpage_container}`}>
      <Header />
    </section>
  );
}

export default StartingPageContent;
