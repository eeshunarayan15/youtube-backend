import React, { useEffect, useState } from "react";

const Read = () => {
  const [files, setFiles] = useState([]);
  const [editingFile, setEditingFile] = useState(null);
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    const res = await fetch("http://localhost:3000/api/files");
    const data = await res.json();
    setFiles(data);
  };

  const handleEditClick = (file) => {
    setEditingFile(file.filename);
    setEditContent(file.content);
  };

  const handleUpdate = async () => {
    await fetch("http://localhost:3000/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        title: editingFile,
        details: editContent,
      }),
    });
    setEditingFile(null);
    setEditContent("");
    fetchFiles(); // reload
  };

  const handleDelete = async (filename) => {
    await fetch("http://localhost:3000/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ filename }),
    });
    fetchFiles(); // reload
  };

  return (
    <div className="p-5 w-[800px]">
      <h2 className="text-xl font-bold mb-4 text-white">All Files</h2>
      {files.map((file, index) => (
        <div key={index} className="bg-gray-100 p-4 rounded mb-2">
          <h3 className="font-semibold">{file.filename}</h3>

          {editingFile === file.filename ? (
            <>
              <textarea
                className="w-full p-2 border rounded"
                rows="4"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />
              <div className="mt-2 space-x-2">
                <button
                  className="bg-green-500 px-3 py-1 rounded text-white"
                  onClick={handleUpdate}
                >
                  Save
                </button>
                <button
                  className="bg-gray-500 px-3 py-1 rounded text-white"
                  onClick={() => {
                    setEditingFile(null);
                    setEditContent("");
                  }}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <pre className="whitespace-pre-wrap">{file.content}</pre>
              <div className="mt-2 space-x-2">
                <button
                  className="bg-blue-500 px-3 py-1 rounded text-white"
                  onClick={() => handleEditClick(file)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 px-3 py-1 rounded text-white"
                  onClick={() => handleDelete(file.filename)}
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Read;
