import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});


function ContainedButtons(props) {
    const { classes } = props;
    return (
        <div className="App">
            <Button variant="contained" href="/Offering" className={classes.button}>
                Offering Table
    </Button>

            <Button variant="contained" href="/PatternDetail" className={classes.button}>
                Pattern Table
    </Button>

            <Button variant="contained" href="/Staff" className={classes.button}>
                Staff Table
    </Button>


        </div>

    );

}

ContainedButtons.propTypes = {
    classes: PropTypes.object.isRequired,
};




export default withStyles(styles)(ContainedButtons)