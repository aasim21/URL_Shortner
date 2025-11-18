//CSS
import styles from "../CSS/OutputElement.module.css";

//ICONS
import { FiCopy } from "react-icons/fi";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

//Hooks
import { useRef, useState } from "react";
import {useSelector} from "react-redux";

export default function OutputElement() {
  
  //Executing Hooks
  const outpuURL = useRef();
  const [isCopied, setIsCopied] = useState(false);
  const  shortURL = useSelector((store) => store.shortURL);
  //Handling Copy to Clipboard Functionality
  const handleCopyIntoClipboard = async () => {
    if (outpuURL.current.value) {
      await navigator.clipboard.writeText(outpuURL.current.value);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 5000);
    }
  };
  return (
    <div className={styles.main_container}>
      <input
        className={styles.result_input}
        type="url"
        ref={outpuURL}
        value = {shortURL}
        disabled
      />
      <button
        className={styles.copy_link_btn}
        onClick={handleCopyIntoClipboard}
      >
        {isCopied ? (
          <IoCheckmarkDoneSharp size="1.2rem" />
        ) : (
          <>
            <FiCopy />
            &nbsp;Copy Link
          </>
        )}
      </button>
    </div>
  );
}
