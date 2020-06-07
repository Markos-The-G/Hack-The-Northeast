import React, { Component } from 'react';

import "./DashboardCard.css"
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
const styles = {
    accept: {
        background: "#5f9650",
        color: "white",
        "&:hover": {
            background: "#335c28"
        }
    },
    report: {
        background: "#a82f2f",
        margin: "5px",
        color: "white",
        "&:hover": {
            background: "#701a1a"
        }
    },
}

class DashboardCard extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const { classes } = this.props;

        return (
            <div className="dashboard-card-div">
                <div className="dashboard-card-header-div">
                    <div>Identifying Flower Families</div>
                    <Button variant="contained" classes={{ root: classes.accept }} onClick={this.onSubmitYes}> Active </Button>
                </div>
                <div className="dashboard-card-content-div">
                    <div className="dashboard-analytics-div">
                        <div className="dashboard-analytics-header-div">
                            Number of Submissions:
                        </div>
                        <div className="dashboard-analytics-data">
                            2
                        </div>
                        <div style={{height: "15px"}}></div>
                        <div className="dashboard-analytics-header-div">
                            Highest Accuracy Submitted:
                        </div>
                        <div className="dashboard-analytics-data">
                            96%
                        </div>
                        <div style={{height: "15px"}}></div>
                        <div className="dashboard-analytics-header-div">
                            Accuracy Threshold:
                        </div>
                        <div className="dashboard-analytics-data">
                            90%
                        </div>
                    </div>
                    <div style={{display : "flex", flex : 1, flexDirection : "column", height: "100%"}}>
                        <div className="row-thing" style={{width : "100%", display : "flex", alignItems : "flex-end"}}>
                                <div style={{fontSize : "20px"}}>96% accuracy</div>
                                <div style={{color : "grey"}}>, submitted just now</div>   

                        </div>
                        {/* <div className="row-thing" style={{width : "100%", display : "flex", alignItems : "flex-end"}}>
                                <div style={{fontSize : "20px"}}>88% accuracy</div>
                                <div style={{color : "grey"}}>, submitted 6 hours ago</div>   

                        </div>
                        <div className="row-thing" style={{width : "100%", display : "flex", alignItems : "flex-end"}}>
                                <div style={{fontSize : "20px"}}>88% accuracy</div>
                                <div style={{color : "grey"}}>, submitted 6 hours ago</div>   

                        </div>
                        <div className="row-thing" style={{width : "100%", display : "flex", alignItems : "flex-end"}}>
                                <div style={{fontSize : "20px"}}>88% accuracy</div>
                                <div style={{color : "grey"}}>, submitted 6 hours ago</div>   

                        </div> */}
                    </div>
                </div>
            </div>
        );
    }
}
 
export default withStyles(styles)(DashboardCard);
