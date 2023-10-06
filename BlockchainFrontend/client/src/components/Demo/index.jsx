import useEth from "../../contexts/EthContext/useEth";
import NoticeWrongNetwork from "./NoticeWrongNetwork";
import { Error404 } from "../Error404/Error";
import FIRMainPage from "./FIRMainPage";
import FIRFormPage from "./FIRFormPage";

function Demo() {
  const { state } = useEth();

  const demo =
    <>
      <div className="contract-container">
        {/* <Contract value={value} />
        <ContractBtns setValue={setValue} /> */}
        {/* <FIRMainPage /> */}
        <FIRFormPage />
      </div>
    </>;

  return (
    <div className="demo">
      {!state.artifact ? (
        // <Error404 />
        <FIRFormPage />
      ) : !state.contract ? (
        <NoticeWrongNetwork />
      ) : (
        demo
      )}
    </div>
  );
}

export default Demo;
