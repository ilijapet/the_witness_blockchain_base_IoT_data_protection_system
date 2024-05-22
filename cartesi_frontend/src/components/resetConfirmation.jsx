import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import { Stack } from "@mui/material";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { green } from "@mui/material/colors";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      <p style={{ marginBottom: "20px" }}>
        The Witness: data protection system
      </p>
      <p style={{ marginBottom: "1px" }}>Powered by:</p>
      <Link
        style={{ marginRight: "4px" }}
        color="inherit"
        target="_blank"
        href="https://cartesi.io/"
      >
        www.cartesi.io
      </Link>
      <span>{new Date().getFullYear()}</span>
    </Typography>
  );
}

const defaultTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: green[500],
    },
    secondary: {
      main: green[500],
    },
  },
});

export default function ResetConfirmation() {
  const form = useForm();

  const { control } = form;

  const history = useHistory();

  let location = useLocation();
  let absurl = location.state.absurl;
  console.log(absurl);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            You sucessfully reset your password!
          </Typography>

          <Stack>
            <form onClick={() => history.push("/")} noValidate>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Return to login
              </Button>
            </form>
          </Stack>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
      <DevTool control={control} />
    </ThemeProvider>
  );
}
