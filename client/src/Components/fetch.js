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
        // setState(() => {
        //   console.log("url: ", url);
        //   console.log("url: ", url.slice(0, url.lastIndexOf("/")));
        //   url = url.slice(0, url.lastIndexOf("/"));
        //   Fetch(url, setState);
        // });
        // console.log(url.slice(0, url.lastIndexOf("/")));

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
export { FetchDelete };
export default Fetch;
