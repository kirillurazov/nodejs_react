import * as React from 'react';
import { Plays } from '../../components/Plays';
import { Acts } from '../../components/Acts/index';
import { Scenes } from '../../components/Scenes';
import { Actions } from '../../components/Actions';
import { SingleAction } from '../../components/SingleAction';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePlayId: '',
      activeActIndex: -1,
      activeSceneIndex: -1,
      activeActionIndex: -1,
    };
  }

  onSwitchPlay = (playId) => {
    this.setState({
      activePlayId: playId,
      activeActIndex: -1,
      activeSceneIndex: -1,
      activeActionIndex: -1,
    });
  };

  onSwitchAct = (actIndex) => {
    this.setState({
      activeActIndex: actIndex,
      activeSceneIndex: -1,
      activeActionIndex: -1,
    });
  };

  onSwitchScene = (sceneIndex) => {
    this.setState({
      activeSceneIndex: sceneIndex,
      activeActionIndex: -1,
    });
  };

  onSwitchAction = (actionIndex) => {
    this.setState({
      activeActionIndex: actionIndex,
    });
  };

  render() {
    return (
      <div className={'page-container'}>
        <div className={'nav-container plays-container'}>
          <Plays
            onSelect={this.onSwitchPlay}
            activeKey={this.state.activePlayId}
          />
        </div>
        <div className={'nav-container acts-container'}>
          {
            (this.state.activePlayId) &&
            <Acts
              playId={this.state.activePlayId}
              onSelect={this.onSwitchAct}
              activeKey={this.state.activeActIndex}
            />
          }
        </div>
        <div className={'nav-container scenes-container'}>
          {
            (this.state.activeActIndex !== -1) &&
            <Scenes
              playId={this.state.activePlayId}
              actIndex={this.state.activeActIndex}
              onSelect={this.onSwitchScene}
              activeKey={this.state.activeSceneIndex}
            />
          }
        </div>
        <div className={'nav-container actions-container'}>
          {
            (this.state.activeSceneIndex !== -1) &&
            <Actions
              playId={this.state.activePlayId}
              actIndex={this.state.activeActIndex}
              sceneIndex={this.state.activeSceneIndex}
              onSelect={this.onSwitchAction}
              activeKey={this.state.activeActionIndex}
            />
          }
        </div>
        <div className={'nav-container single-action-container'}>
          {
            (this.state.activeActionIndex !== -1) &&
            <SingleAction
              playId={this.state.activePlayId}
              actIndex={this.state.activeActIndex}
              sceneIndex={this.state.activeSceneIndex}
              actionIndex={this.state.activeActionIndex}
            />
          }
        </div>
      </div>
    );
  }
}
