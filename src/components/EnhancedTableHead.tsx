import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import * as React from "react";
import { IRowData } from "./ToDoTable";

interface HeadCell {
  disablePadding: boolean;
  id: keyof IRowData;
  label: string;
  numeric: boolean;
  width?: string;
}

const headCells: readonly HeadCell[] = [
  {
    id: "toDo",
    numeric: false,
    disablePadding: false,
    label: "Select",
  },
  {
    id: "description",
    numeric: false,
    disablePadding: false,
    label: "To Do",
  },
  {
    id: "deadline",
    numeric: false,
    disablePadding: false,
    label: "Description",
  },
  {
    id: "isDone",
    numeric: false,
    disablePadding: false,
    label: "Deadline",
  },
  {
    id: "isDone",
    numeric: false,
    disablePadding: false,
    label: "Done",
  },
];

export function EnhancedTableHead() {
  return (
    <TableHead>
      <TableRow
        style={{
          borderBottom: "1px solid rgba(224, 224, 224, 1)",
        }}
      >
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="right"
            padding={headCell.disablePadding ? "none" : "normal"}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
