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
async function FetchDelete(url, setState) {
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
        if (setState) {
          setState(json);
        }
      }
    });
}
/**----------Fetch put---------------- */
async function FetchPut(url, data, setState) {
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
        if (setState) {
          setState(json);
        }
      }
    });
}
/**----------Fetch post---------------- */
async function FetchPost(url, data, setState) {
  // let response = null;
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.ok) {
        // console.log("created");

        return res.json();
      } else {
        console.error("Failed to create");
      }
    })
    .then((json) => {
      if (json) {
        if (setState) {
          setState(json);
        } else {
          console.log("There is no setState");
        }
      }
    });
}

export { FetchDelete, FetchPut, FetchPost };
export default Fetch;
