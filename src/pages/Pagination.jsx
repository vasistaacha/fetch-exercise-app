import React from "react";
import { useAppContext } from "../context/AppContextInstance";
import { Button, Typography, Box } from "@mui/material";

const Pagination = () => {
  const { cursorFrom, fetchDogs } = useAppContext();

  const handlePrev = () => {
    if (cursorFrom.prev) {
      fetchDogs(cursorFrom.prev, -1);
    }
  };

  const handleNext = () => {
    if (cursorFrom.next) {
      fetchDogs(cursorFrom.next, 1);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" my={2}>
      <Typography variant="body1" gutterBottom>
        {`Total: ${cursorFrom.total}`}
      </Typography>
      <Box display="flex" alignItems="center">
        <Button
          variant="contained"
          onClick={handlePrev}
          disabled={!cursorFrom.prev}
          sx={{ margin: "0 10px" }}
        >
          &lt; Prev
        </Button>
        <Typography variant="body1">{` ${cursorFrom.currentPage} of ${Math.ceil(
          cursorFrom.total / 25
        )} `}</Typography>
        <Button
          variant="contained"
          onClick={handleNext}
          disabled={!cursorFrom.next || cursorFrom.next > cursorFrom.total}
          sx={{ margin: "0 10px" }}
        >
          Next &gt;
        </Button>
      </Box>
    </Box>
  );
};

export default Pagination;
