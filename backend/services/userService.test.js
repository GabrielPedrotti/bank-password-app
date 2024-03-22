process.env.DB_CONNECTION_STRING =
  "mongodb+srv://test:test@internetbanking.iwqe7kb.mongodb.net/?retryWrites=true&w=majority&appName=internetBanking";

const mockCollection = {
  findOne: jest.fn(),
  insertOne: jest.fn(),
  updateOne: jest.fn(),
};

const mockDatabase = {
  collection: jest.fn(() => mockCollection),
};

const mockClient = {
  db: jest.fn(() => mockDatabase),
  connect: jest.fn(),
  close: jest.fn(),
};

jest.mock("mongodb", () => ({
  MongoClient: jest.fn(() => mockClient),
}));

const userService = require("./userService");

describe("userService", () => {
  let mockReq, mockRes;

  beforeEach(() => {
    mockReq = {
      body: {},
      params: {},
      sessionID: "mockSessionID",
      session: {
        destroy: jest.fn(),
      },
    };

    mockRes = {
      status: jest.fn(() => mockRes),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createUser", () => {
    it("should return 201 if user is created successfully", async () => {
      mockReq.body = {
        username: "testuser",
        password: "12345",
      };

      await userService.createUser(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Usuário cadastrado com sucesso",
      });
    });
    // Add more test cases
  });

  describe("getUser", () => {
    it("should return user if found", async () => {
      mockReq.params.username = "testuser";
      await userService.getUser(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(200);

    });
    // Add more test cases
  });
  // Add tests for other methods getUserByBankId, getUserBankKeyboard, checkUserPassword
});
