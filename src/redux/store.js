import { configureStore } from "@reduxjs/toolkit";
import { filtersReducer } from "./filters/slice";
import { authReducer } from "./auth/slice";
import { boardReducer } from "./boards/slice";
import { columnReducer } from "./columns/slice";
import { cardReducer } from "./cards/slice";
import { themaReducer } from "./thema/slice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const authPersistConfig = {
  key: "authSlice",
  storage,
  whitelist: ["token"],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    boards: boardReducer,
    filters: filtersReducer,
    columns: columnReducer,
    cards: cardReducer,
    thema: themaReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// приклад використання store
// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux"; для доступу до якоїсь властивості слайсу
// import { register } from "./auth/operations";

// const RegistrationForm = () => {
//   const dispatch = useDispatch();

//   const handleSubmit = (values, actions) => {
//     dispatch(register(values));

//     actions.resetForm();
//   };

//   return (
//     <Formik
//       initialValues={{ name: "", email: "", password: "" }}
//       onSubmit={handleSubmit}
//       validationSchema={FeedbackSchema}
//     >
//       <Form >
//         ...
//         <button  type="submit">
//           Register
//         </button>
//       </Form>
//     </Formik>
//   );
// };
