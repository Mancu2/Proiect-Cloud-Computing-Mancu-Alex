import { useState, useRef, useEffect } from "react";
import styles from "./Note.module.css";
import Navbar from "../Navbar/Navbar";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import Axios from "axios";
import { Toast } from "primereact/toast";

const Note = () => {
  const [subjectId, setSubjectId] = useState();
  const [subjects, setSubjects] = useState([]);
  const [userId, setUserId] = useState();

  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const errorRef = useRef();
  const toast = useRef();

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

  const noteHandleSubmission = () => {
    let errors = "";
    if (!subjectId) {
      errors += "A subject must be selected";
    }
    if (!(text.length >= 10)) {
      errors += "Text must have at least 10 characters.";
    }

    const note = {
      userId: 2,
      text: text,
      subjectId: subjectId,
    };

    setError(errors);

    if (errors === "") {
      Axios.post("http://localhost:8081/api/notes/", note).then((res) => {});

      toast.current.show({
        severity: "success",
        summary: "Note added!",
        detail: "Note added successfuly!",
        life: 3000,
      });

      setInterval(() => {
        window.location.href = "/notes";
      }, 1000);
    }
  };

  const generateJoke = () => {
    Axios.get("https://api.api-ninjas.com/v1/jokes?limit=1", {
      headers: {
        "X-Api-Key": "fDRAGdl4xEsAHT5UuFNijA==zvByBqjyo4M6TlBY",
      },
    }).then((result) => {
      setText(result.data[0].joke);
      console.log(result.data[0].joke);
    });
  };

  const generateFact = () => {
    Axios.get("https://api.api-ninjas.com/v1/facts?limit=1", {
      headers: {
        "X-Api-Key": "fDRAGdl4xEsAHT5UuFNijA==zvByBqjyo4M6TlBY",
      },
    }).then((result) => {
      setText(result.data[0].fact);
      console.log(result.data);
    });
  };

  return (
    <div className={styles.mainContainer}>
      <Navbar />
      <div className={styles.cardContainer}>
        <div className={styles.createNoteCard}>
          <h2>Note creator</h2>
          <label htmlFor="subjects">Subject of the note</label>
          <span className="p-float-lable">
            <Dropdown
              value={subjectId}
              optionLabel="title"
              optionValue="id"
              options={subjects}
              onChange={subjectsHandler}
            />
          </span>
          <label htmlFor="text">Maybe you want to type an initial text</label>
          <span className="p-float-label">
            <InputText value={text} id="text" onChange={textHandler} />
          </span>
          <div>
            <button
              type="submit"
              className={styles.buttonFormular}
              onClick={noteHandleSubmission}
            >
              Create a new note
            </button>
            <button className={styles.buttonFormular} onClick={generateJoke}>
              Generate Joke
            </button>
            <button className={styles.buttonFormular} onClick={generateFact}>
              Generate Fact
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
