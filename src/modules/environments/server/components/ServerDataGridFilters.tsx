/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { usePaginationState } from "../../hooks/UsePagination";
import { IServer } from "../models/Server";
import {
  applicationTAMabbreviations,
  applicationTAMcolors,
  applicationTAMoptions,
  environmentAbbreviations,
  environmentColors,
  environmentOptions,
} from "../../components/controls/customFilterChips/Constans";
import FiltersChips from "../../components/controls/customFilterChips/FilterChips";
import ServerDataGrid from "./ServerDataGrid";
import { initialFormState } from "../constants/ServerConst";
import { Button, SelectChangeEvent, TextField } from "@mui/material";
import { ServerServices } from "../services/ServerServices";
import { CSVLink } from "react-csv";
import ServerModal from "./ServerModal";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { toast } from "react-toastify";
interface ServerDataGridFiltersProps {
  rows: IServer[];
  setRows: (rows: IServer[]) => void;
}
interface Option {
  id: number;
  name: string;
}

const ServerDataGridFilters: React.FC<ServerDataGridFiltersProps> = ({
  rows,
  setRows,
}) => {
  const [selectedEnv, setSelectedEnv] = useState<string | null>(null);
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [formState, setFormState] = useState<IServer>(initialFormState);
  const [search, setSearch] = useState("");
  const { pageSize, setPageSize, pageNumber, setPageNumber, resetPagination } =
    usePaginationState(10, 0);
  const filteredRows = rows.filter((row) => {
    const filteredEnv = selectedEnv
      ? row.environmentName === selectedEnv
      : true;
    const filteredApp = selectedApp
      ? row.tamApplicationName === selectedApp
      : true;
    const filteredDescription = search
      ? row.descriptions.toLowerCase().includes(search.toLowerCase()) ||
        row.serverName.toLowerCase().includes(search.toLowerCase())
      : true;
    return filteredApp && filteredEnv && filteredDescription;
  });
  function handleOpenAdd(event: React.MouseEvent<HTMLButtonElement>): void {
    setIsEditMode(false);
    setFormState(initialFormState);
    setOpenModal(true);
    console.log(event);
  }
  function handleClose(): void {
    setIsEditMode(false);
    setOpenModal(false);
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const updated = {
      ...formState,
      [name]: value,
    };
    return setFormState(updated);
  };
  const Add = async () => {
    await ServerServices.add(formState);
    const updatedData = await ServerServices.getAll();
    setRows(updatedData);
    resetPagination();
    handleClose();
  };
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("TAM Tables Completed", 20, 10);
    autoTable(doc, {
      head: [
        [
          "Environment",
          "Application",
          "Server",
          "Descriptions",
          "IP Address",
          "DB Instance Domain IP",
          "DB / Citrix",
          "Citrix Server",
          "Type Server",
          "OS Or SQL",
          "Platforms",
          "RAM GB",
          "Processors",
          "Storage",
          "Placer Services",
          "Integration",
          "Path to DB Backup",
        ],
      ],
      body: rows.map((row) => [
        row.environmentName,
        row.tamApplicationName,
        row.serverName,
        row.descriptions,
        row.ipAddress,
        row.dbInstanceDomainIP,
        row.dbNameOrCitrixname,
        row.citrixServer,
        row.locations,
        row.typeServer,
        row.model,
        row.osOrSQL,
        row.platforms,
        row.ramgb,
        row.processors,
        row.storage,
        row.placerServices,
        row.integration,
        row.pathtoDBbackup,
      ]),
      styles: {
        fontSize: 4,
        cellPadding: 1,
      },
      headStyles: {
        fontSize: 6,
      },
    });
    doc.save("ServersTableCompleted.pdf");
    toast.info("Successfully exported in PDF format");
  };
  const downloadCSV = () => {
    toast.info("Successfully exported in CSV format");
  };
  const EmptyFilters = () => {
    setSelectedEnv(null);
    setSelectedApp(null);
    setSearch("");
  };

  const exportData = rows.map((row) => ({
    Environment: row.environmentName,
    Application: row.tamApplicationName,
    Server: row.serverName,
    Descriptions: row.descriptions,
    IPAddress: row.ipAddress,
    DBInstanceDomainIP: row.dbInstanceDomainIP,
    DBCitrix: row.dbNameOrCitrixname,
    CitrixServer: row.citrixServer,
    Locations: row.locations,
    TypeServer: row.typeServer,
    Model: row.model,
    OSOrSQL: row.osOrSQL,
    Platforms: row.platforms,
    RAMGB: row.ramgb,
    Processors: row.processors,
    Storage: row.storage,
    PlacerServices: row.placerServices,
    Integration: row.integration,
    PathtoDBBackup: row.pathtoDBbackup,
  }));
  return (
    <>
      <FiltersChips
        items={applicationTAMoptions.map((opt) => opt.name)}
        selectedItem={selectedApp}
        onSelect={(app) => setSelectedApp(app)}
        onClear={EmptyFilters}
        colors={applicationTAMcolors}
        abbreviations={applicationTAMabbreviations}
      />
      <FiltersChips
        items={environmentOptions.map((opt) => opt.name)}
        selectedItem={selectedEnv}
        onSelect={(env) => setSelectedEnv(env)}
        onClear={() => setSelectedEnv(null)}
        colors={environmentColors}
        abbreviations={environmentAbbreviations}
      />
      <div className="custom-filters-datagrid">
        <div className="filters-container">
          <TextField
            label="Search Filter"
            variant="outlined"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="buttons-container">
            {(selectedEnv || selectedApp || search) && (
              <Button
                className="clear-filters-button"
                variant="outlined"
                size="small"
                onClick={EmptyFilters}
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>
        <div className="buttons-container">
          <Button
            className="add-button"
            onClick={handleOpenAdd}
          >
            Add
          </Button>
          <CSVLink
            className="export-csv-button"
            data={exportData}
            filename={"TableCompleted.csv"}
            onClick={downloadCSV}
          >
            Export to CSV
          </CSVLink>
          <Button
            className="export-pdf-button"
            onClick={downloadPDF}
          >
            Export to PDF
          </Button>
        </div>
      </div>
      <ServerModal
        open={openModal}
        isEditMode={isEditMode}
        handleInputChange={handleInputChange}
        handleSelectChange={handleSelectChange}
        formState={formState}
        setFormState={setFormState}
        handleClose={handleClose}
        onAdd={Add}
      />
      <ServerDataGrid
        rows={filteredRows}
        setRows={setRows}
        pageSize={pageSize}
        setPageSize={setPageSize}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
      />
    </>
  );
};
export default ServerDataGridFilters;
