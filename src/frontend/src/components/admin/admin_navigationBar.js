import React from 'react';
import { Nav, Navbar, NavDropdown, NavItem } from 'react-bootstrap';
import styled from 'styled-components';
import logo from "../../SUTDLogo 1.png";
import {checkValidity, getUserInfoJson, isHG, logout,isAdmin} from "../../functions/localstorage";

const Styles = styled.div`
  .navbar {
    background-color: #F3F6FA;
  }

  a, .navbar-nav, .navbar-light .nav-link {
    color: #3C64B1;

    &:hover {
      color: #322d2d;
    }
  }

  .navbar-brand {
    font-size: 1.4em;
    color: #9FFFCB;

    &:hover {
      color: #322d2d;
    }
  }

  .form-center {
    position: absolute !important;
    left: 25%;
    right: 25%;
  }
`;

export const AdminNavigationBar = () => (
    <Styles>
        <Navbar expand="lg">
            <Navbar.Brand href="/"><img src={logo} alt="SUTD Housing Portal" width={"50%"}/></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <NavDropdown title="Admin Tools">
                        <NavDropdown.Item href="/admin/house_guardian_add">Set House Guardians</NavDropdown.Item>
                        <NavDropdown.Item href="/admin/house_guardian_remove">Remove House Guardians</NavDropdown.Item>
                        <NavDropdown.Item href="/admin/disciplinary_record_create">Create Disciplinary Record</NavDropdown.Item>
                        <NavDropdown.Item href="/admin/disciplinary_record_view_all">View Disciplinary Records</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Events">
                        <NavDropdown.Item href="/event">Floor Events</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Application">
                        <NavDropdown.Item href="/admin/application_creation">Create Application</NavDropdown.Item>
                        <NavDropdown.Item href="/admin/application_viewing">View Applications</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Item><Nav.Link href="/login" onClick = {logout} id="adminlogout">Logout</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href="/">Home</Nav.Link></Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </Styles>
)
