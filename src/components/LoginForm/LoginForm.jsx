import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../../redux/auth/operations";
import { selectLoading, selectError } from "../../redux/auth/selectors";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import css from "./LoginForm.module.css";
import inputFormTheme from "../../theme/inputFormTheme";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(64).required(),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const ifError = useSelector(selectError);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // об'єкт конфігурації параметрів хука useForm
  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (data) => {
    // Виконання запиту для login
    dispatch(logIn(data))
      .then((result) => {
        if (logIn.fulfilled.match(result)) {
          reset(); // скидаємо форму
        } else if (logIn.rejected.match(result)) {
          setErrorMessage(result.payload || "Login failed");
        }
      })
      .catch((error) => {
        setErrorMessage(error.message);
        console.error("Login is failed:", error.message);
      });
  };

  return (
    <Box
      className={css.customBox}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        className={css.customTextField}
        {...registerField("email")}
        label="Enter your email"
        variant="outlined"
        fullWidth
        error={!!errors.email}
        helperText={errors.email?.message}
        autoComplete="email"
        sx={inputFormTheme}
      />
      <TextField
        className={css.customTextField}
        {...registerField("password")}
        label="Confirm a password"
        type={showPassword ? "text" : "password"}
        variant="outlined"
        fullWidth
        error={!!errors.password}
        helperText={errors.password?.message}
        autoComplete="current-password"
        sx={inputFormTheme}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                edge="end"
                style={{ color: "var(--btn-color)", opacity: 0.4 }}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {ifError && (
        <Typography
          color="error"
          variant="body2"
          marginTop="normal"
          align="center"
        >
          {"Invalid email or password: " + errorMessage}
        </Typography>
      )}
      <Button
        className={css.customButton}
        type="submit"
        variant="contained"
        style={{ textTransform: "capitalize" }}
        disabled={loading}
        fullWidth
      >
        Log In Now
      </Button>
    </Box>
  );
};

export default LoginForm;
