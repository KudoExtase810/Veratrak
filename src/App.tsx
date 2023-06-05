import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
import Employees from "./pages/Employees";
import Payroll from "./pages/Payroll";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
    const token = document.cookie;
    return (
        <>
            <Toaster />
            <Navbar />
            <main className="mx-12">
                <Routes>
                    <Route
                        path="/"
                        element={token ? <Home /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/employees"
                        element={
                            token ? <Employees /> : <Navigate to="/login" />
                        }
                    />
                    <Route
                        path="/payroll"
                        element={token ? <Payroll /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/register"
                        element={!token ? <Register /> : <Navigate to="/" />}
                    />
                    <Route
                        path="/login"
                        element={!token ? <Login /> : <Navigate to="/" />}
                    />
                </Routes>
            </main>
            {/* <Footer /> */}
        </>
    );
}

export default App;
