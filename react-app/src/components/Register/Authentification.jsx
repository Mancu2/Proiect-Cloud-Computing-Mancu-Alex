import { useState, useRef, useEffect } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";
import styles from "./Authentification.module.css";
import Axios from "axios";


const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const toast = useRef(null);

    const validations = () => {
        if (email.toString().trim() === "") {
            toast.current.show({
                severity: "error",
                summary: "Email invalid",
                detail: "Emailul trebuie sa fie completat!",
                life: 3000,
            });
        } else if (password.includes(" ")) {
            toast.current.show({
                severity: "error",
                summary: "Parola invalida",
                detail: "Parola nu trebuie sa aiba spatii!",
                life: 3000,
            });
        } else if (password.length < 6) {
            toast.current.show({
                severity: "error",
                summary: "Parola invalida",
                detail: "Parola trebuie sa aiba minim 6 caractere!",
                life: 3000,
            });
        } else if (
            /^[a-z0-9](\.?[a-z0-9]){5,}@stud.ase\.ro$/.test(email) === false
        ) {
            toast.current.show({
                severity: "error",
                summary: "Email invalid",
                detail: "Emailul trebuie sa fie de forma example@stud.ase.ro!",
                life: 3000,
            });
        } else {

            Axios.post("http://localhost:8081/api/users/login", {
                email: email,
                password: password
            }).then(()=>{
                    localStorage.setItem("email", email);
                    navigate("/notes");
            }).catch(() =>{
                toast.current.show({
                    severity: "error",
                    summary: "User invalid",
                    detail: "Credentialele sunt gresite!",
                    life: 3000,
                });
            })

        }
    };

    return (
        <div className={styles.inputLayout}>
            <Card
                title="Register"
                style={{
                    width: "25rem",
                    marginBottom: "2em",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <div className={styles.inputRegister}>
                    <span className="p-float-label">
                        <InputText
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor="email">Email</label>
                    </span>
                </div>

                <div className={styles.inputRegister}>
                    <span className="p-float-label">
                        <Password
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            feedback={false}
                        />
                        <label htmlFor="password">Password</label>
                    </span>
                </div>

                <Button
                    label="Submit"
                    aria-label="Submit"
                    onClick={validations}
                />
            </Card>
            <Toast ref={toast} />
        </div>
    );
};

export default Auth;
