import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import styles from "./addNewUser.module.scss";

async function createUser(email, password) {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong!');
  }

  return data;
}

function AddNewUser() {
  const [hidePassword, setHidePassword] = useState(true);
  const hidePasswordHandle = () => {
    setHidePassword(!hidePassword);
  };

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const router = useRouter();

  async function submitHandler(event) {
    event.preventDefault();


    const enteredEmail = emailInputRef.current.value.toLowerCase().replace(/\s+/g, '');
    const enteredPassword = passwordInputRef.current.value;
   
    try {
      const result = await createUser(enteredEmail, enteredPassword);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={styles.container}>
 
      <section className={styles.loginForm}>
        <h1 className={`typography_h2 ${styles.title}`}>
          Add neu user
        </h1>
        <form className={`forms_form ${styles.form}`} onSubmit={submitHandler}>
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
            <input
              className={`forms_submit ${styles.submit}`}
              type="submit"
              value='Add new user'
            />
          </div>
        </form>

      </section>
    </div>
  );
}

export default AddNewUser;
