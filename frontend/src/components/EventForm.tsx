import { useForm } from "react-hook-form";
import {
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Checkbox,
    FormControlLabel,
    Box,
    Autocomplete,
} from "@mui/material";
import {
    DatePicker,
    LocalizationProvider,
    TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";

interface IDuration {
    label: string;
    value: number;
}

function EventForm() {
    const { register, handleSubmit } = useForm();
    const durationOptions = [
        { label: "30min", value: 1800 },
        { label: "1h", value: 3600 },
        { label: "1h 30m", value: 5400 },
        { label: "2h", value: 7200 },
        { label: "3h", value: 10800 },
        { label: "4h", value: 14400 },
    ];

    const onSubmit = (data: any) => {
        console.log(data);
        // Handle form submission here
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ mb: ".5rem", pb: "1rem" }}>
                <InputLabel
                    htmlFor="eventName"
                    sx={{ fontSize: "small", fontWeight: "bold" }}
                >
                    Event Name
                </InputLabel>

                <TextField
                    {...register("eventName")}
                    id="eventName"
                    // label="Event Name"
                    fullWidth
                    margin="normal"
                    placeholder="Enter Event Name"
                    required
                    sx={{
                        fontSize: "small",
                        "& .MuiInputBase-root": {
                            fontSize: "small",
                            margin: "-1rem 0",
                            padding: ".1rem 0",
                        },

                        "& .MuiInputLabel-root": {
                            // Target the root element of the label component
                            fontWeight: "bold",
                        },
                    }}
                    hiddenLabel
                    size="small"
                />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ mb: "1rem" }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <InputLabel
                            htmlFor="date"
                            sx={{ fontSize: "small", fontWeight: "bold" }}
                        >
                            Date
                        </InputLabel>
                        <Box>
                            <DatePicker
                                {...register("date1")}
                                // value={selectedDate}
                                onChange={(newValue) => {
                                    console.log(newValue);
                                }}
                                format="MMMM D, YYYY"
                                sx={{
                                    fontSize: "small",
                                    "& .MuiInputBase-root": {
                                        // Target the root element of the input component
                                        fontSize: "small",

                                        padding: "0 1rem 0",
                                    },
                                    "& .MuiInputLabel-root": {
                                        // Target the root element of the label component
                                        fontWeight: "bold",
                                    },
                                    "& .MuiInputBase-input": {
                                        // Target the root element of the label component
                                        padding: ".7rem .7rem .7rem 0",
                                    },
                                }}
                                // hiddenLabel
                                // size="small"
                            />{" "}
                        </Box>
                    </LocalizationProvider>
                </Box>
                <Box sx={{ mb: "1rem" }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <InputLabel
                            htmlFor="time"
                            sx={{ fontSize: "small", fontWeight: "bold" }}
                        >
                            Time
                        </InputLabel>
                        <Box>
                            <TimePicker
                                {...register("time1")}
                                // value={selectedDate}
                                onChange={(newValue) => {
                                    console.log(newValue);
                                }}
                                // format="MMMM D, YYYY"
                                sx={{
                                    fontSize: "small",
                                    "& .MuiInputBase-root": {
                                        // Target the root element of the input component
                                        fontSize: "small",

                                        padding: "0 1rem 0",
                                    },
                                    "& .MuiInputLabel-root": {
                                        // Target the root element of the label component
                                        fontWeight: "bold",
                                    },
                                    "& .MuiInputBase-input": {
                                        // Target the root element of the label component
                                        padding: ".7rem .7rem .7rem 0",
                                    },
                                }}
                                // hiddenLabel
                                // size="small"
                            />{" "}
                        </Box>
                    </LocalizationProvider>
                </Box>
                <Box sx={{ mb: "1rem" }}>
                    <InputLabel
                        htmlFor="duration"
                        sx={{ fontSize: "small", fontWeight: "bold" }}
                    >
                        Duration
                    </InputLabel>
                    <Box>
                        <Autocomplete
                            {...register("duration")}
                            options={durationOptions}
                            defaultValue={durationOptions[0]}
                            disablePortal
                            id="duration"
                            renderInput={(params) => (
                                <TextField
                                    sx={{
                                        minWidth: 150,
                                        maxWidth: 400,
                                        fontSize: "small",
                                    }}
                                    {...params}
                                    // label="Select Duration"
                                    size="small"
                                />
                            )}
                            sx={{
                                fontSize: "small",
                                "& .MuiInputBase-root": {
                                    // Target the root element of the input component
                                    fontSize: "small",

                                    // padding: "0 1rem 0",
                                },
                                "& .MuiInputLabel-root": {
                                    fontWeight: "bold",
                                },
                                "& .MuiInputBase-input": {
                                    padding: ".4rem 0 !important",
                                },
                                "& .MuiAutocomplete-popper": {
                                    border: "5px solid red !important",
                                },
                                "& .base-Popper-root": {
                                    border: "1px solid red",
                                    backgroundColor: "red",
                                },
                            }}
                            // hiddenLabel
                            size="small"
                        />{" "}
                    </Box>
                    <TextField
                        {...register("location")}
                        label="Location"
                        fullWidth
                        margin="normal"
                        required
                    />
                </Box>
            </Box>

            <TextField
                {...register("guests")}
                label="Guests (with email)"
                fullWidth
                margin="normal"
                required
            />
            <FormControl fullWidth margin="normal" required>
                <InputLabel>Status</InputLabel>
                <Select {...register("status")}>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="confirmed">Confirmed</MenuItem>
                    <MenuItem value="cancelled">Cancelled</MenuItem>
                </Select>
            </FormControl>
            <FormControlLabel
                control={<Checkbox {...register("notificationByEmail")} />}
                label="Notification by Email"
            />
            <FormControlLabel
                control={<Checkbox {...register("notificationBySlack")} />}
                label="Notification by Slack"
            />
            <FormControlLabel
                control={<Checkbox {...register("setReminder")} />}
                label="Set Reminder"
            />
            <TextField
                {...register("attachment")}
                type="file"
                label="Upload Attachment"
                fullWidth
                margin="normal"
                required
            />
            <Button type="submit" variant="contained" color="primary">
                Submit
            </Button>
        </form>
    );
}

export default EventForm;
