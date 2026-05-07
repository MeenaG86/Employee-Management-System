import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    salary: ""
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function getEmployees() {
    const res = await axios.get("http://localhost:5000/employees");
    setEmployees(res.data);
  }

  async function addEmployee() {
    if (!form.name || !form.email || !form.role || !form.salary) {
      alert("Please fill all fields");
      return;
    }

    await axios.post("http://localhost:5000/employees", form);

    setForm({
      name: "",
      email: "",
      role: "",
      salary: ""
    });

    getEmployees();
  }

  async function deleteEmployee(id) {
    await axios.delete(`http://localhost:5000/employees/${id}`);
    getEmployees();
  }

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <div className="container">
      <h1>Employee Management System</h1>
      <p className="subtitle">Manage employee records with MongoDB CRUD operations</p>

      <div className="form-card">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Employee Name" />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email Address" />
        <input name="role" value={form.role} onChange={handleChange} placeholder="Job Role" />
        <input name="salary" value={form.salary} onChange={handleChange} placeholder="Salary" />

        <button onClick={addEmployee}>Add Employee</button>
      </div>

      <div className="employee-grid">
        {employees.map((emp) => (
          <div className="employee-card" key={emp._id}>
            <h2>{emp.name}</h2>
            <p><strong>Email:</strong> {emp.email}</p>
            <p><strong>Role:</strong> {emp.role}</p>
            <p><strong>Salary:</strong> ₹{emp.salary}</p>

            <button className="delete-btn" onClick={() => deleteEmployee(emp._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;