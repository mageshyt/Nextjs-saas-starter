"use server";

import { ITEMS_PER_PAGE } from "@/lib/constants";
import { Product, ProductLabel, ProductPriority, ProductStatus } from "@/types";

export const getProducts = async () => {
  try {
    const baseData: Product[] = [
      {
        id: "task-1",
        code: "TASK001",
        title: "Fix homepage bug",
        status: ProductStatus.todo,
        label: ProductLabel.bug,
        priority: ProductPriority.high,
        archived: false,
        createdAt: new Date("2023-12-01T10:00:00Z"),
        updatedAt: new Date("2023-12-02T12:00:00Z"),
      },
      {
        id: "task-2",
        code: "TASK002",
        title: "Add dark mode feature",
        status: ProductStatus.inProgress,
        label: ProductLabel.feature,
        priority: ProductPriority.medium,
        archived: false,
        createdAt: new Date("2023-12-03T09:30:00Z"),
        updatedAt: new Date("2023-12-04T14:15:00Z"),
      },
      {
        id: "task-3",
        code: "TASK003",
        title: "Improve documentation",
        status: ProductStatus.done,
        label: ProductLabel.documentation,
        priority: ProductPriority.low,
        archived: true,
        createdAt: new Date("2023-11-25T11:45:00Z"),
        updatedAt: new Date("2023-11-30T16:00:00Z"),
      },
      {
        id: "task-4",
        code: "TASK004",
        title: "Refactor codebase",
        status: ProductStatus.todo,
        label: ProductLabel.enhancement,
        priority: ProductPriority.medium,
        archived: false,
        createdAt: new Date("2023-12-05T08:00:00Z"),
        updatedAt: new Date("2023-12-06T10:00:00Z"),
      },
      {
        id: "task-5",
        code: "TASK005",
        title: "Optimize performance",
        status: ProductStatus.inProgress,
        label: ProductLabel.enhancement,
        priority: ProductPriority.high,
        archived: false,
        createdAt: new Date("2023-12-07T07:30:00Z"),
        updatedAt: new Date("2023-12-08T09:45:00Z"),
      },
      {
        id: "task-6",
        code: "TASK006",
        title: "Update dependencies",
        status: ProductStatus.done,
        label: ProductLabel.feature,
        priority: ProductPriority.low,
        archived: true,
        createdAt: new Date("2023-12-09T06:15:00Z"),
        updatedAt: new Date("2023-12-10T08:30:00Z"),
      },
    ];


    return {
      totalPage: Math.ceil(baseData.length / ITEMS_PER_PAGE),
      data: baseData,
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
