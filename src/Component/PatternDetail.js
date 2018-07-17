import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import PatternButton from './PatternButton'
import ProgressSpinner from './ProgressSpinner'

if (sessionStorage.getItem('patternCode')) {
        var PatterCode = sessionStorage.getItem('patternCode')
        var PatternID = sessionStorage.getItem('patternID')
} else {
    PatternID = 1
    PatterCode = 'LT1'
}


const CustomTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 2,
      overflowX: 'auto',
    },
    table: {
      maxWidth: 700,
    },
    row: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
  });
  
 
  
  class CustomizedTable extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            classes: this.props.classes,
            activityLookupLoaded: false,
            activityLookupData: this.props.activityLookupData,
            frAct: [],
            psAct: [],
            ptAct: [],
            totalfr:0,
            totalps:0,
            totalpt:0
        }
    }

    componentDidMount() {
        var activityLookupObj;
        var calfr=0;
        var calps=0;
        var calpt=0;

        fetch('http://immense-headland-42479.herokuapp.com/api/activitylookup/' + PatternID, {
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
                    activityLookupObj = json;
                    for (var i = 0; i < activityLookupObj.length; i++) {
                        if(activityLookupObj[i].type === "fr") {
                            this.state.frAct.push(activityLookupObj[i])
                            calfr += activityLookupObj[i].hour
                        } else if(activityLookupObj[i].type === "pt") {
                            this.state.ptAct.push(activityLookupObj[i])
                            calpt += activityLookupObj[i].hour
                        } else if(activityLookupObj[i].type === "ps") {
                            this.state.psAct.push(activityLookupObj[i])
                            calps += activityLookupObj[i].hour
                        }
                 
                    }
                    this.setState({
                        activityLookupLoaded: true,
                        activityLookupData: activityLookupObj,
                        totalfr: calfr,
                        totalps: calps,
                        totalpt: calpt

                    })

                });
            }
        });

    }

    render() {
        if(this.state.activityLookupLoaded === true) {
            console.log(this.state.frAct)
            console.log(this.state.psAct)
            console.log(this.state.ptAct)
            
    return (
        
      <Paper className={this.state.classes.root}>
      <PatternButton />
      <h1>Pattern Table - {PatterCode}</h1>
        <Table className={this.state.classes.table}>
        {this.state.frAct.length !== 0  &&
          <TableHead>
            <TableRow>
              <CustomTableCell>Flat rate activities</CustomTableCell>
              <CustomTableCell>Total Number of Hours: {this.state.totalfr}</CustomTableCell>
            </TableRow>
        </TableHead> }
          <TableBody>
             {this.state.frAct.map(n => {
                
              return (
                <TableRow className={this.state.classes.row} key={n.id}>
                  <CustomTableCell component="th" scope="row">
                    {n.name}
                  </CustomTableCell>
                  <CustomTableCell>Hrs:{n.hour}</CustomTableCell>
                </TableRow>
              );
            })}
        </TableBody> 

        {this.state.ptAct.length !== 0  &&
          <TableHead>
            <TableRow>
              <CustomTableCell>Per tutorial/group activities</CustomTableCell>
              <CustomTableCell>Total Number of Hours: {this.state.totalpt}</CustomTableCell>
            </TableRow>
        </TableHead> }
          <TableBody>
             {this.state.ptAct.map(n => {
                
              return (
                <TableRow className={this.state.classes.row} key={n.id}>
                  <CustomTableCell component="th" scope="row">
                    {n.name}
                  </CustomTableCell>
                  <CustomTableCell>Hrs:{n.hour}</CustomTableCell>
                </TableRow>
              );
            })}
        </TableBody> 

        {this.state.psAct.length !== 0 &&
          <TableHead>
            <TableRow>
              <CustomTableCell>Per student activities</CustomTableCell>
              <CustomTableCell>Total Number of Hours: {this.state.totalps}</CustomTableCell>
            </TableRow>
        </TableHead> }
          <TableBody>
             {this.state.psAct.map(n => {
                
              return (
                <TableRow className={this.state.classes.row} key={n.id}>
                  <CustomTableCell component="th" scope="row">
                    {n.name}
                  </CustomTableCell>
                  <CustomTableCell>Hrs:{n.hour}</CustomTableCell>
                </TableRow>
              );
            })}
        </TableBody> 

        </Table>
      </Paper>
    );} else {
        return (
            <Paper className={this.state.classes.root}>
            <PatternButton />
            <h1>Pattern Table - {PatterCode}</h1>
            <ProgressSpinner />
            </Paper>
        )
    }
  }
}

  
  export default withStyles(styles)(CustomizedTable);