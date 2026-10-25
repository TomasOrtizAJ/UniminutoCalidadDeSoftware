import { Box, Grid, Stack, Typography } from "@mui/material";
import { IActivities } from "../models/Activities";
import CustomModal from "../../components/controls/customModal/Modal";
import { checkboxes, textFields } from "../constants/ActivitiesConst";
import "../../components/controls/customModal/style/Custom-ReadonlyModal.scss";
interface Option {
  id: number;
  name: string;
}
interface ActivitiesViewRowProps {
  open: boolean;
  formState: IActivities;
  handleClose: () => void;
  applicationTAMoptions: Option[];
  environmentOptions: Option[];
}

const ActivitiesViewRow: React.FC<ActivitiesViewRowProps> = ({
  open,
  formState,
  handleClose,
  applicationTAMoptions,
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
          p={2}
          className="readonly-modal"
        >
          <Grid
            container
            spacing={8}
          >
            {/* Application */}
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
            <Grid>
              <Typography
                variant="subtitle2"
                fontWeight="bold"
                color="#115293"
              >
                Environment
              </Typography>
              <Typography
                variant="body1"
                className="field-value"
              >
                {selectedEnv || "—"}
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={5}
            marginTop={2}
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
                >
                  {formState?.[field.name] || "—"}
                </Typography>
              </Grid>
            ))}
            <Stack
              spacing={5}
              marginTop={2}
            >
              {checkboxes.map((cb) => (
                <Box
                  key={cb.name}
                  className="checkbox-group"
                >
                  <div className="checkbox-item">
                    <Typography
                      variant="subtitle2"
                      fontWeight="bold"
                      className="field-Label"
                      color="#115293"
                    >
                      {cb.label}
                    </Typography>
                    <Typography
                      variant="body1"
                      className="field-value"
                      color="#333333"
                    >
                      {formState?.[cb.name] ? "Yes" : "No"}
                    </Typography>
                  </div>
                </Box>
              ))}
            </Stack>
          </Grid>
        </Box>
      </CustomModal>
    </>
  );
};
export default ActivitiesViewRow;
