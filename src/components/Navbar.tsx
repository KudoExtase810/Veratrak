import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import getDecodedToken from "../utils/getDecodedToken";
import { useNavigate } from "react-router-dom";
function Navbar() {
    const { pathname } = useLocation();
    if (pathname === "/register" || pathname === "/login") return null;

    const navigate = useNavigate();

    const handleLogout = () => {
        document.cookie =
            "jwt_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        location.reload();
    };

    return (
        <nav className="flex justify-around py-4 bg-violet-400 items-center text-lg">
            <Link to="/">
                <img src={logo} alt="Veratrak" className="w-[6cm]" />
            </Link>

            <ul className="flex gap-3 items-center">
                <li
                    className={`p-1 hover:text-amber-700 ${
                        pathname === "/" && "text-amber-700"
                    }`}
                >
                    <Link to="/">Home</Link>
                </li>
                <li
                    className={`p-1 hover:text-amber-700 ${
                        pathname === "/employees" && "text-amber-700"
                    }`}
                >
                    <Link to="/employees">Employees</Link>
                </li>
                <li
                    className={`p-1 hover:text-amber-700 ${
                        pathname === "/payroll" && "text-amber-700"
                    }`}
                >
                    <Link to="/payroll">Payroll</Link>
                </li>
            </ul>
            <div className="flex gap-3 items-center">
                <span>{getDecodedToken()?.name}</span>
                <button
                    onClick={handleLogout}
                    className="py-2 px-4 bg-gray-300 text-zinc-950 hover:bg-zinc-900 hover:text-neutral-200 rounded-2xl transition-colors duration-500"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
