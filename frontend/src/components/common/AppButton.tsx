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
            <Button
                onClick={onClick}
                disabled={isLoading ? true : false}
                color={color}
                size={size}
                variant={variant}
                sx={{
                    maxWidth: "7rem",
                    maxHeight: "2rem",
                    ...sx,
                }}
            >
                {isLoading ? (
                    <Box
                        sx={{
                            padding: "4px 1px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            minWidth: "4rem",
                        }}
                    >
                        <CircularProgress size="1rem" thickness={5} />
                    </Box>
                ) : (
                    title
                )}
            </Button>
        </Box>
    );
};

export default AppButton;
