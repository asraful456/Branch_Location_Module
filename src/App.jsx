import { useState } from "react";
import UserView from "./pages/UserView";
import AdminView from "./pages/AdminView";

export default function App() {
  const [view, setView] = useState("user");

  return (
    <div>
      <div className="bg-gray-900 text-white text-sm py-2 px-4 flex items-center justify-center gap-3">
        <span className="text-gray-400 mr-1">Demo mode —</span>
        <button
          onClick={() => setView("user")}
          className={`px-3 py-1 rounded-md transition-colors ${
            view === "user" ? "bg-brand-500 text-white" : "text-gray-300 hover:text-white"
          }`}
        >
          User View
        </button>
        <button
          onClick={() => setView("admin")}
          className={`px-3 py-1 rounded-md transition-colors ${
            view === "admin" ? "bg-brand-500 text-white" : "text-gray-300 hover:text-white"
          }`}
        >
          Admin View
        </button>
      </div>

      {view === "user" ? <UserView /> : <AdminView />}
    </div>
  );
}
