import "./App.css";
import Navbar from "./components/Navbar";
import GenerateSpomodoro from "./components/GenerateSpomodoro";
import { useEffect, useState } from "react";

function App() {
  const client_id = process.env.REACT_APP_CLIENT_ID;
  const redirect_uri = "http://localhost:3000/";

  let accessToken = localStorage.getItem("access-token");

  const [authenticated, setAuthenticated] = useState(() => {
    const token = localStorage.getItem("access-token")
    return token !== null;
  }
    
  );
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const userProfile = async () => {
      try {
        const response = await fetch("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        });
        if (!response.ok) {
          setUserData({});
          throw new Error("Network response was not OK");
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.log(
          "There has been a problem with your fetch operation: ",
          error
        );
      }
    };
    userProfile();
  }, [accessToken]);

  useEffect(() => {
    const tokenRequest = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      let code = urlParams.get("code");

      if (code) {
        let codeVerifier = localStorage.getItem("code-verifier");

        let body = new URLSearchParams({
          grant_type: "authorization_code",
          code: code,
          redirect_uri: redirect_uri,
          client_id: client_id,
          code_verifier: codeVerifier,
        });

        fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: body,
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("HTTP status " + response.status);
            }
            return response.json();
          })
          .then((data) => {
            localStorage.setItem("access-token", data.access_token);
            setAuthenticated(true)
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    };
    if (!authenticated) {
      tokenRequest();
    }
  }, [client_id, authenticated]);

  return (
    <div className="App bg-neutral-900 h-screen">
      <Navbar loggedIn={authenticated} userData={userData} />
      {authenticated ? (
        <GenerateSpomodoro />
      ) : (
        <div className="text-white">Not logged in</div>
      )}
    </div>
  );
}

export default App;
