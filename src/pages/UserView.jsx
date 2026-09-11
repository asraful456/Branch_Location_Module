import { useEffect, useMemo, useState } from "react";
import { FiSearch, FiGrid, FiMap, FiHome } from "react-icons/fi";
import Card from "../components/Card";
import StatCard from "../components/StatCard";
import { getBranches } from "../api/branchApi";

const DIVISION_TABS = [
  "All",
  "Barisal",
  "Chattogram",
  "Dhaka",
  "Khulna",
  "Mymensingh",
  "Rajshahi",
  "Rangpur",
  "Sylhet",
];

export default function UserView() {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeDivision, setActiveDivision] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    getBranches()
      .then((data) => setBranches(data))
      .catch(() => setError("Could not load branches. Is json-server running?"))
      .finally(() => setLoading(false));
  }, []);

  const totalDivisions = useMemo(
    () => new Set(branches.map((b) => b.division)).size,
    [branches]
  );

  const filtered = useMemo(() => {
    return branches.filter((b) => {
      const matchesDivision =
        activeDivision === "All" ||
        b.division?.toLowerCase().includes(activeDivision.toLowerCase());
      const matchesSearch =
        !search ||
        b.name.toLowerCase().includes(search.toLowerCase()) ||
        b.address.toLowerCase().includes(search.toLowerCase());
      return matchesDivision && matchesSearch;
    });
  }, [branches, activeDivision, search]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-50 to-white">
      <div className="bg-gradient-to-r from-brand-700 to-brand-500 text-white py-12 px-4 text-center">
        <p className="text-sm uppercase tracking-wide text-brand-100 mb-1">
          We are in {branches.length || "..."} locations
        </p>
        <h1 className="text-4xl font-bold">Our Branches</h1>
        <p className="text-brand-100 mt-2 max-w-lg mx-auto text-sm">
          Find the nearest e-Learning &amp; Earning Ltd. branch, browse contact
          details, and get directions in one place.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-8">
        <div className="flex gap-4 flex-wrap sm:flex-nowrap mb-8">
          <StatCard icon={<FiGrid />} value={totalDivisions || "—"} label="Total Divisions" />
          <StatCard icon={<FiMap />} value={branches.length} label="Total Branches" />
          <StatCard icon={<FiHome />} value={branches.length} label="Locations Listed" />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-brand-100 p-4 mb-8">
          <div className="flex flex-wrap gap-2 mb-3">
            {DIVISION_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveDivision(tab)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                  activeDivision === tab
                    ? "bg-brand-600 text-white border-brand-600"
                    : "bg-white text-gray-600 border-gray-200 hover:border-brand-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search branch by name or address..."
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-300 text-sm"
            />
          </div>
        </div>

        {loading && <p className="text-center text-gray-400 py-10">Loading branches...</p>}
        {error && <p className="text-center text-red-500 py-10">{error}</p>}

        {!loading && !error && (
          <>
            {filtered.length === 0 ? (
              <p className="text-center text-gray-400 py-10">No branches found.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-16">
                {filtered.map((branch) => (
                  <Card key={branch.id} branch={branch} isAdmin={false} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
