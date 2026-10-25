/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import "../../styles/Custom-Models.scss";
import Typography from "@mui/material/Typography";
import SecChangesDataGridFilters from "./SecChangesDataGridFilters";
import { ISecChanges } from "../models/SecChanges";
import { useEffect, useState } from "react";
import { SecChangesServices } from "../services/SecChangesServices";

const SecChanges: React.FC = () => {
  const [rows, setRows] = useState<ISecChanges[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await SecChangesServices.getAll();
      setRows(data);
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="container">
        <Typography variant="h3">Security Changes</Typography>
        <SecChangesDataGridFilters
          rows={rows}
          setRows={setRows}
        />
      </div>
    </>
  );
};
export default SecChanges;
