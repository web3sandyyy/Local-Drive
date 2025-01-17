import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateFile from "./pages/CreateFile.tsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/create" element={<CreateFile />} />
          </Routes>
        </Router>
        <Toaster position="top-center" />
      </PersistGate>
    </Provider>
  </StrictMode>
);
