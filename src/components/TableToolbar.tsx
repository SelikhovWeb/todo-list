import Toolbar from "@mui/material/Toolbar";
import { alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import * as React from "react";
import { Dispatch, SetStateAction } from "react";

interface EnhancedTableToolbarProps {
  selected: readonly string[];
  setSelected: Dispatch<SetStateAction<readonly string[]>>;
  items: any[];
  setItems: Dispatch<SetStateAction<any>>;
}

export function EnhancedTableToolbar({
  selected,
  setSelected,
  items,
  setItems,
}: EnhancedTableToolbarProps) {
  const numSelected = selected.length;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          To Do List
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton
            onClick={() => {
              const newItems = items.filter(
                (item) => !selected.includes(item.toDo)
              );
              setItems(newItems);
              setSelected([]);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : null}
    </Toolbar>
  );
}
