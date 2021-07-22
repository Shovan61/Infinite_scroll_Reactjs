import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        height: '25%',
        width: 'auto',
    },
});

function Picture(props) {
    const classes = useStyles();
    const { urls } = props;
    return (
        <div className={classes.root}>
            <img height='300px' width='300px' src={urls.regular} alt='' />
        </div>
    );
}

export default Picture;
