import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles(() => ({
    toTop: {
        color: '#212121',
        zIndex: 200000,
        position: 'fixed',
        bottom: 30,
        right: 8,
        border: '2px solid #212121',
        backgroundColor: 'transparent',
        transition: '0.3s ease-out',
        '&:hover': {
            color: 'white',
            border: '2px solid #212121',
            backgroundColor: '#212121',
            transform: 'translateY(-5%)',
            transition: '0.3s ease-in',
        },
    },
    arrow: {
        fontSize: 60,
    },
}));