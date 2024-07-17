import { useContext } from "react";
import { ChatContext } from "../context/ChatsContext";
import { Container, Stack} from 'react-bootstrap'
import UserChat from "../components/chats/UserChat";
import {AuthContext}from "../context/AuthContext";
import PotentialChats from "../components/chats/potentialChat";
import ChatBox from "../components/chats/ChatBox";
import "../pages/css/ChatSlide.css";

const Chat = () => {
    const {user} = useContext(AuthContext);
    const {userChats, isUserChatLoading,userChatsError,updateCurrentChats} = useContext(ChatContext);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    // console.log("userchats",userChats);

    useEffect(() => {
        // Function to update window width in state
        const handleResize = () => {
          setWindowWidth(window.innerWidth);
        };
    
        // Add event listener to window resize
        window.addEventListener('resize', handleResize);
    
        // Clean up event listener on component unmount
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);
    
    return ( 
    <>
    <Container>
        <PotentialChats/>
        {
            userChats?.lengh < 1 ? null :
            <Stack direction="horizontal" 
            gap={4} 
            className="align-items-start userHand">
                { windowWidth >= 600 ? 
                <Stack id="ph-mas-box" className="messages-box flex-grow-0 pe-3" gap={3}>
                    {isUserChatLoading && <p>Loading Chats...</p>}
                    {userChats?.map((chat,index)=>{
                        return(
                            <div key={index} onClick={()=> updateCurrentChats(chat)}>
                                <UserChat chat={chat} user={user} />
                            </div>
                        )
                    })}
                </Stack>
                :
                <h1>click</h1>
                }
                <ChatBox/>
            </Stack>


        }
    </Container>
    </> 
    );
}
 
export default Chat;