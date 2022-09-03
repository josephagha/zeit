import React, { useState, useRef } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";

import logo from "../../public/svg/logo.svg";
import Button from "../sharing/button";
import styles from "./loginForm.module.scss";

function LoginForm() {
  const [hidePassword, setHidePassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const hidePasswordHandle = () => {
    setHidePassword(!hidePassword);
  };

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const router = useRouter();

  async function submitHandler(event) {
    event.preventDefault();

    setLoading(true);

    const enteredEmail = emailInputRef.current.value
      .toLowerCase()
      .replace(/\s+/g, "");
    const enteredPassword = passwordInputRef.current.value;

    //  Add validation

    const result = await signIn("credentials", {
      redirect: false,
      email: enteredEmail,
      password: enteredPassword,
    });

    if (!result.error) {
      // set some auth state
      router.replace("/");
    }

    if (result.error) {
      setLoading(false)
      setError(result.error);
      setTimeout(() => {
        setError(false);
      }, 8000);
    }
  }

  return (
    <div className={styles.container}>
      <span className={styles.logo}>
        <Image src={logo} alt="Logo" />
      </span>
      <section className={styles.loginForm}>
        {error ? (
          <div className={`typography_caption1 ${styles.loginForm_error}`}>
            {error}
          </div>
        ) : (
          true
        )}
        <h1 className={`typography_h2 ${styles.title}`}>
          AIDA Projects Overview
        </h1>
        <p className={`typography_body2 ${styles.desc}`}>
          Ein Tool erstellt und programmiert vom UI/UX-Team für interne Kollegen
          bei AIDA
        </p>
        <form className={`forms_form ${styles.form}`} onSubmit={submitHandler} id="login">
          <input
            className={`forms_input ${styles.input}`}
            type="text"
            name="email"
            placeholder="E-Mail-Adresse"
            required
            ref={emailInputRef}
          />
          <div className={`${styles.passwordContainer}`}>
            <i
              className={`aicon-eye ${styles.hidePassword} ${
                hidePassword ? styles.hidePassword_active : ""
              }`}
              onClick={hidePasswordHandle}
            />
            <input
              className={`forms_input ${styles.input}`}
              type={hidePassword ? "password" : "text"}
              name="password"
              placeholder="Passwort"
              required
              ref={passwordInputRef}
            />
          </div>

          <div className={styles.actions}>
            {/*  <Link href="">
              <a className={`forms_link ${styles.link}`}>Passwort vergessen?</a>
            </Link> */}
           {/*  <input
              className={`forms_submit ${styles.submit}`}
              type="submit"
              value={loading ? "Login..." : "Login"}
            /> */}
            <Button formName="login" loading={loading} title="Login" />
          </div>
        </form>

        <div className={styles.separator}></div>
        <p className={`typography_body2 ${styles.info}`}>
          Sie haben kein Konto? Schreiben Sie uns eine E-Mail. Ihre UI/UX Team
          :)
        </p>
      </section>
    </div>
  );
}

export default LoginForm;
