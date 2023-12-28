import { Stack } from "react-bootstrap";
import { useFatchRecipientUser } from "../../hooks/useFetchrecipient";
import avatar from "../../assets/Avatar/male-0.png";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatsContext";
import { unReadnotificationFunc } from "../../utils/unreadNotification";
import { useFetchLatestMessage } from "../../hooks/useFetchLatestMessage";
import moment from "moment";


const UserChat = ({chat,user}) => {
    const {recipientUser} = useFatchRecipientUser(chat, user);
    const {onlineusers,notification,markThisUsernotificationAsRead}  = useContext(ChatContext);
    const { latestMessage } = useFetchLatestMessage(chat);
    const unreadNotification = unReadnotificationFunc(notification);
    const thisUserNotification = unreadNotification?.filter(
        n => n.senderId === recipientUser?._id
    )
    const isOnline = onlineusers?.some((user)=>user?.userId === recipientUser?._id);
    // console.log("online",user.name,isOnline);
    const trucateText = (text) =>{
        let shortText = text.substring(0,20);
        if(text.length > 20){
            shortText = shortText + "..."
        }
        return shortText
    }


    return (
    <>
    <Stack direction="horizontal" gap={3} 
    className="user-card align-items-center p-2 justify-content-between"
    role="button"
    onClick={()=>{
        if(thisUserNotification?.length !==0){
            markThisUsernotificationAsRead(thisUserNotification,notification);
        }
        
    }}
    >
        <div className="d-flex">
            <div className="me-2" style={{"padding":"7px 5px"}}>
                <img src={avatar} height="30px"/>
            </div>
            <div className="text-content">
                <div className="name">
                    {recipientUser?.name}
                </div>
                <div className="text">
                    {latestMessage?.text && 
                    (<span>{trucateText(latestMessage?.text)}</span>)
                    }
                </div>
            </div>
        </div>
        <div className="d-flex flex-column align-items-end">
            <div className="date">{moment(latestMessage?.createdAt).calendar()}</div>
            <div 
            className={thisUserNotification?.length > 0 ? "this-user-notifications" :""}
            >
                {thisUserNotification?.length>0?thisUserNotification?.length:""}
                </div>
            <span className={isOnline?"user-online":"user-offline"}></span>
        </div>
    </Stack>
    </>  
    );
}
 
export default UserChat;