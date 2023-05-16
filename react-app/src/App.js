import "./App.css";
import Auth from "./components/Register/Authentification";
import Page404 from "./components/Page404/Page404";
import Navbar from "./components/Navbar/Navbar";
import Notes from "./components/Notes/Notes";
import Note from "./components/Note/Note";
import Subject from "./components/Subject/Subject";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigate to="/auth" />} />
                    <Route path="/home" element={<Navbar />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/notes" element={<Notes />} />
                    <Route path="/subject" element={<Subject />} />
                    <Route path="/note" element={<Note />} />
                    <Route path="/*" element={<Page404 />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
