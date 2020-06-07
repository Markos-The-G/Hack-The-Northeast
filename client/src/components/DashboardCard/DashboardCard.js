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
                            25
                        </div>
                        <div style={{height: "20px"}}></div>
                        <div className="dashboard-analytics-header-div">
                            Highest Accuracy Submitted:
                        </div>
                        <div className="dashboard-analytics-data">
                            74%
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default withStyles(styles)(DashboardCard);
