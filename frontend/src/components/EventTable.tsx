import { memo, useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Button,
    Box,
    Grid,
    Typography,
    Link,
} from "@mui/material";
import { format } from "date-fns";
import axiosInstance from "../api/axiosInstance";
import { formatTime } from "../utils/formatTime";

interface Event {
    id: number;
    eventName: string;
    datetime: string;
    duration: number;
    location: string;
    agenda: string;
    guests: string[];
    reminder: number;
    notification: string;
    attachment: string;
}
interface EventTableProps {
    refreshData: boolean;
}

interface ISortColumn {
    id: number;
}
const EventTable = memo(({ refreshData }: EventTableProps) => {
    const [events, setEvents] = useState<Event[]>([]);
    const [status, setStatus] = useState<string>("");
    const [duration, setDuration] = useState<string>("");

    const fetchEvents = async () => {
        try {
            const response = await axiosInstance.get("/events", {
                params: {
                    status: status || undefined,
                    duration: duration || undefined,
                },
            });
            console.log("Fetched Events", response.data);

            if (response && response.data) {
                const sortedData = response.data.sort(
                    (a: ISortColumn, b: ISortColumn) => b.id - a.id
                );
                console.log("Sorted Events", sortedData);
                setEvents(sortedData);
            }
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, [status, duration, refreshData]);

    return (
        <Box sx={{ padding: 2 }}>
            <Grid container spacing={2} alignItems="center">
                <Grid item>
                    <FormControl
                        variant="outlined"
                        size="small"
                        sx={{
                            minWidth: 110,
                            // height: "1rem",
                            // border: "1px solid red",

                            "& .MuiSvgIcon-root": {
                                fontSize: "large",
                            },
                            "& .MuiInputBase-root": {
                                fontSize: "small",
                            },

                            "& .MuiInputBase-input .MuiSelect-select": {
                                padding: ".4rem",
                                border: "1px solid red",
                                fontSize: "small",
                            },
                        }}
                    >
                        <InputLabel
                            sx={{ fontSize: "small", fontWeight: "bold" }}
                        >
                            Status
                        </InputLabel>
                        <Select
                            value={status}
                            onChange={(e) =>
                                setStatus(e.target.value as string)
                            }
                            label="Status"
                        >
                            <MenuItem value="" sx={{ fontSize: "small" }}>
                                <em>None</em>
                            </MenuItem>
                            <MenuItem
                                value="completed"
                                sx={{ fontSize: "small" }}
                            >
                                Completed
                            </MenuItem>
                            <MenuItem
                                value="ongoing"
                                sx={{ fontSize: "small" }}
                            >
                                Ongoing
                            </MenuItem>
                            <MenuItem
                                value="upcoming"
                                sx={{ fontSize: "small" }}
                            >
                                Upcoming
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl
                        size="small"
                        variant="outlined"
                        sx={{
                            minWidth: 100,
                            // height: "1rem",
                            // border: "1px solid red",

                            "& .MuiSvgIcon-root": {
                                fontSize: "large",
                            },
                            "& .MuiInputBase-root": {
                                fontSize: "small",
                            },

                            "& .MuiInputBase-input .MuiSelect-select": {
                                padding: ".4rem",
                                border: "1px solid red",
                                fontSize: "small",
                            },
                        }}
                    >
                        <InputLabel
                            sx={{ fontSize: "small", fontWeight: "bold" }}
                        >
                            Duration
                        </InputLabel>
                        <Select
                            value={duration}
                            onChange={(e) =>
                                setDuration(e.target.value as string)
                            }
                            label="Duration"
                        >
                            <MenuItem sx={{ fontSize: "small" }} value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem
                                value="1800000"
                                sx={{ fontSize: "small" }}
                            >
                                30 minutes
                            </MenuItem>
                            <MenuItem
                                value="3600000"
                                sx={{ fontSize: "small" }}
                            >
                                1 hour
                            </MenuItem>
                            <MenuItem
                                value="5400000"
                                sx={{ fontSize: "small" }}
                            >
                                1.5 hours
                            </MenuItem>
                            <MenuItem
                                value="7200000"
                                sx={{ fontSize: "small" }}
                            >
                                2 hours
                            </MenuItem>
                            <MenuItem
                                value="9000000"
                                sx={{ fontSize: "small" }}
                            >
                                2.5 hours
                            </MenuItem>
                            <MenuItem
                                value="10800000"
                                sx={{ fontSize: "small" }}
                            >
                                3 hours
                            </MenuItem>
                            <MenuItem
                                value="14400000"
                                sx={{ fontSize: "small" }}
                            >
                                4 hours
                            </MenuItem>
                            <MenuItem
                                value="18000000"
                                sx={{ fontSize: "small" }}
                            >
                                5 hours
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        onClick={fetchEvents}
                        sx={{ fontSize: "x-small", fontWeight: "bold" }}
                    >
                        Filter
                    </Button>
                </Grid>
            </Grid>

            <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                <Table size="small">
                    <TableHead>
                        <TableRow sx={{ fontSize: "small" }}>
                            <TableCell
                                sx={{ fontSize: "small", fontWeight: "bold" }}
                            >
                                ID
                            </TableCell>
                            <TableCell
                                sx={{
                                    fontSize: "small",
                                    fontWeight: "bold",
                                    minWidth: "10rem",
                                }}
                            >
                                Event Name
                            </TableCell>
                            <TableCell
                                sx={{
                                    fontSize: "small",
                                    fontWeight: "bold",
                                    minWidth: "5rem",
                                }}
                            >
                                Date
                            </TableCell>
                            <TableCell
                                sx={{
                                    fontSize: "small",
                                    fontWeight: "bold",
                                    minWidth: "4rem",
                                }}
                            >
                                Time
                            </TableCell>
                            <TableCell
                                sx={{
                                    fontSize: "small",
                                    fontWeight: "bold",
                                    minWidth: "4rem",
                                }}
                            >
                                Duration
                            </TableCell>
                            <TableCell
                                sx={{
                                    fontSize: "small",
                                    fontWeight: "bold",
                                    minWidth: "6rem",
                                }}
                            >
                                Location
                            </TableCell>
                            <TableCell
                                sx={{
                                    fontSize: "small",
                                    fontWeight: "bold",
                                    minWidth: "10rem",
                                }}
                            >
                                Agenda
                            </TableCell>
                            <TableCell
                                sx={{
                                    fontSize: "small",
                                    fontWeight: "bold",
                                    minWidth: "3rem",
                                }}
                            >
                                Guests
                            </TableCell>
                            <TableCell
                                sx={{
                                    fontSize: "small",
                                    fontWeight: "bold",
                                    minWidth: "5rem",
                                }}
                            >
                                Reminder
                            </TableCell>
                            <TableCell
                                sx={{
                                    fontSize: "small",
                                    fontWeight: "bold",
                                    minWidth: "3rem",
                                }}
                            >
                                Notification
                            </TableCell>
                            <TableCell
                                sx={{
                                    fontSize: "small",
                                    fontWeight: "bold",
                                    minWidth: "6rem",
                                }}
                            >
                                Attachment
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ fontSize: "small " }}>
                        {events.map((event, idx) => (
                            <TableRow key={event.id}>
                                <TableCell sx={{ fontSize: "small" }}>
                                    <Typography
                                        variant="overline"
                                        component={"p"}
                                    >
                                        {" "}
                                        {idx + 1}{" "}
                                    </Typography>
                                </TableCell>
                                <TableCell sx={{ fontSize: "small " }}>
                                    {event.eventName}
                                </TableCell>
                                <TableCell sx={{ fontSize: "small " }}>
                                    {format(event.datetime, "MMM d, yyyy")}
                                </TableCell>
                                <TableCell sx={{ fontSize: "small " }}>
                                    {format(event.datetime, "h:mm a")}{" "}
                                </TableCell>
                                <TableCell sx={{ fontSize: "small " }}>
                                    {formatTime(event.duration)}
                                </TableCell>
                                <TableCell sx={{ fontSize: "small " }}>
                                    {event.location}
                                </TableCell>
                                <TableCell sx={{ fontSize: "small " }}>
                                    {event.agenda}
                                </TableCell>
                                <TableCell sx={{ fontSize: "small " }}>
                                    {event.guests.join(", ")}
                                </TableCell>
                                <TableCell sx={{ fontSize: "small " }}>
                                    {formatTime(event.reminder)} before
                                </TableCell>
                                <TableCell sx={{ fontSize: "small " }}>
                                    {event.notification}
                                </TableCell>
                                <TableCell sx={{ fontSize: "small " }}>
                                    <Link
                                        href={event.attachment}
                                        underline="hover"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        View File
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
});

export default EventTable;
