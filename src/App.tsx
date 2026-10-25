import { CssBaseline } from "@mui/material";
import { Router } from "./router";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
// import { ErrorBoundary } from 'react-error-boundary';

function App() {
  return (
    <>
      <ToastContainer
        theme="dark"
        position="top-left"
      />
      <CssBaseline />
      {/* <ErrorBoundary /> */}
      <Router />
    </>
  );
}

export default App;
