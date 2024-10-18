export function addDataToDatabase(data, tableOfDb) {
  console.log(data);
  fetch("http://localhost:4000/addExpenses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      //il faut envoyer les données sous forme de JSON
      data: data,
      table: tableOfDb,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
