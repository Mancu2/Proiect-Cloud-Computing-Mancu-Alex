import { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import styles from "./Notes.module.css";
import Card from "../Card/Card";
import Axios from "axios";

const Notes = () => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:8081/api/notes/").then((result) => {
            setNotes(result.data);
        });
    }, []);

    const newNoteHandler = () => {
        window.location.href = "/note";
    };

    return (
        <div>
            <Navbar />
            <h2 align="center">Aici ai notițele tale</h2>
            <div className={styles.container_card}>
                {notes.map((note) => {
                    return (
                        <Card
                            key={note.id}
                            id={note.id}
                            userId={note.userId}
                            subjectId={note.subjectId}
                            text={note.text}
                        />
                    );
                })}
            </div>
            <div className={styles.buttons}>
                <button className={styles.button} onClick={newNoteHandler}>
                    Create a new note
                </button>
            </div>
        </div>
    );
};

export default Notes;
