import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import UserMenuChat from "./UserMenuChat"; // Adjust the path as per your project structure
import ChatBox from "../components/chats/ChatBox"; // Adjust the path as per your project structure
import UserMenuChatMob from "./UserMenuChatMob";

const App = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setwindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setwindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

//    useEffect(() => {
//         const handleResize = () => {
//             setWindowWidth(window.innerWidth);
//             setwindowHeight(window.innerHeight);
//         };

//         // Add event listener for window resize
//         window.addEventListener('resize', handleResize);

//         // Call handleResize once initially to set the initial dimensions
//         handleResize();

//         // Clean up event listener when component unmounts
//         return () => {
//             window.removeEventListener('resize', handleResize);
//         };
//     }, []); // Empty dependency array ensures this effect runs only once
  

  return (
    <Container>
      {windowWidth >= 600 ? (
        <div class="row">
          <div className="col-6"  >
            <UserMenuChat />
          </div>
          <div className="col-6" >
            <ChatBox windowHeight={windowHeight} />
          </div>
        </div>
      ) : (
        <div className="row">
          <UserMenuChatMob />
        </div>
      )}
    </Container>
  );
};

export default App;
