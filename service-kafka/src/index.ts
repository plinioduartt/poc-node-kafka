import ServerInitializer from "./initializers/server.initializer";

void (async () => {
    await ServerInitializer.start();
})();