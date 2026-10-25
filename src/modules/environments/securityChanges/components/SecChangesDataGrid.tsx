/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useMemo, useState } from "react";
import { ISecChanges } from "../models/SecChanges";
import {
  getSecChangesColumns,
  initialFormState,
} from "../constants/SecChangesConst";
import { usePaginationState } from "../../hooks/UsePagination";
import CustomDataGrid from "../../components/controls/customDataGrid/DataGrid";
import { GridRowCount } from "@mui/x-data-grid";
import SecChangesModal from "./SecChangesModal";
import { SecChangesServices } from "../services/SecChangesServices";
import { SelectChangeEvent } from "@mui/material";
import SecChangesViewRow from "./SecChangesViewRow";
import { applicationTAMoptions } from "../../components/controls/customFilterChips/Constans";

interface Option {
  id: number;
  name: string;
}

export interface SecChangesDataGridProps {
  rows: ISecChanges[];
  setRows: (rows: ISecChanges[]) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  pageNumber: number;
  setPageNumber: (page: number) => void;
}
const SecChangesDataGrid: React.FC<SecChangesDataGridProps> = ({
  rows,
  setRows,
  pageSize,
  setPageSize,
  pageNumber,
  setPageNumber,
}) => {
  const [formState, setFormState] = useState<ISecChanges>(initialFormState);
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
    key: keyof ISecChanges,
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
    await SecChangesServices.update(formState);
    resetPagination();
    handleClose();
    const updatedRows = await SecChangesServices.getAll();
    setRows(updatedRows);
  };

  const onEdit = async (row: ISecChanges) => {
    setFormState(row);
    setIsEditMode(true);
    setOpenModal(true);
  };
  const onView = async (id: number) => {
    const data = await SecChangesServices.getById(id);
    setFormState(data);
    setIsEditMode(false);
    setOpenViewRow(true);
  };
  const columns = useMemo(() => getSecChangesColumns(onEdit, onView), []);
  
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
      <SecChangesModal
        open={openModal}
        isEditMode={isEditMode}
        handleInputChange={handleInputChange}
        handleSelectChange={handleSelectChange}
        formState={formState}
        setFormState={setFormState}
        handleClose={handleClose}
        onUpdate={Update}
      />
      <SecChangesViewRow
        open={openViewRow}
        formState={formState}
        handleClose={handleClose}
        applicationTAMoptions={applicationTAMoptions}
      />
    </>
  );
};
export default SecChangesDataGrid;
