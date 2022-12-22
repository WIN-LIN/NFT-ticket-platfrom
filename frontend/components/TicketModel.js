import Modal from '@mui/material/Modal';
import { useState } from "react";
import {Box, Button} from "@mui/material";
export default function TicketModal(prop) {
    const [open, setOpen] = useState(false);
    const handleOpen = async () => {
        setOpen(true);
    }
    const handleClose = () => setOpen(false);

    return(
        <>
            <Button onClick={handleOpen} variant="outlined" sx={{fontSize:'12px'}}>Your Ticket</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={boxStyle}>
                    <h3>Your Ticket</h3>
                </Box>
            </Modal>
        </>
    );
}

const boxStyle = {
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '#F0F0F0 solid 1px',
    borderRadius: 5,
    boxShadow: 24,
    p: 4,
};