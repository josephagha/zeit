import React, { useState, useRef, useEffect } from "react";
import styles from "./addNewSubproject.module.scss";
import Button from "../../../sharing/button";
import Loding from "../../../sharing/loding";

async function createSubproject(
  title,
  description,
  perantProject,
  projectStatus,
  requestedBy,
  workOnIt,
  projectLink,
  touchPoint,
  workSteps,
  note
) {
   const response = await fetch("/api/subprojects/newSubproject", {
    method: "POST",
    body: JSON.stringify({
      title,
      description,
      perantProject,
      projectStatus,
      requestedBy,
      workOnIt,
      projectLink,
      touchPoint,
      workSteps,
      note,
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

function AddNewSubproject() {
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

  const titleInputRef = useRef();
  const descriptionInputRef = useRef();
  const perantProjectInputRef = useRef();
  const projectStatusInputRef = useRef();
  const requestedByInputRef = useRef();
  const workOnItInputRef = useRef();
  const projectLinkInputRef = useRef();

  const touchPointMobileInputRef = useRef();
  const touchPointDesktopInputRef = useRef();
  const touchPointTVInputRef = useRef();

  const wireframeInputRef = useRef();
  const desktopDesignInputRef = useRef();
  const mobileDesignInputRef = useRef();
  const testDesignInputRef = useRef();
  const componentDescInputRef = useRef();
  const testDesignAfterImplementingInputRef = useRef();

  const noteInputRef = useRef();

  async function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const enteredPerantProject = perantProjectInputRef.current.value;
    const enteredProjectStatus = projectStatusInputRef.current.value;
    const enteredRequestedBy = requestedByInputRef.current.value;
    const enteredWorkOnIt = workOnItInputRef.current.value;
    const enteredProjectLink = projectLinkInputRef.current.value;

    const enteredtouchPoint = {
      mobile: touchPointMobileInputRef.current.checked,
      desktop: touchPointDesktopInputRef.current.checked,
      tv: touchPointTVInputRef.current.checked,
    };

    const enteredWorkSteps = {
      wireframe: wireframeInputRef.current.checked,
      desktopDesign: desktopDesignInputRef.current.checked,
      mobileDesign: mobileDesignInputRef.current.checked,
      testDesign: testDesignInputRef.current.checked,
      componentDesc: componentDescInputRef.current.checked,
      testDesignAfterImplementing:
        testDesignAfterImplementingInputRef.current.checked,
    };

    const enteredNote = noteInputRef.current.value;

   try {
      const result = await createSubproject(
        enteredTitle,
        enteredDescription,
        enteredPerantProject,
        enteredProjectStatus,
        enteredRequestedBy,
        enteredWorkOnIt,
        enteredProjectLink,
        enteredtouchPoint,
        enteredWorkSteps,
        enteredNote
      );
      console.log(result);
    } catch (error) {
      console.log(error);
    } 
  }

  if (loading) return <Loding/>

  return (
    <div className={styles.container}>
      <section className={styles.formContainer}>
        <h1 className={`typography_h4 ${styles.title}`}>
          Neues Teilprojekt <br /> hinzufügen
        </h1>
        <form
          className={`forms_form ${styles.form}`}
          onSubmit={submitHandler}
          id="newSubproject"
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
            name="subproject"
            required
            ref={perantProjectInputRef}
          >
            <option value="">Unter welchem Projekt?</option>
            {projects.map((project) => {
              return (
                <option value={project._id} key={project._id}>
                  {project.title}
                </option>
              );
            })}
          </select>

          <select
            className={`forms_select  ${styles.select}`}
            name="projectStatus"
            required
            ref={projectStatusInputRef}
          >
            <option value="">Status des Teilprojekts</option>
            <option value="done">Done</option>
            <option value="in-progress">In progress</option>
            <option value="pending">Pending</option>
            <option value="disable">Disable</option>
          </select>

          <input
            className={`forms_input ${styles.input}`}
            type="text"
            name="requestedBy"
            placeholder="Angefordert von (E-Mail-adresse)"
            required
            ref={requestedByInputRef}
          />
          <input
            className={`forms_input ${styles.input}`}
            type="text"
            name="workOnIt"
            placeholder="Bearbeitet von (E-Mail-adresse)"
            required
            ref={workOnItInputRef}
          />
          <input
            className={`forms_input ${styles.input}`}
            type="text"
            name="projectLink"
            placeholder="Link zum Projekt auf Figma"
            required
            ref={projectLinkInputRef}
          />

          <p className="typography_body2">Touchpoint</p>

          <label className="forms_checkbox_label">
            <span className="forms_checkbox_label_text">Mobile</span>
            <input
              className={`forms_checkbox `}
              type="checkbox"
              name="mobile"
              value={true}
              ref={touchPointMobileInputRef}
            />
            <span className="forms_checkbox_checkmark"></span>
          </label>

          <label className="forms_checkbox_label">
            <span className="forms_checkbox_label_text">Desktop</span>
            <input
              className={`forms_checkbox `}
              type="checkbox"
              name="desktop"
              value={true}
              ref={touchPointDesktopInputRef}
            />
            <span className="forms_checkbox_checkmark"></span>
          </label>

          <label className="forms_checkbox_label">
            <span className="forms_checkbox_label_text">TV</span>
            <input
              className={`forms_checkbox `}
              type="checkbox"
              name="tv"
              value={true}
              ref={touchPointTVInputRef}
            />
            <span className="forms_checkbox_checkmark"></span>
          </label>

          <p className="typography_body2">Work steps</p>

          <label className="forms_checkbox_label">
            <span className="forms_checkbox_label_text">
              Wireframe für das Konzept
            </span>
            <input
              className={`forms_checkbox `}
              type="checkbox"
              name="wireframe"
              value={true}
              ref={wireframeInputRef}
            />
            <span className="forms_checkbox_checkmark"></span>
          </label>

          <label className="forms_checkbox_label">
            <span className="forms_checkbox_label_text">
              Design für kleinen Bildschirm
            </span>
            <input
              className={`forms_checkbox `}
              type="checkbox"
              name="desktopDesign"
              value={true}
              ref={desktopDesignInputRef}
            />
            <span className="forms_checkbox_checkmark"></span>
          </label>

          <label className="forms_checkbox_label">
            <span className="forms_checkbox_label_text">
              Design für große Bildschirme
            </span>
            <input
              className={`forms_checkbox `}
              type="checkbox"
              name="mobileDesign"
              value={true}
              ref={mobileDesignInputRef}
            />
            <span className="forms_checkbox_checkmark"></span>
          </label>

          <label className="forms_checkbox_label">
            <span className="forms_checkbox_label_text">Design testing</span>
            <input
              className={`forms_checkbox `}
              type="checkbox"
              name="testDesign"
              value={true}
              ref={testDesignInputRef}
            />
            <span className="forms_checkbox_checkmark"></span>
          </label>

          <label className="forms_checkbox_label">
            <span className="forms_checkbox_label_text">
              Komponentenbeschreibung
            </span>
            <input
              className={`forms_checkbox `}
              type="checkbox"
              name="componentDesc"
              value={true}
              ref={componentDescInputRef}
            />
            <span className="forms_checkbox_checkmark"></span>
          </label>

          <label className="forms_checkbox_label">
            <span className="forms_checkbox_label_text">
              Komponententest nach der Implementierung
            </span>
            <input
              className={`forms_checkbox `}
              type="checkbox"
              name="testDesignAfterImplementing"
              value={true}
              ref={testDesignAfterImplementingInputRef}
            />
            <span className="forms_checkbox_checkmark"></span>
          </label>

          <p className="typography_body2">Bemerkung</p>
          <input
            className={`forms_input ${styles.input}`}
            type="text"
            name="note"
            placeholder="Kommentar einfügen..."
            ref={noteInputRef}
          />

          <div className={styles.actions}>
            <Button
              formName="newSubproject"
              loading={loading}
              title="HINZUFÜGEN"
            />
          </div>
        </form>
      </section>
    </div>
  );
}

export default AddNewSubproject;
