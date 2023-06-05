import { BsStarFill, BsStarHalf } from "react-icons/bs";
interface props {
    index: number;
    employee: Employee;
}
function SingleEmployee({ index, employee }: props) {
    const { firstname, lastname, rank, exp, absences, married, kids } =
        employee;

    function calculateSalary(rank: number) {
        // LVL POINTS
        function getLvlPoints(exp: number) {
            let lvlPoints = 1;
            for (let i = 0; i <= exp; i += 2.5) {
                lvlPoints = i * lvlPoints;
            }
            return lvlPoints;
        }

        //sinf points
        const s_points = [
            0, 200, 219, 240, 263, 288, 315, 348, 379, 418, 453, 498, 537, 578,
            621, 666, 713,
        ];
        // base salary
        let baseSalary = s_points[rank] * 45 + getLvlPoints(exp as number) * 15;

        // bonus
        let bonus: number;
        if (rank >= 1 && rank <= 7) {
            bonus = (baseSalary * 10) / 100;
        } else if (rank >= 8 && rank <= 13) {
            bonus = (baseSalary * 25) / 100;
        } else {
            bonus = (baseSalary * 40) / 100;
        }
        baseSalary += bonus;

        // absenses
        baseSalary = (baseSalary / 30) * (30 - (absences as number));

        // assurance
        baseSalary = baseSalary + (baseSalary * 9) / 100;

        if (married) {
            baseSalary += 800;
        }

        // kids
        baseSalary = baseSalary + 300 * (kids as number);

        return baseSalary;
    }

    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
                {index}
            </th>
            <td className="px-6 py-4">
                <div className="flex gap-2 items-center">
                    <span>{firstname + " " + lastname}</span>
                    {rank === 16 && <BsStarFill size={20} color="#FFD700" />}
                    {(rank === 14 || rank === 15) && (
                        <BsStarHalf size={20} color="#FFD700" />
                    )}
                </div>
            </td>
            <td className="px-6 py-4">
                {calculateSalary(rank as number).toFixed(2)}DA
            </td>
        </tr>
    );
}

export default SingleEmployee;
// const calculateSalary = () => {
//     let s_points: number;
//     let baseSalary = 0;
//     switch (rank) {
//         case 1:
//             s_points = 200;
//             baseSalary = s_points * 45 + getLvlPoints() * 15;
//             break;
//         case 2:
//             s_points = 219;
//             baseSalary = s_points * 45 + getLvlPoints() * 15;
//             break;
//         case 3:
//             s_points = 240;
//             baseSalary = s_points * 45 + getLvlPoints() * 15;
//             break;
//         case 4:
//             s_points = 263;
//             baseSalary = s_points * 45 + getLvlPoints() * 15;
//             break;
//         case 5:
//             s_points = 288;
//             baseSalary = s_points * 45 + getLvlPoints() * 15;
//             break;
//         case 6:
//             s_points = 315;
//             baseSalary = s_points * 45 + getLvlPoints() * 15;
//             break;
//         case 7:
//             s_points = 348;
//             baseSalary = s_points * 45 + getLvlPoints() * 15;
//             break;
//         case 8:
//             s_points = 379;
//             baseSalary = s_points * 45 + getLvlPoints() * 15;
//             break;
//         case 9:
//             s_points = 418;
//             baseSalary = s_points * 45 + getLvlPoints() * 15;
//             break;
//         case 10:
//             s_points = 453;
//             baseSalary = s_points * 45 + getLvlPoints() * 15;
//             break;
//         case 11:
//             s_points = 498;
//             baseSalary = s_points * 45 + getLvlPoints() * 15;
//             break;
//         case 12:
//             s_points = 537;
//             baseSalary = s_points * 45 + getLvlPoints() * 15;
//             break;
//         case 13:
//             s_points = 578;
//             baseSalary = s_points * 45 + getLvlPoints() * 15;
//             break;
//         case 14:
//             s_points = 621;
//             baseSalary = s_points * 45 + getLvlPoints() * 15;
//             break;
//         case 15:
//             s_points = 666;
//             baseSalary = s_points * 45 + getLvlPoints() * 15;
//             break;
//         case 16:
//             s_points = 713;
//             baseSalary = s_points * 45 + getLvlPoints() * 15;
//             break;
//     }
//     return baseSalary;
// };
