import * as React from 'react';
import API from '../../API/index';
import { Nav } from '../UI/Nav/index';

export class Acts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playId: '',
      acts: [],
    };
  }

  componentDidMount() {
    if (this.props.playId) {
      API.getActs(this.props.playId)
        .then(response => {
          this.setState({
            playId: response.play,
            acts: response.acts,
          });
        })
        .catch(error => console.warn('API request failed with error:', error));
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.playId !== this.props.playId) {
      this.componentDidMount();
    }
  }

  render() {
    return (
      <Nav
        data={this.state.acts}
        onSelect={this.props.onSelect}
        activeKey={this.props.activeKey}
      />
    );
  }
}
