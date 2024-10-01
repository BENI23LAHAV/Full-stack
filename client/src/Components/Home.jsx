import { Link } from "react-router-dom";
import Fetch from "./fetch";
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";

/** update the user info,
 * return the nav bar.
 */
function Home() {
  /**---------------Trying to check user id global------------ */
  // const [haha, sethaha] = useContext(UserContext);
  // useEffect(() => {
  //   console.log("im haha: ", haha);
  // }, [UserContext]);
  /**---------------Trying to check user id global------------ */
  {
    /*-----------------the user url----------------------- */
  }
  {
    /*-------------get the global useState-------------------- */
  }
  const [user, setUser] = useState({});
  const [userID, setUserID] = useContext(UserContext);
  // let url = "https://jsonplaceholder.typicode.com/users/1"
  let url = `http://localhost:4000/${userID}`;

  {
    /*--------------render the user-info when get it--------------- */
  }
  useEffect(() => {
    Fetch(url, setUser);
  }, [userID]);

  return (
    <>
      <div>
        <h2>{user.name}</h2>
        <h3>{user.email}</h3>
        <h3>{user.city}</h3>
      </div>
      <div>
        <button>
          <Link to={"/todos"}>Todos</Link>
        </button>
        <button>
          <Link to={"/posts"}>Posts</Link>
        </button>
        <button>
          <Link to={"/albums"}>Albums</Link>
        </button>
      </div>
    </>
  );
}

export default Home;
