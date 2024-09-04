import { Toaster } from "sonner";
import { AppRouter } from "./routes/Router";

function App() {
  return (
    <>
      <Toaster richColors />
      <AppRouter />
    </>
  );
}

export default App;
