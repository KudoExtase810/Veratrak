import AddEmployee from "../components/employees/AddEmployee";
import ConfirmDelete from "../components/employees/ConfirmDelete";
import EditEmployee from "../components/employees/EditEmployee";
import EmpTable from "../components/employees/EmpTable";
import { useEffect, useState } from "react";

function Employees() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    // modals
    const [showEditEmployee, setShowEditEmployee] = useState(false);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [showAddEmployee, setShowAddEmployee] = useState(false);

    const [clickedEmployee, setClickedEmployee] = useState<Employee>();

    useEffect(() => {
        if (showEditEmployee || showConfirmDelete || showAddEmployee) {
            document.body.classList.add("overflow-y-hidden");
        } else {
            document.body.classList.remove("overflow-y-hidden");
        }
    }, [showEditEmployee, showConfirmDelete, showAddEmployee]);

    return (
        <>
            {showEditEmployee && (
                <EditEmployee
                    employees={employees}
                    setEmployees={setEmployees}
                    close={() => setShowEditEmployee(false)}
                    clickedEmployee={clickedEmployee}
                />
            )}
            {showConfirmDelete && (
                <ConfirmDelete
                    employees={employees}
                    setEmployees={setEmployees}
                    close={() => setShowConfirmDelete(false)}
                    clickedEmployee={clickedEmployee}
                />
            )}
            {showAddEmployee && (
                <AddEmployee
                    employees={employees}
                    setEmployees={setEmployees}
                    close={() => setShowAddEmployee(false)}
                />
            )}
            <EmpTable
                employees={employees}
                setEmployees={setEmployees}
                setClickedEmployee={setClickedEmployee}
                setShowEditEmployee={setShowEditEmployee}
                setShowConfirmDelete={setShowConfirmDelete}
                setShowAddEmployee={setShowAddEmployee}
            />
        </>
    );
}

export default Employees;
