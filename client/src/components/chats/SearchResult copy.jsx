import { useContext, useState } from "react";
import { ChatContext } from "../../context/ChatsContext";
import { AuthContext } from "../../context/AuthContext";
import { unReadnotificationFunc } from "../../utils/unreadNotification";
import moment from "moment";
import { useEffect } from "react";
import SearchUser from "./SearchUser";

const SearchResult = ({ Name }) => {
  // const { userChats, isUserChatLoading, updateCurrentChats } = useContext(ChatContext);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const { userChats, isUserChatLoading, updateCurrentChats, allUsers,notification } =
    useContext(ChatContext);
  const unReadNotifications = unReadnotificationFunc(notification);
  const modifiedNotification = notification.map((n) => {
    const sender = allUsers.find((user) => (user._id = n.senderId));
    return {
      ...n,
      senderName: sender?.name,
    };
  });

  useEffect(() => {
    if (Name.length > 0) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [Name]);

  return (
    <>
      <div className="notifications">
      {isOpen && (
        <div className="search-result-box">
          {isUserChatLoading ? (
            <p>Loading Chats...</p>
          ) : (
            userChats.map((chat, index) => (
              <div key={index} onClick={() => updateCurrentChats(chat)}>
                <SearchUser chat={chat} user={user} />
              </div>
            ))
          )}
        </div>
      )}
    </div>
    </>
  );
};

export default SearchResult;
