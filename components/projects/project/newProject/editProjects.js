import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "./editProjects.module.scss";

import Button from "../../../sharing/button";
import Loding from "../../../sharing/loding";

async function updateProject(
  id,
  title,
  description,
  accomplished,
  subprojects,
  pages,
  icon
) {
  const response = await fetch("/api/projects/updateProject", {
    method: "PUT",
    body: JSON.stringify({
      id,
      title,
      description,
      accomplished,
      subprojects,
      pages,
      icon,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }

  return data;
}

function EditProjects() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState(null);
  const [error, setError] = useState();

  const idInputRef = useRef();
  const titleInputRef = useRef();
  const descriptionInputRef = useRef();
  const accomplishedInputRef = useRef();
  const subprojectsInputRef = useRef();
  const pagesInputRef = useRef();
  const iconInputRef = useRef();

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data.data);
        setLoading(false);
      });
  }, []);

  async function submitHandler(event) {
    event.preventDefault();

    const enteredId = idInputRef.current.value;
    const enteredTitle = titleInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const enteredAccomplished = accomplishedInputRef.current.value;
    const enteredSubprojects = subprojectsInputRef.current.value;
    const enteredPages = pagesInputRef.current.value;
    const enteredIcon = iconInputRef.current.value;

    try {
      const result = await updateProject(
        enteredId,
        enteredTitle,
        enteredDescription,
        enteredAccomplished,
        enteredSubprojects,
        enteredPages,
        enteredIcon
      );
      router.reload(window.location.pathname);
    } catch (error) {
      console.log(error);
    }
  }

  if (loading) return <Loding />;

  return (
    <div className={styles.div_container}>
      <div className={styles.tabs}>
        {projects.map((project, index) => (
          <div className={styles.tab} key={index}>
            <input
              className={styles.tab_input}
              type="radio"
              id={project._id}
              name="editProject"
            />
            <label htmlFor={project._id}>
              <span className={styles.title}>
                <i className={"aicon-chevron-up " + styles.title_arrow}></i>
                <p className="typography_body2">{project.title}</p>
              </span>
            </label>
            <div className="typography_body2">
              <form
                className={`forms_form ${styles.form}`}
                onSubmit={submitHandler}
                id="newProject"
              >
                <input
                  className={`hide`}
                  type="text"
                  name="id"
                  defaultValue={project._id}
                  ref={idInputRef}
                />
                <input
                  className={`forms_input ${styles.input}`}
                  type="text"
                  name="title"
                  placeholder="Title"
                  defaultValue={project.title}
                  ref={titleInputRef}
                />
                <input
                  className={`forms_input ${styles.input}`}
                  type="text"
                  name="description"
                  placeholder="Beschreibung"
                  defaultValue={project.description}
                  ref={descriptionInputRef}
                />

                <select
                  className={`forms_select  ${styles.select}`}
                  name="accomplished"
                  ref={accomplishedInputRef}
                >
                  <option value={project.accomplished}>
                    {project.accomplished}%
                  </option>
                  <option value="5">5%</option>
                  <option value="10">10%</option>
                  <option value="15">15%</option>
                  <option value="20">20%</option>
                  <option value="25">25%</option>
                  <option value="30">30%</option>
                  <option value="35">35%</option>
                  <option value="40">40%</option>
                  <option value="45">45%</option>
                  <option value="50">50%</option>
                  <option value="55">55%</option>
                  <option value="60">60%</option>
                  <option value="65">65%</option>
                  <option value="70">70%</option>
                  <option value="75">75%</option>
                  <option value="80">80%</option>
                  <option value="85">85%</option>
                  <option value="90">90%</option>
                  <option value="95">95%</option>
                  <option value="100">100%</option>
                </select>

                <input
                  className={`forms_input ${styles.input}`}
                  type="text"
                  name="subprojects"
                  placeholder="subprojects"
                  defaultValue={project.subprojects}
                  ref={subprojectsInputRef}
                />
                <input
                  className={`forms_input ${styles.input}`}
                  type="text"
                  name="pages"
                  placeholder="pages"
                  defaultValue={project.pages}
                  ref={pagesInputRef}
                />

                <input
                  className={`forms_input ${styles.input}`}
                  type="text"
                  name="icon"
                  placeholder="Symbolname"
                  defaultValue={project.icon}
                  ref={iconInputRef}
                />
                <Button
                  formName="newProject"
                  loading={loading}
                  title="AKTUALISIEREN"
                />
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EditProjects;
