import { useState, useRef, useEffect } from "react";
import styles from "./Subject.module.css";
import Navbar from "../Navbar/Navbar";
import { InputText } from "primereact/inputtext";
import Axios from "axios";
import { Toast } from "primereact/toast";

const Note = () => {
    const [title, setTitle] = useState("");
    const [error, setError] = useState("");
    const errorRef = useRef();
    const toast = useRef();

    const titleHandler = (event) => {
        setTitle(event.target.value);
    };

    const subjectHandleSubmission = () => {
        let errors = "";

        if (!(title.length >= 3)) {
            errors += "Subject must have at least 3 characters.";
        }

        const subject = {
            title: title,
        };

        setError(errors);

        if (errors === "") {
            Axios.post("http://localhost:8081/api/subjects/", subject).then(
                (res) => {
                    toast.current.show({
                        severity: "success",
                        summary: "Subject added!",
                        detail: "Subject added successfuly!",
                        life: 3000,
                    });
                }
            );
        }
    };

    return (
        <div className={styles.mainContainer}>
            <Navbar />
            <div className={styles.cardContainer}>
                <div className={styles.createNoteCard}>
                    <h2>Subject creator</h2>
                    <label htmlFor="text">Subject name</label>
                    <span className="p-float-label">
                        <InputText id="text" onChange={titleHandler} />
                    </span>
                    <div>
                        <button
                            type="submit"
                            className={styles.buttonFormular}
                            onClick={subjectHandleSubmission}
                        >
                            Create a new note
                        </button>
                    </div>
                </div>
                <div className={error ? styles.cardError : null} ref={errorRef}>
                    {error ? error : ""}
                </div>
            </div>
            <Toast ref={toast} />
        </div>
    );
};

export default Note;
