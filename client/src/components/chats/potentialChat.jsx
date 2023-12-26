import { useContext } from "react";
import { ChatContext } from "../../context/ChatsContext";
import { AuthContext } from "../../context/AuthContext";

const PotentialChats = () => {
    const {user} = useContext(AuthContext);
    const {potentialChats,createChat} = useContext(ChatContext);
    // console.log("pchats",potentialChats);
    
    return ( 
    <>
        <div className="all-users">
            {potentialChats && 
            potentialChats.map((U,index) => (
               
                    <div className="single-user" key={index} onClick={ () => createChat(user._id,U._id)}>
                        {U.name}
                        <span className="user-online"></span>
                    </div>
                
            ))}
        </div>
    </>
     );
}
 
export default PotentialChats;