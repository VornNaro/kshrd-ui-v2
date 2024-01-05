import React, { Component } from 'react';
import { Card, Container, Form, Col, Row, Button } from 'react-bootstrap';
import './login-screen.css';
import { connect } from 'react-redux';
import { login } from '../../redux/Actions/admin/loginActions/LoginAction';
import { bindActionCreators } from 'redux';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  //TODO: This function is created to handle Username and password changes
  onChange = (e) => {
    
    this.setState({
      [e.target.name]: e.target.value,
    });

  };

  //TODO: This function is created to login
  onLogin = async () => {
    try {
      await this.props.login(this.state.username, this.state.password);
      if (this.props.token != null) {
        this.props.history.push('/admin');
      } else {
        this.setState({
          username: '',
          password: '',
        });
        alert(this.props.errorMessage);
      }
    } catch {}
  };

  render() {
    return (
      <Container className="login-container">
        <h2 className="text-center title">Korea Software HRD Center</h2>
        <Card className="loginCard">
          <Card.Body className="py-5 px-5">
            <Form className="container mx-auto">
              <Form.Group as={Row} className="d-flex justify-content-center">
                <Col sm="12">
                  <Form.Control
                    className="textField"
                    name="username"
                    placeholder="username"
                    value={this.state.username}
                    onChange={this.onChange}
                    type="text"
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="d-flex justify-content-center">
                <Col sm="12">
                  <Form.Control
                    className="no-outline"
                    type="password"
                    name="password"
                    value={this.state.password}
                    placeholder="Password"
                    onChange={this.onChange}
                  />
                </Col>
              </Form.Group>

              <div className="text-center mt-4">
                
                <Button className="loginButton" onClick={this.onLogin} block>
                  {this.props.loading ? (
                    <i className="fa fa-spinner fa-spin"></i>
                  ) : (
                    'Login'
                  )}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
        <h6 className="text-center my-4 title">
          {new Date().getFullYear()}© Korea Software HRD Center. All right
          reserved.
        </h6>
      </Container>
    );
  }
}

// map state in store
const mapStateToProps = (state) => {
  return {
    token: state.loginReducer.data,
    loading: state.loginReducer.loading,
    errorMessage: state.loginReducer.errorMessage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      login,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
