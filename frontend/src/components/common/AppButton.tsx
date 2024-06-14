import { Box, Button, CircularProgress, SxProps } from "@mui/material";

type btnColor =
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";

type btnSize = "small" | "medium" | "large";
type btnVariant = "text" | "outlined" | "contained";
interface IAppButton {
    title: string;
    isLoading?: boolean;
    onClick?: () => void;
    sx?: SxProps;
    color?: btnColor;
    size?: btnSize;
    variant?: btnVariant;
}
const AppButton = ({
    title,
    isLoading = false,
    onClick,
    sx,
    color,
    size,
    variant,
}: IAppButton) => {
    return (
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            {isLoading && <CircularProgress />}
            <Button
                sx={sx}
                onClick={onClick}
                disabled={isLoading ? true : false}
                color={color}
                size={size}
                variant={variant}
            >
                {title}
            </Button>
        </Box>
    );
};

export default AppButton;
