const DiveLog = artifacts.require("DiveLog");

contract("DiveLog", (accounts) => {
  const owner = accounts[0];
  const buddy = accounts[1];
  const nonOwner = accounts[2];
  const nonBuddy = accounts[3];
  let diveLog;

  beforeEach(async () => {
    diveLog = await DiveLog.new(owner, buddy, { from: owner });
  });

  it("should initialize with the correct owner and buddy addresses", async () => {
    const contractOwner = await diveLog.owner();
    const contractBuddy = await diveLog.buddy();

    assert.equal(contractOwner, owner, "Owner address is incorrect");
    assert.equal(contractBuddy, buddy, "Buddy address is incorrect");
  });

  it("should allow owner to update dive date", async () => {
    const newDiveDate = 1234567890;
    await diveLog.updateDiveDate(newDiveDate, { from: owner });
    const updatedDiveDate = await diveLog.diveDate();

    assert.equal(updatedDiveDate.toNumber(), newDiveDate, "Dive date was not updated correctly");
  });

  it("should not allow owner to update dive date after contract is signed", async () => {
    // Actualiza la fecha de la inmersión antes de firmar el contrato
    const newDiveDate = 1234567890;
    await diveLog.updateDiveDate(newDiveDate, { from: owner });

    // Firma el contrato como buddy
    await diveLog.signDiveLog({ from: buddy });

    // Intenta actualizar la fecha de la inmersión después de firmar el contrato
    try {
      await diveLog.updateDiveDate(newDiveDate + 1, { from: owner });
      assert.fail("Owner was able to update dive date after contract was signed");
    } catch (error) {
      assert.match(
        error.message,
        /Dive log is already signed/,
        "Error message does not match expected"
      );
    }

    // Verifica que la fecha de la inmersión no haya cambiado
    const updatedDiveDate = await diveLog.diveDate();
    assert.equal(updatedDiveDate.toNumber(), newDiveDate, "Dive date should not be updated after contract is signed");
  });

  it("should only allow buddy to sign the dive log", async () => {
    // Intenta firmar como no buddy
    try {
      await diveLog.signDiveLog({ from: nonBuddy });
      assert.fail("Non-buddy was able to sign the dive log");
    } catch (error) {
      assert.match(
        error.message,
        /Only the buddy can call this function/,
        "Error message does not match expected"
      );
    }

    // Verifica que el contrato no esté firmado todavía
    let isSigned = await diveLog.signed();
    assert.equal(isSigned, false, "Dive log should not be signed by non-buddy");

    // Intenta firmar como buddy
    await diveLog.signDiveLog({ from: buddy });

    // Verifica que el contrato esté firmado
    isSigned = await diveLog.signed();
    assert.equal(isSigned, true, "Dive log should be signed by buddy");
  });

});


3  