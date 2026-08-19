const fs = require("fs");

const path = require("path");

const filePath = path.join(__dirname, "file.txt");

console.log(filePath);

try {
  const data = fs.readFileSync(filePath, "utf8");
  console.log(data);
  fs.appendFileSync(filePath, "\nThis is new Line");
} catch (error) {
  console.log(error);
}
