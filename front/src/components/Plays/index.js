import * as React from 'react';
import API from '../../API/index';
import { Nav } from '../UI/Nav/index';

export class Plays extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playsId: [],
    };
  }

  componentDidMount() {
    API.getAllPlaysIds()
      .then((response) => {
        this.setState({
          playsId: response.map(item => {
            return {
              key: item,
              body: item,
            };
          }),
        });
        return response;
      })
      .catch(error => console.warn('API request failed with error:', error));
  }

  render() {
    return (
      <Nav
        data={this.state.playsId}
        onSelect={this.props.onSelect}
        activeKey={this.props.activeKey}
      />
    );
  }
}
