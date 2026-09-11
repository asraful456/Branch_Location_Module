import { useEffect, useMemo, useState } from "react";
import { FiSearch, FiPlus } from "react-icons/fi";
import Card from "../components/Card";
import Create from "../components/Create";
import UpdateEdit from "../components/UpdateEdit";
import Delete from "../components/Delete";
import {
  getBranches,
  createBranch,
  updateBranch,
  deleteBranch,
} from "../api/branchApi";

export default function AdminView() {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const [showCreate, setShowCreate] = useState(false);
  const [editingBranch, setEditingBranch] = useState(null);
  const [deletingBranch, setDeletingBranch] = useState(null);
  const [toast, setToast] = useState(null);

  const loadBranches = () => {
    setLoading(true);
    getBranches()
      .then((data) => setBranches(data))
      .catch(() => setError("Could not load branches. Is json-server running?"))
      .finally(() => setLoading(false));
  };

  useEffect(loadBranches, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const filtered = useMemo(() => {
    if (!search) return branches;
    const q = search.toLowerCase();
    return branches.filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        b.division?.toLowerCase().includes(q) ||
        b.address.toLowerCase().includes(q)
    );
  }, [branches, search]);

  const handleCreate = async (form) => {
    try {
      await createBranch(form);
      setShowCreate(false);
      loadBranches();
      showToast("Branch created successfully.");
    } catch {
      showToast("Failed to create branch.");
    }
  };

  const handleUpdate = async (form) => {
    try {
      await updateBranch(form.id, form);
      setEditingBranch(null);
      loadBranches();
      showToast("Branch updated successfully.");
    } catch {
      showToast("Failed to update branch.");
    }
  };

  const handleDelete = async (branch) => {
    try {
      await deleteBranch(branch.id);
      setDeletingBranch(null);
      loadBranches();
      showToast("Branch deleted.");
    } catch {
      showToast("Failed to delete branch.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <h1 className="text-2xl font-bold text-gray-800">Branch List</h1>
          <button
            onClick={() => setShowCreate(true)}
            className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-medium px-4 py-2 rounded-md transition-colors"
          >
            <FiPlus /> Add Branch
          </button>
        </div>

        <div className="relative mb-6 max-w-md">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search branch name, division, address, or coordinator..."
            className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-300 text-sm"
          />
        </div>

        {loading && <p className="text-center text-gray-400 py-10">Loading branches...</p>}
        {error && <p className="text-center text-red-500 py-10">{error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filtered.map((branch, i) => (
              <Card
                key={branch.id}
                branch={branch}
                isAdmin
                index={i + 1}
                onEdit={setEditingBranch}
                onDelete={setDeletingBranch}
              />
            ))}
          </div>
        )}
      </div>

      {showCreate && (
        <Create onCreate={handleCreate} onClose={() => setShowCreate(false)} />
      )}

      {editingBranch && (
        <UpdateEdit
          branch={editingBranch}
          onUpdate={handleUpdate}
          onClose={() => setEditingBranch(null)}
        />
      )}

      {deletingBranch && (
        <Delete
          branch={deletingBranch}
          onConfirm={handleDelete}
          onCancel={() => setDeletingBranch(null)}
        />
      )}

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-sm px-4 py-2 rounded-md shadow-lg z-50">
          {toast}
        </div>
      )}
    </div>
  );
}
