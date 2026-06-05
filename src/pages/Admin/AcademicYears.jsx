import { useState } from "react";

export default function AcademicYears() {
  const [years, setYears] = useState([]);
  const [form, setForm] = useState({ academic_year_id: "", year_name: "", start_date: "", end_date: "", is_active: true });
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const addOrUpdate = () => {
    if (!form.academic_year_id.trim()) return alert("ID required");

    if (editId) {
      // 1. Update existing year
      setYears(years.map(y => y.academic_year_id === editId ? form : y));
      setEditId(null);
    } else {
      // 2. Add new & check duplicate ID (កូដចាស់អត់មានឆែកត្រង់នេះទេ)
      if (years.some(y => y.academic_year_id === form.academic_year_id)) {
        return alert("Academic Year ID already exists!");
      }
      setYears([...years, form]);
    }
    cancel(); // សម្អាត Form
  };

  // 3. ប្រើ Shallow Copy {...y} ដើម្បីសុវត្ថិភាពទិន្នន័យ
  const handleEdit = (y) => { 
    setForm({ ...y }); 
    setEditId(y.academic_year_id); 
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this year?")) {
      setYears(years.filter(y => y.academic_year_id !== id)); 
      if (editId === id) cancel();
    }
  };

  // 4. បន្ថែមមុខងារ Cancel សម្រាប់ Clear State
  const cancel = () => {
    setEditId(null);
    setForm({ academic_year_id: "", year_name: "", start_date: "", end_date: "", is_active: true });
  };

  return (
    <div className="table-card">
      <h2>Academic Years CRUD</h2>
      <div className="crud-form">
        {/* 5. បិទមិនឱ្យកែ ID ពេលកំពុង Edit (disabled={editId !== null}) */}
        <input name="academic_year_id" placeholder="ID" value={form.academic_year_id} onChange={handleChange} disabled={editId !== null}/>
        <input name="year_name" placeholder="Year Name" value={form.year_name} onChange={handleChange}/>
        <input type="date" name="start_date" value={form.start_date} onChange={handleChange}/>
        <input type="date" name="end_date" value={form.end_date} onChange={handleChange}/>
        
        <select name="is_active" value={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.value === "true" })}>
          <option value={true}>Active</option>
          <option value={false}>Inactive</option>
        </select>
        
        <button onClick={addOrUpdate}>{editId ? "Update" : "Add"}</button>
        {/* 6. បង្ហាញប៊ូតុង Cancel ពេលកំពុង Edit */}
        {editId && <button onClick={cancel} style={{ backgroundColor: "gray", color: "white", marginLeft: "5px" }}>Cancel</button>}
      </div>
      
      <table>
        <thead><tr><th>ID</th><th>Year</th><th>Start</th><th>End</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          {years.length === 0 ? (
            <tr><td colSpan="6" style={{ textAlign: "center" }}>No data found</td></tr>
          ) : (
            years.map(y => (
              <tr key={y.academic_year_id}>
                <td>{y.academic_year_id}</td>
                <td>{y.year_name}</td>
                <td>{y.start_date}</td>
                <td>{y.end_date}</td>
                <td>{y.is_active ? "Active" : "Inactive"}</td>
                <td>
                  <button onClick={() => handleEdit(y)}>Edit</button>
                  <button onClick={() => handleDelete(y.academic_year_id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}