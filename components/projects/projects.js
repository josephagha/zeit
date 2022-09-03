import React, { useState, useEffect } from "react";

import Loding from "../sharing/loding";
import ProjectCard from "./project/card/projectCard";
import styles from "./projects.module.scss";

function Projects() {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState(null);
  const [error, setError] = useState();

  useEffect(() => {
    fetch("api/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data.data);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loding/>;

  return (
    <div className={styles.ProjectsContainer}>
      {projects.map((project) => {
        return (
          <ProjectCard data={project} key={project._id} />
        );
      })}
    </div>
  );
}

export default Projects;
