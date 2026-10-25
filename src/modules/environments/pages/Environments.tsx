import { Outlet } from "react-router-dom";
import DataTab from "../components/controls/customTab/Tab";

export function Environments() {
  return (
    <>
      <DataTab></DataTab>
      <Outlet />
    </>
  );
}
export default Environments;
