import { useContext } from 'react';
import {Alert,Button,Form,Row,Col,Stack} from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';


const Register = () => {
    const {registerInfo,updateRegisterInfo,registerUser,registerError,isRegisterloading} = useContext(AuthContext);
    return (
    <>
    <Form onSubmit={registerUser}> 
        <Row style={{height:"100vh",justifyContent:"center",paddingTop:"10%"}}>
            <Col xs={6}>
            <Stack gap={3}>
                <h2>Register</h2>
                {/* <h2>{user.name}</h2> */}
                <Form.Control type='text' onChange={(e)=>updateRegisterInfo({...registerInfo,name:e.target.value})}  placeholder='Name'/>
                <Form.Control type='email' onChange={(e)=>updateRegisterInfo({...registerInfo,email:e.target.value})}  placeholder='Email'/>
                <Form.Control type='password' onChange={(e)=>updateRegisterInfo({...registerInfo,password:e.target.value})}  placeholder='Password'/>
                {/* <Form.Control type='password' placeholder='Confirm Password'/> */}
                <Button varient='primary' type='submit'>
                    {
                        isRegisterloading ? "Creating Your Account" : "Register"
                    }
                </Button>
                {
                    registerError?.error && 
                    <Alert variant='danger'>
                        < p> {registerError?.message} </p>
                    </Alert>
                }
                
            </Stack>
            </Col>
        </Row>
    </Form>
    </> 
     );
}
 
export default Register;