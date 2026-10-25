/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useMemo, useState } from "react";
import { IActivities } from "../models/Activities";
import { usePaginationState } from "../../hooks/UsePagination";
import {
  getActivitiesColumns,
  initialFormState,
} from "../constants/ActivitiesConst";
import { ActivitiesServices } from "../services/ActivitiesServices";
import ActivitiesModal from "./ActivitiesModal";
import { GridRowCount } from "@mui/x-data-grid";
import { SelectChangeEvent } from "@mui/material";
import { CalculateDuration } from "../../utils/CalculateDuration";
import CustomDataGrid from "../../components/controls/customDataGrid/DataGrid";
import ActivitiesViewRow from "./ActivititesViewRow";
import {
  applicationTAMoptions,
  environmentOptions,
} from "../../components/controls/customFilterChips/Constans";

interface Option {
  id: number;
  name: string;
}
export interface ActivitiesDataGridProps {
  rows: IActivities[];
  setRows: (rows: IActivities[]) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  pageNumber: number;
  setPageNumber: (page: number) => void;
}
const ActivitiesDataGrid: React.FC<ActivitiesDataGridProps> = ({
  rows,
  setRows,
  pageSize,
  setPageSize,
  pageNumber,
  setPageNumber,
}) => {
  const [formState, setFormState] = useState<IActivities>(initialFormState);
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
    key: keyof IActivities,
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
    const updated = {
      ...formState,
      [name]: value,
    };
    if (name === "DateTime") {
      return setFormState(updated);
    }
    if (
      (name === "startDate" || name === "endDate") &&
      updated.startDate &&
      updated.endDate
    ) {
      updated.durationTime = CalculateDuration(
        updated.startDate,
        updated.endDate
      );
    }
    return setFormState(updated);
  };
  const Update = async () => {
    await ActivitiesServices.update(formState);
    resetPagination();
    handleClose();
    const updatedRows = await ActivitiesServices.getAll();
    setRows(updatedRows);
  };

  const onEdit = async (row: IActivities) => {
    setFormState(row);
    setIsEditMode(true);
    setOpenModal(true);
  };
  const onView = async (id: number) => {
    const data = await ActivitiesServices.getById(id);
    setFormState(data);
    setIsEditMode(false);
    setOpenViewRow(true);
  };
  const columns = useMemo(() => getActivitiesColumns(onEdit, onView), []);
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
      <ActivitiesModal
        open={openModal}
        isEditMode={isEditMode}
        handleInputChange={handleInputChange}
        handleSelectChange={handleSelectChange}
        formState={formState}
        setFormState={setFormState}
        handleClose={handleClose}
        onUpdate={Update}
      />
      <ActivitiesViewRow
        open={openViewRow}
        formState={formState}
        handleClose={handleClose}
        applicationTAMoptions={applicationTAMoptions}
        environmentOptions={environmentOptions}
      />
    </>
  );
};
export default ActivitiesDataGrid;
