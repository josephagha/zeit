import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "./editSubproject.module.scss";

import Button from "../../../sharing/button";
import Loding from "../../../sharing/loding";

async function editSubproject(
  id,
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
  const response = await fetch("/api/subprojects/updateSubproject", {
    method: "PUT",
    body: JSON.stringify({
      id,
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

function EditSubrojects({ data, projects } = props) {
  const router = useRouter();
  
  const [loading, setLoading] = useState(false);

  const [touchPointMobile, setTouchPointMobile] = useState(data.touchPoint.mobile);
  const handleChangeMobile = (element) =>
    setTouchPointMobile(element.target.checked);
  const [touchPointDesktop, setDesktop] = useState(data.touchPoint.desktop);
  const handleChangeDesktop = (element) => setDesktop(element.target.checked);
  const [touchPointTv, setTv] = useState(data.touchPoint.tv);
  const handleChangeTv = (element) => setTv(element.target.checked);

  const [workStepsWireframe, setWireframe] = useState(data.workSteps.wireframe);
  const handleChangeWireframe = (element) =>
    setWireframe(element.target.checked);
  const [workStepsDesktopDesign, setDesktopDesign] = useState(data.workSteps.desktopDesign);
  const handleChangeDesktopDesign = (element) =>
    setDesktopDesign(element.target.checked);
  const [workStepsMobileDesign, setMobileDesign] = useState(data.workSteps.mobileDesign);
  const handleChangeMobileDesign = (element) =>
    setMobileDesign(element.target.checked);
  const [workStepsTestDesign, setTestDesign] = useState(data.workSteps.testDesign);
  const handleChangeTestDesign = (element) =>
    setTestDesign(element.target.checked);
  const [workStepsComponentDesc, setComponentDesc] = useState(data.workSteps.testDesign);
  const handleChangeComponentDesc = (element) =>
    setComponentDesc(element.target.checked);
  const [workStepsTestDesignAfterImplementing, setTestDesignAfterImplementing] =
    useState(data.workSteps.testDesignAfterImplementing);
  const handleChangeTestDesignAfterImplementing = (element) =>
    setTestDesignAfterImplementing(element.target.checked);

  const idInputRef = useRef();
  const titleInputRef = useRef();
  const descriptionInputRef = useRef();
  const perantProjectInputRef = useRef();
  const projectStatusInputRef = useRef();
  const requestedByInputRef = useRef();
  const workOnItInputRef = useRef();
  const projectLinkInputRef = useRef();

  const noteInputRef = useRef();

  async function submitHandler(event) {
    event.preventDefault();
    setLoading(true);

    const enteredId = idInputRef.current.value;
    const enteredTitle = titleInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const enteredPerantProject = perantProjectInputRef.current.value;
    const enteredProjectStatus = projectStatusInputRef.current.value;
    const enteredRequestedBy = requestedByInputRef.current.value;
    const enteredWorkOnIt = workOnItInputRef.current.value;
    const enteredProjectLink = projectLinkInputRef.current.value;

    const enteredtouchPoint = {
      mobile: touchPointMobile,
      desktop: touchPointDesktop,
      tv: touchPointTv,
    };

    const enteredWorkSteps = {
      wireframe: workStepsWireframe,
      desktopDesign: workStepsDesktopDesign,
      mobileDesign: workStepsMobileDesign,
      testDesign: workStepsTestDesign,
      componentDesc: workStepsComponentDesc,
      testDesignAfterImplementing: workStepsTestDesignAfterImplementing,
    };

    const enteredNote = noteInputRef.current.value;

    try {
      const result = await editSubproject(
        enteredId,
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
      console.log(enteredWorkSteps);
       /* router.reload(window.location.pathname);  */
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={styles.tab}>
      <input
        className={styles.tab_input}
        type="radio"
        id={data._id}
        name="editProject"
      />
      <label htmlFor={data._id}>
        <span className={styles.title}>
          <i className={"aicon-chevron-up " + styles.title_arrow}></i>
          <p className="typography_body2"> {data.title} </p>
        </span>
      </label>
      <div className="typography_body2">
        <form
          className={`forms_form ${styles.form}`}
          onSubmit={submitHandler}
          id="newSubproject"
        >
          <input
            className={`hide`}
            type="text"
            name="id"
            defaultValue={data._id}
            ref={idInputRef}
          />
          <input
            className={`forms_input ${styles.input}`}
            type="text"
            name="title"
            placeholder="Title"
            defaultValue={data.title}
            ref={titleInputRef}
          />
          <input
            className={`forms_input ${styles.input}`}
            type="text"
            name="description"
            placeholder="Beschreibung"
            defaultValue={data.description}
            ref={descriptionInputRef}
          />

          <select
            className={`forms_select  ${styles.select}`}
            name="subproject"
            ref={perantProjectInputRef}
          >
            <option value={data.perantProject}>Unter welchem Projekt?</option>
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
            defaultValue={data.projectStatus}
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
            defaultValue={data.requestedBy}
            ref={requestedByInputRef}
          />
          <input
            className={`forms_input ${styles.input}`}
            type="text"
            name="workOnIt"
            placeholder="Bearbeitet von (E-Mail-adresse)"
            defaultValue={data.workOnIt}
            ref={workOnItInputRef}
          />
          <input
            className={`forms_input ${styles.input}`}
            type="text"
            name="projectLink"
            placeholder="Link zum Projekt auf Figma"
            defaultValue={data.projectLink}
            ref={projectLinkInputRef}
          />

          <p className="typography_body2">Touchpoint</p>

          <label className="forms_checkbox_label">
            <span className="forms_checkbox_label_text">Mobile</span>
            <input
              className={`forms_checkbox `}
              type="checkbox"
              name="mobile"
              defaultChecked={data.touchPoint.mobile}
              onChange={handleChangeMobile}
            />
            <span className="forms_checkbox_checkmark"></span>
          </label>

          <label className="forms_checkbox_label">
            <span className="forms_checkbox_label_text">Desktop</span>
            <input
              className={`forms_checkbox `}
              type="checkbox"
              name="desktop"
              defaultChecked={data.touchPoint.desktop}
              onChange={handleChangeDesktop}
            />
            <span className="forms_checkbox_checkmark"></span>
          </label>

          <label className="forms_checkbox_label">
            <span className="forms_checkbox_label_text">TV</span>
            <input
              className={`forms_checkbox `}
              type="checkbox"
              name="tv"
              defaultChecked={data.touchPoint.tv}
              onChange={handleChangeTv}
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
              defaultChecked={data.workSteps.wireframe}
              onChange={handleChangeWireframe}
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
              defaultChecked={data.workSteps.desktopDesign}
              onChange={handleChangeDesktopDesign}
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
              defaultChecked={data.workSteps.mobileDesign}
              onChange={handleChangeMobileDesign}
            />
            <span className="forms_checkbox_checkmark"></span>
          </label>

          <label className="forms_checkbox_label">
            <span className="forms_checkbox_label_text">Design testing</span>
            <input
              className={`forms_checkbox `}
              type="checkbox"
              name="testDesign"
              defaultChecked={data.workSteps.testDesign}
              onChange={handleChangeTestDesign}
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
              defaultChecked={data.workSteps.componentDesc}
              onChange={handleChangeComponentDesc}
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
              defaultChecked={data.workSteps.testDesignAfterImplementing}
              onChange={handleChangeTestDesignAfterImplementing}
            />
            <span className="forms_checkbox_checkmark"></span>
          </label>

          <p className="typography_body2">Bemerkung</p>
          <input
            className={`forms_input ${styles.input}`}
            type="text"
            name="note"
            placeholder="Kommentar einfügen..."
            defaultValue={data.note}
            ref={noteInputRef}
          />

          <Button
            formName="newSubproject"
            loading={loading}
            title="AKTUALISIEREN"
          />
        </form>
      </div>
    </div>
  );
}

export default EditSubrojects;
