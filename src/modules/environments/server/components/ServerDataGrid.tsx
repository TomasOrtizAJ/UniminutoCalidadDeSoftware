/* eslint-disable @typescript-eslint/no-explicit-any */
import { GridRowCount } from "@mui/x-data-grid";
import CustomDataGrid from "../../components/controls/customDataGrid/DataGrid";
import { ChangeEvent, useMemo, useState } from "react";
import { ServerServices } from "../services/ServerServices";
import { IServer } from "../models/Server";
import { getServerColumns, initialFormState } from "../constants/ServerConst";
import { usePaginationState } from "../../hooks/UsePagination";
import { SelectChangeEvent } from "@mui/material";
import ServerModal from "./ServerModal";
import ServerViewRow from "./ServerViewRow";
import { environmentOptions } from "../../components/controls/customFilterChips/Constans";
interface Option {
  id: number;
  name: string;
}

export interface ServerDataGridProps {
  rows: IServer[];
  setRows: (rows: IServer[]) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  pageNumber: number;
  setPageNumber: (page: number) => void;
}

const ServerDataGrid: React.FC<ServerDataGridProps> = ({
  rows,
  setRows,
  pageSize,
  setPageSize,
  pageNumber,
  setPageNumber,
}) => {
  const [formState, setFormState] = useState<IServer>(initialFormState);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openViewRow, setOpenViewRow] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const { resetPagination } = usePaginationState(10, 0);
  function handleClose(): void {
    setIsEditMode(false);
    setOpenModal(false);
    setOpenViewRow(false);
  }
  const handleSelectChange = (
    e: SelectChangeEvent,
    key: keyof IServer,
    options: Option[]
  ) => {
    const selectedId = parseInt(e.target.value);
    const selectedOption = options.find((opt) => opt.id === selectedId);

    if (selectedOption) {
      setFormState((prev) => ({
        ...prev,
        [key]: selectedOption.id as any,
      }));
    }
  };
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const Update = async () => {
    await ServerServices.update(formState);
    resetPagination();
    handleClose();
    const updatedRows = await ServerServices.getAll();
    setRows(updatedRows);
  };

  const OnEdit = async (row: IServer) => {
    setFormState(row);
    setIsEditMode(true);
    setOpenModal(true);
  };
  const onView = async (id: number) => {
    const data = await ServerServices.getById(id);
    setFormState(data);
    setIsEditMode(false);
    setOpenViewRow(true);
  };

  const columns = useMemo(() => getServerColumns(OnEdit, onView), []);
  return (
    <>
      <div className="custom-table">
        <CustomDataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row.id}
          pageSize={pageSize}
          setPageSize={setPageSize}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          paginationMode="client"
          pagination={true}
          rowCount={GridRowCount.length}
          gridTitle="Server Table"
          rowClass={(params) =>
            params.row.status === "Inactive" ? "row-inactive" : ""
          }
          pageSizeOptions={[5, 10, 25, 50, 75, 100]}
          hideFooter={false}
          customStyling="custom-table-ts"
        />
      </div>
      <ServerModal
        open={openModal}
        isEditMode={isEditMode}
        handleInputChange={handleInputChange}
        handleSelectChange={handleSelectChange}
        formState={formState}
        setFormState={setFormState}
        handleClose={handleClose}
        onUpdate={Update}
      />
      <ServerViewRow
        open={openViewRow}
        formState={formState}
        handleClose={handleClose}
        environmentOptions={environmentOptions}
      />
    </>
  );
};
export default ServerDataGrid;
