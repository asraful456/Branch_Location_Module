import { useState } from "react";
import { FiPlus, FiMinus, FiX } from "react-icons/fi";

const DIVISIONS = [
  "Dhaka Division",
  "Chattogram Division",
  "Rajshahi Division",
  "Khulna Division",
  "Barishal Division",
  "Sylhet Division",
  "Rangpur Division",
  "Mymensingh Division",
];

const emptyCoordinator = { name: "", role: "", phone: "", email: "" };

export default function UpdateEdit({ branch, onUpdate, onClose }) {
  const [form, setForm] = useState({
    ...branch,
    coordinators: branch.coordinators?.length ? branch.coordinators : [{ ...emptyCoordinator }],
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCoordinatorChange = (index, field, value) => {
    const updated = [...form.coordinators];
    updated[index][field] = value;
    setForm({ ...form, coordinators: updated });
  };

  const addCoordinator = () => {
    setForm({ ...form, coordinators: [...form.coordinators, { ...emptyCoordinator }] });
  };

  const removeCoordinator = (index) => {
    const updated = form.coordinators.filter((_, i) => i !== index);
    setForm({ ...form, coordinators: updated });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(form);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-brand-800">Branch Info Edit</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-4">
          <Field label="Branch Name">
            <input
              name="name" required value={form.name} onChange={handleChange}
              className="input-field"
            />
          </Field>

          <Field label="Division">
            <select name="division" value={form.division} onChange={handleChange} className="input-field">
              {DIVISIONS.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </Field>

          <Field label="Branch Address">
            <input
              name="address" required value={form.address} onChange={handleChange}
              className="input-field"
            />
          </Field>

          <Field label="Contact No.">
            <input
              name="phone" value={form.phone} onChange={handleChange}
              className="input-field"
            />
          </Field>

          <Field label="E-mail">
            <input
              name="email" type="email" value={form.email} onChange={handleChange}
              className="input-field"
            />
          </Field>

          <Field label="Google Map Link">
            <textarea
              name="mapEmbed" value={form.mapEmbed} onChange={handleChange}
              rows={2} className="input-field"
            />
          </Field>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">Coordinators</label>
              <button
                type="button" onClick={addCoordinator}
                className="flex items-center gap-1 text-brand-600 hover:text-brand-700 text-sm font-medium"
              >
                <FiPlus size={14} /> Add
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {form.coordinators.map((c, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <input
                    placeholder="Coordinator Name" value={c.name}
                    onChange={(e) => handleCoordinatorChange(i, "name", e.target.value)}
                    className="input-field flex-1"
                  />
                  <input
                    placeholder="Designation" value={c.role}
                    onChange={(e) => handleCoordinatorChange(i, "role", e.target.value)}
                    className="input-field flex-1"
                  />
                  <input
                    placeholder="Phone Number" value={c.phone}
                    onChange={(e) => handleCoordinatorChange(i, "phone", e.target.value)}
                    className="input-field flex-1"
                  />
                  {form.coordinators.length > 1 && (
                    <button
                      type="button" onClick={() => removeCoordinator(i)}
                      className="text-red-500 hover:text-red-600 shrink-0"
                    >
                      <FiMinus size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md py-2 transition-colors"
            >
              Update
            </button>
            <button
              type="button" onClick={onClose}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium rounded-md py-2 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {children}
    </div>
  );
}
