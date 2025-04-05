import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav style={styles.navbar}>
            <h2 style={styles.logo}>📊 Finance Dashboard</h2>
            <ul style={styles.navLinks}>
                <li>
                    <Link to="/" style={styles.link}>🏠 Home</Link>
                </li>
                <li>
                    <Link to="/favorites" style={styles.link}>⭐ Favorieten</Link>
                </li>
            </ul>
        </nav>
    );
}

const styles = {
    navbar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        background: "#282c34",
        color: "white",
    },
    logo: { margin: 0 },
    navLinks: { listStyle: "none", display: "flex", gap: "15px", padding: 0 },
    link: { color: "white", textDecoration: "none", fontSize: "18px" },
};

export default Navbar;
