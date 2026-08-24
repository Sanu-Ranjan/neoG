const fs = require("fs");
const path = require("path");
const { Parser } = require("json2csv");

const jsonFilePath = path.join(__dirname, "data.json");

const csvFilePath = path.join(__dirname, "data.csv");

try {
  const jsonData = fs.readFileSync(jsonFilePath, "utf-8");
  const data = JSON.parse(jsonData);
  console.log(data);
  const json2csv = new Parser();
  const csv = json2csv.parse(data);
  fs.writeFileSync(csvFilePath, csv);
} catch (error) {
  console.log(error);
}
