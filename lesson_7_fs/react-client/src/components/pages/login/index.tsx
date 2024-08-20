
import  { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { z } from "zod"
import { registerlogin } from './service';
import { CircularProgress } from '@mui/material';

const emailSchema = z.string().email().min(15)



export default function Login() {
  const [isLoading, setIsLoading] = useState(false)
  const [username, setUsername] =useState('');
    const [usernameError, setUsernameError] = useState({ isError: false, errorMessage: "" });
    const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      setIsLoading(true)
        const result=await registerlogin({ userName: username,password})
        alert(result)
    } catch (error) {
        console.log(error, "error")
        alert(error?.data)
    } finally {
        setIsLoading(false)
    }
    // Handle form submission here, e.g., send data to an API
};
function isSubmitDisabled(): boolean {
  if (!username || !password) {
      return true
  }
  if (usernameError.isError ) {
      return true
  }
  return false;
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



  return (
  
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              'url("/static/images/templates/templates-images/sign-in-side-bg.png")',

            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'left',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
              onBlur={isUsernameValid} 
              helperText={usernameError.errorMessage} 
              error={usernameError.isError} 
              label="Username (Email)" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} type="email"
                margin="normal"
                required
                fullWidth
                id="username"
                name="username"
                autoComplete="username"
                autoFocus
              />
              <TextField
              value={password}
               onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />

             {isLoading ? <LoadingLogin /> :
              <Button
              disabled={isSubmitDisabled()}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button> }
              <Grid container>
                <Grid item xs>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            
            </Box>
          </Box>
        </Grid>
      </Grid>
   
  );
}
function LoadingLogin() {
  return <span> <CircularProgress /> Please wait ...  </span>
}