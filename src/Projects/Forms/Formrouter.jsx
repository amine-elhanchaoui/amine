
import { NavLink, Outlet } from "react-router-dom";
export default function Formrouter() {
    const navLinkStyles = ({ isActive }) => ({
        color: isActive ? '#007bff' : '#333',
        textDecoration: isActive ? 'none' : 'underline',
        fontWeight: isActive ? 'bold' : 'normal',
        padding: '5px 10px',
        margin: '0 5px',
        display: 'inline-block'
    });

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <nav style={{ marginBottom: '20px', textAlign: 'center' }}>
                <NavLink to="/Forms/Form" style={navLinkStyles}>Form</NavLink>
                <NavLink to="/Forms/Employee" style={navLinkStyles}>Employee</NavLink>
            </nav>
            {/* Render the selected child route here */}
            <Outlet />
        </div>
    );
}