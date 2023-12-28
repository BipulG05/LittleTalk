import { Container,Nav,Navbar,Stack } from "react-bootstrap";
import {Link} from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import { useContext } from 'react';
import Notification from "./chats/Notification";




const MyNavBar = () => {
const {user,logoutuser} = useContext(AuthContext);
    return (
         <Navbar bg='dark' className = 'mb-4' style={{height:'3.5rem'}}>
            <Container>
                <h4>
                    <Link to='/' className="link-light text-decoration-none ">Little Talk</Link>
                </h4>
                <span className="text-warning">{user?`Logged in as ${user?.name}`:"Welcome to LittleTalk"}</span>
                <Nav>
                    <Stack direction="horizontal" gap={3}>
                        {
                            user && 
                            (
                                <>
                                    <Notification/>
                                    <Link onClick={()=>{
                                        logoutuser();
                                    }} to='/login' className="link-light text-decoration-none">Logout </Link>
                                </>
                            )
                        }
                        {
                            !user && 
                            (
                                <>
                                    <Link to='/login' className="link-light text-decoration-none">Login </Link>
                            
                                    <Link to='/register' className="link-light text-decoration-none">Register </Link>
                                </>
                            )
                        }
                        
                    </Stack>
                </Nav> 
            </Container>
         </Navbar> 
         ); 
}
 
export default MyNavBar;