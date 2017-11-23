import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchData } from '../actions/fetchData';
import { renderData } from '../util/util';

class DisplayData extends Component {

  componentDidMount() {
  }
  
  render() {
    return (
      <div>
        { this.props.data !== null && renderData(this.props.data) }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.fetchData,
  hasErrored: state.fetchDataHasErrored,
  isLoading: state.fetchDataIsLoading
});

const mapDispatchToProps = (dispatch) => ({
  fetchData: (body) => dispatch(fetchData(body))
});

export default connect(mapStateToProps, mapDispatchToProps)(DisplayData);

