import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchData } from '../actions/fetchData';

class DisplayData extends Component {

  componentDidMount() {
    this.props.fetchData('IBM is an American multinational technology company headquartered in Armonk, New York, United States, with operations in over 170 countries.');
  }


  render() {

    const acts = () => {
      let acts = [];
      for (const key of Object.keys(this.props.data)) {
        acts.push(key);
      }
      
      return acts.map(act => 
        <div key={act}>
          { act }
          <div>
            { displayScenes(this.props.data[act], act) }
          </div>
        </div>
      );
    }

    const displayScenes = (act, actTitle) => {
      let scenes = [];
      for (const key of Object.keys(act)) {
        scenes.push(key);
      }
      //{this.props.data[actTitle][scene].join(' ')}
      return scenes.map(scene => 
        <div key={scene}>
          {scene}
        </div>
      );
    }

    return (
      <div>
        { this.props.data !== null && acts() }
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

