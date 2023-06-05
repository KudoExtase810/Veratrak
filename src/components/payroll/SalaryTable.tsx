import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import SingleEmployee from "./SingleEmployee";
import { useAutoAnimate } from "@formkit/auto-animate/react";

function SalaryTable() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [query, setQuery] = useState("");
    const filteredEmployees = useMemo(() => {
        if (!query) return employees;
        return employees!.filter((employee) => {
            const fullName = `${employee.firstname} ${employee.lastname}`;
            return fullName.toLowerCase().includes(query.toLowerCase());
        });
    }, [employees, query]);
    useEffect(() => {
        const getEmployees = async () => {
            const URL = `${import.meta.env.VITE_REACT_BASE_URL}/api/employees`;
            const res = await axios.get(URL);
            setEmployees(res.data);
        };
        getEmployees();
    }, []);

    const [parent] = useAutoAnimate();

    if (!employees) return <div>Loading...</div>;
    if (!employees.length) return <div>No employees to show.</div>;
    return (
        <>
            <div className="my-4">
                <label
                    htmlFor="default-search"
                    className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                    Search
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                            aria-hidden="true"
                            className="w-5 h-5 text-gray-500 dark:text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            ></path>
                        </svg>
                    </div>
                    <input
                        onChange={(e) => setQuery(e.target.value)}
                        value={query}
                        type="search"
                        id="default-search"
                        className="block w-[850px] p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search for an employee.."
                    />
                </div>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-base text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Employee ID
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Full name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Salary(DA)
                            </th>
                        </tr>
                    </thead>
                    <tbody ref={parent}>
                        {filteredEmployees.map((emp, index) => (
                            <SingleEmployee index={index} employee={emp} />
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default SalaryTable;
