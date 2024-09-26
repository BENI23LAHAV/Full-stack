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
}
/**----------Fetch delete----------------*/
async function FetchDelete(url, setState) {
  fetch(url, {
    method: "DELETE",
  })
    .then((res) => {
      if (res.ok) {
        setState(() => {
          Fetch(url, setState);
        });

        return res.json();
      } else {
        console.error("Failed to delete");
      }
    })
    .then((json) => {
      if (json) {
        setState(json);
        console.log(json);
      }
    });
}
export { FetchDelete };
export default Fetch;
