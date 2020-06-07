import React, { Component } from 'react';
// import PublishIcon from '@material-ui/icons/Publish';
import "./CreateBounty.css"

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { ethers, utils } from 'ethers';

class CreateBounty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bufferTrainingData: null,
            bufferModel: null,
            name: "",
            description: "",
            requirements: "",
            amount: null,
            accuracy: null
        }
        this.fileInputRef1 = React.createRef();
        this.fileInputRef2 = React.createRef();
    }

    clearFile = () => {
        this.setState({
            bufferTrainingData: null,
            bufferModel: null,
            name: "",
            description: "",
            accuracy: null
        })
    }

    openFileDialog1 = () => {
        if (this.props.disabled) return;
        this.fileInputRef1.current.click();
    }

    openFileDialog2 = () => {
        if (this.props.disabled) return;
        this.fileInputRef2.current.click();
    }

    onTrainingDataAdded = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsArrayBuffer(file);

        reader.onloadend = () => {
            this.setState({
                bufferTrainingData: Buffer(reader.result)
            })
            console.log("bufferTraining: ", this.state.bufferTrainingData);
        }
    }

    onModelAdded = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsArrayBuffer(file);

        reader.onloadend = () => {
            this.setState({
                bufferModel: Buffer(reader.result)
            })
            console.log("bufferModel: ", this.state.bufferModel);
        }
    }

    CONVERSION_RATE = (CAD) => { return (CAD * (31/10000) * (1000000000000000000))}

    onSubmit = (e) => {
        e.preventDefault();


            
        let etherCost = this.CONVERSION_RATE(this.state.amount)
            
        let tx = this.props.signer.sendTransaction({
            to: '0xa3f150De117A8FCb51A57206FEf47FA5dE78cF5f', 
            value: etherCost
        }).then ( (t) => {
            console.log(t);
        })


















        
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({
            "userhash": "0x5f6deEf5aD5543098169c08486cdDBFE9b9D24bb",
            "name": this.state.name,
            "description": this.state.description,
            "requirements":{
                "accuracy": this.state.accuracy
            },
            "trainingdata": this.state.bufferTrainingData,
            "model": this.state.bufferModel,
            "amount": this.CONVERSION_RATE(this.state.amount)
        });
        
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        
        
        fetch("http://localhost:3005/addBounty", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log("DONE");
                
            
  
            })
            .catch(error => console.log('error', error));
    }

    render() { 
        return (
            <div className="create-bounty-page">
                <div className="create-bounty-title">
                    Create Bounty
                </div>
                <div className="create-bounty-content">
                    <div style={{width: "100%", display: "flex", justifyContent : "space-evenly", marginTop : "50px"}}>
                        <TextField onChange={(e) => {this.setState({ name: e.target.value })}} id="standard-basic" label="Name" />
                        <TextField onChange={(e) => {this.setState({ amount: e.target.value })}} id="standard-basic" label="Amount CAD" />
                    </div>
                    <div style={{width: "85%", display: "flex", justifyContent : "space-evenly", marginTop : "50px"}}>
                        <TextField onChange={(e) => {this.setState({ description: e.target.value })}} multiline={true} fullWidth id="standard-basic" label="Description" />
                    </div>
                    <div style={{width: "85%", display: "flex", justifyContent : "space-evenly", marginTop : "50px"}}>
                        <TextField onChange={(e) => {this.setState({ accuracy: e.target.value })}} multiline={true} fullWidth id="standard-basic" label="Required Accuracy %" />
                    </div>

                    <div style={{display: "flex", justifyContent : "space-evenly", width: "100%", marginTop : "30px"}}>
                        <input 
                            ref={this.fileInputRef1}
                            className="file-input"
                            type="file"
                            onChange={this.onTrainingDataAdded}
                            id="raised-button-filee"
                            style={{ display: 'none' }}
                        />
                        <label htmlFor="raised-button-filee">
                            <Button variant="contained" color="primary" component="span">
                                Upload Training Data
                            </Button>
                        </label> 

                        <input 
                            ref={this.fileInputRef2}
                            className="file-input"
                            type="file"
                            onChange={this.onModelAdded}
                            id="raised-button-file"
                            style={{ display: 'none' }}
                        />
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" color="primary" component="span">
                                Upload A Model
                            </Button>
                        </label> 
                    </div>
                    <Button onClick={this.onSubmit} variant="contained" color="primary" style={{marginTop : "30px", marginBottom : "30px"}}>
                        Submit
                    </Button>
                </div>
            </div>
        );
    }
}
 
export default CreateBounty;