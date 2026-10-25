import {
  Icon,
  IconButton,
  lighten,
  ListItem,
  ListItemButton,
  styled,
  Typography,
  Drawer as MuiDrawer,
  Theme,
  CSSObject,
} from "@mui/material";
import { ComponentType } from "react";
import { NavLink } from "react-router-dom";

const drawerWidth = 340;

export const LogoWrapper = styled("div")`
  text-align: center;
  margin-top: 6rem;
`;

export const StyledLogo = styled("img")`
  height: 40vmin;
  pointer-events: none;
  @media (prefers-reduced-motion: no-preference) {
    animation: App-logo-spin infinite 15s linear;
  }
  @keyframes App-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export const AppBarLogo = styled("img")(() => ({
  height: 50,
}));

export const SidebarListItem = styled(ListItem)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

export const FooterWrapper = styled("div")(
  ({ theme }) => `
    flex: 1;
    display: flex;
    justify-content: center;
    background: ${theme.palette.background.paper};
    minHeight: ${"30px"};
`
);

export const FooterText = styled(Typography)`
  word-spacing: 0.1rem;
  text-transform: uppercase;
`;

export const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: inherit;
`;

export const StyledListItemButton = styled(ListItemButton)<{
  isEnabled: boolean;
}>(({ theme, isEnabled }) =>
  !isEnabled
    ? { "*": { cursor: "not-allowed", color: theme.palette.text.secondary } }
    : {}
);

export const StyledIconButton = styled(IconButton)<{ isSelected: boolean }>(
  ({ isSelected, theme }) => ({
    boxShadow: isSelected
      ? `0 0 0 2px ${lighten(theme.palette.primary.main, 0.6)}`
      : "default",
    transition: "box-shadow 0.1s",
  })
);

export const StyledIcon = styled(Icon)<{
  isSelected: boolean;
  component: ComponentType;
}>`
  ${({ isSelected, theme }) =>
    isSelected && `color: ${theme.palette.primary.main};`}
`;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});
export const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

// export const DrawerHeader = styled('div')(({ theme }) => ({
//   ...theme.mixins.toolbar,
// }));

export const LayoutWrapper = styled("div")`
  min-height: 100vh;
`;

export const ContentWrapper = styled("div")`
  display: flex;
  min-height: calc(100vh - ${30}px);
`;

export const DrawerHeader = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));
