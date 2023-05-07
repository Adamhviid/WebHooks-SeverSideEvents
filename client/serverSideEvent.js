const eventSource = new EventSource("http://localhost:5500/messages");

eventSource.onopen = (event) => {
  console.log("connection opened");
};

eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data);
  const table = document.getElementById("table");

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      const ticker = data[i][j].ticker;
      const price = data[i][j].price;
      let rowFound = false;

      for (let k = 0; k < table.rows.length; k++) {
        const row = table.rows[k];
        if (row.cells[0].innerHTML === ticker) {
          row.cells[1].innerHTML = price;
          rowFound = true;
          break;
        }
      }

      if (!rowFound) {
        const row = table.insertRow();
        const cell1 = row.insertCell();
        const cell2 = row.insertCell();

        cell1.innerHTML = ticker;
        cell2.innerHTML = price;
      }
    }
  }
};

eventSource.onerror = (event) => {
  console.log("error");
};