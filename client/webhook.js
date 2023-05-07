const subBtn = document.getElementById("subBtn");
const unsubBtn = document.getElementById("unsubBtn");

subBtn.addEventListener("click", () => {
  fetch("http://localhost:8000/subscribe", {
    method: "POST",
    body: JSON.stringify({
      username: "",
      url: "http://localhost:5500/subscribe",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
});

unsubBtn.addEventListener("click", () => {
  fetch("http://localhost:8000/unsubscribe", {
    method: "POST",
    body: JSON.stringify({
      username: "",
      url: "http://localhost:5500/subscribe",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(() => {
    const table = document.getElementById("table");
    table.innerHTML = "";
  });
});