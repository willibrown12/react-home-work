import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { loginApi } from './service';
import { useNavigate } from 'react-router-dom';
import { CircularProgress, Tooltip } from '@mui/material';
import { z } from "zod"

const passwordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
const passwordSchema = z.string().regex(passwordRegex)
const emailSchema = z.string().email().min(15)


const LoginPage = () => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)


    const [username, setUsername] = useState('viliking123@gmail.com');
    const [usernameError, setUsernameError] = useState({ isError: false, errorMessage: "" });


    const [password, setPassword] = useState('78789798789A!1s');
    const [passwordError, setPasswordError] = useState({ isError: false, errorMessage: "" });


    const handleSubmit = async () => {
        try {
            setIsLoading(true)
            const result = await loginApi({ userName: username, password })
            if (result.token) {
                localStorage.setItem("token", result.token)
                window.location.href = "/home"
            }
            console.log(result)
        } catch (error) {
            console.log(error, "error")
            alert(error?.data)
        } finally {
            setIsLoading(false)
        }
    };

    function isSubmitDisabled(): boolean {
        if (!username || !password) {
            return true
        }

        return false;
    }




    return (
        <form style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <TextField label="Username (Email)" value={username} onChange={(e) => setUsername(e.target.value)} type="email" />
            {/* <Skeleton variant="rectangular" width={500} height={50} /> */}
            <Tooltip title={<React.Fragment>
                <span> Password must contain at least 16 characters </span>
                <br>
                </br>
                <span> Password Contain Special character, Upper case, number </span>

            </React.Fragment>}>
                <TextField label="Password" value={password} onChange={(e) => setPassword(e.target.value)} type="text" />
            </Tooltip>
            {isLoading ? <LoadingLogin /> : <Button disabled={isSubmitDisabled()} variant="contained" onClick={handleSubmit} color="primary" type="button">Submit</Button>}
            <Button variant="contained" onClick={() => { navigate("/register") }} color="primary" type="button">Join us</Button>

        </form>
    );
};

function LoadingLogin() {
    return <span> <CircularProgress /> Please wait ...  </span>
}

export default LoginPage;