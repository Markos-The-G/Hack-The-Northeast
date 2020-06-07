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
        this.fileInputRef = React.createRef();
    }

    WEI_TO_CAD = (WEI) => { return (WEI * ((10000 / 31) / (1000000000000000000))).toFixed(2); }

    componentDidMount(){
        var hash = decodeURI(this.props.hash)
        this.setState({
            name: hash
        })
      
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({"bountyName": hash});
        
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        console.log(raw)
        console.log(this.state)

        fetch("http://localhost:3005/currentAmount", requestOptions)
            .then(response => response.text())
            .then(result => {
                    console.log("OIOIO")
                    result = (bigInt(parseInt(result, 16)));
                    result = this.WEI_TO_CAD(result);

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
                    console.log(raw)
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

    openFileDialog = () => {
        if (this.props.disabled) return;
        this.fileInputRef.current.click();
    }

    onModelAdded = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = () => {
            this.setState({
                bufferedModel: Buffer(reader.result)
            })
            console.log("Updated buffered model: ", this.state.bufferedModel);
        }

    }

    CAD_TO_WEI = (CAD) => { return (CAD * (31/10000) * (1000000000000000000))}

    onSubmit = (e) => {
        console.log(this.state.bufferedModel);

        //call py endpoint
        //this will give us the result of the model

        var newAccuracy = 40
        var threshold = this.state.data.requirements.accuracy
        var amountLeft = this.state.price + 1;

        var moneyTheyGet = (newAccuracy/threshold) * amountLeft 
        var moneyTheyGet = bigInt(parseInt(this.CAD_TO_WEI(moneyTheyGet)));

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({"userhash": this.props.account});
        
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        
        fetch("http://localhost:3005/getAllBounties", requestOptions)
            .then(response => response.text())
            .then(result => {
                result = JSON.parse(result);

                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                var raw = JSON.stringify({
                    "accuracy": newAccuracy,
                    "bountyAccuracy": this.state.data.requirements.accuracy,
                    "userhash": this.props.account,
                    "bountyAddress": result[this.state.name].user,
                    "amount": moneyTheyGet
                });
                
                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };
                
                fetch("http://localhost:3005/payment", requestOptions)
                    .then(response => response.text())
                    .then(result => {
                        console.log(result);

                        if (result === "Full Payment") {
                            var myHeaders = new Headers();
                            myHeaders.append("Content-Type", "application/json");
                            
                            var raw = JSON.stringify({
                                "title": this.state.name,
                                "accuracy": newAccuracy,
                                "model": this.state.bufferedModel,
                                "status": true
                            });
                            
                            var requestOptions = {
                                method: 'POST',
                                headers: myHeaders,
                                body: raw,
                                redirect: 'follow'
                            };
                            
                            fetch("http://localhost:3005/updateModel", requestOptions)
                                .then(response => response.text())
                                .then(result => console.log(result))
                                .catch(error => console.log('error', error));

                        } else if (result === "Partial Payment") {
                            var myHeaders = new Headers();
                            myHeaders.append("Content-Type", "application/json");
                            
                            var raw = JSON.stringify({
                                "title": this.state.name,
                                "accuracy": newAccuracy,
                                "model": this.state.bufferedModel,
                                "status": false
                            });
                            
                            var requestOptions = {
                                method: 'POST',
                                headers: myHeaders,
                                body: raw,
                                redirect: 'follow'
                            };
                            
                            fetch("http://localhost:3005/updateModel", requestOptions)
                                .then(response => response.text())
                                .then(result => console.log(result))
                                .catch(error => console.log('error', error));
                        } else if (result === "No Payment") {

                        }

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
                    <div style={{marginLeft : "120px" ,display : "flex", justifyContent : "center", alignItems : "center", flex : 1, height : "100%"}}>
                        <CircularProgress />
                    </div>
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
                                        className="file-input"
                                        style={{display : "none"}}
                                        ref={this.fileInputRef}
                                        onChange={this.onModelAdded}
                                    />
                                    <label htmlFor="raised-model-filee">
                                        <Button variant="contained" color="primary" component="span">
                                            Attach Model
                                        </Button>
                                    </label> 

                                    </div>
                                    <div style={{width: "100%", display: "flex", justifyContent : "center", marginBottom : "30px"}}>
                                        <Button onClick={this.onSubmit} variant="contained" color="primary">
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