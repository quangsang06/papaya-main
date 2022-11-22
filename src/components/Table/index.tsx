import { Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import { PermissionActionBase } from "config/constants";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";

export type DataTable = { [k: string]: boolean | number | string | undefined };

export type PermissionAction =
  | PermissionActionBase.EDIT
  | PermissionActionBase.DELETE;

export type IColumn<T> = {
  key?: keyof T;
  label: string;
  cell?: (value: T, index: number) => React.ReactNode;
  width?: string | number;
};

type TableProps<T> = {
  data?: Array<T>;
  columns: Array<IColumn<T>>;
  loading?: boolean;
  disabled?: boolean;
  action?: PermissionAction | PermissionAction[];
  onClickEdit?: (row: T) => void;
  onClickDelete?: (row: T) => void;
};

const CustomTable = <T,>({
  data = [],
  columns,
  loading,
  action,
  disabled,
  onClickEdit,
  onClickDelete,
}: TableProps<T>): JSX.Element => {
  return (
    <>
      <Box
        style={{
          display: "flex",
          padding: "1em",
        }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {columns &&
                  columns.map((item, index) => (
                    <TableCell
                      // eslint-disable-next-line react/no-array-index-key
                      key={index.toString()}
                      style={{ whiteSpace: "nowrap", width: `${item.width}px` }}
                      align="center"
                    >
                      {item.label}
                    </TableCell>
                  ))}
                {action ? (
                  <TableCell align="center" width={200}>
                    Actions
                  </TableCell>
                ) : (
                  ""
                )}
              </TableRow>
            </TableHead>
            {loading ? (
              <TableBody>
                <TableRow>
                  <TableCell align="center" colSpan={columns.length}>
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
              <TableBody>
                {data.length ? (
                  data.map((row, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <TableRow hover key={index.toString()}>
                      {columns.map((col, colIndex) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <TableCell
                          key={`${index}-${colIndex}`}
                          align="center"
                          width={200}
                        >
                          {col.key && col.cell ? (
                            col.cell(row, index)
                          ) : (
                            <span>
                              {col.key
                                ? (row[col.key] as unknown as string)
                                : ""}
                            </span>
                          )}
                        </TableCell>
                      ))}
                      {action && (
                        <TableCell align="center">
                          <div>
                            {action.includes(PermissionActionBase.EDIT) && (
                              <IconButton
                                sx={{
                                  color: "blue",
                                }}
                                disabled={disabled}
                                color="inherit"
                                size="small"
                                onClick={() =>
                                  onClickEdit && onClickEdit?.(row)
                                }
                              >
                                <EditTwoToneIcon fontSize="small" />
                              </IconButton>
                            )}
                            {action.includes(PermissionActionBase.DELETE) && (
                              <IconButton
                                sx={{
                                  color: "red",
                                }}
                                onClick={() =>
                                  onClickDelete && onClickDelete?.(row)
                                }
                                color="inherit"
                                size="small"
                              >
                                <DeleteTwoToneIcon fontSize="small" />
                              </IconButton>
                            )}
                          </div>
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      align="center"
                      colSpan={columns.length}
                      width={200}
                    >
                      <Typography component="h1">No data to display</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default CustomTable;
