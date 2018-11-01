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
            help: [{
                Help: "list",
                Path: "operations/list",
                Title:" list",
            }],
            helpByPath: {},
        };
        this.getHelp();
    }
    getHelp() {
        rpc("rc/list", {}).then(response => {
            var byPath = {};
            response.commands.forEach(x => {
                byPath[x.Path] = x.Help;
            });
            this.setState({
                help: response.commands,
                helpByPath: byPath,
            });
            this.setMethod("operations/list");
        }).catch(error => {
            console.log("failed to read rc/help", error);
        });
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
    setMethod(method) {
        this.setState({
            method: method,
            output: this.state.helpByPath[method],
        });
    }
    render() {
        var methods = this.state.help.map(v => <option value={v.Path} key={v.Path}>{v.Path}: {v.Title}</option>);
        return (
            <div className="App">
              <select onChange={(event) => this.setMethod(event.target.value)}>{ methods }</select>
              <textarea rows="10" cols="50" value={this.state.input} onChange={(event) => this.setState({input: event.target.value})}></textarea>
              <button onClick={() => this.doRPC()}>Run</button>
              <pre>{this.state.output}</pre>
            </div>
        );
    }
}

export default App;
