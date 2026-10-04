import { useState } from "react";
import { ArrowLeft } from "lucide-react";

function Register() {
  const API_URL = "https://thelastcommit.onrender.com";
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      year: formData.get("year"),
      college: formData.get("college"),
      department: formData.get("department"),
      teamName: formData.get("teamName"),
    };

    try {
      const response = await fetch(
        `${API_URL}/api/participants/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || "Registration failed");
        return;
      }

      setSubmitted(true);
    } catch {
      setError("Unable to connect to the server.");
    }
  };

  return (
    <div className="register-page">
      <a href="/" className="back-button">
        <ArrowLeft size={18} />
        BACK TO HOME
      </a>

      <div className="register-container">
        <div className="section-label">
          THE LAST COMMIT / REGISTRATION
        </div>

        <h1>
          JOIN THE
          <br />
          <span>GRID.</span>
        </h1>

        <p className="register-intro">
          Enter your details and prepare for the final push.
        </p>

        {submitted ? (
          <div className="success-message">
            <div className="success-icon">✓</div>

            <h2>REGISTRATION RECEIVED</h2>

            <p>
              You're on the grid.
              <br />
              We'll see you at The Last Commit.
            </p>

            <a href="/" className="primary-button">
              BACK TO HOME
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="registration-form">
            <div className="form-group">
              <label>FULL NAME</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="form-group">
              <label>EMAIL</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>PHONE</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone number"
                  required
                />
              </div>

              <div className="form-group">
                <label>YEAR</label>
                <select name="year" required defaultValue="">
                  <option value="" disabled>
                    Select year
                  </option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>COLLEGE</label>
              <input
                type="text"
                name="college"
                placeholder="College / University"
                required
              />
            </div>

            <div className="form-group">
              <label>DEPARTMENT</label>
              <input
                type="text"
                name="department"
                placeholder="e.g. Computer Science"
                required
              />
            </div>

            <div className="form-group">
              <label>TEAM NAME</label>
              <input
                type="text"
                name="teamName"
                placeholder="Your team name"
                required
              />
            </div>

            {error && <p className="form-error">{error}</p>}

            <button type="submit" className="submit-button">
              SUBMIT REGISTRATION →
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Register;