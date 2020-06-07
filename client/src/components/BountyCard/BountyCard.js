import React, { Component } from 'react';

import "./BountyCard.css"
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import {Link} from "react-router-dom"

const styles = {
    accept: {
        marginRight : "10px",
        marginBottom : "20px"
    }
}

class BountyCard extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const { classes } = this.props;

        return (
            <div className="bounty-card-div">
                <div className="bounty-card-detail-container">
                        <div className="bounty-card-title-div">{this.props.title}</div>
                        <div className="bounty-card-details">
                            <div>{this.props.description}</div>
                            <div>Required Accuracy: {this.props.data.requirements.accuracy}</div>
                        </div>
                        
                </div>
                <div className="right-panel-bounty-card">
                    <div className="bounty-price">{this.props.amount}</div>
                    <div style={{width: "100%", display : "flex", justifyContent : "flex-end", height: "100%", alignItems: "flex-end"}}>
                        <Link to="/find-bounty/fhaisduhfoiausdhfoiusdhfisoud" style={{textDecoration : "none", color : "black"}}>
                            <Button classes={{ root: classes.accept }} variant="contained" color="primary">
                                View Details
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default withStyles(styles)(BountyCard);
