jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;

jasmine.getEnv().afterEach(() => {
  jest.clearAllMocks();
});
