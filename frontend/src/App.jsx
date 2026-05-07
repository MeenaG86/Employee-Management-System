import { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [employees, setEmployees] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    salary: ""
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  async function addEmployee() {

    await axios.post(
      "http://localhost:5000/employees",
      form
    );

    getEmployees();

    setForm({
      name: "",
      email: "",
      role: "",
      salary: ""
    });
  }

  async function getEmployees() {

    const res = await axios.get(
      "http://localhost:5000/employees"
    );

    setEmployees(res.data);
  }

  async function deleteEmployee(id) {

    await axios.delete(
      `http://localhost:5000/employees/${id}`
    );

    getEmployees();
  }

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <div>

      <h1>Employee Management System</h1>

      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />

      <input
        name="role"
        placeholder="Role"
        value={form.role}
        onChange={handleChange}
      />

      <input
        name="salary"
        placeholder="Salary"
        value={form.salary}
        onChange={handleChange}
      />

      <button onClick={addEmployee}>
        Add Employee
      </button>

      {
        employees.map((emp) => (
          <div key={emp._id}>

            <h3>{emp.name}</h3>

            <p>{emp.email}</p>

            <p>{emp.role}</p>

            <p>{emp.salary}</p>

            <button
              onClick={() => deleteEmployee(emp._id)}
            >
              Delete
            </button>

          </div>
        ))
      }

    </div>
  );
}

export default App;