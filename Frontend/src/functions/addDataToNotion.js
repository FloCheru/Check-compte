export function addDataToNotion(data) {
  fetch("http://localhost:4000/addExpensesToNotion", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      //il faut envoyer les données sous forme de JSON
      data: data,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success! ", data);
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
}
