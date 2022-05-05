import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import { Login } from './Login';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render () {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
          <Container>
            <NavbarBrand tag={Link} to="/rates">MobileOperator</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                <LoginButton />
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}

class LoginButton extends Component {

    constructor(props) {
        super(props);

        this.state = {
            role: ""
        };

        this.onClick = this.onClick.bind(this);
        this.onChangeRole = this.onChangeRole.bind(this);

    }

    onChangeRole() {

    }


    CheckRole() {
        var url = "/api/Account/isAuthenticated";
        var xhr = new XMLHttpRequest();
        xhr.open("post", url, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ role: data.role });
            //this.forceUpdate();
            //this.render();
        }.bind(this);
        xhr.send();
    }

    componentDidMount() {
        this.CheckRole();
    }

    onClick() {
        var url = "/api/Account/LogOff";
        var xhr = new XMLHttpRequest();
        xhr.open("post", url, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
        }.bind(this);
        xhr.send();
        //let navigate = useNavigate();
        //navigate("/rate", { replace: true });
        //this.CheckRole();
        window.location.reload();
        //this.forceUpdate();
        //this.CheckRole();
        //this.render();
        //this.forceUpdate();
    }

    render() {
        //this.CheckRole();
        if (this.state.role == "")
            return (
                <>
                    <NavItem>
                        <NavLink tag={Link} className="text-dark" to="/rates">Тарифы</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} className="text-dark" to="/login">Вход</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} className="text-dark" to="/registration">Регистрация</NavLink>
                    </NavItem>
                </>
            );
        else
            if (this.state.role == "user")
                return (
                    <>
                        <NavItem>
                            <NavLink tag={Link} className="text-dark" to="/rates">Тарифы</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} className="text-dark" onClick={this.onClick}>Выход</NavLink>
                        </NavItem>
                    </>
                );
            else return (
                <>
                    <NavItem>
                        <NavLink tag={Link} className="text-dark" to="/rates">Тарифы</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} className="text-dark" to="/clients">Клиенты</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} className="text-dark" onClick={this.onClick}>Выход</NavLink>
                    </NavItem>
                </>
            );
    }
}
