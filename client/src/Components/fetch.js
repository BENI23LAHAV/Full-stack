import { json } from "react-router-dom";

/** get the json data from the url */
async function Fetch(url, setState) {
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      setState(json);
    });
}

export default Fetch;
