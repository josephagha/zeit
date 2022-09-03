import React, { useState, useRef } from "react";
import styles from "./addNewProject.module.scss";
import Button from "../../../sharing/button";

async function createProject(
  title,
  description,
  accomplished,
  subprojects,
  pages,
  icon
) {
  const response = await fetch("/api/projects/newProject", {
    method: "POST",
    body: JSON.stringify({
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

function AddNewProject() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const titleInputRef = useRef();
  const descriptionInputRef = useRef();
  const accomplishedInputRef = useRef();
  const subprojectsInputRef = useRef();
  const pagesInputRef = useRef();
  const iconInputRef = useRef();

  async function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const enteredAccomplished = accomplishedInputRef.current.value;
    const enteredSubprojects = subprojectsInputRef.current.value;
    const enteredPages = pagesInputRef.current.value;
    const enteredIcon = iconInputRef.current.value;

    try {
      const result = await createProject(
        enteredTitle,
        enteredDescription,
        enteredAccomplished,
        enteredSubprojects,
        enteredPages,
        enteredIcon
      );
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={styles.container}>
      <section className={styles.formContainer}>
        <h1 className={`typography_h4 ${styles.title}`}>
          Neues Projekt <br /> hinzufügen
        </h1>
        <form
          className={`forms_form ${styles.form}`}
          onSubmit={submitHandler}
          id="newProject"
        >
          <input
            className={`forms_input ${styles.input}`}
            type="text"
            name="title"
            placeholder="Title"
            required
            ref={titleInputRef}
          />
          <input
            className={`forms_input ${styles.input}`}
            type="text"
            name="description"
            placeholder="Beschreibung"
            required
            ref={descriptionInputRef}
          />

          <select
            className={`forms_select  ${styles.select}`}
            name="accomplished"
            required
            ref={accomplishedInputRef}
          >
            <option value="">Accomplished</option>
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
            required
            ref={subprojectsInputRef}
          />
          <input
            className={`forms_input ${styles.input}`}
            type="text"
            name="pages"
            placeholder="pages"
            required
            ref={pagesInputRef}
          />
          <input
            className={`forms_input ${styles.input}`}
            type="text"
            name="icon"
            placeholder="Symbolname"
            required
            ref={iconInputRef}
          />

          <div className={styles.actions}>
            <Button
              formName="newProject"
              loading={loading}
              title="HINZUFÜGEN"
            />
          </div>
        </form>
      </section>
    </div>
  );
}

export default AddNewProject;
