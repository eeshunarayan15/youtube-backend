import React, { useState } from "react";

const MyForm = () => {
  const [val, setVal] = useState({
    title: "",
    details: "",
  });
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(val).toString(),
      });
      if (response.ok) {
        setMessage("Form submitted successfully!");
        setVal({ title: "", details: "" });
      } else {
        setMessage("Form submission failed.");
      }
    } catch (error) {
      setMessage("Form submission failed.");
    }
  };

  return (
    <div className="w-[800px] h-[400px] bg-zinc-700 rounded-md">
      <form className="p-10" onSubmit={handleSubmit}>
        <input
          onChange={(e) => setVal({ ...val, title: e.target.value })}
          value={val.title}
          type="text"
          name="title"
          placeholder="Title goes here"
          className="bg-zinc-800 text-white block w-full px-5 py-3 rounded-lg border border-zinc-600 \
                     focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
        />

        <textarea
          onChange={(e) => setVal({ ...val, details: e.target.value })}
          value={val.details}
          name="details"
          placeholder="Write your task details"
          className="bg-zinc-800 text-white block w-full px-5 py-3 rounded-lg border border-zinc-600\n                     mt-2 h-32 resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 \n                     focus:outline-none transition"
        ></textarea>

        <button
          type="submit"
          className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-5 rounded-full font-semibold \
                     transition shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Submit
        </button>
      </form>
      {message && <div className="mt-4 text-center text-white">{message}</div>}
    </div>
  );
};

export default MyForm;
