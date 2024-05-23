import { useReducer, useState } from "react";
import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { Switch } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const reducer = (prevState, action) => {
  switch (action.type) {
    case "change":
      return { text: action.payload };

    case "uppercase":
      return { text: prevState.text.toUpperCase() };

    case "lowercase":
      return { text: prevState.text.toLowerCase() };

    case "clear":
      return { text: "" };

    case "removeextraspaces":
      return { text: prevState.text.replace(/\s+/g, " ").trim() };

    default:
      return prevState;
  }
};

const App = () => {
  const [toggleDarkMode, setToggleDarkMode] = useState(false);

  const toggleDarkTheme = () => {
    setToggleDarkMode(!toggleDarkMode);
  };

  const theme = createTheme({
    palette: {
      mode: toggleDarkMode ? "dark" : "light",
    },
  });

  const initialState = {
    text: "",
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const showEmptyTextAreaToast = () => {
    toast.warn("Text area is empty!", {
      position: "top-center",
      autoClose: 3000,
    });
  };

  const showTextCopiedToast = () => {
    toast.success("Text copied to clipboard!", {
      position: "top-center",
      autoClose: 3000,
    });
  };

  const handleButtonClick = (actionType) => {
    if (state.text.trim() === "") {
      showEmptyTextAreaToast();
    } else {
      dispatch({ type: actionType });
    }
  };

  const handleCopyText = () => {
    if (state.text.trim() === "") {
      showEmptyTextAreaToast();
    } else {
      navigator.clipboard.writeText(state.text);
      showTextCopiedToast();
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer />
      <div className="App">
        <div className="navbar">
          <h1>Text-Utils</h1>
          <Switch checked={toggleDarkMode} onChange={toggleDarkTheme} />
        </div>

        <div className="section">
          <div className="details">
            <p>No. of words : {state.text.split(" ").filter(word => word !== "").length}</p>
            <p>No. of Characters : {state.text.length}</p>
            <p>Reading time : {Math.round(state.text.split(" ").filter(word => word !== "").length / 200 * 60)} seconds</p>
          </div>
          <textarea
            className="textarea"
            value={state.text}
            onChange={(e) => {
              dispatch({ type: "change", payload: e.target.value });
            }}
            style={{
              color:
                theme.palette.mode === "light" ? "#000000" : "#FFFFFF",
            }}
          />
          <div className="buttonsDiv">
            <button onClick={() => handleButtonClick("uppercase")}>
              Change to UpperCase
            </button>
            <button onClick={() => handleButtonClick("lowercase")}>
              Change to LowerCase
            </button>
            <button onClick={() => handleButtonClick("clear")}>
              Clear Text
            </button>
            <button onClick={handleCopyText}>
              Copy Text
            </button>
            <button onClick={() => handleButtonClick("removeextraspaces")}>
              Remove extra spaces
            </button>
          </div>
          <div className="preview">
            <h1>Preview text</h1>
            <textarea
              className="textarea"
              value={state.text}
              readOnly
              style={{
                color:
                  theme.palette.mode === "light" ? "#000000" : "#FFFFFF",
              }}
            />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
