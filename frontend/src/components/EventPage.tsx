import { Box, Button } from "@mui/material";

import { useRef, useState } from "react";
import AppModal from "./common/AppModal";
import EventForm from "./EventForm";
import { IEventFormRef, IFormValues } from "../interfaces/IEventForm";
import { AxiosError } from "axios";
import EventTable from "./EventTable";
import { Bounce, toast } from "react-toastify";
import axiosInstance from "../api/axiosInstance";

const EventPage = () => {
    const [open, setOpen] = useState(false);
    const [refreshData, setRefreshData] = useState(false);
    const [resetForm, setResetForm] = useState<() => void>(() => {});
    const [isLoading, setIsLoading] = useState(false);
    const formRef = useRef<IEventFormRef>(null);

    const handleModal = () => {
        setOpen(!open);
    };

    const handleSave = () => {
        if (formRef.current) {
            formRef.current.submit();
        }
    };

    const onSubmit = async (data: IFormValues) => {
        setIsLoading(true);
        try {
            console.log(data);

            const formData = new FormData();
            const datetimeInMillis = data.datetime.valueOf();
            const guestsArray = data.guests
                .split(",")
                .map((email) => email.trim());

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

            const response = await axiosInstance.post("/events", formData);
            console.log("Post request successful:", response.data);

            if (response && response.data) {
                toast.success(
                    <Box sx={{ fontSize: "small" }}>
                        {response.data.message}
                    </Box>,
                    {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    }
                );
                resetForm();
                setOpen(false);
                setIsLoading(false);
            }
            setRefreshData(!refreshData);
        } catch (error) {
            console.log(error);
            const err = error as AxiosError;

            toast.error(<Box sx={{ fontSize: "small" }}> {err.message} </Box>, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            setIsLoading(false);
        }
    };

    return (
        <div>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button onClick={handleModal}>Create Event</Button>

                <AppModal
                    open={open}
                    onClose={() => setOpen(false)}
                    title="Create Event"
                    onSave={handleSave}
                    isLoading={isLoading}
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
            </Box>

            <EventTable refreshData={refreshData} />
        </div>
    );
};

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
