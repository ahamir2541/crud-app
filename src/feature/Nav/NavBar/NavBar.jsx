import React, { Component } from 'react';
import { Container, Menu, Button } from 'semantic-ui-react'
import { NavLink, Link, withRouter } from 'react-router-dom'
import SignInMenu from '../SignInMenu/SignInMenu'
import SignOutMenu from '../SignOutMenu/SignOutMenu'

class NavBar extends Component {

    state = {
        authenticated : false
    }

    handleSingIn = () => {
        this.setState({
            authenticated : true
        })
    }
    
    handleSingOut = () => {
        this.setState({
            authenticated : false
        })
        this.props.history.push('/')
    }

    render() {
        const {authenticated} = this.state
        return (
            <Menu inverted fixed="top">
                <Container>
                    <Menu.Item as={Link} to="/" header>
                        <img src="/assets/logo.png" alt="logo" />
                        Re-vents
                      </Menu.Item>
                    <Menu.Item as={NavLink} to="/events" name="Events" />
                    { authenticated && <Menu.Item as={NavLink} to="/people" name="People" /> }
                    { authenticated && <Menu.Item>
                        <Button as={NavLink} to="/createEvent" floated="right" positive inverted content="Create Event" />
                    </Menu.Item> }
                    { authenticated ? 
                    <SignInMenu signOut={this.handleSingOut} /> : <SignOutMenu singIn={this.handleSingIn} /> }
                </Container>
            </Menu>
        );
    }
}

export default withRouter(NavBar);