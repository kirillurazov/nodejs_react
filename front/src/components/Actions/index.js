import * as React from 'react';
import API from '../../../API';
import { Nav } from '../UI/Nav';

export class Actions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playId: '',
      act: {
        key: -1,
        body: '',
      },
      scene: {
        key: -1,
        body: '',
      },
      actions: [],
    };
  }

  componentDidMount() {
    if ((this.props.actIndex !== -1) && (this.props.sceneIndex !== -1)) {
      // console.log('will send request getScenes');
      API.getActions(this.props.playId, this.props.actIndex, this.props.sceneIndex)
        .then(response => {
          this.setState({
            playId: response.play,
            act: response.act,
            scene: response.scene,
            actions: response.actions
          });
        })
        .catch(error => console.warn('API request failed with error:', error));
    }
  }

  componentDidUpdate(prevProps) {
    if (
      (prevProps.playId !== this.props.playId)
      || (prevProps.actIndex !== this.props.actIndex)
      || (prevProps.sceneIndex !== this.props.sceneIndex)
    ) {
      this.componentDidMount();
    }
  }

  render() {
    return (
      <Nav
        data={this.state.actions}
        onSelect={this.props.onSelect}
        activeKey={this.props.activeKey}
      />
    );
  }
}
