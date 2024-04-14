const User = require("../Models/UserModel");

describe("Create users", () => {
  it("Should create a new user successfully!", () => {
    const mockUser = {
      email: "neel@gmail.com",
      name: "Neel",
    };
    const spy = jest.spyOn(User, "create").mockReturnValueOnce(mockUser );
    User.create(mockUser);
    const spyCreatedUser = spy.mock.results[0].value;
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spyCreatedUser.name).toEqual(mockUser.name);
    spy.mockReset();
  });

  it("Should retruns an error when the name is missing", () => {
    const mockUser = {
      email: "neel@gmail.com",
    };
    const spy = jest.spyOn(User, "create").mockReturnValueOnce("Name is required" );
    User.create(mockUser);
    const spyCreatedUser = spy.mock.results[0].value;
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spyCreatedUser).toEqual("Name is required");

    spy.mockReset();
  });

  it("Should retruns an error when the email is missing", () => {
    const mockUser = {
      name: "Neel",
    };
    const spy = jest.spyOn(User, "create").mockReturnValueOnce("Email is required" );
    User.create(mockUser);
    const spyCreatedUser = spy.mock.results[0].value;
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spyCreatedUser).toEqual("Email is required");
    spy.mockReset();
  });
});

describe("READ users", () => {
  it("Should return the list of users successfully", () => {
    const mockedUserList = [
      {
        _id: "a1a1a1",
        email: "neel@example.com",
        name: "Neel",
      },
      {
        _id: "a1a1a2",
        email: "justin@gmail.com",
        name: "Justin",
      },
    ];

    const spy = jest.spyOn(User, "find").mockReturnValueOnce(mockedUserList );
    User.find({});

    const spyFetchedUsers = spy.mock.results[0].value;
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spyFetchedUsers).toHaveLength(2);
    spy.mockReset();
  });

  it("Should return an empty list if there are no user", () => {
    const spy = jest.spyOn(User, "find").mockReturnValueOnce([] );
    User.find({});

    const spyFetchedUsers = spy.mock.results[0].value;
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spyFetchedUsers).toHaveLength(0);
    spy.mockReset();
  });

  it("Should return a user successfully!", () => {
    const mockUser = {
      _id: "a1a1a1",
      email: "neel@example.com",
      name: "Neel",
    };
    const spy = jest.spyOn(User, "findById").mockReturnValueOnce(mockUser );
    User.findById(mockUser._id);

    const spyFetchedUser = spy.mock.results[0].value;
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spyFetchedUser.name).toEqual(mockUser.name);
    spy.mockReset();
  });

  it("Should return an error when the user does not exit", () => {
    const id = "a1a1a1";
    const spy = jest.spyOn(User, "findById").mockReturnValueOnce("User not found" );
    User.findById(id);

    const spyFetchedUser = spy.mock.results[0].value;
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spyFetchedUser).toEqual("User not found");
    spy.mockReset();
  });
});
