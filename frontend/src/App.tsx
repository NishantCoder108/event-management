import { Box, Typography } from "@mui/material";
import "./App.css";

import EventPage from "./components/EventPage";

function App() {
    return (
        <Box sx={{ padding: "1rem" }}>
            <Typography variant="h5" component={"h6"}>
                Event Management
            </Typography>

            <EventPage />
        </Box>
    );
}

export default App;
