import { Typography } from "@mui/material";
import "./App.css";

import EventPage from "./components/EventPage";

function App() {
    return (
        <div>
            <Typography>Event Details Page</Typography>

            <EventPage />
        </div>
    );
}

export default App;
