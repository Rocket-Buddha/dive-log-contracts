const DiveLogFactory = artifacts.require("DiveLogFactory");

module.exports = function (deployer) {
  deployer.deploy(DiveLogFactory);
};
