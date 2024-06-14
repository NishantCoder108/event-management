import { Button } from "@mui/material";
import "./App.css";

import EventForm, { IEventFormRef } from "./components/EventForm";
import AppModal from "./components/common/AppModal";
import { useRef, useState } from "react";

function App() {
    const [open, setOpen] = useState(false);
    const [resetForm, setResetForm] = useState<() => void>(() => {});
    const formRef = useRef<IEventFormRef>(null);

    // console.log({ resetForm });
    const handleModal = () => {
        setOpen(!open);
    };

    const handleSave = () => {
        if (formRef.current) {
            formRef.current.submit();
        }
    };

    const onSubmit = (data) => {
        // Handle form submission
        console.log(data);
        // console.log({ resetForm });

        //After successful submission
        resetForm();
        // setOpen(false);
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
            <Button onClick={handleModal}>Open Modal</Button>

            <AppModal
                open={open}
                onClose={() => setOpen(false)}
                title="Create Event"
                onSave={handleSave}
                saveTitle="Create"
                children={
                    <EventForm
                        key={"create_event_form"}
                        ref={formRef}
                        onSubmit={onSubmit}
                        setReset={setResetForm}
                    />
                }
            />
        </div>
    );
}

export default App;
