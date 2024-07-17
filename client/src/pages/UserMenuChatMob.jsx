import React, { useContext } from "react";
import { ChatContext } from "../context/ChatsContext";
import { Container, Stack } from 'react-bootstrap';
import UserChat from "../components/chats/UserChat";
import { AuthContext } from "../context/AuthContext";
import PotentialChats from "../components/chats/potentialChat";
import UserChatMob from "../components/chats/UserChatMob";

const UserMenuChatMob = () => {
    const { user } = useContext(AuthContext);
    const { userChats, isUserChatLoading, updateCurrentChats } = useContext(ChatContext);

    // Check if userChats is not defined or not an array
    if (!userChats || !Array.isArray(userChats)) {
        return (
            <Container>
                <PotentialChats />
                <p>No chats available.</p>
            </Container>
        );
    }

    return (
        <Container>
            <PotentialChats />
            <Stack direction="horizontal" gap={4} className="align-items-start userHand">
                <Stack id="ph-mas-box" className="messages-box flex-grow-0 pe-3" gap={3}>
                    {isUserChatLoading ? <p>Loading Chats...</p> :
                        userChats.map((chat, index) => (
                            <div key={index} onClick={() => updateCurrentChats(chat)}>
                                <UserChatMob chat={chat} user={user} />
                            </div>
                        ))
                    }
                </Stack>
            </Stack>
        </Container>
    );
}

export default UserMenuChatMob;
