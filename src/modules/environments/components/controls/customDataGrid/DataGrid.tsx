/* eslint-disable @typescript-eslint/no-explicit-any */
import { SxProps, Theme } from "@mui/material";
import "./style/DataGrid.scss";
import {
  DataGrid,
  gridClasses,
  GridColDef,
  GridColumnGroupingModel,
  GridRowClassNameParams,
  GridRowIdGetter,
  GridValidRowModel,
} from "@mui/x-data-grid";
import { DGNoRowsLabel } from "./Index";

export interface CustomeDataGridProps {
  columns: GridColDef[];
  rows: GridValidRowModel[];
  paginationMode?: "client" | "server";
  pagination?: boolean;
  pageSize?: number;
  setPageSize?: (size: number) => void;
  pageNumber?: number;
  setPageNumber?: (page: number) => void;
  rowCount?: number;
  columnGroup?: GridColumnGroupingModel;
  columnGrouping?: boolean;
  gridTitle?: string;
  rowClass?: (params: GridRowClassNameParams) => string;
  pageSizeOptions?: number[];
  getRowId?: GridRowIdGetter<GridValidRowModel>;
  onPageChange?: (page: number) => void;
  hideFooter?: boolean;
  sx?: SxProps<Theme>;
  customStyling?: "custom-table-tb" | "custom-table-ts"|"custom-table-tsc";
}

const CustomDataGrid = (props: CustomeDataGridProps) => {
  return (
    <>
      <div
        className={
          props.customStyling ? props.customStyling : "custom-table-tb"
        }
      >
        <div style={{ width: 1516 }}>
          <DataGrid
            columns={props.columns}
            rows={props.rows}
            getRowId={props.getRowId ? props.getRowId : (row) => row.id}
            getRowHeight={() => "auto"}
            paginationModel={{
              page: props.pageNumber ?? 0,
              pageSize: props.pageSize ?? 100,
            }}
            onPaginationModelChange={(model) => {
              props.setPageNumber?.(model.page);
              props.setPageSize?.(model.pageSize);
            }}
            pageSizeOptions={props.pageSizeOptions ?? [10, 25, 50, 75, 100]}
            rowCount={props.rowCount}
            pagination={props.pagination ? props.pagination : true}
            hideFooterPagination={
              props.pagination != null && props.pagination != undefined
                ? !props.pagination
                : false
            }
            paginationMode={
              props.paginationMode == "server" ? "server" : "client"
            }
            getRowSpacing={(params) => ({
              top: params.isFirstVisible ? 0 : 0,
              bottom: params.isLastVisible ? 0 : 0,
            })}
            localeText={{
              noRowsLabel: DGNoRowsLabel,
              noResultsOverlayLabel: DGNoRowsLabel,
            }}
            getRowClassName={props.rowClass}
            sx={{
              [`& .${gridClasses.row}`]: {},
            }}
            columnGroupingModel={props.columnGroup}
            disableColumnMenu={true}
            hideFooter={props.hideFooter ?? false}
          />
        </div>
      </div>
    </>
  );
};
export default CustomDataGrid;
