import React, { Component } from 'react';
import { Menu, Button } from 'semantic-ui-react'

class SignOutMenu extends Component {
    render() {
        const {singIn} = this.props
        return (
            <Menu.Item position="right" >
                <Button onClick={singIn} basic inverted content="Login" />
                <Button basic inverted content="Register" style={{
                    marginLeft: '0.5em'
                }} />
            </Menu.Item>
        );
    }
}

export default SignOutMenu;
