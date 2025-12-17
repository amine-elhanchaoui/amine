export default function DisplayEmployees({ employees = [] }) {
    if (!Array.isArray(employees) || employees.length === 0) {
        return <p>No employees to display.</p>;
    }

    return (
        <ul>
            {employees.map((item, index) => (
                <li key={index}>
                    <strong>
                        {item.firstName || ""} {item.lastName || ""}
                    </strong>
                    {item.email && <> — {item.email}</>}
                    {item.phone && <> — {item.phone}</>}
                </li>
            ))}
        </ul>
    );
}