import React, { Component } from 'react';

import "./BountyCard.css"
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

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
                    <div className="bounty-card-title-div">Identify Flower Families</div>
                        <div className="bounty-card-details">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                            nisi ut aliquip ex ea commodo consequat.
                        </div>
                        
                </div>
                <div className="right-panel-bounty-card">
                    <div className="bounty-price">$2,000</div>
                    <div style={{width: "100%", display : "flex", justifyContent : "flex-end", height: "100%", alignItems: "flex-end"}}>
                        <div>
                            <Button classes={{ root: classes.accept }} variant="contained" color="primary">
                                View Details
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default withStyles(styles)(BountyCard);
