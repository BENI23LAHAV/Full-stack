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
  // let url = "https://jsonplaceholder.typicode.com/users/1"
  let url = "http://localhost:4000/3";
  {
    /*-------------get the global useState-------------------- */
  }
  const [user, setUser] = useContext(UserContext);

  {
    /*--------------render the user-info when get it--------------- */
  }
  useEffect(() => {
    Fetch(url, setUser);
  }, []);

  return (
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
  );
}

export default Home;
