/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

export const DGNoRowsLabel =
  "There is no any result matched to your search criteria";
export const generalColumns = (
  field: string,
  headerName: string
): GridColDef => ({
  field,
  headerName,
  type: "string",
  width: 150,
  editable: false,
  flex: 1,
});
export const coloredColumns = (
  field: string,
  headerName: string,
  colorMap: Record<string, string>
): GridColDef => ({
  field,
  headerName,
  type: "string",
  width: 150,
  editable: false,
  flex: 1,
  renderCell: (params) => {
    const color = colorMap[params.value] || "#9e9e9e";
    return (
      <div
        style={{
          borderLeft: `8px solid ${color}`,
          paddingLeft: 8,
          height: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        {params.value}
      </div>
    );
  },
});

export const actionsColumn = (
  onEdit: (row: any) => void,
  onView: (row: any) => void
): GridColDef => ({
  field: "options",
  headerName: "Actions",
  flex: 1,
  renderCell: (params) => (
    <div className="action-buttons">
      <Button
        variant="outlined"
        fullWidth
        color="primary"
        onClick={() => onEdit(params.row)}
      >
        Edit
      </Button>
      <Button
        variant="outlined"
        fullWidth
        color="primary"
        onClick={() => onView(params.row.id)}
      >
        View
      </Button>
    </div>
  ),
});
