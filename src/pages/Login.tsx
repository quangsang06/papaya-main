import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setAccessToken } from "services/storage";

const Login = () => {
  const navigate = useNavigate();
  return (
    <Container maxWidth={false}>
      <Grid
        container
        sx={{ height: "100vh" }}
        justifyContent="center"
        alignItems="center"
      >
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            setAccessToken(credentialResponse.credential as string);
            navigate("/");
          }}
          onError={() => {
            toast.error("Login failed!");
          }}
        />
      </Grid>
    </Container>
  );
};

export default Login;
