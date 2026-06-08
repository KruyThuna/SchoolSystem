import React, { Component } from "react";

const API = "http://localhost:8080/api/class";

export default class Classes extends Component {
  state = {
    classes: [],
    form: {
      class_id: "",
      class_number: "",
      building: "",
      capacity: "",
      class_type: "",
    },
    editId: null,
  };

  /* =========================
     LOAD DATA
  ========================= */
  componentDidMount() {
    this.loadClasses();
  }

  loadClasses = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      this.setState({ classes: data });
    } catch (err) {
      console.error("Load error:", err);
    }
  };

  /* =========================
     INPUT CHANGE
  ========================= */
  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  /* =========================
     SAVE (ADD / UPDATE)
  ========================= */
  save = async () => {
    const { form, editId } = this.state;

    if (!form.class_id) {
      alert("Class ID required");
      return;
    }

    try {
      const url = editId
        ? `${API}/${editId}`
        : API;

      const method = editId ? "PUT" : "POST";

      await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      this.loadClasses();

      this.setState({
        editId: null,
        form: {
          class_id: "",
          class_number: "",
          building: "",
          capacity: "",
          class_type: "",
        },
      });
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  /* =========================
     EDIT
  ========================= */
  edit = (item) => {
    this.setState({
      form: item,
      editId: item.class_id,
    });
  };

  /* =========================
     DELETE
  ========================= */
  remove = async (id) => {
    if (!window.confirm("Delete this class?")) return;

    try {
      await fetch(`${API}/${id}`, {
        method: "DELETE",
      });

      this.loadClasses();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  /* =========================
     RENDER
  ========================= */
  render() {
    const { classes, form, editId } = this.state;

    return (
      <div className="table-card">
        <div className="card-header-actions">
          <h2>Class Management</h2>
        </div>

        {/* FORM */}
        <div className="crud-form">
          <input
            name="class_id"
            placeholder="Class ID"
            value={form.class_id}
            onChange={this.handleChange}
            disabled={editId !== null}
          />

          <input
            name="class_number"
            placeholder="Class Number"
            value={form.class_number}
            onChange={this.handleChange}
          />

          <input
            name="building"
            placeholder="Building"
            value={form.building}
            onChange={this.handleChange}
          />

          <input
            name="capacity"
            type="number"
            placeholder="Capacity"
            value={form.capacity}
            onChange={this.handleChange}
          />

          <input
            name="class_type"
            placeholder="Class Type"
            value={form.class_type}
            onChange={this.handleChange}
          />

          <div className="form-actions">
            <button className="btn-primary" onClick={this.save}>
              {editId ? "Update" : "Add"}
            </button>

            {editId && (
              <button
                className="btn-secondary"
                onClick={() =>
                  this.setState({
                    editId: null,
                    form: {
                      class_id: "",
                      class_number: "",
                      building: "",
                      capacity: "",
                      class_type: "",
                    },
                  })
                }
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* TABLE */}
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Number</th>
              <th>Building</th>
              <th>Capacity</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {classes.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No classes found
                </td>
              </tr>
            ) : (
              classes.map((c) => (
                <tr key={c.class_id}>
                  <td>{c.class_id}</td>
                  <td>{c.class_number}</td>
                  <td>{c.building}</td>
                  <td>{c.capacity}</td>
                  <td>{c.class_type}</td>

                  <td>
                    <button className="btn-edit" onClick={() => this.edit(c)}>
                      Edit
                    </button>

                    <button
                      className="btn-danger btn-delete"
                      onClick={() => this.remove(c.class_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    );
  }
}