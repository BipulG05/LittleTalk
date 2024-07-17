import { useContext, useState } from "react";
import { ChatContext } from "../../context/ChatsContext";
import { AuthContext } from "../../context/AuthContext";
import { unReadnotificationFunc } from "../../utils/unreadNotification";
import moment from "moment";
import { useEffect } from "react";
import SearchUser from "./SearchUser";
import { Stack } from "react-bootstrap";
import UserChat from "./UserChat";

const SearchResult = ({ Name, setInputValue }) => {
  // const { userChats, isUserChatLoading, updateCurrentChats } = useContext(ChatContext);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const {
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

  const clearSearch = () => {
    setInputValue("");
  };
  const filter_str = (name, inputName) => {
    return name.toLowerCase().includes(inputName.toLowerCase());
  };
  

  return (
    <>
      <div className="notifications">
        {isOpen && (
          <div className="Search-Result-box">
            <div className="Search-Result-header">
              {/* Check if allUsers array is empty */}
              {allUsers.length === 0 ? (
                <p>Not found...</p>
              ) : (
                // Map through allUsers array
                allUsers.map((user, index) => {
                  // Assuming `filter_str` is a function that checks if `user.name` contains a specific string
                  if (filter_str(user.name, Name)) {
                    return (
                      <div
                        className="search-user-result"
                        key={index}
                        onClick={() => {
                          clearSearch();
                        }}
                      >
                        <SearchUser searchuser={user} />
                      </div>
                    );
                  } else {
                    return null; // Render nothing if the condition is not met
                  }
                })
              )}
              {/* Additional components or logic can be added here */}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchResult;
