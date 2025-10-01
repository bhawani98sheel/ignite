// src/components/StudyTracker.jsx
import { useState } from "react";
import { Trash2, CheckCircle, Undo2, Link as LinkIcon, FileText, ClipboardList } from "lucide-react";

export default function StudyTracker({ items, setItems }) {
  const CATEGORIES = ["Tasks", "Notes", "Links"];
  const [newItem, setNewItem] = useState("");
  const [category, setCategory] = useState("Tasks");
  const [search, setSearch] = useState("");

  // 🎨 Accent
  const accent = localStorage.getItem("ignite-accent") || "orange";
  const accentColors = {
    orange: "from-orange-600 to-red-600 bg-orange-600 hover:bg-orange-700",
    blue: "from-blue-600 to-blue-800 bg-blue-600 hover:bg-blue-700",
    purple: "from-purple-600 to-purple-800 bg-purple-600 hover:bg-purple-700",
    green: "from-green-600 to-green-800 bg-green-600 hover:bg-green-700",
  };

  // ➕ Add item
  const addItem = () => {
    if (!newItem.trim()) return;
    const newEntry = {
      text: newItem,
      category,
      completed: false,
      date: new Date().toLocaleString(),
    };
    setItems([...items, newEntry]);
    setNewItem("");
  };

  // ✅ Toggle task completion
  const toggleTask = (index) => {
    const updated = [...items];
    updated[index].completed = !updated[index].completed;
    setItems(updated);
  };

  // ❌ Delete item
  const deleteItem = (index) => {
    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
  };

  // 🔗 Helper to format link
  const formatLink = (text) => {
    if (!/^https?:\/\//i.test(text)) {
      return "https://" + text;
    }
    return text;
  };

  // 📊 Task Progress
  const tasks = items.filter((i) => i.category === "Tasks");
  const completedTasks = tasks.filter((t) => t.completed).length;
  const progress = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

  // 🔍 Filtered items
  const filteredItems = items.filter((i) =>
    i.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 bg-black/50 rounded-xl shadow-lg border border-orange-600/40 max-w-5xl mx-auto">
      <h3 className="text-3xl font-bold mb-6 gradient-text flex items-center gap-2">
        <ClipboardList size={28} className="text-orange-400" /> Study Tracker
      </h3>

      {/* 📊 Progress Bar */}
      {tasks.length > 0 && (
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-300 mb-1">
            <span>
              {completedTasks} / {tasks.length} tasks completed
            </span>
            <span>{progress}%</span>
          </div>
          <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
            <div
              className={`h-3 transition-all duration-500 bg-gradient-to-r ${accentColors[accent]}`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Input + Category + Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Add a task, note, or link..."
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          className="flex-1 p-3 rounded-lg bg-black/40 border border-gray-600 text-white"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-3 rounded-lg bg-black/40 border border-gray-600 text-white"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <button
          onClick={addItem}
          className={`px-6 py-3 rounded-lg font-semibold text-white transition bg-gradient-to-r ${accentColors[accent]}`}
        >
          ➕ Add
        </button>
      </div>

      <input
        type="text"
        placeholder="🔍 Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 mb-6 rounded-lg bg-black/40 border border-gray-600 text-white"
      />

      {/* Category Lists */}
      <div className="space-y-10">
        {CATEGORIES.map((cat) => {
          const filtered = filteredItems.filter((i) => i.category === cat);
          return (
            <div key={cat}>
              <h4 className="text-2xl font-semibold text-yellow-400 mb-4 border-b border-yellow-600/40 pb-2">
                {cat}
              </h4>

              {filtered.length === 0 ? (
                <p className="text-gray-500 italic">No {cat.toLowerCase()} yet.</p>
              ) : (
                <ul className="space-y-4">
                  {filtered.map((item, i) => {
                    const globalIndex = items.indexOf(item);
                    return (
                      <li
                        key={i}
                        className={`flex justify-between items-center p-4 rounded-lg shadow-md transition ${
                          cat === "Tasks" && item.completed
                            ? "bg-green-700/40 line-through"
                            : "bg-black/40 hover:bg-black/60"
                        }`}
                      >
                        <div className="flex flex-col">
                          {/* Content */}
                          <span className="flex items-center gap-2 font-medium">
                            {cat === "Links" && (
                              <LinkIcon size={16} className="text-blue-400" />
                            )}
                            {cat === "Notes" && (
                              <FileText size={16} className="text-yellow-400" />
                            )}
                            {cat === "Tasks" && (
                              <CheckCircle size={16} className="text-green-400" />
                            )}

                            {cat === "Links" ? (
                              <a
                                href={formatLink(item.text)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 underline hover:text-blue-300"
                              >
                                {item.text}
                              </a>
                            ) : (
                              item.text
                            )}
                          </span>
                          <span className="text-xs text-gray-400 mt-1">
                            Added on {item.date}
                          </span>
                        </div>

                        <div className="flex gap-2">
                          {cat === "Tasks" && (
                            <button
                              onClick={() => toggleTask(globalIndex)}
                              className={`px-3 py-1 rounded-lg flex items-center gap-1 text-sm font-medium text-white transition bg-gradient-to-r ${accentColors[accent]}`}
                            >
                              {item.completed ? (
                                <>
                                  <Undo2 size={14} /> Undo
                                </>
                              ) : (
                                <>
                                  <CheckCircle size={14} /> Done
                                </>
                              )}
                            </button>
                          )}
                          <button
                            onClick={() => deleteItem(globalIndex)}
                            className="px-3 py-1 bg-red-600 hover:bg-red-500 rounded-lg flex items-center gap-1 text-sm font-medium text-white"
                          >
                            <Trash2 size={14} /> Delete
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
