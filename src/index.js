const Express = require("express");
const Busboy = require("busboy");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const rootPath = require("app-root-path")

const app = Express();
app.use(cors());

app.post("/submit-form", (req, res) => {
  let busboy = new Busboy({ headers: req.headers });
  busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
    let saveTo = path.join(rootPath.path, "/public/upload/" + filename);
    console.log(rootPath)
    file.pipe(fs.createWriteStream(saveTo));
    file.on("data", function (data) {
      console.log("File [" + fieldname + "] got " + data.length + " bytes");
    });
    file.on("end", function () {
      console.log("File [" + fieldname + "] Finished");
    });
  });
  busboy.on(
    "field",
    (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) => {
      console.log("Field [" + fieldname + "]: value: ", val);
    }
  );
  busboy.on("finish", () => {
    console.log("Done parsing form!");
    res.writeHead(303, { Connection: "close", Location: "/" });
    res.end();
  });
  return req.pipe(busboy);
});

const PORT = process.env.SERVER_PORT || 8080;
app.listen(PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(`Server is running in http://localhost:${PORT}`);
});
