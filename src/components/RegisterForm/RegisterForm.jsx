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
import { register } from "../../redux/auth/operations";
import { selectLoading, selectError } from "../../redux/auth/selectors";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import css from "./RegisterForm.module.css";
import inputFormTheme from "../../theme/inputFormTheme";

const schema = yup.object().shape({
  userName: yup.string().min(2).max(32).required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).max(64).required(),
});

const RegisterForm = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const ifError = useSelector(selectError);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // об'єкт конфігурації параметрів хука useForm
  const {
    register: registerField, // rename функції реєстрації полів форми - register, щоб уникнути конфлікту імен з операцією register
    // Функція - обробляє подання форми, приймає два аргументи: onSubmit (функцію, яка буде викликана після валідації форми) і actions (додаткові дії з формою).
    handleSubmit,
    formState: { errors }, //  Витягує об'єкт errors зі стану форми, який містить всі помилки валідації форми.
    reset, // скидає форму до початкового стану
  } = useForm({
    resolver: yupResolver(schema), // Використовує yupResolver для інтеграції схеми валідації yup з react-hook-form.
  });

  // обробник відображення паролю
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (data) => {
    // Виконання запиту реєстрації user
    dispatch(register(data))
      .then((result) => {
        if (register.fulfilled.match(result)) {
          reset(); // скидаємо форму
        } else if (register.rejected.match(result)) {
          setErrorMessage(result.payload.message || "Registration failed");
        }
      })
      .catch((error) => {
        setErrorMessage(error.message);
        console.error("Registration failed:", error.message);
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
        {...registerField("userName")}
        label="Enter your name"
        variant="outlined"
        fullWidth
        error={!!errors.name}
        helperText={errors.name?.message}
        autoComplete="username"
        sx={inputFormTheme}
      />
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
        label="Create a password"
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
                style={{ color: "var(--text-color-start-white)", opacity: 0.4 }}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {ifError && (
        <Typography color="error" variant="body2" align="center">
          {errorMessage}
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
        Register Now
      </Button>
    </Box>
  );
};

export default RegisterForm;
