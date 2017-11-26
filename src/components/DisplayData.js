import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchData } from '../actions/fetchData';

class DisplayData extends Component {

  componentDidMount() {
    this.props.data.forEach( act => {
      act.scenes.forEach( scene => {
        this.props.fetchData({
          paragraph: scene.paragraph,
          act: act.act,
          scene: scene.scene
        })
      })
    })
  }
  
  render() {
    const renderData = (data) => {
      return data.map(data => 
        <div key={data.act}>
          { data.act }
          { displayScenes(data.scenes) }
        </div>
      );
    }

    const renderScore = (score) =>
    <div>
      <div>Sadness: {score.sadness} </div>
      <div>Joy: {score.joy} </div>
      <div>Fear: {score.fear} </div>
      <div>Disgust: {score.disgust} </div>
      <div>Anger: {score.anger} </div>
    </div>;

    const displayScenes = (scenes) => {
      return scenes.map(scene => 
        <div key={scene.scene}>
          {scene.scene}
          {scene.score !== null && renderScore(scene.score)}
        </div>
      );
    }

    return (
      <div>
        { this.props.data !== null && renderData(this.props.data) }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.fetchData.acts,
  hasErrored: state.fetchDataHasErrored,
  isLoading: state.fetchDataIsLoading,
  hasAuthenticated: state.fetchDataHasAuthenticated
});

const mapDispatchToProps = (dispatch) => ({
  fetchData: (body) => dispatch(fetchData(body))
});

export default connect(mapStateToProps, mapDispatchToProps)(DisplayData);

