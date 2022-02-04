import { Skeleton } from "@mui/material";
import { styled } from "@mui/material/styles";

export const LoadingContent = styled(Skeleton)(({ theme }) => ({
  minWidth: "280px",
  height: "350px",
  [theme.breakpoints.down("md")]: {
    maxWidth: "224px",
    minWidth: "224px",
    height: "300px",
  },
  [theme.breakpoints.down("sm")]: {
    maxWidth: "165.2px",
    minWidth: "165.2px",
    height: "250px",
  },
}));
