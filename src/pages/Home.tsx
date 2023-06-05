import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [recent, setRecent] = useState<Employee[]>([]);

    useEffect(() => {
        const getEmployees = async () => {
            const URL = `${import.meta.env.VITE_REACT_BASE_URL}/api/employees`;
            const res = await axios.get(URL);
            setEmployees(res.data);
        };
        getEmployees();
    }, []);

    useEffect(() => {
        if (employees) {
            const filteredArray = employees.filter((item) => {
                const twoDaysAgo = Date.now() - 2 * 24 * 60 * 60 * 1000;
                return parseInt(item.id.split("||")[1]) >= twoDaysAgo;
            });
            setRecent(filteredArray);
        }
    }, [employees]);

    return (
        <>
            <h1 className="text-center text-5xl font-bold my-8 border-b-4 border-red-500 w-fit mx-auto py-8">
                <span className="text-blue-600">V</span>eratrak's Employee
                Management System
            </h1>
            <p className="text-zinc-900 text-2xl">
                A way for Veratrak's administrators to check employee's details
                and manage them.
            </p>
            <div className="mt-8 text-2xl">
                <ul className="list-disc">
                    <li className="mb-4">
                        Total number of employees:{" "}
                        <span className="text-blue-800">
                            {employees.length}
                        </span>
                    </li>
                    <li>
                        Employees added in the last 2 days:
                        <ul className="text-zinc-800 list-disc ml-8">
                            {recent.map((emp) => (
                                <li>{emp.firstname + " " + emp.lastname}</li>
                            ))}
                        </ul>
                    </li>
                </ul>
            </div>
            <Link
                to="/employees"
                className="text-2xl text-gray-300 bg-emerald-600 px-4 py-2 mx-auto block w-fit mt-8  hover:bg-emerald-500 hover:text-amber-700"
            >
                Manage Employees
            </Link>
        </>
    );
}

export default Home;
