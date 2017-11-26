import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authenticate} from '../actions/authenticate';
import DisplayData from './DisplayData';

class App extends Component {

  componentDidMount() {
    this.props.authenticate();
  }

  render() {
    return (
      <div style={{margin: "10px"}}>
        { this.props.auth.hasAuthenticated === true ? <DisplayData/> : <div>Getting IBM Watson Token...</div> }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.authenticate
});

const mapDispatchToProps = (dispatch) => ({
  authenticate: (body) => dispatch(authenticate(body))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
