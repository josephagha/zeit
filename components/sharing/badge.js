import styles from './badge.module.scss';

function Badge({status}=props) {

 let styleStatus = styles.inProgress;
 if (status == 'done') {styleStatus = styles.done}
 if (status == 'pending') {styleStatus = styles.pending}
 if (status == 'disable') {styleStatus = styles.disable}

let iconStatus ='zap';
 if (status == 'done') {iconStatus = 'check'}
 if (status == 'pending') {iconStatus = 'clock'}
 if (status == 'disable') {iconStatus = 'snowflake'}

  return(
    <span className={`${styles.badge} ${styleStatus} `}>
      <i className={`aicon-${iconStatus} ${styles.icon}`}></i><span className={`${styles.text}` + ' typography_hairline-small'}>{status}</span>
    </span>
  )
}

export default Badge;