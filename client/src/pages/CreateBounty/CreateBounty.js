import React, { Component } from 'react';
// import PublishIcon from '@material-ui/icons/Publish';
import "./CreateBounty.css"

class CreateBounty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bufferTrainingData: null,
            bufferModel: null,
            name: "",
            description: "",
            requirements: ""
        }
        this.fileInputRef = React.createRef();
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

    openFileDialog = () => {
        if (this.props.disabled) return;
        this.fileInputRef.current.click();
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

    onSubmit = (e) => {
        e.preventDefault();

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({
            "userhash": this.props.account,
            "name": this.state.name,
            "description": this.state.description,
            "requirements":{
                "accuracy": this.state.accuracy
            },
            "trainingdata": this.state.bufferTrainingData,
            "model": this.state.bufferModel
        });
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        fetch("http://localhost:3005/uploadRequest", requestOptions)
          .then(response => response.text())
          .then(result => {
              console.log(result);
          })
          .catch(error => console.log('error', error));

    }

    render() { 
        return (
            <div className="create-bounty-page">
                <div className="container">
                    {this.state.bufferModel == null && this.state.bufferTrainingData == null ? 
                    <div className="drop-zone" onClick={this.openFileDialog} style={{ cursor: this.props.disabled ? "default" : "pointer" }}>
                        <input 
                            ref={this.fileInputRef}
                            className="file-input"
                            type="file"
                            onChange={this.onTrainingDataAdded}
                        />
                        <span className="message"> Upload Files </span>
                    </div>

                    :
                    <form className="upload-form" onSubmit={this.onSubmit}>
                        <h3> Details </h3>

                    </form>
                    }
                </div>
            </div>
        );
    }
}
 
export default CreateBounty;