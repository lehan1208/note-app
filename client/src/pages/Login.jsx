import { Button, Typography } from "@mui/material";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuth } from "../context/AuthProvider.jsx";
import { Navigate, useNavigate } from "react-router-dom";
import { graphQLRequest } from "../utils/request.js";

const Login = () => {
  const auth = getAuth();
  const {user} = useAuth()
  const navigate = useNavigate();

  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    const {user: {displayName, uid}} = await signInWithPopup(auth, provider)

    const {data} = await graphQLRequest({
      query: `mutation register($uid: String!, $name: String!) {
      register(uid: $uid, name: $name) {
        uid
        name
      }
    }`,
      variables: {
        uid,
        name: displayName,
      },
    });
    console.log('register', { data });
  }

  if (localStorage.getItem("accessToken")) {
    // navigate('/');
    return <Navigate to={"/"}/>
  }

  return (
    <>
      <Typography variant='h5' sx={{marginBottom: "10px"}}>Welcome to Note App</Typography>
      <Button variant="outlined" onClick={handleLoginWithGoogle}>Login with Google</Button>
    </>
  );
};

export default Login;
