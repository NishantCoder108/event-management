import { Controller, useForm } from "react-hook-form";
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
import dayjs, { Dayjs } from "dayjs";

interface IDuration {
    label: string;
    value: number;
}

// type FormValues = {
//     dateTime: Dayjs | null;
//     duration: { label: string; value: number } | null;
//     eventName: string;
// };

interface IFormValues {
    datetime: Dayjs;
    duration: { label: string; value: number };
    eventName: string;
    location: string;
    agenda?: string;
}
const durationOptions = [
    { label: "30min", value: 1800 },
    { label: "1h", value: 3600 },
    { label: "1h 30m", value: 5400 },
    { label: "2h", value: 7200 },
    { label: "3h", value: 10800 },
    { label: "4h", value: 14400 },
];

function EventForm() {
    const { register, handleSubmit, control, setValue } = useForm<IFormValues>({
        defaultValues: {
            datetime: dayjs(),
            duration: durationOptions[0],
        },
    });

    const onSubmit = (data: any) => {
        const date = data.datetime.valueOf();
        // const time = data.time.valueOf();
        console.log(data);
        console.log(date, "     ");

        // setValue("eventName", "");
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
            <Box sx={{ mb: ".5rem", pb: "1rem" }}>
                <InputLabel
                    htmlFor="agenda"
                    sx={{ fontSize: "small", fontWeight: "bold" }}
                >
                    Agenda
                </InputLabel>

                <TextField
                    {...register("agenda")}
                    id="agenda"
                    fullWidth
                    margin="normal"
                    placeholder="Add your agenda here..."
                    multiline
                    rows={6}
                    sx={{
                        fontSize: "small",
                        // padding: "1rem",
                        "& .MuiInputBase-root": {
                            fontSize: "small",
                            margin: "-1rem 0",
                            // padding: ".1rem 0",
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
                    <InputLabel
                        htmlFor="Date"
                        sx={{ fontSize: "small", fontWeight: "bold" }}
                    >
                        Date
                    </InputLabel>
                    <Controller
                        name="datetime"
                        control={control}
                        render={({ field }) => (
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    {...field}
                                    onChange={(date) => {
                                        if (date && field.value) {
                                            const updatedDateTime = field.value
                                                .set("year", date.year())
                                                .set("month", date.month())
                                                .set("date", date.date());
                                            field.onChange(updatedDateTime);
                                        } else {
                                            field.onChange(date);
                                        }
                                    }}
                                    value={field.value}
                                    format="MMMM D, YYYY"
                                    sx={{
                                        fontSize: "small",
                                        "& .MuiInputBase-root": {
                                            fontSize: "small",

                                            padding: "0 1rem 0",
                                        },
                                        "& .MuiInputLabel-root": {
                                            fontWeight: "bold",
                                        },
                                        "& .MuiInputBase-input": {
                                            padding: ".7rem .7rem .7rem 0",
                                        },
                                    }}
                                />
                            </LocalizationProvider>
                        )}
                    />
                </Box>
                <Box sx={{ mb: "1rem" }}>
                    <InputLabel
                        htmlFor="time"
                        sx={{ fontSize: "small", fontWeight: "bold" }}
                    >
                        Time
                    </InputLabel>
                    <Controller
                        name="datetime"
                        control={control}
                        render={({ field }) => (
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TimePicker
                                    {...field}
                                    onChange={(time) => {
                                        if (time && field.value) {
                                            const updatedDateTime = field.value
                                                .set("hour", time.hour())
                                                .set("minute", time.minute())
                                                .set("second", time.second());
                                            field.onChange(updatedDateTime);
                                        } else {
                                            field.onChange(time);
                                        }
                                    }}
                                    views={["hours", "minutes"]}
                                    value={field.value}
                                    ampmInClock={false}
                                    // disableOpenPicker
                                    orientation="portrait"
                                    sx={{
                                        fontSize: "small",
                                        "& .MuiInputBase-root": {
                                            fontSize: "small",

                                            padding: "0 1rem 0",
                                        },
                                        "& .MuiInputLabel-root": {
                                            fontWeight: "bold",
                                        },
                                        "& .MuiInputBase-input": {
                                            padding: ".7rem .7rem .7rem 0",
                                        },
                                    }}
                                />
                            </LocalizationProvider>
                        )}
                    />
                </Box>

                <Box sx={{ mb: "1rem" }}>
                    <InputLabel
                        htmlFor="duration"
                        sx={{ fontSize: "small", fontWeight: "bold" }}
                    >
                        Duration
                    </InputLabel>
                    <Box>
                        <Controller
                            name="duration"
                            control={control}
                            render={({ field }) => (
                                <Autocomplete
                                    options={durationOptions}
                                    getOptionLabel={(option) => option.label}
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
                                    id="duration"
                                    defaultValue={durationOptions[0]}
                                    onChange={(event, value) =>
                                        field.onChange(value)
                                    }
                                    value={field.value}
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
                                            padding: ".3rem 0 !important",
                                        },
                                        "& .MuiAutocomplete-popper": {
                                            border: "5px solid red !important",
                                        },
                                        "& .base-Popper-root": {
                                            border: "1px solid red",
                                            backgroundColor: "red",
                                        },
                                    }}
                                />
                            )}
                        />
                        {/* <Autocomplete
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
                           
                            // hiddenLabel
                            size="small"
                        />{" "} */}
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
