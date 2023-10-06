import { EthProvider } from "./contexts/EthContext";
import { MantineProvider } from "@mantine/core";

import Demo from "./components/Demo";

function App() {
  return (
    <MantineProvider>
      <EthProvider>
        <div id="App">
          <div className="container">
            <Demo />
          </div>
        </div>
      </EthProvider>
    </MantineProvider>
  );
}

export default App;
