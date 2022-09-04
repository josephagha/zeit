import styles from "./startingPage.module.scss";

import Header from "../layout/Header";


function StartingPageContent({weather}) {
  return (
    <section className="container">
      <Header weather={weather} />
    </section>
  );
}

export default StartingPageContent;
