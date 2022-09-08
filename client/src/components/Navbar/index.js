import React, { Component } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import {Link} from "react-router-dom";

export default class NavbarComp extends Component {
    render() {
        return (           
                <div>
                    <Navbar variant={"dark"} expand="lg" style={{ backgroundColor: '#6096ba', color: 'white', padding: '10px'  }}>
                        <Navbar.Brand href="/">Menu </Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                            <Nav
                                className="mr-auto my-2 my-lg-0"
                                style={{ maxHeight: '160px' }}
                                navbarScroll
                            >
                                <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                                <Nav.Link as={Link} to="/me">Profile</Nav.Link>
                                <Nav.Link as={Link} to="/users">Users</Nav.Link>
                                <Nav.Link as={Link} to="/patients">Patients</Nav.Link>                                

                            </Nav>

                        </Navbar.Collapse>
                    </Navbar>
                </div>
        )
    }
}