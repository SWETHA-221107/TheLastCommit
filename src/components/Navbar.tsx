import { Terminal } from "lucide-react";

function Navbar() {
  return (
    <nav className="navbar">
      <a href="/" className="logo">
        <Terminal size={20} />
        <span>THE LAST COMMIT</span>
      </a>

      <div className="nav-links">
        <a href="/#story">Story</a>
        <a href="/#mission">Mission</a>
        <a href="/#timeline">Timeline</a>
        <a href="/register">Register</a>
      </div>

      <a href="/admin" className="github-button">
        Admin →
      </a>
    </nav>
  );
}

export default Navbar;