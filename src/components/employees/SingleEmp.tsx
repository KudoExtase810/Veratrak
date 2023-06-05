import { BiEditAlt } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";

interface Props {
    index: number;
    employee: Employee;
    setShowEditEmployee: React.Dispatch<React.SetStateAction<boolean>>;
    setShowConfirmDelete: React.Dispatch<React.SetStateAction<boolean>>;
    setClickedEmployee: React.Dispatch<
        React.SetStateAction<Employee | undefined>
    >;
}

function SingleEmp({
    index,
    employee,
    setShowEditEmployee,
    setShowConfirmDelete,
    setClickedEmployee,
}: Props) {
    return (
        <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
            <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
                {index + 1}
            </th>
            <td className="px-6 py-4">{`${employee.firstname} ${employee.lastname}`}</td>
            <td className="px-6 py-4">{employee.rank}</td>
            <td className="px-6 py-4">{employee.married ? "Yes" : "No"}</td>
            <td className="p-3">
                <div className="flex items-center gap-1">
                    <button
                        type="button"
                        onClick={() => {
                            setClickedEmployee(employee);
                            setShowEditEmployee(true);
                        }}
                    >
                        {" "}
                        <BiEditAlt
                            size={22}
                            className="text-blue-500 hover:text-blue-400"
                        />{" "}
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setClickedEmployee(employee);
                            setShowConfirmDelete(true);
                        }}
                    >
                        {" "}
                        <MdOutlineDelete
                            size={22}
                            className="text-red-600 hover:text-red-500"
                        />{" "}
                    </button>
                </div>
            </td>
        </tr>
    );
}

export default SingleEmp;
