import { json } from "react-router-dom";

/** get the json data from the url */
/**----------Fetch get---------------- */
async function Fetch(url, setState) {
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      setState(json);
      console.log(json);
    });
  console.log(url);
}
/**----------Fetch delete----------------*/
async function FetchDelete(url) {
  fetch(url, {
    method: "DELETE",
  })
    .then((res) => {
      if (res.ok) {
        console.log("deleted");
        return res.json();
      } else {
        console.error("Failed to delete");
      }
    })
    .then((json) => {
      if (json) {
        console.log(json);
      }
    });
}
async function FetchPut(url, data) {
  fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.ok) {
        console.log("updated");
        return res.json();
      } else {
        console.error("Failed to update");
      }
    })
    .then((json) => {
      if (json) {
        console.log(json);
      }
    });
}

export { FetchDelete, FetchPut };
export default Fetch;
