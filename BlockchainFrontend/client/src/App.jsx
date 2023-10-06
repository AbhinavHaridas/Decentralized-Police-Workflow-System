import { EthProvider } from "./contexts/EthContext";
import { MantineProvider } from "@mantine/core";
import Demo from "./components/Demo";
import AllFIRSPage from "./components/Demo/AllFIRSPage";
import FIRMainPage from "./components/Demo/FIRMainPage";
import Error404 from "./components/Error404/Error";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <MantineProvider>
      <EthProvider>
        <div id="App">
          <div className="container">
            <BrowserRouter>
              <Routes>
                <Route path="/viewfir" element={<AllFIRSPage />} />
                <Route path="/" element={<Demo />} />
                <Route path="/error" element={<Error404 />} />
                <Route path="/blockchain" element={<FIRMainPage />} />
              </Routes>
            </BrowserRouter>
          </div>
        </div>
      </EthProvider>
    </MantineProvider>
  );
}

export default App;
