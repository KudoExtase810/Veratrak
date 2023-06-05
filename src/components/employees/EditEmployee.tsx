import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";

interface props {
    close: () => void;
    clickedEmployee: Employee | undefined;
    employees: Employee[];
    setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
}

function EditEmployee({
    close,
    clickedEmployee,
    employees,
    setEmployees,
}: props) {
    const [firstName, setFirstName] = useState(clickedEmployee?.firstname);
    const [lastName, setLastName] = useState(clickedEmployee?.lastname);
    const [rank, setRank] = useState(clickedEmployee?.rank);
    const [married, setMarried] = useState(clickedEmployee?.married);
    const [kids, setKids] = useState(clickedEmployee?.kids);
    const [absences, setAbsences] = useState(clickedEmployee?.absences);
    const [exp, setExp] = useState(clickedEmployee?.exp);
    const [sickLeaves, setSickLeaves] = useState(clickedEmployee?.sickleave);
    const saveChanges = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const URL = `${import.meta.env.VITE_REACT_BASE_URL}/api/employees/${
            clickedEmployee?.id
        }`;

        const newDetails = {
            id: clickedEmployee?.id,
            firstname: firstName,
            lastname: lastName,
            rank,
            married,
            kids,
            absences,
            exp,
            sickleave: sickLeaves,
        };
        const res = await axios.put(URL, newDetails);
        if (res.status === 200) {
            const editedEmp = employees.find(
                (emp) => emp.id === clickedEmployee?.id
            );
            editedEmp!.firstname = firstName!;
            editedEmp!.lastname = lastName!;
            editedEmp!.rank = rank!;
            editedEmp!.married = married!;
            editedEmp!.kids = kids!;
            editedEmp!.absences = absences!;
            editedEmp!.exp = exp!;
            editedEmp!.sickleave = sickLeaves!;
            setEmployees([...employees]);
            const fullName =
                clickedEmployee?.firstname! + clickedEmployee?.lastname!;
            toast.success(
                <div>
                    <b>{fullName}</b>'s details were updated with success.
                </div>
            );
        } else {
            toast.error("Failed to update the user's info. Try again later.");
        }
        close();
    };

    return (
        <div
            id="defaultModal"
            tabIndex={-1}
            aria-hidden="true"
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 p-4 overflow-x-hidden overflow-y-auto max-h-full"
        >
            <div className="relative w-full max-w-2xl max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Edit employee
                        </h3>
                        <button
                            onClick={close}
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-hide="defaultModal"
                        >
                            <svg
                                aria-hidden="true"
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <form onSubmit={saveChanges}>
                        <div className="p-4 flex flex-col gap-2">
                            <div className="flex gap-4">
                                <div>
                                    <label
                                        htmlFor="first"
                                        className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        First name
                                    </label>
                                    <input
                                        onChange={(e) => {
                                            setFirstName(e.target.value);
                                        }}
                                        value={firstName}
                                        type="text"
                                        maxLength={16}
                                        id="first"
                                        className="block w-[250px] p-3  text-gray-900 border border-gray-300 rounded-lg bg-gray-50  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="last"
                                        className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Last name
                                    </label>
                                    <input
                                        onChange={(e) => {
                                            setLastName(e.target.value);
                                        }}
                                        value={lastName}
                                        type="text"
                                        maxLength={16}
                                        id="last"
                                        className="block w-[250px] p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div>
                                    <label
                                        htmlFor="exp"
                                        className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Experience
                                    </label>
                                    <input
                                        onChange={(e) => {
                                            setExp(e.target.value);
                                        }}
                                        value={exp}
                                        min={0}
                                        max={30}
                                        type="number"
                                        id="exp"
                                        className="block w-[250px] p-3  text-gray-900 border border-gray-300 rounded-lg bg-gray-50  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="rank"
                                        className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Rank
                                    </label>
                                    <input
                                        onChange={(e) => {
                                            setRank(e.target.value);
                                        }}
                                        min={1}
                                        max={16}
                                        value={rank}
                                        type="number"
                                        id="rank"
                                        className="block w-[250px] p-3  text-gray-900 border border-gray-300 rounded-lg bg-gray-50  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div>
                                    <label
                                        htmlFor="abs"
                                        className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Absences
                                    </label>
                                    <input
                                        onChange={(e) => {
                                            setAbsences(e.target.value);
                                        }}
                                        value={absences}
                                        min={0}
                                        max={30}
                                        type="number"
                                        id="abs"
                                        className="block w-[250px] p-3  text-gray-900 border border-gray-300 rounded-lg bg-gray-50  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="sl"
                                        className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Sick leaves
                                    </label>
                                    <input
                                        onChange={(e) => {
                                            setSickLeaves(e.target.value);
                                        }}
                                        value={sickLeaves}
                                        min={0}
                                        max={30}
                                        type="number"
                                        id="sl"
                                        className="block w-[250px] p-3  text-gray-900 border border-gray-300 rounded-lg bg-gray-50  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <div className="flex gap-1 items-center">
                                    <input
                                        type="checkbox"
                                        id="married"
                                        onChange={(e) => {
                                            setMarried(e.target.checked);
                                        }}
                                        checked={married}
                                    />
                                    <label
                                        htmlFor="married"
                                        className="text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Married
                                    </label>
                                </div>
                                <div>
                                    <label
                                        htmlFor="kids"
                                        className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Kids
                                    </label>
                                    <input
                                        onChange={(e) => {
                                            setKids(e.target.value);
                                        }}
                                        value={kids}
                                        min={0}
                                        max={30}
                                        type="number"
                                        id="kids"
                                        className="block w-[250px] p-3  text-gray-900 border border-gray-300 rounded-lg bg-gray-50  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button
                                data-modal-hide="defaultModal"
                                type="submit"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Save changes
                            </button>
                            <button
                                onClick={close}
                                data-modal-hide="defaultModal"
                                type="button"
                                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditEmployee;
