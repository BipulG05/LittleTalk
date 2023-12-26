import { Stack } from "react-bootstrap";
import { useFatchRecipientUser } from "../../hooks/useFetchrecipient";
import avatar from "../../assets/Avatar/male-0.png";


const UserChat = ({chat,user}) => {
    const {recipientUser} = useFatchRecipientUser(chat, user);

    return (
    <>
    <Stack direction="horizontal" gap={3} 
    className="user-card align-items-center p-2 justify-content-between"
    role="button"
    >
        <div className="d-flex">
            <div className="me-2" style={{"padding":"7px 5px"}}>
                <img src={avatar} height="30px"/>
            </div>
            <div className="text-content">
                <div className="name">
                    {recipientUser?.name}
                </div>
                <div className="text">Text Message</div>
            </div>
        </div>
        <div className="d-flex flex-column align-items-end">
            <div className="date">12-12-2023</div>
            <div className="this-user-notifications">2</div>
            <span className="user-online"></span>
        </div>
    </Stack>
    </>  
    );
}
 
export default UserChat;