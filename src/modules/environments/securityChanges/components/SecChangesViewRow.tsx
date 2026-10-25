import { Box, Grid, Typography } from "@mui/material";
import CustomModal from "../../components/controls/customModal/Modal";
import {
  securityChangesActionsOptions,
  textFields,
} from "../constants/SecChangesConst";
import { ISecChanges } from "../models/SecChanges";
import "../../components/controls/customModal/style/Custom-ReadonlyModal.scss";

interface Option {
  id: number;
  name: string;
}
interface SecChangesViewRowProps {
  open: boolean;
  formState: ISecChanges;
  handleClose: () => void;
  applicationTAMoptions: Option[];
}

const SecChangesViewRow: React.FC<SecChangesViewRowProps> = ({
  open,
  formState,
  handleClose,
  applicationTAMoptions,
}) => {
  const selectedApp =
    applicationTAMoptions.find((app) => app.id === formState.tamApplicationId)
      ?.name || "-";
  const selectedAction =
    securityChangesActionsOptions.find(
      (app) => app.id === formState.tamApplicationId
    )?.name || "-";
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
                Application
              </Typography>
              <Typography variant="body1">{selectedApp || "—"}</Typography>
            </Grid>
            <Grid>
              <Typography
                variant="subtitle2"
                fontWeight="bold"
                color="#115293"
              >
                Action
              </Typography>
              <Typography variant="body1">{selectedAction || "—"}</Typography>
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
export default SecChangesViewRow;
