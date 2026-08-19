const fs = require("fs");
require("dotenv").config();

const filePath = process.env.FILE_PATH;

function checkAndCreateFile(filePath) {
  if (!filePath) {
    console.log("File Path is not defined");
    return;
  }

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      fs.writeFileSync(filePath, "Sample Text", (writeErr) => {
        if (writeErr) throw writeErr;
        console.log("File Created");
      });
    } else {
      console.log("File already exists");
    }
  });
}

checkAndCreateFile(filePath);
