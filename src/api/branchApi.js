const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export async function getBranches() {
  const res = await fetch(`${BASE_URL}/branches`);
  if (!res.ok) throw new Error("Failed to fetch branches");
  return res.json();
}

export async function createBranch(branch) {
  const res = await fetch(`${BASE_URL}/branches`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(branch),
  });
  if (!res.ok) throw new Error("Failed to create branch");
  return res.json();
}

export async function updateBranch(id, branch) {
  const res = await fetch(`${BASE_URL}/branches/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(branch),
  });
  if (!res.ok) throw new Error("Failed to update branch");
  return res.json();
}

export async function deleteBranch(id) {
  const res = await fetch(`${BASE_URL}/branches/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete branch");
  return true;
}
