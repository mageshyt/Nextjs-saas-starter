"use client"
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Product, ProductStatus } from "@/types";
import { ColumnDef } from "@tanstack/react-table"


export const columns: ColumnDef<Product>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="ml-2"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "code",
    header: "Code",
    cell: ({ row }) => <div>{row.original.code}</div>,
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => <div>{row.original.title}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status as ProductStatus
      return <Badge variant={status}>{status}</Badge>
    }
  },
  {
    accessorKey: "label",
    header: "Label",
    cell: ({ row }) => <div>{row.original.label}</div>,
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => <div>{row.original.priority}</div>,
  },
  {
    accessorKey: "archived",
    header: "Archived",
    cell: ({ row }) => <div>{row.original.archived ? "Yes" : "No"}</div>,
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => <div>{row.original.createdAt.toISOString()}</div>,
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ row }) => <div>{row.original.updatedAt.toISOString()}</div>,
  }

]
