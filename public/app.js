document
  .getElementById("slangForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const slangTerm = document
      .getElementById("slangInput")
      .value.trim()
      .toLowerCase();
    const resultDiv = document.getElementById("result");

    if (slangTerm) {
      fetch(`/api/slang/${slangTerm}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Slang term not found");
          }
          return response.json();
        })
        .then((data) => {
          resultDiv.innerHTML = `
          <p class="text-lg"><strong>${data.slang}</strong>: ${data.meaning}</p>
        `;
        })
        .catch((error) => {
          resultDiv.innerHTML = `
          <p class="text-red-500">${error.message}</p>
        `;
        });
    } else {
      resultDiv.innerHTML = `
      <p class="text-red-500">Please enter a slang term.</p>
    `;
    }
  });
