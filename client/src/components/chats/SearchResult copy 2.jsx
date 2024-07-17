import { useContext, useState } from "react";
import { ChatContext } from "../../context/ChatsContext";
import { AuthContext } from "../../context/AuthContext";
import { unReadnotificationFunc } from "../../utils/unreadNotification";
import moment from "moment";
import { useEffect } from "react";
import SearchUser from "./SearchUser";
import { Stack } from "react-bootstrap";

const SearchResult = ({ Name,setInputValue }) => {
  // const { userChats, isUserChatLoading, updateCurrentChats } = useContext(ChatContext);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const {
    userChats,
    isUserChatLoading,
    updateCurrentChats,
    allUsers,
    notification,
  } = useContext(ChatContext);
  const unReadNotifications = unReadnotificationFunc(notification);
  const modifiedNotification = notification.map((n) => {
    const sender = allUsers.find((user) => (user._id = n.senderId));
    return {
      ...n,
      senderName: sender?.name,
    };
  });

  useEffect(() => {
    if (Name && Name.length > 0) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [Name]);

  const clearSearch = () =>{
    setInputValue("")
  }

  return (
    <>
      <div className="notifications">
        {isOpen ? (
          <div className="Search-Result-box">
            <div className="Search-Result-header" >
              {/* <p>Notifications {isUserChatLoading}</p> */}
              {allUsers.length < 0 ? (
                <p>Loading Chats...</p>
              ) : (
                allUsers.map((user, index) => (
                    <div className="search-user-result" key={index} onClick={() => {clearSearch();}}>
                        <SearchUser searchuser={user}  /><br/>
                    </div>

                ))
              )}
              {/* <div className="mark-as-read" onClick={()=>markAllNotificationAsRead(notification)}>
                        Mark all as read
                    </div> */}
              {/* {modifiedNotification?.length === 0?
                    <span className="notification">No notification yet...</span>:null
                    } */}
              {/* {modifiedNotification && modifiedNotification.map((n,index)=>{
                        return( 
                        <div 
                        className={n.isRead?'notification':'notification not-read'} 
                        key={index}
                        onClick={()=>{markNotificationsAsRead(n,userChats,user,notification);
                        setIsOpen(false);
                        }}
                        >
                            <span>{`${n.senderName} send you a new message`}</span>
                            <span className="notification-time">{moment(n.date).calendar()}</span>
                        </div>
                        )
                    })} */}
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default SearchResult;
