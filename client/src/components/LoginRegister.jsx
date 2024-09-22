import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button } from "@mui/material";

const LoginRegister = ({ title }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const baseURL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate()

  const loginregister = async () => {
    if (title === "Login") {
      try {
        const response = await axios.post(
          `${baseURL}/api/auth/login`,
          { phoneNumber, password },
          { withCredentials: true }
        );

        if (response.status === 200) {
          setMessage(response.data.message);
          console.log(response.data);
          navigate('/')
        }
      } catch (error) {
        console.log(error);
        setMessage(error.response.data.message);
      }
    }
    else{
        try {
            const response = await axios.post(
              `${baseURL}/api/auth/signup`,
              { phoneNumber, password },
              { withCredentials: true }
            );
    
            if (response.status === 201) {
              setMessage(response.data.message);
              console.log(response.data);
              // context
              navigate('/login')
            }
            else if(response.status === 200 ){
                setMessage(response.data.message);
              console.log(response.data);
            }
          } catch (error) {
            console.log(error);
            setMessage(response.data.message);
          }
    }
  };

  return (
    <>
      <h2>{title}</h2>
      <Box component={"form"} sx={{ m: 1 }} noValidate autoComplete='on'>
        <TextField
          sx={{ m: 1 }}
          id='phoneNumber'
          type='text'
          label='Enter phoneNumber...'
          variant='outlined'
          onChange={(e) => setPhoneNumber(e.target.value)}
        />

        <TextField
          sx={{ m: 1 }}
          id='password'
          type='password'
          label='Enter password...'
          variant='outlined'
          onChange={(e) => setPassword(e.target.value)}
        />
      </Box>
      <Button variant='contained' onClick={loginregister}>
        {title}
      </Button>
      <div>{message}</div>
    </>
  );
};
export default LoginRegister;
