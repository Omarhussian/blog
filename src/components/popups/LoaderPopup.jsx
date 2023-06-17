import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const LoaderPopup = ({ visible = false, option = null }) => {
    return (
        <Backdrop
            sx={{ color: '#fff',zIndex:10000 }}
            open={visible}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}

export default LoaderPopup