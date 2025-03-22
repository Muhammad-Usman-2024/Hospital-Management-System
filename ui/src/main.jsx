import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
<<<<<<< HEAD
import store, { persistor } from "./components/redux/store";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { PersistGate } from "redux-persist/integration/react";
=======
import store from "./components/redux/store";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

>>>>>>> 8fc9bf617b1b26f2f302fb7b63aa721bd734c63f
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
<<<<<<< HEAD
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
=======
      <App />
      {/* <PersistGate loading={null} persistor={persistor}>
       
      </PersistGate> */}
>>>>>>> 8fc9bf617b1b26f2f302fb7b63aa721bd734c63f
    </Provider>
  </React.StrictMode>
);
