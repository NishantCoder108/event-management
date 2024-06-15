import { Dayjs } from "dayjs";

export type status = "upcoming" | "completed" | "ongoing";

export interface IFormValues {
    datetime: Dayjs;
    duration: { label: string; value: number };
    eventName: string;
    location: string;
    agenda?: string;
    guests: string;
    status: status;
    reminder: number;
    notification: string;
    attachment?: File | string;
}

export interface IEventFormProps {
    onSubmit: (data: IFormValues) => void;
    setReset: (reset: () => void) => void;
}

export interface IEventFormRef {
    submit: () => void;
}
