import { Button, Typography } from "@mui/material";

import { useRef, useState } from "react";
import AppModal from "./common/AppModal";
import EventForm from "./EventForm";
import { IEventFormRef, IFormValues } from "../interfaces/IEventForm";
import axios from "axios";

function EventPage() {
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

    const onSubmit = async (data: IFormValues) => {
        try {
            // Handle form submission
            console.log(data);
            // Convert datetime to milliseconds
            const datetimeInMillis = data.datetime.valueOf();

            // Convert guests string to array
            const guestsArray = data.guests
                .split(",")
                .map((email) => email.trim());

            // Prepare the data object for submission
            const eventData = {
                datetime: datetimeInMillis,
                duration: data.duration.value,
                eventName: data.eventName,
                agenda: data.agenda,
                location: data.location,
                guests: guestsArray,
                notification: data.notification,
                reminder: data.reminder,
                attachment: data.attachment,
            };

            console.log({ eventData });

            const response = await axios.post(
                "https://backend-api.com/events",
                eventData
            );
            console.log("Post request successful:", response.data);
            //After successful submission
            // resetForm();
            // setOpen(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Typography>Event Details Page</Typography>
            <Button onClick={handleModal}>Create Event</Button>

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

export default EventPage;

// const l = {
//     datetime: "2024-06-14T20:07:34.062Z",
//     duration: {
//         label: "30min",
//         value: 1800,
//     },
//     eventName: "ssss",
//     agenda: "sss",
//     location: "ssss",
//     guests: "www@gmail.com,kdfjc@gmail.com",
//     notification: "email",
//     reminder: 30,
//     attachment: {},
// };
