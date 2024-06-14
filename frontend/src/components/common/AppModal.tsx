import React, { ReactNode } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AppButton from "./AppButton";

interface IAppModal {
    open: boolean;
    onClose: () => void;
    title: string;
    onSave?: () => void;
    children: ReactNode;
    saveTitle?: string;
}

const AppModal: React.FC<IAppModal> = ({
    open,
    onClose,
    title,
    onSave,
    children,
    saveTitle,
}) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                <Typography variant="h6">{title}</Typography>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{ position: "absolute", right: 8, top: 8 }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>{children}</DialogContent>
            <DialogActions sx={{ padding: "1rem 2.5rem " }}>
                <AppButton
                    title="Cancel"
                    onClick={onClose}
                    sx={{ color: "black" }}
                    size="small"
                    variant="text"
                />
                {onSave && (
                    <AppButton
                        title={saveTitle ? saveTitle : "Submit"}
                        onClick={onSave}
                        color="primary"
                        size="small"
                        variant="contained"
                    />
                )}
            </DialogActions>
        </Dialog>
    );
};

export default AppModal;
