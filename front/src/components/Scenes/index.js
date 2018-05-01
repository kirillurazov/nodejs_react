import * as React from 'react';
import API from '../../API/index';
import { Nav } from '../UI/Nav/index';

export class Scenes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playId: '',
      act: {
        key: -1,
        body: '',
      },
      scenes: [],
    };
  }

  componentDidMount() {
    if (this.props.actIndex !== -1) {
      // console.log('will send request getScenes');
      API.getScenes(this.props.playId, this.props.actIndex)
        .then(response => {
          this.setState({
            playId: response.play,
            act: response.act,
            scenes: response.scenes
          });
        })
        .catch(error => console.warn('API request failed with error:', error));
    }
  }

  componentDidUpdate(prevProps) {
    if (
      (prevProps.playId !== this.props.playId)
      || (prevProps.actIndex !== this.props.actIndex)
    ) {
      this.componentDidMount();
    }
  }

  render() {
    return (
      <Nav
        data={this.state.scenes}
        onSelect={this.props.onSelect}
        activeKey={this.props.activeKey}
      />
    );
  }
}
