"use server";

export const getProducts = async () => {
  try {
    // Manually generate dummy data
    const dummyData = [
      {
        id: "task-1",
        code: "TASK001",
        title: "Fix homepage bug",
        status: "todo",
        label: "bug",
        priority: "high",
        archived: false,
        createdAt: new Date("2023-12-01T10:00:00Z"),
        updatedAt: new Date("2023-12-02T12:00:00Z"),
      },
      {
        id: "task-2",
        code: "TASK002",
        title: "Add dark mode feature",
        status: "in-progress",
        label: "feature",
        priority: "medium",
        archived: false,
        createdAt: new Date("2023-12-03T09:30:00Z"),
        updatedAt: new Date("2023-12-04T14:15:00Z"),
      },
      {
        id: "task-3",
        code: "TASK003",
        title: "Improve documentation",
        status: "done",
        label: "documentation",
        priority: "low",
        archived: true,
        createdAt: new Date("2023-11-25T11:45:00Z"),
        updatedAt: new Date("2023-11-30T16:00:00Z"),
      },
      {
        id: "task-4",
        code: "TASK004",
        title: "Enhance login security",
        status: "canceled",
        label: "enhancement",
        priority: "medium",
        archived: false,
        createdAt: new Date("2023-12-05T08:20:00Z"),
        updatedAt: new Date("2023-12-05T10:00:00Z"),
      },
      {
        id: "task-5",
        code: "TASK005",
        title: "Fix search functionality",
        status: "todo",
        label: "bug",
        priority: "high",
        archived: false,
        createdAt: new Date("2023-12-06T07:45:00Z"),
        updatedAt: new Date("2023-12-06T09:00:00Z"),
      },
    ];

    return dummyData;
  } catch (e) {
    console.log("[ERROR] getProducts", e);
    return [];
  }
};
