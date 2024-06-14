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
    RadioGroup,
    Radio,
    Input,
} from "@mui/material";
import {
    DatePicker,
    LocalizationProvider,
    TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { forwardRef, useImperativeHandle, useState } from "react";

interface IDuration {
    label: string;
    value: number;
}

// type FormValues = {
//     dateTime: Dayjs | null;
//     duration: { label: string; value: number } | null;
//     eventName: string;
// };

type status = "upcoming" | "completed" | "ongoing";
interface IFormValues {
    datetime: Dayjs;
    duration: { label: string; value: number };
    eventName: string;
    location: string;
    agenda?: string;
    guests: string[] | string;
    status: status;
    reminder: number;
    notification: string;
    attachment?: File | string | string[];
}
const durationOptions = [
    { label: "30min", value: 1800 },
    { label: "1h", value: 3600 },
    { label: "1h 30m", value: 5400 },
    { label: "2h", value: 7200 },
    { label: "3h", value: 10800 },
    { label: "4h", value: 14400 },
];

interface IEventFormProps {
    onSubmit: (data: IFormValues) => void;
}
const EventForm = forwardRef((props: IEventFormProps, ref) => {
    const { register, handleSubmit, control, setValue } = useForm<IFormValues>({
        defaultValues: {
            datetime: dayjs(),
            duration: durationOptions[0],
        },
    });

    const [uploadFile, setUploadFile] = useState<File[] | File>([]);
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // setUploadFile(e.target.files)
        console.log(e.target.files);
    };

    useImperativeHandle(ref, () => ({
        submit: () => handleSubmit(props.onSubmit)(),
    }));
    // const onSubmit = (data: any) => {
    //     const date = data.datetime.valueOf();
    //     // const time = data.time.valueOf();
    //     console.log(data);
    //     console.log(date, "     ");

    //     // setValue("eventName", "");
    // };

    return (
        <form>
            <Box sx={{ mb: "1rem", pb: "1rem" }}>
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
            <Box sx={{ mb: "1rem", pb: "1rem" }}>
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

            <Box
                sx={{
                    display: "flex",
                    mb: ".5rem",
                    justifyContent: "space-between",
                    gap: "1rem",
                }}
            >
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
                                        "& .MuiSvgIcon-root ": {
                                            width: "1rem",
                                            height: "1rem",
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
                                        "& .MuiSvgIcon-root ": {
                                            width: "1rem",
                                            height: "1rem",
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
                                        "& .MuiAutocomplete-option": {
                                            fontSize: "small",
                                        },
                                    }}
                                />
                            )}
                        />
                    </Box>
                </Box>
            </Box>

            <Box sx={{ mb: "2rem" }}>
                <InputLabel
                    htmlFor="location"
                    sx={{ fontSize: "small", fontWeight: "bold" }}
                >
                    Location
                </InputLabel>
                <Controller
                    name="location"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            fullWidth
                            margin="normal"
                            placeholder=" Event location"
                            required
                            value={field.value}
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
                    )}
                />
            </Box>

            <Box sx={{ mb: "2rem" }}>
                <InputLabel
                    htmlFor="guests"
                    sx={{ fontSize: "small", fontWeight: "bold" }}
                >
                    Add guests
                </InputLabel>
                <Controller
                    name="guests"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            fullWidth
                            margin="normal"
                            placeholder="Enter Gmail addresses separated by commas"
                            // helperText="admin@mail.com,abc@gmail.com"
                            required
                            value={field.value}
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
                    )}
                />
            </Box>

            <Box
                sx={{
                    display: "flex",
                    gap: "1rem",
                    mb: "1rem",
                }}
            >
                <Box>
                    <InputLabel
                        htmlFor="notification"
                        sx={{ fontSize: "small", fontWeight: "bold" }}
                    >
                        Notification
                    </InputLabel>

                    <Controller
                        name="notification"
                        control={control}
                        defaultValue="email" // Default value can be "email" or "slack"
                        render={({ field }) => (
                            <RadioGroup {...field} row>
                                <FormControlLabel
                                    value="email"
                                    control={<Radio size="small" />}
                                    label="Email"
                                    sx={{
                                        "& .MuiTypography-root": {
                                            fontSize: "small",
                                        },
                                        "& .MuiSvgIcon-root": {
                                            width: "1rem",
                                            height: "1rem",
                                        },
                                    }}
                                />
                                <FormControlLabel
                                    value="slack"
                                    control={<Radio size="small" />}
                                    label="Slack"
                                    sx={{
                                        "& .MuiTypography-root": {
                                            fontSize: "small",
                                        },
                                        "& .MuiSvgIcon-root": {
                                            width: "1rem",
                                            height: "1rem",
                                        },
                                    }}
                                />
                            </RadioGroup>
                        )}
                    />
                </Box>

                <Box sx={{ minWidth: "12rem" }}>
                    <InputLabel
                        htmlFor="reminder"
                        sx={{ fontSize: "small", fontWeight: "bold" }}
                    >
                        Set reminder
                    </InputLabel>
                    <Controller
                        name="reminder"
                        control={control}
                        defaultValue={30}
                        render={({ field }) => (
                            <Select
                                {...field}
                                label="Reminder"
                                variant="outlined"
                                fullWidth
                                sx={{
                                    fontSize: "small",
                                    "& .MuiInputBase-root": {
                                        fontSize: "small",
                                        margin: "-1rem 0",
                                        padding: ".1rem 0",
                                        border: "1px solid red",
                                    },

                                    "& .MuiInputLabel-root": {
                                        // Target the root element of the label component
                                        fontWeight: "bold",
                                    },
                                    "& .MuiSelect-select": {
                                        // Target the root element of the label component
                                        padding: ".6rem ",
                                    },
                                    "& .MuiButtonBase-root .MuiMenuItem-root": {
                                        // Target the root element of the label component
                                        fontSize: "small",
                                    },
                                }}
                            >
                                <MenuItem
                                    sx={{
                                        fontSize: "small",
                                    }}
                                    value={0}
                                >
                                    None
                                </MenuItem>
                                <MenuItem
                                    value={5}
                                    sx={{
                                        fontSize: "small",
                                    }}
                                >
                                    5 minutes before
                                </MenuItem>
                                <MenuItem
                                    value={15}
                                    sx={{
                                        fontSize: "small",
                                    }}
                                >
                                    15 minutes before
                                </MenuItem>
                                <MenuItem
                                    value={30}
                                    sx={{
                                        fontSize: "small",
                                    }}
                                >
                                    30 minutes before
                                </MenuItem>
                                <MenuItem
                                    value={60}
                                    sx={{
                                        fontSize: "small",
                                    }}
                                >
                                    1 hour before
                                </MenuItem>
                                <MenuItem
                                    value={1440}
                                    sx={{
                                        fontSize: "small",
                                    }}
                                >
                                    1 day before
                                </MenuItem>
                            </Select>
                        )}
                    />
                </Box>
            </Box>

            <Box sx={{ minWidth: "12rem" }}>
                <InputLabel
                    htmlFor="attachment"
                    sx={{ fontSize: "small", fontWeight: "bold" }}
                >
                    Upload attachment
                </InputLabel>

                <Controller
                    name="attachment"
                    control={control}
                    render={({ field }) => (
                        <Box sx={{ border: "" }}>
                            <input
                                type="file"
                                accept=".txt,.pdf,.pptx"
                                onChange={(e) => {
                                    const file =
                                        e.target.files && e.target.files[0];
                                    if (file) {
                                        field.onChange(file);
                                    }
                                }}
                            />
                        </Box>
                    )}
                />
            </Box>
        </form>
    );
});

export default EventForm;
