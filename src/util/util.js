import React, { Component } from 'react';

export const renderData = (data) => {
  let acts = [];
  for (const key of Object.keys(data)) {
    acts.push(key);
  }
  
  return acts.map(act => 
    <div key={act}>
      { act }
      <div>
        { displayScenes(data[act], act) }
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