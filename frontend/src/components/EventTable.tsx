import React, { memo, useEffect, useState } from "react";
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
} from "@mui/material";
import { format } from "date-fns";
import axiosInstance from "../api/axiosInstance";

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
            setEvents(response.data);
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
                    <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                        <InputLabel>Status</InputLabel>
                        <Select
                            value={status}
                            onChange={(e) =>
                                setStatus(e.target.value as string)
                            }
                            label="Status"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="completed">Completed</MenuItem>
                            <MenuItem value="ongoing">Ongoing</MenuItem>
                            <MenuItem value="upcoming">Upcoming</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                        <InputLabel>Duration</InputLabel>
                        <Select
                            value={duration}
                            onChange={(e) =>
                                setDuration(e.target.value as string)
                            }
                            label="Duration"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="1800000">30 minutes</MenuItem>
                            <MenuItem value="3600000">1 hour</MenuItem>
                            <MenuItem value="5400000">1.5 hours</MenuItem>
                            <MenuItem value="7200000">2 hours</MenuItem>
                            <MenuItem value="9000000">2.5 hours</MenuItem>
                            <MenuItem value="10800000">3 hours</MenuItem>
                            <MenuItem value="14400000">4 hours</MenuItem>
                            <MenuItem value="18000000">5 hours</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    <Button variant="contained" onClick={fetchEvents}>
                        Filter
                    </Button>
                </Grid>
            </Grid>

            <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Event Name</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Time</TableCell>
                            <TableCell>Duration</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell>Agenda</TableCell>
                            <TableCell>Guests</TableCell>
                            <TableCell>Reminder</TableCell>
                            <TableCell>Notification</TableCell>
                            <TableCell>Attachment</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ fontSize: "small " }}>
                        {events.map((event) => (
                            <TableRow key={event.id}>
                                <TableCell sx={{ fontSize: "small" }}>
                                    <Typography
                                        variant="overline"
                                        component={"p"}
                                    >
                                        {" "}
                                        {event.id}{" "}
                                    </Typography>
                                </TableCell>
                                <TableCell sx={{ fontSize: "small " }}>
                                    {event.eventName}
                                </TableCell>
                                <TableCell>
                                    {format(event.datetime, "MMM d, yyyy")}
                                </TableCell>
                                <TableCell>
                                    {format(event.datetime, "h:mm a")}{" "}
                                </TableCell>
                                <TableCell>
                                    {(event.duration / (1000 * 60)).toFixed(2)}{" "}
                                    min
                                </TableCell>
                                <TableCell>{event.location}</TableCell>
                                <TableCell>{event.agenda}</TableCell>
                                <TableCell>{event.guests.join(", ")}</TableCell>
                                <TableCell>
                                    {event.reminder} min before
                                </TableCell>
                                <TableCell>{event.notification}</TableCell>
                                <TableCell>{event.attachment}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
});

export default EventTable;
