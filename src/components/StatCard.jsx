export default function StatCard({ icon, value, label }) {
  return (
    <div className="flex-1 bg-gradient-to-br from-brand-600 to-brand-800 text-white rounded-xl px-6 py-5 flex flex-col items-center gap-1 shadow-sm">
      <div className="text-2xl">{icon}</div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs uppercase tracking-wide text-brand-100">{label}</div>
    </div>
  );
}
