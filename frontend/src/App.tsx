import { Box, Container, Typography } from "@mui/material";
import "./App.css";

import EventPage from "./components/EventPage";

function App() {
    return (
        <Box sx={{ padding: "1rem" }}>
            <Typography>Event Management</Typography>

            <EventPage />
        </Box>
    );
}

export default App;
