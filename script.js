const testForm = document.getElementById("testForm");
const testList = document.getElementById("testList");
const averageScore = document.getElementById("averageScore");
const suggestion = document.getElementById("suggestion");

let tests = [];

testForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const testName = document.getElementById("testName").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const marks = parseFloat(document.getElementById("marks").value);
  const total = parseFloat(document.getElementById("total").value);

  if (!testName || !subject || isNaN(marks) || isNaN(total) || marks > total) {
    alert("Please enter valid data.");
    return;
  }

  const test = { testName, subject, marks, total };
  tests.push(test);
  updateUI();
  testForm.reset();
});

function updateUI() {
  // Update test list
  testList.innerHTML = "";
  tests.forEach((test, index) => {
    const li = document.createElement("li");
    li.textContent = `${test.testName} - ${test.subject}: ${test.marks}/${test.total} (${((test.marks / test.total) * 100).toFixed(2)}%)`;
    testList.appendChild(li);
  });

  // Update progress
  if (tests.length > 0) {
    let totalMarks = 0;
    let totalMax = 0;
    let subjectScores = {};

    tests.forEach((test) => {
      totalMarks += test.marks;
      totalMax += test.total;

      if (!subjectScores[test.subject]) {
        subjectScores[test.subject] = { scored: 0, total: 0 };
      }

      subjectScores[test.subject].scored += test.marks;
      subjectScores[test.subject].total += test.total;
    });

    const avg = ((totalMarks / totalMax) * 100).toFixed(2);
    averageScore.textContent = `Average Score: ${avg}%`;

    // Identify weakest subject
    let weakest = "";
    let lowestPercent = 101;
    for (let subj in subjectScores) {
      let percent = (subjectScores[subj].scored / subjectScores[subj].total) * 100;
      if (percent < lowestPercent) {
        lowestPercent = percent;
        weakest = subj;
      }
    }

    suggestion.textContent = `📌 You need to improve on: ${weakest} (${lowestPercent.toFixed(2)}%)`;
  } else {
    averageScore.textContent = "Average Score: N/A";
    suggestion.textContent = "Suggestions will appear here.";
  }
}
