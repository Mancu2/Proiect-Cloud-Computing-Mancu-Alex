import "./Navbar.css";
import { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const [visibleLeft, setVisibleLeft] = useState(false);
    const navigate = useNavigate();

    return (
        <div>
            <div className="navbar">
                <Sidebar
                    visible={visibleLeft}
                    onHide={() => setVisibleLeft(false)}
                >
                    <h2>StudNoter</h2>

                    <ul className="navbar-list">
                        <li onClick={(e) => navigate("/notes")}>Notes </li>
                        <li onClick={(e) => navigate("/note")}>
                            Add new notes
                        </li>
                        <li onClick={() => navigate("/subject")}>Subjects</li>
                        <li
                            onClick={(e) => {
                                navigate("/auth");
                                localStorage.clear();
                            }}
                        >
                            Logout
                        </li>
                    </ul>
                </Sidebar>
                <div className="navbar-container">
                    <h2>StudNoter</h2>
                    <Button
                        icon="pi pi-bars"
                        onClick={() => setVisibleLeft(true)}
                        className="mr-2"
                    />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
