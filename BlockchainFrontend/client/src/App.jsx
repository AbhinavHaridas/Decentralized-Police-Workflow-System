import { EthProvider } from "./contexts/EthContext";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Demo from "./components/Demo";
import AllFIRSPage from "./components/Demo/AllFIRSPage";
import FIRMainPage from "./components/Demo/FIRMainPage";
import Error404 from "./components/Error404/Error";
import ViewEvidencesPage from "./components/Demo/ViewEvidencesPage";
import LoginPage from "./components/Demo/LoginPage";
import FIRFormPage from "./components/Demo/FIRFormPage";
import EvidenceAccessPage from "./components/Demo/EvidenceAccessPage";
import SignupPage from "./components/Demo/SignupPage";

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
                <Route path="/login" element={<LoginPage />} />
                <Route path="/filefir" element={<FIRFormPage />} />
                <Route path='/evidenceaccess' element={<EvidenceAccessPage />} />
                <Route path='/signup' element={<SignupPage />} />
              </Routes>
            </BrowserRouter>
          </div>
        </div>
      </EthProvider>
    </MantineProvider>
  );
}

export default App;
