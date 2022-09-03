import React, { useState, useRef } from "react";
import { useRouter } from "next/router";

import styles from "./changePasswordForm.module.scss";

function ChangePasswordForm(props) {
  const [hideNewPassword, setHideNewPassword] = useState(true);
  const [hideOldPassword, setHideOldPassword] = useState(true);

  const hideNewPasswordHandle = () => {
    setHideNewPassword(!hideNewPassword);
  };
  const hideOldPasswordHandle = () => {
    setHideOldPassword(!hideOldPassword);
  };

  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();

  const router = useRouter();

  async function submitHandler(event) {
    event.preventDefault();

    const enteredOldPassword = oldPasswordRef.current.value;
    const enteredNewPassword = newPasswordRef.current.value;

    // optional: Add validation

    props.onChangePassword({
      oldPassword: enteredOldPassword,
      newPassword: enteredNewPassword,
    });
  }

  return (
    <div className={styles.div_container}>
      <section className={styles.loginForm}>
        <h2  className={`typography_h2 ${styles.title}`}>Möchten Sie das Passwort Ihres Kontos ändern?</h2>
        <p  className={`typography_body2 ${styles.subtitle}`}>Geben Sie Ihr neues Passwort im ersten Textfeld ein,
        Ihr altes Passwort im zweiten Textfeld.</p>
        <form className={`forms_form ${styles.form}`} onSubmit={submitHandler}>
          <div className={`${styles.passwordContainer}`}>
            <i
              className={`aicon-eye ${styles.hidePassword} ${
                hideNewPassword ? styles.hidePassword_active : ""
              }`}
              onClick={hideNewPasswordHandle}
            />
            <input
              className={`forms_input ${styles.input}`}
              type={hideNewPassword ? "password" : "text"}
              name="Passwort"
              placeholder="Neues Passwort"
              required
              ref={newPasswordRef}
            />
          </div>

          <div className={`${styles.passwordContainer}`}>
            <i
              className={`aicon-eye ${styles.hidePassword} ${
                hideOldPassword ? styles.hidePassword_active : ""
              }`}
              onClick={hideOldPasswordHandle}
            />
            <input
              className={`forms_input ${styles.input}`}
              type={hideOldPassword ? "password" : "text"}
              name="old-password"
              placeholder="Altes Passwort"
              required
              ref={oldPasswordRef}
            />
          </div>

          <div className={styles.actions}>
            <input
              className={`forms_submit ${styles.submit}`}
              type="submit"
              value="Passwort Ändern"
            />
          </div>
        </form>
      </section>
    </div>
  );
}

export default ChangePasswordForm;
