import React from 'react';
import {Button, Navbar, NavbarToggler, NavItem, 
        Nav, Collapse, NavbarBrand, NavLink} from 'reactstrap';
import {connect} from 'react-redux';
import * as actions from '../actions/actionCreators';

const Header = (props) => {
  return(
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/"> <h1> THE SOCIAL NETWORKz</h1></NavbarBrand>
          <NavbarToggler />
          <Collapse navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Button onClick={props.toggle}>Create New Post</Button>
              </NavItem>

            { props.auth ?
              <NavItem>
                <NavLink onClick={props.logout} href="/">Logout</NavLink>
              </NavItem>

              :
              
              <div>
              <NavItem>
                <NavLink href="/register">Register</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/login">Login</NavLink>
              </NavItem>
              </div>
              
            }
            </Nav>
          </Collapse>
        </Navbar>
      </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    toggle: () => dispatch(actions.createPost()),
    logout: () => dispatch(actions.logout())
  }
}

export default connect(null, mapDispatchToProps)(Header);