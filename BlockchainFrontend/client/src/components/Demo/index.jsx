import useEth from "../../contexts/EthContext/useEth";
import NoticeWrongNetwork from "./NoticeWrongNetwork";
import Error404 from "../Error404/Error";
import LoginPage from "./LoginPage";

function Demo() {
  const { state } = useEth();

  const demo =
    <>
      <div className="contract-container">
        {/* <FIRFormPage /> */}
        <LoginPage /> 
      </div>
    </>;

  return (
    <div className="demo">
      {!state.artifact ? (
        <Error404 />
        // <FIRFormPage />
      ) : !state.contract ? (
        <NoticeWrongNetwork />
      ) : (
        demo
      )}
    </div>
  );
}

export default Demo;
