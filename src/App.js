import React from "react";
import { Container, Typography } from "@mui/material";
import MicrobreweriesTable from "./MicrobreweriesTable";

function App() {
  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Microbreweries in the US 🍻
      </Typography>
      <MicrobreweriesTable />
    </Container>
  );
}

export default App;
