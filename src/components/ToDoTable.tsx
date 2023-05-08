import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import { Button } from "@mui/material";
import CreateItemModal from "./CreateItemModal";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { EnhancedTableToolbar } from "./TableToolbar";
import { EnhancedTableHead } from "./EnhancedTableHead";

export const LIST_STORAGE_KEY = "test-list-todos";

export interface IRowData {
  toDo: string;
  description: string;
  deadline: string;
  isDone: boolean;
}

export function createData(
  toDo: string,
  description: string,
  deadline: string,
  isDone: boolean
): IRowData {
  return {
    toDo,
    description,
    deadline,
    isDone,
  };
}

export default function ToDoTable() {
  const localStorageValue = JSON.parse(
    localStorage.getItem(LIST_STORAGE_KEY) || "[]"
  );

  const [selected, setSelected] = useState<readonly string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [items, setItems] = useState<any[]>(localStorageValue);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem(LIST_STORAGE_KEY) || "[]");
    setItems(items);
  }, []);

  useEffect(() => {
    localStorage.setItem(LIST_STORAGE_KEY, JSON.stringify(items));
  });

  const handleClickOpen = () => {
    setCreateModalOpen(true);
  };

  const handleClose = () => {
    setCreateModalOpen(false);
  };

  const handleClick = (event: any, name: string) => {
    const selectedIndex = selected.indexOf(name);

    setSelected(selectedIndex === -1 ? [name] : []);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<any>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const visibleRows = React.useMemo(
    () => items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [page, rowsPerPage, items]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        {items.length ? (
          <>
            <EnhancedTableToolbar
              selected={selected}
              setSelected={setSelected}
              items={items}
              setItems={setItems}
            />
            <TableContainer>
              <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                <EnhancedTableHead />
                <TableBody>
                  {visibleRows.map((row: any, index: number) => {
                    const isItemSelected = isSelected(row.toDo);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.toDo}
                        selected={isItemSelected}
                        sx={{ cursor: "pointer" }}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            onChange={(event) => {
                              if (event.target.checked) {
                                handleClick(event, row.toDo);
                              } else {
                                setSelected([]);
                              }
                            }}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        </TableCell>
                        <TableCell align="right">{row.toDo}</TableCell>
                        <TableCell align="right">
                          {row.description || "--"}
                        </TableCell>
                        <TableCell align="right">
                          {row.deadline
                            ? format(row.deadline.$d, "yyyy-MM-dd")
                            : "--"}
                        </TableCell>
                        <TableCell align="right">
                          <Checkbox
                            color="primary"
                            checked={row.isDone}
                            onChange={(e) => {
                              const newItems = items.map((item: any) => {
                                if (item.toDo === row.toDo) {
                                  item.isDone = !item.isDone;
                                }
                                return item;
                              });
                              setItems(newItems);
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={items.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        ) : (
          <Typography sx={{ p: 2 }}>No items yet</Typography>
        )}
      </Paper>
      <div>
        <Button onClick={handleClickOpen} variant="contained">
          Add Item
        </Button>
      </div>
      <CreateItemModal
        handleClose={handleClose}
        open={createModalOpen}
        modalTitle="Create new item"
        setItems={setItems}
      />
    </Box>
  );
}
