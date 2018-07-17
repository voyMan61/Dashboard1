import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ProgressSpinner from './ProgressSpinner'

if (sessionStorage.getItem('patternCode')) {
    var PatterCode = sessionStorage.getItem('patternCode')
} else {
    PatterCode = 'LT1'
}

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
});

class SimpleSelect extends React.Component {
    constructor(props) {

        super(props);

        this.state = {
            patternLoaded: false,
            activityLookupLoaded: false,
            patternData: this.props.patternData,
            activityLookupData: this.props.activityLookupData,
        }
    }


    state = {
        age: '',
        name: 'hai',
    };

    handleChange = event => {
        const patternID = this.state.patternData.find(item => item.code === event.target.value).id;

        sessionStorage.setItem('patternCode', event.target.value);
        sessionStorage.setItem('patternID', patternID);
        this.setState({ [event.target.name]: event.target.value });
    };

    componentDidMount() {
        var patternObj;


        fetch('http://immense-headland-42479.herokuapp.com/api/pattern', {
            //mode: 'no-cors',
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        },
        ).then(response => {
            if (response.ok) {
                response.json().then(json => {
                    patternObj = json;
                    this.setState({
                        patternLoaded: true,
                        patternData: patternObj,

                    })

                });
            }
        });
    }

    render() {
        const { classes } = this.props;
        if (this.state.patternLoaded === true) {
            return (
                <form className={classes.root} autoComplete="off">

                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="age-auto-width">{PatterCode}</InputLabel>
                        <Select
                            value={this.state.age}
                            onChange={this.handleChange}
                            input={<Input name="age" id="age-auto-width" />}
                            autoWidth
                        >

                            {this.state.patternData.map((data, index) =>
                                <MenuItem component='a' href="/PatternDetail" value={data.code} key={index}>{data.code}</MenuItem>
                            )}

                        </Select>
                        <FormHelperText>Patter Code</FormHelperText>
                    </FormControl>


                </form>
            );
        } else {
            return (
                <form className={classes.root} autoComplete="off">
                    <ProgressSpinner />
                </form>)
        }
    }
}

SimpleSelect.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleSelect);
