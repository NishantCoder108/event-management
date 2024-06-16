import { Button } from "@mui/material";

import { useRef, useState } from "react";
import AppModal from "./common/AppModal";
import EventForm from "./EventForm";
import { IEventFormRef, IFormValues } from "../interfaces/IEventForm";
import axios from "axios";
import EventTable from "./EventTable";

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
            console.log(data);
            const formData = new FormData();

            // Convert datetime to milliseconds
            const datetimeInMillis = data.datetime.valueOf();
            const guestsArray = data.guests
                .split(",")
                .map((email) => email.trim());

            // // Prepare the data object for submission
            // const eventData = {
            //     datetime: datetimeInMillis,
            //     duration: data.duration.value,
            //     eventName: data.eventName,
            //     agenda: data.agenda,
            //     location: data.location,
            //     guests: guestsArray,
            //     notification: data.notification,
            //     reminder: data.reminder,
            //     attachment: data.attachment,
            // };

            formData.append("datetime", JSON.stringify(datetimeInMillis));
            formData.append("duration", JSON.stringify(data.duration.value));
            formData.append("eventName", data.eventName);
            formData.append("agenda", data.agenda || "");
            formData.append("location", data.location);
            formData.append("notification", data.notification);
            formData.append("reminder", JSON.stringify(data.reminder));
            formData.append("attachment", data.attachment || "");
            guestsArray.forEach((guest, index) => {
                formData.append(`guests[${index}]`, guest);
            });

            const response = await axios.post(
                "http://localhost:3000/api/events",
                formData
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

            <EventTable />
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
