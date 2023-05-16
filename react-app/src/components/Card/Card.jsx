import { useState, useRef, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import styles from "./Card.module.css";
import Axios from "axios";

function Card(data) {
    if (data.subjectId) {
        Axios.get(`http://localhost:8081/api/subjects/${data.subjectId}`).then(
            (result) => {
                setName(result.data.title);
            }
        );
    }

    if (data.userId) {
        Axios.get("http://localhost:8081/api/users/").then((result) => {
            result.data.map((user) => {
                if (user.id === data.userId) {
                    setEmail(user.email);
                }
            });
        });
    }

    const [subjectId, setSubjectId] = useState();
    const [subjects, setSubjects] = useState([]);
    const [userId, setUserId] = useState();

    const [text, setText] = useState("");
    const [error, setError] = useState("");
    const errorRef = useRef();

    useEffect(() => {
        Axios.get("http://localhost:8081/api/subjects/").then((result) => {
            setSubjects(result.data);
        });

        Axios.get("http://localhost:8081/api/users/").then((result) => {
            result.data.map((user) => {
                if (user.email === localStorage.email) {
                    setUserId(user.id);
                }
            });
        });
    }, []);

    const subjectsHandler = (event) => {
        setSubjectId(event.value);
    };

    const textHandler = (event) => {
        setText(event.target.value);
    };

    const noteEditHandler = (noteData) => {
        let errors = "";
        if (!subjectId) {
            errors += "A subject must be selected";
        }
        if (!(text.length >= 10)) {
            errors += "Text must have at least 10 characters.";
        }

        const note = {
            text: text,
            subjectId: subjectId,
        };

        setError(errors);

        if (errors === "") {
            Axios.put(
                `http://localhost:8081/api/notes/${noteData.id}`,
                note
            ).then((res) => {});
            setIsEditing(false);
            window.location.reload();
        }
    };

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    const editHandler = (noteData) => {
        setIsEditing(true);
        setSubjectId(noteData.subjectId);
        setText(noteData.text);
    };

    const cancelHandler = () => {
        setIsEditing(false);
    };

    const deleteHandler = async (dataId) => {
        await Axios.delete(`http://localhost:8081/api/notes/${dataId}`).then(
            () => {
                window.location.reload();
            }
        );
    };

    return (
        <>
            {isEditing ? (
                <>
                    <div className={styles.cardContainer} key={data.id}>
                        <div className={styles.createNoteCard}>
                            <h2>Note creator</h2>
                            <label htmlFor="subjects">
                                Subject of the note
                            </label>
                            <span className="p-float-lable">
                                <Dropdown
                                    value={subjectId}
                                    optionLabel="title"
                                    optionValue="id"
                                    options={subjects}
                                    onChange={subjectsHandler}
                                />
                            </span>
                            <label htmlFor="text">
                                Maybe you want to type an initial text
                            </label>
                            <span className="p-float-label">
                                <InputText
                                    value={text}
                                    id="text"
                                    onChange={textHandler}
                                />
                            </span>
                            <div>
                                <button
                                    className={styles.buttonCard}
                                    onClick={() => noteEditHandler(data)}
                                >
                                    Save
                                </button>
                                <button
                                    className={styles.buttonCardDelete}
                                    onClick={cancelHandler}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                        <div
                            className={error ? styles.cardError : null}
                            ref={errorRef}
                        >
                            {error ? error : ""}
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className={styles.card} key={data.id}>
                        <div className={styles.preview}>
                            <h1 className={styles.title}>
                                {" "}
                                Note # {data.id ? data.id : 0}
                            </h1>
                            <div className={styles.subject}>
                                <b>Subject:</b>{" "}
                                {data.subjectId ? name : "None "}
                            </div>
                            <div className={styles.author}>
                                <b>Author:</b> {email ? email : "None "}
                            </div>
                            <p>{data.text}</p>
                        </div>

                        <div className={styles.buttonsContainer}>
                            <button
                                className={styles.buttonCard}
                                onClick={() => editHandler(data)}
                            >
                                Edit
                            </button>
                            <button
                                className={styles.buttonCardDelete}
                                onClick={() => deleteHandler(data.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default Card;
