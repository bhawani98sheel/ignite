// src/components/Upload.jsx
import { useState } from "react";
import {
  Eye,
  Download,
  Trash2,
  FileText,
  Image as ImageIcon,
  File,
  LayoutGrid,
  List,
  Search,
  Filter,
} from "lucide-react";

export default function Upload({ uploads, setUploads }) {
  const [previewFile, setPreviewFile] = useState(null);
  const [viewMode, setViewMode] = useState("list"); // list | grid
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  const CATEGORIES = ["Notes", "Assignments", "Resources", "Other"];

  // 📤 Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const category =
      prompt(`Enter category (${CATEGORIES.join(", ")}):`, CATEGORIES[0]) || "Other";

    const reader = new FileReader();
    reader.onload = () => {
      const updated = [
        ...uploads,
        {
          name: file.name,
          size: (file.size / 1024).toFixed(2) + " KB",
          type: file.type,
          date: new Date().toLocaleString(),
          category,
          data: reader.result,
        },
      ];
      setUploads(updated);
      localStorage.setItem("ignite-uploads", JSON.stringify(updated));
    };
    reader.readAsDataURL(file);
  };

  // 🔎 File icons
  const getFileIcon = (file) => {
    if (file.type.startsWith("image/")) return <ImageIcon className="text-blue-400" size={20} />;
    if (file.type === "application/pdf") return <FileText className="text-red-400" size={20} />;
    return <File className="text-gray-400" size={20} />;
  };

  // 🔎 Filtered files
  const filteredUploads = uploads.filter((f) => {
    const matchesCategory = filterCategory === "All" || f.category === filterCategory;
    const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="p-8 bg-black/40 rounded-xl shadow-lg border border-orange-600/40 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <h3 className="text-2xl font-bold gradient-text">📂 Uploads</h3>

        <div className="flex flex-wrap gap-3 items-center">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg bg-black/50 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-3 text-gray-400" size={18} />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg bg-black/50 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="All">All</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* View Toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg ${
                viewMode === "list" ? "bg-orange-600" : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              <List className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg ${
                viewMode === "grid" ? "bg-orange-600" : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Upload Input */}
      <div className="mb-6">
        <input
          type="file"
          onChange={handleFileUpload}
          className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-orange-600 file:text-white hover:file:bg-orange-700 cursor-pointer"
        />
      </div>

      {/* File List / Grid */}
      {filteredUploads.length === 0 ? (
        <p className="text-gray-400 italic">No files found.</p>
      ) : viewMode === "list" ? (
        <ul className="space-y-3">
          {filteredUploads.map((f, i) => (
            <li
              key={i}
              className="flex justify-between items-center p-4 bg-black/50 rounded-lg shadow hover:bg-black/70 transition"
            >
              <div>
                <p className="flex items-center gap-2 font-semibold">
                  {getFileIcon(f)} {f.name}
                </p>
                <p className="text-xs text-gray-400">
                  {f.size} • {f.date} • {f.category}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setPreviewFile(f)}
                  className="bg-yellow-500 p-2 rounded-lg hover:bg-yellow-600"
                >
                  <Eye className="w-5 h-5 text-black" />
                </button>
                <a
                  href={f.data}
                  download={f.name}
                  className="bg-blue-500 px-3 py-2 rounded-lg hover:bg-blue-600"
                >
                  <Download size={16} />
                </a>
                <button
                  onClick={() => {
                    const updated = uploads.filter((u) => u !== f);
                    setUploads(updated);
                    localStorage.setItem("ignite-uploads", JSON.stringify(updated));
                  }}
                  className="bg-red-500 px-3 py-2 rounded-lg hover:bg-red-600"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUploads.map((f, i) => (
            <div
              key={i}
              className="p-4 bg-black/50 rounded-lg shadow hover:bg-black/70 transition flex flex-col justify-between"
            >
              <div>
                <p className="flex items-center gap-2 font-semibold truncate">
                  {getFileIcon(f)} {f.name}
                </p>
                <p className="text-xs text-gray-400 mt-1">{f.size}</p>
                <p className="text-xs text-gray-400">{f.date}</p>
                <p className="text-xs text-gray-500 italic">{f.category}</p>
              </div>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => setPreviewFile(f)}
                  className="bg-yellow-500 p-2 rounded-lg hover:bg-yellow-600 flex-1"
                >
                  <Eye className="w-5 h-5 text-black mx-auto" />
                </button>
                <a
                  href={f.data}
                  download={f.name}
                  className="bg-blue-500 p-2 rounded-lg hover:bg-blue-600 flex-1 text-center"
                >
                  <Download size={16} />
                </a>
                <button
                  onClick={() => {
                    const updated = uploads.filter((u) => u !== f);
                    setUploads(updated);
                    localStorage.setItem("ignite-uploads", JSON.stringify(updated));
                  }}
                  className="bg-red-500 p-2 rounded-lg hover:bg-red-600 flex-1"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Preview Modal */}
      {previewFile && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-3xl w-full relative">
            <button
              onClick={() => setPreviewFile(null)}
              className="absolute top-3 right-3 bg-red-600 px-3 py-1 rounded-lg"
            >
              Close
            </button>
            <h4 className="text-lg font-bold mb-4">{previewFile.name}</h4>
            {previewFile.type.startsWith("image/") && (
              <img src={previewFile.data} alt={previewFile.name} className="max-h-[70vh] mx-auto" />
            )}
            {previewFile.type === "application/pdf" && (
              <iframe src={previewFile.data} className="w-full h-[70vh]"></iframe>
            )}
            {!previewFile.type.startsWith("image/") &&
              previewFile.type !== "application/pdf" && (
                <p className="text-gray-300">Preview not available. Please download.</p>
              )}
          </div>
        </div>
      )}
    </div>
  );
}
