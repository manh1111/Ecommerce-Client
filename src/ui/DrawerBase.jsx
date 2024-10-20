// components
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

// utils
import PropTypes from "prop-types";

const DrawerBase = ({
  open,
  onOpen,
  onClose,
  anchor = "left",
  width = "650px",
  children,
}) => {
  return (
    <SwipeableDrawer
      anchor={anchor}
      open={open}
      onOpen={onOpen}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          boxShadow: "var(--shadow)",
          background: "var(--widget)",
          color: "var(--text)",
          height: "var(--app-height)",
          minHeight: "-webkit-fill-available",
          width: width, // Thiết lập chiều rộng trực tiếp
        },
      }}
    >
      {children}
    </SwipeableDrawer>
  );
};

DrawerBase.propTypes = {
  open: PropTypes.bool.isRequired,
  onOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  anchor: PropTypes.oneOf(["left", "right", "top", "bottom"]),
  width: PropTypes.string, // Thêm width vào propTypes
  children: PropTypes.node.isRequired,
};

export default DrawerBase;
