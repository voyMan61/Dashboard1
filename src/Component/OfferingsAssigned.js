import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ProgressSpinner from './ProgressSpinner'
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';

if (sessionStorage.getItem('mydata') || sessionStorage.getItem('name')) {
    var mydata = JSON.parse(sessionStorage.getItem('mydata'))
    var username = sessionStorage.getItem('name')
    var userdata = mydata.find(item => item.name === username)
    var staffID = userdata.id
}

const styles = {
    card: {
        minWidth: 275,
        borderStyle: 'solid',
        maxWidth: 750,

    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
};


class SimpleCard1 extends React.Component {
    constructor(props) {

        super(props);

        this.state = {
            offeringLoaded: false,
            locationLoaded: false,
            periodLoaded: false,
            staffOfferingLoaded: false,
            patternLoaded: false,
            offeringData: this.props.offeringData,
            locationData: this.props.locationData,
            periodData: this.props.periodData,
            staffOfferingData: this.props.staffOfferingData,
            patternData: this.props.patternData,
            classes: this.props.classes,

        }
    }

    componentDidMount() {
        var offeringObj;
        var locationObj;
        var periodObj;
        var staffOfferingObj;
        var patternObj;



        //http://localhost:3000/Staff/14.json
        //http://localhost:5000/api/offering
        //http://arcane-cove-45625.herokuapp.com/api/offering
        //http://immense-headland-42479.herokuapp.com/api/offering
        fetch('http://immense-headland-42479.herokuapp.com/api/offering', {
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
                    offeringObj = json;
                    this.setState({
                        offeringLoaded: true,
                        offeringData: offeringObj,

                    })

                });
            }
        });

        fetch('http://immense-headland-42479.herokuapp.com/api/offeringlookup/' + staffID, {
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
                    staffOfferingObj = json;
                    this.setState({
                        staffOfferingLoaded: true,
                        staffOfferingData: staffOfferingObj,

                    })

                });
            }
        });



        fetch('http://immense-headland-42479.herokuapp.com/api/location', {
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
                    locationObj = json;
                    this.setState({
                        locationLoaded: true,
                        locationData: locationObj
                    })

                });
            }
        });




        fetch('http://immense-headland-42479.herokuapp.com/api/period', {
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
                    periodObj = json;
                    this.setState({
                        periodLoaded: true,
                        periodData: periodObj,

                    })


                });
            }
        });

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
    savePattern = value => {
        sessionStorage.setItem('patternCode', value);
        sessionStorage.setItem('patternID',(this.state.patternData.find(item => item.code === value).id))
    };




    render() {

        if (this.state.offeringLoaded === true && this.state.locationLoaded === true && this.state.staffOfferingLoaded === true && this.state.periodLoaded === true) {

            var singleOffering = this.state.offeringData.find(item => item.staff_id === staffID);

            const data1 = this.state.staffOfferingData.map((data) => {
                var loc = this.state.locationData.find(item => item.id === singleOffering.location_id).name;
                var periodCode = this.state.periodData.find(item => item.id === data.period_id).code;
                //var period_code = Promise.all(fetchPeriod(data.location_id, data.period_id))

                //this.fetchPeriod(data.location_id, data.period_ID)
                //console.log(this.state.period_code);

                return (
                    <div key={data.id}>


                        <Card className={this.state.classes.card}>

                            <CardContent>
                                <Typography variant="headline" component="p">
                                    {singleOffering.unit_code} {singleOffering.name}
                                </Typography>
                                <Typography component="p">
                                    {loc} | {periodCode} | {singleOffering.pattern_code}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary" href="/PatternDetail" onClick={() => this.savePattern(singleOffering.pattern_code)}>
                                    Pattern Detail
          </Button>

                            </CardActions>
                        </Card>
                        <br />
                    </div >



                )
            });

            return (
                <div>
                    <h2>Offerings Assigned </h2>
                    {data1}
                    <h2>Summary</h2>
                    <Card className={this.state.classes.card}>
                        <CardContent>
                            <Typography gutterBottom variant="headline" component="h2">
                                RESEARCH
                            </Typography>
                            <Typography component="p">
                                Baseline Research: {userdata.baseline_research}
                            </Typography>
                            <Typography className={this.state.classes.pos} component="p">
                                Other Research: {userdata.research} <br />
                            </Typography>

                            <Typography gutterBottom variant="headline" component="h2">
                                SERVICE
                            </Typography>
                            <Typography component="p">
                                Baseline Service: {userdata.baseline_service} <br />
                            </Typography>
                            <Typography component="p">
                                Other Service: {userdata.service} <br />
                            </Typography>
                            <Typography component="p">
                                Service description: {userdata.service_description} <br />
                            </Typography>
                            <Typography className={this.state.classes.pos} component="p">
                                Extra: {userdata.extra} <br />
                            </Typography>

                        </CardContent>
                    </Card>
                </div>)
        }


        else {
            return (

                <div>

                    <h2>Offerings Assigned </h2>
                    <Card className={this.state.classes.card}>
                        <CardContent>
                            <ProgressSpinner />
                        </CardContent>
                    </Card>
                </div >
            )
        }
    }
}





export default withStyles(styles)(SimpleCard1)