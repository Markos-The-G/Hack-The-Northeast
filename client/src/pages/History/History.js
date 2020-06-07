import React, { Component } from 'react';

import "./History.css"

import HistoryCard from "../../components/HistoryCard/HistoryCard.js"

class History extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }


    componentDidMount(){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({"userhash":"0x5745975468AEd4Fd4f8932fD768EA3c6A3F0898c"});
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        fetch("http://localhost:3005/retrieveTempSubmissionArray", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
    }



    render() { 
        return (
            <div className="history-div">
                <div className="history-title">History and Activity</div>
                <div className="history-content-div">
                    <HistoryCard/>
                </div>
            </div>
        );
    }
}
 
export default History;