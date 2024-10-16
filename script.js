document.addEventListener("DOMContentLoaded", () => {
  const output = document.getElementById("output");

  // By default, add a loading row
  const loadingRow = document.createElement("tr");
  loadingRow.innerHTML = `<td colspan="2">Loading...</td>`;
  output.appendChild(loadingRow);

  // Function to create a promise that resolves after a random time between 1 and 3 seconds
  function createPromise(promiseNum) {
    const timeTaken = (Math.random() * 2 + 1).toFixed(3); // Random time between 1 and 3 seconds
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ promiseNum, timeTaken });
      }, timeTaken * 1000); // Convert seconds to milliseconds
    });
  }

  // Create an array of 3 promises
  const promises = [createPromise(1), createPromise(2), createPromise(3)];

  const startTime = Date.now();

  // Use Promise.all to wait for all promises to resolve
  Promise.all(promises).then((results) => {
    // Remove the loading row
    output.innerHTML = "";

    // Loop through each promise result and add a row to the table
    results.forEach((result) => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>Promise ${result.promiseNum}</td><td>${result.timeTaken} s</td>`;
      output.appendChild(row);
    });

    // Calculate the total time taken
    const totalTime = ((Date.now() - startTime) / 1000).toFixed(3); // Convert to seconds

    // Add the total time row
    const totalRow = document.createElement("tr");
    totalRow.innerHTML = `<td>Total</td><td>${totalTime} s</td>`;
    output.appendChild(totalRow);
  });
});

