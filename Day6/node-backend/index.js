const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const cors = require("cors");
app.use(cors());
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "public", "views"));
app.use(express.static(path.join(__dirname, "public")));
app.get("/", function (req, res) {
  fs.readdir(`./files`, function (err, files) {
    console.log(files);
    res.render("index", { files: files });
  });
});
app.post("/create", function (req, res) {
  fs.writeFile(
    `./files/${req.body.title.split(" ").join("")}.txt`,
    req.body.details,
    function (err) {
      if (err) console.log(err);
      // Redirect to home after file is created
      res.redirect("/");
    }
  );
  console.log(req.body);
});

// Route to serve file content dynamically
app.get("/files/:filename", function (req, res) {
  const filePath = path.join(__dirname, "files", req.params.filename);
  fs.readFile(filePath, "utf8", function (err, data) {
    if (err) {
      return res.status(404).send("File not found");
    }
    // You can render a new EJS view or just send the content
    res.send(`<pre>${data}</pre>`);
  });
});
app.get("/api/files", (req, res) => {
  const folderPath = path.join(__dirname, "files");

  fs.readdir(folderPath, (err, files) => {
    if (err) return res.status(500).json({ error: "Failed to read directory" });

    const textFiles = files.filter((file) => file.endsWith(".txt"));
    const result = [];

    let pending = textFiles.length;
    if (!pending) return res.json(result); // If no files, send empty array

    textFiles.forEach((file) => {
      fs.readFile(path.join(folderPath, file), "utf8", (err, content) => {
        if (!err) {
          result.push({ filename: file, content });
        }
        pending--;
        if (pending === 0) {
          res.json(result);
        }
      });
    });
  });
});
app.post("/update", (req, res) => {
  const { title, details } = req.body;
  const filePath = path.join(__dirname, "files", title);

  fs.writeFile(filePath, details, (err) => {
    if (err) {
      console.error("Error updating file:", err);
      return res.status(500).send("Failed to update file");
    }
    res.send("File updated successfully");
  });
});
app.post("/delete", (req, res) => {
  const filePath = path.join(__dirname, "files", req.body.filename);

  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Failed to delete:", err);
      return res.status(500).send("Error deleting file");
    }
    res.send("File deleted successfully");
  });
});
  
app.listen(3000);
