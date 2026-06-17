import { useState, useEffect } from "react";
import "../../../styles/Dashboard.css";

const API_BASE_URL = "http://localhost:8080/api";
const formatDate = (dateStr) => (dateStr ? dateStr.split("T")[0] : "");

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [form, setForm] = useState({
    invoice_no: "",
    student_id: "",
    amount: "",
    payment_date: "",
    method: "Cash",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/payments`);
      setPayments(await res.json());
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const save = async () => {
    if (!form.invoice_no.trim()) return alert("Invoice No is required");
    try {
      const url = editId
        ? `${API_BASE_URL}/payments/${editId}`
        : `${API_BASE_URL}/payments`;
      const res = await fetch(url, {
        method: editId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok)
        throw new Error((await res.json()).message || "Error saving record");
      fetchPayments();
      cancel();
    } catch (err) {
      alert(err.message);
    }
  };

  const edit = (p) => {
    setForm({ ...p, payment_date: formatDate(p.payment_date) });
    setEditId(p.invoice_no);
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this payment?")) return;
    await fetch(`${API_BASE_URL}/payments/${id}`, { method: "DELETE" });
    fetchPayments();
    if (editId === id) cancel();
  };

  const cancel = () => {
    setEditId(null);
    setForm({
      invoice_no: "",
      student_id: "",
      amount: "",
      payment_date: "",
      method: "Cash",
    });
  };

  const methodClass = (m) =>
    m === "Cash"
      ? "tag tag-green"
      : m === "Card"
        ? "tag tag-blue"
        : "tag tag-amber";

  return (
    <div className="table-card">
      <h2 className="section-title">Payments Management</h2>
      <div className="crud-form">
        <input
          name="invoice_no"
          placeholder="Invoice No"
          value={form.invoice_no}
          onChange={handleChange}
          disabled={editId !== null}
        />
        <input
          name="student_id"
          placeholder="Student ID"
          value={form.student_id}
          onChange={handleChange}
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount ($)"
          value={form.amount}
          onChange={handleChange}
        />
        <input
          type="date"
          name="payment_date"
          value={form.payment_date}
          onChange={handleChange}
        />
        <select name="method" value={form.method} onChange={handleChange}>
          <option value="Cash">Cash</option>
          <option value="Bank Transfer">Bank Transfer</option>
          <option value="Card">Card</option>
        </select>
        <div className="form-actions">
          <button className="btn-primary" onClick={save}>
            {editId ? "Update" : "Add Payment"}
          </button>
          {editId && (
            <button className="btn-secondary" onClick={cancel}>
              Cancel
            </button>
          )}
        </div>
      </div>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Invoice No</th>
              <th>Student ID</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Method</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.length === 0 ? (
              <tr>
                <td colSpan="6" className="empty-row">
                  No payments found
                </td>
              </tr>
            ) : (
              payments.map((p) => (
                <tr key={p.invoice_no}>
                  <td>
                    <span className="id-badge">{p.invoice_no}</span>
                  </td>
                  <td>{p.student_id}</td>
                  <td className="amount-cell">
                    ${Number(p.amount).toLocaleString()}
                  </td>
                  <td>{formatDate(p.payment_date)}</td>
                  <td>
                    <span className={methodClass(p.method)}>{p.method}</span>
                  </td>
                  <td>
                    <div className="action-btns">
                      <button className="btn-edit" onClick={() => edit(p)}>
                        ✏ Edit
                      </button>
                      <button
                        className="btn-danger"
                        onClick={() => remove(p.invoice_no)}
                      >
                        🗑 Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payments;
