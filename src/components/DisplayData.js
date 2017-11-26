import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchData } from '../actions/fetchData';
import { authenticate } from '../actions/authenticate';


class DisplayData extends Component {

  componentDidMount() {
    this.props.data.forEach( act => {
      act.scenes.forEach( scene => {
        this.props.fetchData({
          paragraph: scene.paragraph,
          act: act.act,
          scene: scene.scene,
          token: this.props.auth.token
        });
      });
    });
  }
  
  render() {
    const renderData = (data) => {
      return data.map(data => 
        <div style={{margin: "10px"}} key={data.act}>
          { data.act }
          { displayScenes(data.scenes) }
        </div>
      );
    }

    const renderScore = (score) =>
    <div style={{fontSize: "x-small"}}>
      <div>Sadness: {score.sadness} </div>
      <div>Joy: {score.joy} </div>
      <div>Fear: {score.fear} </div>
      <div>Disgust: {score.disgust} </div>
      <div>Anger: {score.anger} </div>
    </div>;

    const displayScenes = (scenes) => {
      return scenes.map(scene => 
        <div style={{fontSize: "small", margin: "20px"}} key={scene.scene}>
          {scene.scene}
          {scene.score !== null ? renderScore(scene.score) : <div>(loading score...)</div>}
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
  auth: state.authenticate
});

const mapDispatchToProps = (dispatch) => ({
  fetchData: (body) => dispatch(fetchData(body)),
  authenticate: (body) => dispatch(authenticate(body)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DisplayData);

