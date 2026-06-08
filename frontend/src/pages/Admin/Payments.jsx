import { useState } from "react";

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const [form, setForm] = useState({
    payment_id: "",
    student_id: "",
    payment_date: "",
    amount: "",
    payment_method: "",
    reference_no: "",
    purpose: "",
    status: "",
  });

  const [editId, setEditId] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const addOrUpdate = () => {
    if (!form.payment_id) return alert("ID required");

    if (editId) {
      setPayments(
        payments.map((p) =>
          p.payment_id === editId ? form : p
        )
      );
      setEditId(null);
    } else {
      setPayments([...payments, form]);
    }

    setForm({
      payment_id: "",
      student_id: "",
      payment_date: "",
      amount: "",
      payment_method: "",
      reference_no: "",
      purpose: "",
      status: "",
    });
  };

  const handleEdit = (p) => {
    setForm(p);
    setEditId(p.payment_id);
  };

  const handleDelete = (id) => {
    setPayments(payments.filter((p) => p.payment_id !== id));
    if (editId === id) setEditId(null);
  };

  return (
    <div className="table-card">
      <h2>Payments CRUD</h2>

      <div className="crud-form">
        <input name="payment_id" placeholder="ID" value={form.payment_id} onChange={handleChange} />
        <input name="student_id" placeholder="Student ID" value={form.student_id} onChange={handleChange} />
        <input type="date" name="payment_date" value={form.payment_date} onChange={handleChange} />
        <input name="amount" placeholder="Amount" value={form.amount} onChange={handleChange} />
        <input name="payment_method" placeholder="Method" value={form.payment_method} onChange={handleChange} />
        <input name="reference_no" placeholder="Reference" value={form.reference_no} onChange={handleChange} />
        <input name="purpose" placeholder="Purpose" value={form.purpose} onChange={handleChange} />
        <input name="status" placeholder="Status" value={form.status} onChange={handleChange} />

        <button onClick={addOrUpdate}>
          {editId ? "Update" : "Add"}
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Student</th>
            <th>Amount</th>
            <th>Method</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {payments.map((p) => (
            <tr key={p.payment_id}>
              <td>{p.student_id}</td>
              <td>{p.amount}</td>
              <td>{p.payment_method}</td>
              <td>{p.status}</td>
              <td>
                <button onClick={() => handleEdit(p)}>Edit</button>
                <button onClick={() => handleDelete(p.payment_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}