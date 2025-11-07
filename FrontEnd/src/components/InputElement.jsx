//CSS
import styles from "../CSS/InputElement.module.css";

//ICONS
import { FaLink } from "react-icons/fa6";
import { CiRedo } from "react-icons/ci";

//Store Actions
import { URLActions } from "../store/urlSlice";
import { errorActions } from "../store/errorSlice";

//Services
import { generate_Short_URL } from "../services/urlService";

//Hooks
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";

export default function InputElement() {
  //Executing Hooks
  const inputURL = useRef();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  //Handler Functions

  //Handling New Short URL generation
  const handleNewURL = async () => {
    try {
      dispatch(errorActions.update_slice(null));
      const URL = inputURL.current.value;
      setIsLoading(true);
      const short_url = await generate_Short_URL(URL);
      if (short_url.errorMessage) throw short_url;
      if (short_url.url) {
        dispatch(URLActions.Get_ShortURL(short_url.url));
        inputURL.current.value = "";
      }
    } catch (error) {
      dispatch(errorActions.update_slice(error));
    } finally{
        setIsLoading(false);
    }
  };

  return (
    <div className={styles.main_container}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleNewURL();
        }}
        className={styles.child_cont}
      >
        <div className={styles.input_container}>
          <span className={styles.icon}>
            <FaLink color="#454545" size="1.5rem" />
          </span>
          <input
            className={styles.input}
            ref={inputURL}
            type="url"
            placeholder="Enter your link here..."
            required
          />
        </div>
        <button className={styles.enter_btn} type="submit" disabled = {isLoading}>
          <CiRedo
            className={isLoading && styles.animate}
            size="1.2rem"
            color="#fff"
          />
        </button>
      </form>
    </div>
  );
}
