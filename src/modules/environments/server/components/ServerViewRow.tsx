import { Box, Grid, Typography } from "@mui/material";
import CustomModal from "../../components/controls/customModal/Modal";
import { textFields } from "../constants/ServerConst";
import { IServer } from "../models/Server";
import "../../components/controls/customModal/style/Custom-ReadonlyModal.scss";
import { applicationTAMoptions } from "../../components/controls/customFilterChips/Constans";

interface Option {
  id: number;
  name: string;
}
interface ServerViewRowProps {
  open: boolean;
  formState: IServer;
  handleClose: () => void;
  environmentOptions: Option[];
}

const ServerViewRow: React.FC<ServerViewRowProps> = ({
  open,
  formState,
  handleClose,
  environmentOptions,
}) => {
  const selectedApp =
    applicationTAMoptions.find((app) => app.id === formState.tamApplicationId)
      ?.name || "-";
  const selectedEnv =
    environmentOptions.find((app) => app.id === formState.environmentId)
      ?.name || "-";
  return (
    <>
      <CustomModal
        open={open}
        onClose={handleClose}
        title="Details"
      >
        <Box
          p={1}
          className="readonly-modal"
        >
          <Grid
            container
            spacing={5}
            marginTop={2}
          >
            <Grid>
              <Typography
                variant="subtitle2"
                fontWeight="bold"
                color="#115293"
              >
                Environment
              </Typography>
              <Typography variant="body1">{selectedEnv || "—"}</Typography>
            </Grid>
            <Grid>
              <Typography
                variant="subtitle2"
                fontWeight="bold"
                color="#115293"
              >
                Application
              </Typography>
              <Typography
                variant="body1"
                className="field-value"
              >
                {selectedApp || "—"}
              </Typography>
            </Grid>
            <Grid
              container
              spacing={5}
            >
              {textFields.map((field) => (
                <Grid
                  key={field.name}
                  className="field-group"
                >
                  <Typography
                    variant="subtitle2"
                    fontWeight="bold"
                    className="field-Label"
                    color="#115293"
                  >
                    {field.label}
                  </Typography>
                  <Typography
                    variant="body1"
                    className="field-value"
                    color="#333333"
                  >
                    {formState?.[field.name] || "—"}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Box>
      </CustomModal>
    </>
  );
};
export default ServerViewRow;
