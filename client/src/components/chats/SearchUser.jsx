import { Stack } from "react-bootstrap";
import { useFatchRecipientUser } from "../../hooks/useFetchrecipient";
import avatar from "../../assets/Avatar/male-0.png";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatsContext";
import { unReadnotificationFunc } from "../../utils/unreadNotification";
import { useFetchLatestMessage } from "../../hooks/useFetchLatestMessage";
import { AuthContext } from "../../context/AuthContext";

const SearchUser = ({ searchuser }) => {
  const { user } = useContext(AuthContext);
  const { userChats, isUserChatLoading, updateCurrentChats } =
    useContext(ChatContext);

  // const us_id = user._id;
  // const name  = user.name
  const handleSearchUser = (currUser, searchUser) => {
    const userExists = userChats.some((user) => user.id === searchUser);
    if (!userExists) {
      createChat(currUser._id, searchUser._id);
    }
  };

  return (
    <>
      <Stack
        direction="horizontal"
        className="user-card align-items-center justify-content-between MobVuser-card"
        role="button"
        onClick={() => handleSearchUser(user._id, searchuser._id)}
      >
        <div className="d-flex">
          <div className="me-2" style={{ padding: "7px 5px" }}>
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
              height="30px"
            />
          </div>
          <div className="text-content">
            <div className="name">{searchuser?.name}</div>
          </div>
        </div>
      </Stack>
    </>
  );
};

export default SearchUser;
