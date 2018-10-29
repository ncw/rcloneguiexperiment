import React, { Component } from 'react';
import './App.css';
import { rpc } from './rclone.js';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            method: "operations/list",
            input: '{ "fs": "/tmp", "remote": "", "opt":{} }',
            output: 'RPC output goes here',
        };
    }
    doRPC() {
        console.log("doRPC");
        var input;
        try {
            input = JSON.parse(this.state.input);
        } catch(err) {
            this.setState({
                output: "Failed to parse JSON input: " + err.message,
            });
            return;
        }
        console.log(this.state.method);
        console.log(input);
        rpc(this.state.method, input).then(response => {
            var result = JSON.stringify(response, null, 4);
            console.log("success", result);
            this.setState({
                output: result,
            });
        }).catch(error => {
            var result = JSON.stringify(error, null, 4);
            this.setState({
                output: "FAILED: " + result,
            });
        });
    }
    render() {
        return (
            <div className="App">
              <input type="text" value={this.state.method}  onChange={(event) => this.setState({method: event.target.value})} />
              <textarea rows="4" cols="50" value={this.state.input} onChange={(event) => this.setState({input: event.target.value})}></textarea>
              <button onClick={() => this.doRPC()}>Run</button>
              <pre>{this.state.output}</pre>
            </div>
        );
    }
}

export default App;
