import { Button } from "@mui/material";
import "./App.css";

import EventForm from "./components/EventForm";
import AppModal from "./components/common/AppModal";
import { useRef, useState } from "react";

function App() {
    const [open, setOpen] = useState(false);
    const formRef = useRef(null);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        if (formRef.current) {
            formRef.current.submit();
        }
    };

    const onSubmit = (data) => {
        // Handle form submission
        console.log(data);
        setOpen(false);
    };

    // const onSubmit = (data: any) => {
    //     const date = data.datetime.valueOf();
    //     // const time = data.time.valueOf();
    //     console.log(data);
    //     console.log(date, "     ");

    //     // setValue("eventName", "");
    // };
    return (
        <div>
            <h1>Create Event</h1>
            <Button onClick={handleOpen}>Open Modal</Button>

            <AppModal
                open={open}
                onClose={handleClose}
                title="Create Event"
                onSave={handleSave}
                children={<EventForm ref={formRef} onSubmit={onSubmit} />}
            />
        </div>
    );
}

export default App;
