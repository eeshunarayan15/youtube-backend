const fs = require("node:fs");
const { fileURLToPath } = require("node:url");
//write file
//read file
// append file
//copy file
//unlik
//rename


// here we are creating the file and writing the text
// fs.writeFile("hey.text", "hey hello kaise ho", function (err) {
//     if (err) console.err(err)
//     else console.log("done")
// })
// here we adding text to the old file
// fs.appendFile("hey.text", " main to aacha hun", function (err) {
//   if (err) console.err(err);
//   else console.log("done");
// });

//here we are renaming the file
// fs.rename("hey.text", "hello.txt", function (err) {
//     if (err) console.error(err)
//     else console.log("done")
// })
// fs.copyFile("hello.txt", "./copy/copy.txt", function (err) {
//     if (err) console.error(err);
//     else console.log("done");
    
// })
// unliking the file means deleting the file
// fs.unlink("hello.txt", function (err) {
//     if (err) console.error(err);
//     else console.log("done");
// })
// rmdir deletes the empty foler
// rmdir is depricated so we used rm
// fs.rm("./copy",{recursive:true}, function (err) {
//     if (err) console.error(err);
//     else console.log("removed")
    
// })

// home work
// creation of foler
//reading of foler
// read of file




// Create a local server to receive data from
const http = require('http');
const server=http.createServer(function (req, res) {
    res.end("hello world");
})
server.listen(30001)