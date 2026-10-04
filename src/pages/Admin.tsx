import { useEffect, useMemo, useState } from "react";

interface Participant {
  _id: string;
  name: string;
  email: string;
  phone: string;
  year: string;
  college: string;
  department: string;
  teamName: string;
  createdAt: string;
}

interface Analytics {
  totalParticipants: number;
  totalTeams: number;
  years: Record<string, number>;
  colleges: Record<string, number>;
}

function Admin() {
  const [loggedIn, setLoggedIn] = useState(
    Boolean(localStorage.getItem("adminToken"))
  );
  const API_URL = "https://thelastcommit.onrender.com";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [participants, setParticipants] = useState<Participant[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);

  const [search, setSearch] = useState("");
  const [yearFilter, setYearFilter] = useState("ALL");

  const loadDashboard = async () => {
    const token = localStorage.getItem("adminToken");

    if (!token) return;

    try {
      const [participantsResponse, analyticsResponse] =
        await Promise.all([
          fetch(`${API_URL}/api/admin/participants`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          fetch(`${API_URL}/api/admin/analytics`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

      if (!participantsResponse.ok || !analyticsResponse.ok) {
        localStorage.removeItem("adminToken");
        setLoggedIn(false);
        return;
      }

      const participantsData = await participantsResponse.json();
      const analyticsData = await analyticsResponse.json();

      setParticipants(participantsData);
      setAnalytics(analyticsData);
    } catch {
      setError("Unable to connect to server");
    }
  };

  useEffect(() => {
    if (loggedIn) {
      loadDashboard();
    }
  }, [loggedIn]);

  const handleLogin = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setError("");

    try {
      const response = await fetch(
        `${API_URL}/api/admin/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
        return;
      }

      localStorage.setItem("adminToken", data.token);
      setLoggedIn(true);
    } catch {
      setError("Unable to connect to server");
    }
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    setLoggedIn(false);
    setParticipants([]);
    setAnalytics(null);
  };

  const filteredParticipants = useMemo(() => {
    return participants.filter((participant) => {
      const matchesSearch =
        participant.name.toLowerCase().includes(search.toLowerCase()) ||
        participant.email.toLowerCase().includes(search.toLowerCase()) ||
        participant.college.toLowerCase().includes(search.toLowerCase()) ||
        participant.teamName.toLowerCase().includes(search.toLowerCase());

      const matchesYear =
        yearFilter === "ALL" || participant.year === yearFilter;

      return matchesSearch && matchesYear;
    });
  }, [participants, search, yearFilter]);

  const exportCSV = () => {
    const headers = [
      "Name",
      "Email",
      "Phone",
      "Year",
      "College",
      "Department",
      "Team",
    ];

    const rows = participants.map((participant) => [
      participant.name,
      participant.email,
      participant.phone,
      participant.year,
      participant.college,
      participant.department,
      participant.teamName,
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((row) =>
        row
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "the-last-commit-registrations.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  if (!loggedIn) {
    return (
      <div className="admin-page">
        <div className="admin-login">
          <div className="section-label">
            THE LAST COMMIT / ADMIN
          </div>

          <h1>
            ADMIN
            <br />
            <span>ACCESS.</span>
          </h1>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>USERNAME</label>

              <input
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Admin username"
                required
              />
            </div>

            <div className="form-group">
              <label>PASSWORD</label>

              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Admin password"
                required
              />
            </div>

            {error && <p className="form-error">{error}</p>}

            <button type="submit" className="submit-button">
              ENTER ADMIN PORTAL →
            </button>
          </form>

          <a href="/" className="back-button">
            ← BACK TO HOME
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div>
          <div className="section-label">
            THE LAST COMMIT / ADMIN
          </div>

          <h1>
            CONTROL CENTER<span>_</span>
          </h1>
        </div>

        <button onClick={logout} className="logout-button">
          LOGOUT
        </button>
      </header>

      {analytics && (
        <div className="analytics-grid">
          <div className="analytics-card">
            <span>TOTAL PARTICIPANTS</span>
            <strong>{analytics.totalParticipants}</strong>
          </div>

          <div className="analytics-card">
            <span>TOTAL TEAMS</span>
            <strong>{analytics.totalTeams}</strong>
          </div>

          <div className="analytics-card">
            <span>1ST YEAR</span>
            <strong>{analytics.years["1"] || 0}</strong>
          </div>

          <div className="analytics-card">
            <span>2ND YEAR</span>
            <strong>{analytics.years["2"] || 0}</strong>
          </div>
        </div>
      )}

      {analytics && (
        <div className="admin-stats-grid">
          <div className="admin-panel">
            <div className="section-label">
              YEAR DISTRIBUTION
            </div>

            {Object.entries(analytics.years).map(([year, count]) => (
              <div className="stat-row" key={year}>
                <span>YEAR {year}</span>
                <strong>{count}</strong>
              </div>
            ))}
          </div>

          <div className="admin-panel">
            <div className="section-label">
              COLLEGE DISTRIBUTION
            </div>

            {Object.entries(analytics.colleges).map(
              ([college, count]) => (
                <div className="stat-row" key={college}>
                  <span>{college}</span>
                  <strong>{count}</strong>
                </div>
              )
            )}
          </div>
        </div>
      )}

      <section className="participants-section">
        <div className="participants-toolbar">
          <div>
            <div className="section-label">
              REGISTERED PARTICIPANTS
            </div>

            <p className="result-count">
              SHOWING {filteredParticipants.length} /{" "}
              {participants.length}
            </p>
          </div>

          <button
            onClick={exportCSV}
            className="export-button"
          >
            EXPORT CSV ↓
          </button>
        </div>

        <div className="filter-bar">
          <input
            type="text"
            placeholder="Search name, email, college or team..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <select
            value={yearFilter}
            onChange={(event) => setYearFilter(event.target.value)}
          >
            <option value="ALL">ALL YEARS</option>
            <option value="1">1ST YEAR</option>
            <option value="2">2ND YEAR</option>
            <option value="3">3RD YEAR</option>
            <option value="4">4TH YEAR</option>
          </select>
        </div>

        <div className="participants-table-wrapper">
          <table className="participants-table">
            <thead>
              <tr>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>YEAR</th>
                <th>COLLEGE</th>
                <th>DEPARTMENT</th>
                <th>TEAM</th>
              </tr>
            </thead>

            <tbody>
              {filteredParticipants.length > 0 ? (
                filteredParticipants.map((participant) => (
                  <tr key={participant._id}>
                    <td>{participant.name}</td>
                    <td>{participant.email}</td>
                    <td>{participant.year}</td>
                    <td>{participant.college}</td>
                    <td>{participant.department}</td>
                    <td>{participant.teamName}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="no-results">
                    NO PARTICIPANTS FOUND
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default Admin;