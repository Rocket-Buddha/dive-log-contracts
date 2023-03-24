const DiveLogFactory = artifacts.require("DiveLogFactory");
const DiveLog = artifacts.require("DiveLog");

contract("DiveLogFactory", (accounts) => {
    const owner = accounts[0];
    const buddy = accounts[1];
    const otherUser = accounts[2];
    let diveLogFactory;

    // Crea una nueva instancia de DiveLogFactory antes de cada prueba
    beforeEach(async () => {
        diveLogFactory = await DiveLogFactory.new({ from: owner });
    });

    // Verificar que el contrato se despliegue correctamente
    it("should deploy the contract correctly", async () => {
        assert(diveLogFactory.address, "Contract address is not set");
    });

    // Verificar que se crea correctamente una instancia de DiveLog
    it("should create a new DiveLog instance", async () => {
        const tx = await diveLogFactory.createDiveLog(buddy, { from: owner });

        // Verificar que se emitió el evento DiveLogCreated
        assert.equal(tx.logs.length, 1, "One event should be emitted");
        assert.equal(tx.logs[0].event, "DiveLogCreated", "Event should be DiveLogCreated");

        // Verificar que se creó una instancia de DiveLog
        const diveLogAddress = tx.logs[0].args.diveLog;
        const diveLog = await DiveLog.at(diveLogAddress);

        // Verificar que el propietario y el compañero del DiveLog sean correctos
        const diveLogOwner = await diveLog.owner();
        const diveLogBuddy = await diveLog.buddy();

        assert.equal(diveLogOwner, owner, "Owner address is incorrect");
        assert.equal(diveLogBuddy, buddy, "Buddy address is incorrect");
    });

    // Verificar que se pueda obtener la lista de buceos en los que una dirección es propietaria o compañera
    it("should allow to get a list of dive logs by user", async () => {
        // Crear dos instancias de DiveLog
        await diveLogFactory.createDiveLog(buddy, { from: owner });
        await diveLogFactory.createDiveLog(otherUser, { from: owner });

        // Obtener la lista de buceos para el propietario y el compañero
        const ownerDiveLogs = await diveLogFactory.getDiveLogsByUser(owner);
        const buddyDiveLogs = await diveLogFactory.getDiveLogsByUser(buddy);
        const otherUserDiveLogs = await diveLogFactory.getDiveLogsByUser(otherUser);

        assert.equal(ownerDiveLogs.length, 2, "Owner should have two dive logs");
        assert.equal(buddyDiveLogs.length, 1, "Buddy should have one dive log");
        assert.equal(otherUserDiveLogs.length, 1, "Other user should have one dive log");
    });

    // Verificar que se devuelva una lista vacía si el usuario no tiene buceos
    it("should return an empty list if user has no dive logs", async () => {
        // Obtener la lista de buceos para un usuario sin buceos
        const noDiveLogsUser = accounts[3];
        const noDiveLogs = await diveLogFactory.getDiveLogsByUser(noDiveLogsUser);

        assert.equal(noDiveLogs.length, 0, "User with no dive logs should have an empty list");
    });
});
