import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Loading = () => {
  return (
    <Box className=" flex justify-center items-center mt-72">
      <CircularProgress size={200} color="secondary" />
    </Box>
  );
};

export default Loading;
