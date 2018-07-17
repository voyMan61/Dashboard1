import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import blue from '@material-ui/core/colors/blue';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';

if (sessionStorage.getItem('mydata') || sessionStorage.getItem('name')) {
  var username = sessionStorage.getItem('name')
}

const styles = {
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
  avatar: {
    margin: 10,
    backgroundColor: blue[100],
    color: blue[600],
  },
  bigAvatar: {
    width: 60,
    height: 60,
  },
};

function ImageAvatars(props) {
  //<h2 style={{ marginBottom: '0px' }}> Murdoch Univeristy</h2>
  //<h3 style={{ marginTop: '0px' }}>School of Information Technology</h3>

  const primaryText = <div> Murdoch University <br /> School Of Information Technology </div>
  const { classes } = props;
  return (

    <div className={classes.row}>

      <ListItem>
        <ListItemAvatar>
          <Avatar className={classNames(classes.avatar, classes.bigAvatar)}>
            <PersonIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={primaryText} secondary={username} />
      </ListItem>
    </div>
  );
}

ImageAvatars.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImageAvatars);