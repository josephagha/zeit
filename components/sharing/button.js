import styles from "./button.module.scss";

function Button({
  formName = "form1",
  loading = false,
  title = "Submit",
} = props) {
  return (
    <button
      className={`forms_submit ${styles.button}`}
      type="submit"
      form={formName}
      value="Submit"
    >
      {loading == true ? <span><i className={styles.loadingCircle}></i>{title}</span> : title }
    </button>
  );
}

export default Button;
