import { createContext,useCallback,useEffect,useState } from "react";
import { baseUrl, postRequest } from "../utils/services";


export const  AuthContext = createContext();

export const AuthContextProvider = ({children}) =>{

    const [user, setUser] = useState(null);

    const [registerError,setRegisterError] = useState(null);
    const[isRegisterloading,setIsRegisterLoading] = useState(false);

    const [registerInfo,setRegisterInfo] = useState({
        name:'',
        email:'',
        password:'',
    })

    const [loginError,setLoginError] = useState(null);
    const[isloginloading,setIsLoginLoading] = useState(false);

    const [loginInfo,setLoginInfo] = useState({
        email:'',
        password:'',
    })

    // console.log("User",user);

    useEffect(()=>{
        const user = localStorage.getItem("User");
        setUser(JSON.parse(user));
    },[])

    // console.log("registerinfo",registerInfo);

    // get the user registration info from  Registration form
    const updateRegisterInfo = useCallback((info)=>{
        setRegisterInfo(info);
    },[])

    // get the user login info from Login form
    const updateLoginInfo = useCallback((info)=>{
        setLoginInfo(info);
    },[])


    // User register
    const registerUser = useCallback(async(e)=>{
        e.preventDefault();
        setIsRegisterLoading(true);
        setRegisterError(null);

        const response = await postRequest(`${baseUrl}/users/register`,JSON.stringify(registerInfo));

        setIsRegisterLoading(false);

        if(response.error){
            return setRegisterError(response);
        }
        localStorage.setItem("User",JSON.stringify(response));
        setUser(response);
    },[registerInfo])

    // User Login
    const loginUser = useCallback(async(e)=>{

        e.preventDefault();
        setIsLoginLoading(true);
        setLoginError(null);

        const response = await postRequest(`${baseUrl}/users/login`,JSON.stringify(loginInfo));

        setIsLoginLoading(false);
        // console.log("respose",response);
        if(response.error){
            return setLoginError(response);
        }
        localStorage.setItem("User",JSON.stringify(response));
        setUser(response);
    
    },[loginInfo])

    //User Logout
    const logoutuser = useCallback(()=>{
        localStorage.removeItem("User");
        setUser(null);
    },[])
    // console.log("User",user);
    // console.log("loginInfo",loginInfo);

    return (
    <AuthContext.Provider 
        value={{
            user,
            registerInfo,
            updateRegisterInfo,
            registerUser,
            registerError,
            isRegisterloading,
            logoutuser,
            loginUser,
            loginError,
            loginInfo,
            isloginloading,
            updateLoginInfo,
        }}
    >
        {children}
    </AuthContext.Provider>
    );
};