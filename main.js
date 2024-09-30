const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("views"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/form.html");
});

app.post("/submit", (req, res) => {
  const { name, rollNo, sem, marks1, marks2, marks3, marks4, marks5 } = req.body;

  // Convert marks to integers
  const marks = [parseInt(marks1), parseInt(marks2), parseInt(marks3), parseInt(marks4), parseInt(marks5)];

  // Calculate total, average and grade
  const total = marks.reduce((acc, mark) => acc + mark, 0);
  const average = total / marks.length;
  
  let grade;
  if (average >= 90) {
    grade = "A";
  } else if (average >= 80) {
    grade = "B";
  } else if (average >= 70) {
    grade = "C";
  } else if (average >= 60) {
    grade = "D";
  } else {
    grade = "F";
  }

  // Redirect to results with query params
  res.redirect(`/result?name=${name}&rollNo=${rollNo}&sem=${sem}&total=${total}&average=${average}&grade=${grade}`);
});

app.get("/result", (req, res) => {
  const { name, rollNo, sem, total, average, grade } = req.query;
  res.send(`
        <h1>Mark Sheet</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Roll No:</strong> ${rollNo}</p>
        <p><strong>Semester:</strong> ${sem}</p>
        <p><strong>Total Marks:</strong> ${total}</p>
        <p><strong>Average Marks:</strong> ${average}</p>
        <p><strong>Grade:</strong> ${grade}</p>
        <a href="/">Go Back to Form</a>
    `);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
