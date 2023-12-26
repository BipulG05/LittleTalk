import { createContext, useCallback, useEffect, useState } from "react";
import {baseUrl,postRequest, getRequest } from "../utils/services";


export const ChatContext = createContext();

// export const ChatContextProvider = ({children , user}) =>{
//     const [userChats,setUserChats] = useState(null);
//     const [isUserChatLoading,setIsUserChatLoading] = useState(false);
//     const [userChatsError,setUserChatsError] = useState(null);

//     useEffect(()=>{
//         const getUserChats = async ()=>{
//             if(user?._id){
//                 setIsUserChatLoading(true);
//                 setUserChatsError(null);
//                 const response = await getRequest(`${baseUrl}/chats/${user?._id}`);
//                 setIsUserChatLoading(false);
//                 if(response.error){
//                     return setUserChatsError(response);
//                 }
//                 setUserChats(response);
//             }
//         };
//         getUserChats();
//     },[user])

//     return 
//     (
//     <ChatContext.Provider
//         value={{
//             userChats,
//             isUserChatLoading,
//             userChatsError
//         }}
//     >
//         {children}
//     </ChatContext.Provider>
//     )
// }

export const ChatContextProvider = ({ children, user }) => {
    const [userChats, setUserChats] = useState(null);
    const [isUserChatLoading, setIsUserChatLoading] = useState(false);
    const [userChatsError, setUserChatsError] = useState(null);
    const [potentialChats,setPotentioalChats] = useState([]);
    const[currentChats,setCurrentChats] = useState(null);
    const[messages,setMessages] = useState(null);
    const[isMessagesLoading,setIsMessageLoading] = useState(false);
    const [messageError,setMessageError] = useState(null);
    const [sendtextMessageError,setSendtextMessageError] = useState(null);
    const [newMessage,setNewMessage] = useState(null);

    // console.log("currentChats",currentChats);
    // console.log('messages',messages);

    useEffect(()=>{
      const getUsers  = async() =>{
        const response = await getRequest(`${baseUrl}/users/all/users/`);
        if(response.error){
          return console.log("Error fatching users",respones);
        }
        const pChats=response.filter((u)=>{
          let isChatcreated = false;
          if(user?._id === u._id) {
            return false;
          }
          if(userChats){
            isChatcreated = userChats?.some((chat)=>{
              return (chat.members[0] === u._id || chat.members[1] === u._id);
            })
          }

          return !isChatcreated;

        })
        // console.log("pChats",pChats)
        setPotentioalChats(pChats);
      };
      getUsers();
    },[userChats])
  
    useEffect(() => {
      const getUserChats = async () => {
        if (user?._id) {
          setIsUserChatLoading(true);
          setUserChatsError(null);
          const response = await getRequest(`${baseUrl}/chats/${user?._id}`);
          setIsUserChatLoading(false);
          if (response.error) {
            return setUserChatsError(response);
          }
          setUserChats(response);
        }
      };
      getUserChats();
    }, [user]);

    useEffect(() => {
      const getMessages = async () => {
       
          setIsMessageLoading(true);
          setMessageError(null);
          const response = await getRequest(`${baseUrl}/messages/${currentChats?._id}`);
          setIsMessageLoading(false);
          if (response.error) {
            return setMessageError(response);
          }
          setMessages(response);
      };
      getMessages();
    }, [currentChats]);

    const sendTextMessage = useCallback( async(textMessage,sender,currentChatId,setTextMessage)=>{
      if(!textMessage){
        return console.log("You Must type Something...")
      }
      const response = await postRequest(`${baseUrl}/messages/`,JSON.stringify({
        chatId:currentChatId,
        senderId:sender._id,
        text:textMessage
      }))
      if (response.error) {
        return setSendtextMessageError(response);
      }
      setNewMessage(response);
      setMessages((prev)=>[...prev,response])
      setTextMessage("");

    },[])

    const updateCurrentChats = useCallback((chat)=>{
      // alert(chat.members);
      // console.log(chat);
      setCurrentChats(chat);
    },[])

    const createChat =useCallback( async (firstId,secondId) =>{
      const response = await postRequest(`${baseUrl}/chats`,
        JSON.stringify({
          firstId,
          secondId,
        })
      );
      if(response.error){
        return console.log("Error creating chat",response);
      }
      setUserChats((prev)=>[...prev,response]);
    },[])

  
    return (
      <ChatContext.Provider
        value={{
          userChats,
          isUserChatLoading,
          userChatsError,
          potentialChats,
          createChat,
          currentChats,
          updateCurrentChats,
          messages,
          isMessagesLoading,
          messageError,
          sendTextMessage
        }}
      >
        {children}
      </ChatContext.Provider>
    );
  };
  