import { EthProvider } from "./contexts/EthContext";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Demo from "./components/Demo";
import AllFIRSPage from "./components/Demo/AllFIRSPage";
import FIRMainPage from "./components/Demo/FIRMainPage";
import Error404 from "./components/Error404/Error";
import ViewEvidencesPage from "./components/Demo/ViewEvidencesPage";

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
                <Route path="/viewevidence" element={<ViewEvidencesPage />} />
              </Routes>
            </BrowserRouter>
          </div>
        </div>
      </EthProvider>
    </MantineProvider>
  );
}

export default App;
