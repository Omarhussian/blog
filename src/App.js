import "./index.css";
import DashRoute from "./routes/DashRoute";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <div className="App">
      <SnackbarProvider
        autoHideDuration={3000}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <DashRoute />
      </SnackbarProvider>
    </div>
  );
}

export default App;
