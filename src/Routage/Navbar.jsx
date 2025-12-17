import { NavLink } from "react-router-dom";
import './navbar.css'

export default function Navbar() {
    const navLinkStyles = ({ isActive }) => ({
  color: isActive ? '#007bff' : '#333',
  textDecoration: isActive ? 'none' : 'underline',
  fontWeight: isActive ? 'bold' : 'normal',
        padding: '5px 10px',
        margin: '0 5px',
        display: 'inline-block'
});
    
    return (
        <nav style={{ padding: '20px', backgroundColor: '#f8f9fa', marginBottom: '20px',borderRadius:'30px' }}>
            <h1 className="animated-h1" style={{ marginBottom: '15px', textAlign: 'center',color:'#43a1feff' ,fontWeight:'bolder',}}>My Projects</h1>
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <NavLink to="/" style={navLinkStyles}>Home</NavLink>
                <NavLink to="/ToDo-List" style={navLinkStyles}>Todo List</NavLink>
                <NavLink to="/Vedio-gallery" style={navLinkStyles}>Video Gallery</NavLink>
                <NavLink to="/Pitures-gallery" style={navLinkStyles}>Pictures Gallery</NavLink>
                <NavLink to="/habits" style={navLinkStyles}>Habits Management</NavLink>
                <NavLink to="/Products" style={navLinkStyles}>Products</NavLink>
                <NavLink to="/Forms" style={navLinkStyles}>Form</NavLink>
            </div>
        </nav>
    );
}