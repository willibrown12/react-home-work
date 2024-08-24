import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { registerApi } from './service';
import { useNavigate } from 'react-router-dom';
import { CircularProgress, IconButton, Skeleton, Tooltip } from '@mui/material';
import { z } from "zod"

const passwordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
const passwordSchema = z.string().regex(passwordRegex)
const emailSchema = z.string().email().min(15)
const phoneSchema = z.string().min(10).max(10)
const fullNameSchema = z.string().min(3).max(50)


const RegistrationForm = () => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    const [fullName, setFullName] = useState('');
    const [fullNameError, setFullNameError] = useState({ isError: false, errorMessage: "" });

    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState({ isError: false, errorMessage: "" });

    const [phone, setPhone] = useState('');
    const [phoneError, setPhoneError] = useState({ isError: false, errorMessage: "" });

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState({ isError: false, errorMessage: "" });

    const [yearOfBirth, setYearOfBirth] = useState(1988);

    const handleSubmit = async () => {
        try {
            setIsLoading(true)
            const result = await registerApi({ fullName, userName: username, phone, password, yearOfBirth })
            navigate("/login")
        } catch (error) {
            console.log(error, "error")
            alert(error?.data)
        } finally {
            setIsLoading(false)
        }
        // Handle form submission here, e.g., send data to an API
    };

    function isSubmitDisabled(): boolean {
        if (!username || !fullName || !password || !phone) {
            return true
        }
        if (fullNameError.isError || usernameError.isError || passwordError.isError || phoneError.isError) {
            return true
        }
        return false;
    }

    function isFullNameValid() {
        const result = fullNameSchema.safeParse(fullName);
        if (result.success) {
            setFullNameError({ isError: false, errorMessage: "" })
        } else {
            const errors = result?.error?.issues.map(e => e.message)
            setFullNameError({ isError: true, errorMessage: errors.join(", ") })
        }
    }
    function isUsernameValid() {
        const result = emailSchema.safeParse(username);
        if (result.success) {
            setUsernameError({ isError: false, errorMessage: "" })
        } else {
            const errors = result?.error?.issues.map(e => e.message)
            setUsernameError({ isError: true, errorMessage: errors.join(", ") })
        }
    }
    function isPasswordValid() {
        const result = passwordSchema.safeParse(password);
        if (result.success) {
            setPasswordError({ isError: false, errorMessage: "" })
        } else {
            const errors = result?.error?.issues.map(e => e.message)
            setPasswordError({ isError: true, errorMessage: errors.join(", ") })
        }
    }
    function isPhoneNumberValid() {
        const result = phoneSchema.safeParse(phone);
        if (result.success) {
            setPhoneError({ isError: false, errorMessage: "" })
        } else {
            const errors = result?.error?.issues.map(e => e.message)
            setPhoneError({ isError: true, errorMessage: errors.join(", ") })
        }
    }

    return (
        <form style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <TextField onBlur={isFullNameValid} helperText={fullNameError.errorMessage} error={fullNameError.isError} label="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            <TextField onBlur={isUsernameValid} helperText={usernameError.errorMessage} error={usernameError.isError} label="Username (Email)" value={username} onChange={(e) => setUsername(e.target.value)} type="email" />
            {/* <Skeleton variant="rectangular" width={500} height={50} /> */}
            <Tooltip title={<React.Fragment>
                <span> Password must contain at least 16 characters </span>
                <br>
                </br>
                <span> Password Contain Special character, Upper case, number </span>

            </React.Fragment>}>
                <TextField onBlur={isPasswordValid} helperText={passwordError.errorMessage} error={passwordError.isError} label="Password" value={password} onChange={(e) => setPassword(e.target.value)} type="text" />
            </Tooltip>
            <TextField onBlur={isPhoneNumberValid} helperText={phoneError.errorMessage} error={phoneError.isError} label="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <TextField label="Year of Birth" value={yearOfBirth} onChange={(e) => setYearOfBirth(Number(e.target.value))} type="number" />

            {isLoading ? <LoadingLogin /> : <Button disabled={isSubmitDisabled()} variant="contained" onClick={handleSubmit} color="primary" type="button">Submit</Button>}
            <Button variant="contained" onClick={() => {
                navigate("/login")
            }} color="primary" type="button">Already have a user</Button>

        </form>
    );
};

function LoadingLogin() {
    return <span> <CircularProgress /> Please wait ...  </span>
}

export default RegistrationForm;