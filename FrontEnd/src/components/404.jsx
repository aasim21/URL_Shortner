//CSS
import styles from "../CSS/404.module.css";

//components
import { Link } from "react-router-dom";

export default function PageNOTFound(){
    return(
        <div className={styles.main_container}>
            <div className={styles.wrap_container}>
                <h1>404</h1>
                <p>Sorry, we were unable to find that page</p>
                <span>Back to&nbsp;<Link to="/" className={styles.link}>home page</Link></span>
            </div>
        </div>
    )
}