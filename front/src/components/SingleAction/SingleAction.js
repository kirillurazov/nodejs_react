import * as React from 'react';
import API from '../../API/index';
import { Button, Glyphicon, ListGroup } from 'react-bootstrap';
import { Say } from '../Says';
import { NewSay } from './NewSay';

export class SingleAction extends React.Component {
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
      action: {
        key: -1,
        body: {
          title: '',
          character: '',
        },
      },
      says: [],
    };
  }

  componentDidMount() {
    if (
      (this.props.actIndex !== -1)
      && (this.props.sceneIndex !== -1)
      && (this.props.actionIndex !== -1)
    ) {
      // console.log('will send request getScenes');
      this.fetchData();
    }
  }

  componentDidUpdate(prevProps) {
    if (
      (prevProps.playId !== this.props.playId)
      || (prevProps.actIndex !== this.props.actIndex)
      || (prevProps.sceneIndex !== this.props.sceneIndex)
      || (prevProps.actionIndex !== this.props.actionIndex)
    ) {
      this.fetchData();
    }
  }

  fetchData = () => {
    API.getSingleAction(this.props.playId, this.props.actIndex, this.props.sceneIndex, this.props.actionIndex)
      .then(response => {
        this.setState({
          playId: response.play,
          act: response.act,
          scene: response.scene,
          action: response.action,
          says: response.says,
        });
      })
      .catch(error => console.warn('API request failed with error:', error));
  };

  sayAdd = (value) => {
    API.addSay(
      this.state.playId,
      this.state.act.key,
      this.state.scene.key,
      this.state.action.key,
      value
    )
      .then((response) => {
        console.log(response);
        this.setState({
          says: response,
        });
      })
      .catch(error => console.warn('API request failed with error:', error));
  };

  sayEdit = (sayIndex) => (newValue) => {
    API.editSay(
      this.state.playId,
      this.state.act.key,
      this.state.scene.key,
      this.state.action.key,
      sayIndex,
      newValue
    )
      .then((response) => {
        console.log(response);
        this.setState({
          says: response,
        });
      })
      .catch(error => console.warn('API request failed with error:', error));
  };

  sayDel = (sayIndex) => () => {
    API.delSay(
      this.state.playId,
      this.state.act.key,
      this.state.scene.key,
      this.state.action.key,
      sayIndex
    )
      .then((response) => {
        console.log(response);
        this.setState({
          says: response,
        });
      })
      .catch(error => console.warn('API request failed with error:', error));
  };

  render() {
    return (
      <div>
        <h2 className={'action-title'}>
          {this.state.action.body.title}
          <Button onClick={this.fetchData}>
            <Glyphicon glyph={'repeat'}/>
          </Button>
        </h2>
        <h3>Character: {this.state.action.body.character}</h3>
        <ListGroup>
          {
            this.state.says.map((say, index) => {
              return <Say
                key={index}
                say={say.body}
                sayEdit={this.sayEdit(index)}
                sayDel={this.sayDel(index)}
              />
            })
          }
        </ListGroup>
        <NewSay sayAdd={this.sayAdd}/>
      </div>
    );
  }
}
