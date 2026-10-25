/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import Typography from "@mui/material/Typography";
import "../../styles/Custom-Models.scss";
import { IActivities } from "../models/Activities";
import { useEffect, useState } from "react";
import ActivitiesDataGridFilters from "./ActivitiesDataGridFilters";
import { ActivitiesServices } from "../services/ActivitiesServices";

const Activities: React.FC = () => {
  const [rows, setRows] = useState<IActivities[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await ActivitiesServices.getAll();
      setRows(data);
      console.log(data);
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="container">
        <Typography variant="h3">Activities</Typography>
        <ActivitiesDataGridFilters
          rows={rows}
          setRows={setRows}
        />
      </div>
    </>
  );
};
export default Activities;
