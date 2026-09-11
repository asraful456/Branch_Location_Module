import { FiMapPin, FiPhone, FiMail, FiEdit2, FiTrash2 } from "react-icons/fi";

export default function Card({ branch, isAdmin, onEdit, onDelete, index }) {
  return (
    <div className="bg-white border border-brand-100 rounded-xl shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div>
          {index !== undefined && (
            <span className="text-xs text-gray-400 font-medium">#{index}</span>
          )}
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-lg font-semibold text-brand-800">{branch.name}</h3>
            {branch.division && (
              <span className="text-[11px] bg-brand-50 text-brand-700 px-2 py-0.5 rounded-full border border-brand-200">
                {branch.division}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-start gap-2 text-sm text-gray-600">
        <FiMapPin className="mt-0.5 shrink-0 text-brand-500" />
        <span>{branch.address}</span>
      </div>

      {branch.phone && (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FiPhone className="shrink-0 text-brand-500" />
          <span>{branch.phone}</span>
        </div>
      )}

      {branch.email && (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FiMail className="shrink-0 text-brand-500" />
          <span>{branch.email}</span>
        </div>
      )}

      {branch.coordinators?.length > 0 && (
        <div className="bg-brand-50/60 border-l-4 border-brand-400 rounded-md px-3 py-2 mt-1">
          <p className="text-[11px] font-semibold tracking-wide text-brand-700 uppercase mb-1">
            Coordinators
          </p>
          {branch.coordinators.map((c, i) => (
            <div key={i} className="text-sm text-gray-700 leading-tight">
              <span className="font-medium">{c.name}</span>
              {c.role && <span className="text-gray-400"> · {c.role}</span>}
              {c.phone && <div className="text-xs text-gray-500">{c.phone}</div>}
            </div>
          ))}
        </div>
      )}

      {isAdmin && (
        <div className="flex gap-2 pt-2 mt-auto">
          <button
            onClick={() => onEdit(branch)}
            className="flex-1 flex items-center justify-center gap-1.5 text-sm font-medium bg-brand-500 hover:bg-brand-600 text-white rounded-md py-1.5 transition-colors"
          >
            <FiEdit2 size={14} /> Edit
          </button>
          <button
            onClick={() => onDelete(branch)}
            className="flex-1 flex items-center justify-center gap-1.5 text-sm font-medium bg-red-500 hover:bg-red-600 text-white rounded-md py-1.5 transition-colors"
          >
            <FiTrash2 size={14} /> Delete
          </button>
        </div>
      )}
    </div>
  );
}
