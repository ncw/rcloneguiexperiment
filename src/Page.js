import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { rclone } from './rclone.js';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import App from './App';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: "App",
    };
  }
  render() {
    return (
      <Router><>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">Rclone</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <LinkContainer to="/"><Nav.Link href="/">Home</Nav.Link></LinkContainer>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <LinkContainer to="/test/"><NavDropdown.Item>Test</NavDropdown.Item></LinkContainer>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div id="Page.main">
          {/* <Route path="/" exact component={Index} /> */}
          <Route path="/test/" exact component={App} />
        </div>
      </></Router>
    );
  }
}

export default Page;
