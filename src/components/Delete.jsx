export default function Delete({ branch, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6 text-center">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Delete Branch?</h2>
        <p className="text-sm text-gray-500 mb-6">
          Are you sure you want to delete{" "}
          <span className="font-medium text-gray-700">{branch.name}</span>? This
          action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => onConfirm(branch)}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium rounded-md py-2 transition-colors"
          >
            Delete
          </button>
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-md py-2 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
