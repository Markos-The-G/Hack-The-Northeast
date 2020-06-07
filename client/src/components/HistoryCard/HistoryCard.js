import React, { Component } from 'react';

import "./HistoryCard.css"

class HistoryCard extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <div className="history-card-div">
                <div style={{marginLeft : "20px"}}>Coronavirus detector</div>
                <div style={{flex : 1}}></div>
                <div style={{marginRight : "10px", fontSize : "25px"}}>88%</div>
            </div>
        );
    }
}
 
export default HistoryCard;