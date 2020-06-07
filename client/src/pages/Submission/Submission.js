import React, { Component } from 'react';

import "./Submission.css"
import bigInt from 'big-integer';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

class Submission extends Component {
    constructor(props) {
        super(props);
        this.state = {
            price : "",
            data : {},
            loading : true
        }
    }

    CONVERSION_RATE = (WEI) => { return (WEI * ((10000 / 31) / (1000000000000000000))).toFixed(2); }

    componentDidMount(){
        var hash = decodeURI(this.props.hash)
        console.log(hash)
      
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({"bountyName": hash});
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        fetch("http://localhost:3005/currentAmount", requestOptions)
          .then(response => response.text())
          .then(result => {

                result = (bigInt(parseInt(result, 16)));
                result = this.CONVERSION_RATE(result);

                this.setState({price : result})

                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                
                var raw = JSON.stringify({"userhash": this.props.account ,"name": hash});
                
                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };
                
                fetch("http://localhost:3005/searchBounty", requestOptions)
                    .then(response => response.text())
                    .then(result => {
                            console.log(JSON.parse(result))
                            this.setState({
                                data : JSON.parse(result), 
                                loading : false
                            })
                        })
                    .catch(error => console.log('error', error));
            })
          .catch(error => console.log('error', error));

    }

    render() { 
        return (
            <div>
                {
                    this.state.loading
                    ?
                    <CircularProgress />
                    :

                        <div>
                            <div className="find-bounty-title">{this.state.data.name}</div>
                            <div style={{display: "flex"}}>
                                <div>

                                    <div className="find-bounty-box1">
                                            <div className="find-bounty-details-title">Bounty Description:</div>
                                            <div className="find-bounty-details-subtitle">{this.state.data.description}</div>
                                            <div className="find-bounty-details-title">Remaining Amount:</div>
                                            <div className="find-bounty-details-subtitle">${this.state.price} CAD</div>
                                            <div className="find-bounty-details-title">Bounty Requirements:</div>
                                            <div className="find-bounty-details-subtitle">Accuracy: {this.state.data.requirements.accuracy}%</div>

                                        </div>
                                        <div className="find-bounty-box1">
                                            <div className="find-bounty-details-title">Base Model</div>
                                            <div className="find-bounty-details-button">
                                                <Button target="_blank" href={this.state.data.modelLink} variant="contained" color="primary">
                                                    Download
                                                </Button>
                                            </div>
                                            <div className="find-bounty-details-title">Test Data</div>
                                            <div className="find-bounty-details-button">
                                                <Button target="_blank" href={this.state.data.trainingDataLink} variant="contained" color="primary">
                                                    Download
                                                </Button>
                                            </div>
                                        </div>

                                </div>
                                <div className="bounty-submission-div">
                                    <div className="find-bounty-details-title">Submission</div>
                                    <div className="small-text" style={{marginLeft : "10px" ,width: "240px"}}>Note, only one submission is allowed per bounty</div>

                                    <div style={{display: "flex", justifyContent : "center", alignItems : "center", flex : 1, flexDirection : "column"}}>




                                    <input 
                                    type="file"
                                    id="raised-model-filee"
                                    style={{display : "none"}}
                                    />
                                    <label htmlFor="raised-model-filee">
                                        <Button variant="contained" color="primary" component="span">
                                            Attach Model
                                        </Button>
                                    </label> 


















                                        
                                    </div>
                                    <div style={{width: "100%", display: "flex", justifyContent : "center", marginBottom : "30px"}}>
                                        <Button variant="contained" color="primary">
                                            Submit
                                        </Button>
                                    </div>
                                </div>
                                
                            </div>
                            

                            

                       
                        </div>
                }
            </div>
                
        );
    }
}
 
export default Submission;