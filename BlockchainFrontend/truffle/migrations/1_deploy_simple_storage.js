const FIR = artifacts.require("FIRSystem");

module.exports = function (deployer) {
  deployer.deploy(FIR);
};
