import { Dialog } from "@mui/material"

function DialogCustom(
    { open, onClose, children }:
        { open: (EventTarget & HTMLButtonElement) | null, onClose?: () => void, children?: React.ReactNode }
) {
    return (
        <Dialog open={Boolean(open)} onClose={onClose}>
            {children}
        </Dialog>
    )
}
export default DialogCustom