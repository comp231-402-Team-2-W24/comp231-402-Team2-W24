const Reminder = require("../Models/ReminderModel");

describe("Create Reminders", () => {
  it("Should create a new Reminder successfully!", () => {
    const mockReminder = {
      title: "reminder 1",
      date: "2021-12-12",
      userId: "a1a1a1",
      id: "r1r1r1",
    };
    const spy = jest.spyOn(Reminder, "create").mockReturnValueOnce(mockReminder);
    Reminder.create(mockReminder);
    const spyCreatedReminder = spy.mock.results[0].value;
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spyCreatedReminder.name).toEqual(mockReminder.name);
    spy.mockReset();
  });
});

describe("READ Reminders", () => {
  it("Should return the list of Reminders successfully", () => {
    const mockedReminderList = [
      {
        title: "reminder 1",
        date: "2021-12-12",
        userId: "a1a1a1",
        _id: "r1r1r1",
      },
      {
        title: "reminder 2",
        date: "2021-12-12",
        userId: "a1a1a1",
        _id: "r2r2r2",
      },
    ];

    const spy = jest.spyOn(Reminder, "find").mockReturnValueOnce(mockedReminderList);
    Reminder.find({});

    const spyFetchedReminders = spy.mock.results[0].value;
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spyFetchedReminders).toHaveLength(2);
    spy.mockReset();
  });

  it("Should return an empty list if there are no Reminder", () => {
    const spy = jest.spyOn(Reminder, "find").mockReturnValueOnce([]);
    Reminder.find({});

    const spyFetchedReminders = spy.mock.results[0].value;
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spyFetchedReminders).toHaveLength(0);
    spy.mockReset();
  });
});

describe("UPDATE Reminders", () => {
  it("Should update a Reminder successfully!", () => {
    const mockReminder = {
      title: "updated reminder",
      date: "2021-12-12",
      userId: "a1a1a1",
      id: "r1r1r1",
    };
    const spy = jest.spyOn(Reminder, "findByIdAndUpdate").mockReturnValueOnce(mockReminder);
    Reminder.findByIdAndUpdate(mockReminder._id, {
      title: "updated reminder",
    }, {
      new: true,
    });

    const spyUpdatedReminder = spy.mock.results[0].value;
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spyUpdatedReminder.title).toEqual("updated reminder");
    spy.mockReset();
  });
});
