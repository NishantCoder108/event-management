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

interface IAppModal {
    open: boolean;
    onClose: () => void;
    title: string;
    onSave?: () => void;
    children: ReactNode;
}

const AppModal: React.FC<IAppModal> = ({
    open,
    onClose,
    title,
    onSave,
    children,
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
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Close
                </Button>
                {onSave && (
                    <Button onClick={onSave} color="primary">
                        Save
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default AppModal;
