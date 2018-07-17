import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import PersonIcon from '@material-ui/icons/Person';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import blue from '@material-ui/core/colors/blue';
import ProgressSpinner from './ProgressSpinner'

const emails = ['username@gmail.com', 'user02@gmail.com'];

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
});


class SimpleDialog extends React.Component {
    constructor(props) {

        super(props);

        this.state = {
            loaded: false,
            myID: [],
            myName: [],
            mydata: [],
        }
    }

    componentDidMount() {
        var obj;

        //http://localhost:3000/Staff.json
        //http://localhost:5000/api/stafftotals
        //http://arcane-cove-45625.herokuapp.com/api/stafftotals
        //http://immense-headland-42479.herokuapp.com/api/stafftotals
        fetch('http://immense-headland-42479.herokuapp.com/api/stafftotals', {
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

                    obj = json;
                    for (var i = 0; i < obj.length; i++) {
                        this.state.myName.push(obj[i].name)
                        this.state.myID.push(obj[i].id)
                        this.state.mydata.push(obj[i])
                    }

                    this.setState({
                        loaded: true,
                        mydata: this.state.mydata,

                    })
                });
            } else {
                throw Error(response.statusText);
            }
        }).catch(function (error) {
            console.log(error);


        });
    }

    handleClose = () => {
        this.props.onClose(this.props.selectedValue);
        this.setState({
            mydata: this.state.mydata,
        })
    };


    handleListItemClick = value => {
        this.props.onClose(value);
        sessionStorage.setItem('name', value);
        sessionStorage.setItem('mydata', JSON.stringify(this.state.mydata));
        this.setState({
            mydata: this.state.mydata,
        })

    };

    render() {

        const { classes, onClose, selectedValue, ...other } = this.props;
        if (this.state.loaded === true) {
            return (

                <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title"  {...other} >

                    <DialogTitle id="simple-dialog-title">Choose User</DialogTitle>
                    <div>
                        <List>

                            {this.state.myName.map(staffName => (
                                <ListItem component="a" href="/Dashboard" button onClick={() => this.handleListItemClick(staffName)} key={staffName} >

                                    <ListItemAvatar>
                                        <Avatar className={classes.avatar}>
                                            <PersonIcon />
                                        </Avatar>
                                    </ListItemAvatar>

                                    <ListItemText primary={staffName} mydata={staffName} />

                                </ListItem>
                            ))}

                        </List>
                    </div>
                </Dialog>
            );
        } else {
            return (
                <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title"  {...other} >
                    <div>
                        <ProgressSpinner />
                    </div>
                </Dialog>

            );
        }
    }
}

SimpleDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func,
    selectedValue: PropTypes.string,
};

const SimpleDialogWrapped = withStyles(styles)(SimpleDialog);


class ContainedButtons extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            classes: this.props.classes,
        }
    }
    state = {
        open: false,
        selectedValue: emails[1],

    };



    handleClickOpen = () => {
        this.setState({
            open: true,
        });
    };

    handleClose = value => {
        this.setState({ selectedValue: value, open: false });
    };



    render() {
        return (
            <div className="App">
                <Button variant="contained" href="/" className={this.state.classes.button}>
                    Home
        </Button>
                <Button variant="contained" href="/Dashboard" >
                    Dashboard
        </Button>
                <Button variant="contained" onClick={this.handleClickOpen} className={this.state.classes.button}>Dashboard View as</Button>
                <SimpleDialogWrapped
                    selectedValue={this.state.selectedValue}
                    open={this.state.open}
                    onClose={this.handleClose}

                />
            </div>

        );
    }
}





export default withStyles(styles)(ContainedButtons)