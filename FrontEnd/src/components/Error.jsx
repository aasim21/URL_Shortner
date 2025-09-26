//CSS
import styles from '../CSS/Error.module.css';

export default function Error ({error}){

    return(
        <div className={styles.main_container}>
            <p className={styles.error}>&bull;&nbsp;{error}</p>
        </div>
    )
}