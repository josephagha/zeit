import React, { useState, useEffect } from "react";
import styles from "./projectCards.module.scss";
import ProjectCard from './projectCard'

function ProjectCards({ pages } = props) {
/*   const [loading, setLoading] = useState(false);
  const chunk_size = 5;
  let chunks = [];
  let cards = [];

  useEffect(() => {
    for (const cols = Object.entries(pages); cols.length; ) {
      chunks.push(
        cols.splice(0, chunk_size).reduce((o, [k, v]) => ((o[k] = v), o), {})
      );
    }

    chunks.forEach((element) => {
      cards.push(<ProjectCard cards={element} key={Math.random()} />);
    });
  
  }, pages);


  pages.map((element)=> cards={element})

  
if (cards.length !== 0) {
  return <p>Loading...</p>;
}
  return <div className={styles.div_container}>
           <ProjectCard />
         </div>; */
}

export default ProjectCards;
