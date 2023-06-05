import { useMemo, useState, useEffect } from "react";
import SingleEmp from "./SingleEmp";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import axios from "axios";

interface props {
    employees: Employee[];
    setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
    setShowEditEmployee: React.Dispatch<React.SetStateAction<boolean>>;
    setShowConfirmDelete: React.Dispatch<React.SetStateAction<boolean>>;
    setShowAddEmployee: React.Dispatch<React.SetStateAction<boolean>>;
    setClickedEmployee: React.Dispatch<
        React.SetStateAction<Employee | undefined>
    >;
}

function EmpTable({
    setShowEditEmployee,
    setShowConfirmDelete,
    setShowAddEmployee,
    setClickedEmployee,
    employees,
    setEmployees,
}: props) {
    const [parent] = useAutoAnimate();

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

    if (!employees) return <div>Loading...</div>;
    if (!employees.length) return <div>No employees to show.</div>;

    return (
        <>
            <div className="mt-6 flex items-center gap-1">
                <div>
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
                <button
                    onClick={() => setShowAddEmployee(true)}
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                    Add Employee
                </button>
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-3">
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
                                Rank
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Married
                            </th>
                            <th scope="col" className="p-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody ref={parent}>
                        {filteredEmployees.map((employee, index) => (
                            <SingleEmp
                                index={index}
                                key={employee.id}
                                setClickedEmployee={setClickedEmployee}
                                employee={employee}
                                setShowEditEmployee={setShowEditEmployee}
                                setShowConfirmDelete={setShowConfirmDelete}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default EmpTable;
