import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import styles from "./editSubprojects.module.scss";

import Loding from "../../../sharing/loding";

function EditProjects() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState(null);
  const [error, setError] = useState();

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data.data);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loding />;

  return (
    <div className={styles.div_container}>
      {projects.map((project, index) => {
        return (
          <div className={styles.content} key={index}>
            <div className={styles.linkContainer}>
              <Link href={"/dashboard/edit-subprojects/" + project.slug}>
                <a className={styles.link}>
                  <i className={styles.link_icon + " aicon-angle-right"}></i>
                  <div className={styles.link_text + " typography_body1"}>
                    {project.title}
                  </div>
                </a>
              </Link>
            </div>
          </div>
        )
      })}
    </div>
  );
}

export default EditProjects;
