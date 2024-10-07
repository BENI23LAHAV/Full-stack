import "./App.css";
import Yom_zvaa from "./Components/Yom_zvaa";
import "./App.css";
import { useState, createContext, useEffect } from "react";
import Home from "./Components/Home";
import { Routes, Route, Link } from "react-router-dom";
import Posts from "./Posts";
import Albums from "./Components/Albums";
import Todos from "./Components/Todos";

import Photos from "./Components/Photos";

import ProtectedLogin from "./Components/Login/ProtectedLogin";
import Login from "./Components/Login/Login";
/*------------the main user------------------- */
export const UserContext = createContext(null);

export const AlbumId = createContext();
function App() {
  const [user, setUser] = useState(localStorage.getItem("CurrentUserID"));
  const [albumId, setAlbumId] = useState(1);
  const [acceptedUser, setAcceptedUser] = useState(false);
  useEffect(() => {
    console.log("acceptedUser: ", acceptedUser);
  }, [acceptedUser]);
  return (
    <div className="App">
        <header className="App-header">
      <div className="start-column">
      <button
              onClick={() => {
                setUser(null);
                localStorage.removeItem("CurrentUserID");
              }}>
              Log Out
            </button>
            <Yom_zvaa />
      </div>
        
    
       
        {user && (
          <section className="nav">
            <button>
              <Link to="/">Home</Link>
            </button>

          </section>
        )}

        {/*--------------make user global-------------------- */}
        <UserContext.Provider value={[user, setUser]}>
          <AlbumId.Provider value={[albumId, setAlbumId]}>
            <Routes>
              <Route
                path="/login"
                element={<Login setAcceptedUser={setAcceptedUser} />}
              />
              <Route element={<ProtectedLogin acceptedUser={acceptedUser} />}>
                <Route path="/" element={<Home />} />
                <Route path="/posts" element={<Posts />}>
                  <Route path="/posts/some" element={<h1>Some</h1>} />
                </Route>

                <Route path="/albums" element={<Albums />} />

                <Route path="/todos" element={<Todos />} />
                <Route path="/photos" element={<Photos />} />

                <Route path="/todos">
                  <Route index element={<Todos />} />
                </Route>

                <Route path="/todos" element={<Todos />} />
                <Route path="/photos" element={<Photos />} />
              </Route>
              <Route path="*" element={<h1>Error 404 page not found</h1>} />
            </Routes>
          </AlbumId.Provider>
        </UserContext.Provider>
      </header>
    </div>
  );
}

export default App;
