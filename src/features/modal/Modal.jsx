import { splitProps } from "solid-js";
import styles from "./Modal.module.css"

export function Modal(props) {
    
    return (
      <div style={{display: (props.show ? "block" : "none")}} class={styles.modal}>
        <section class={styles.modalMain}>
          {props.children} <br /> <br />
          <button type="button" onclick={props.handleClose}>
            Close
          </button>
        </section>
      </div>
    );  
}