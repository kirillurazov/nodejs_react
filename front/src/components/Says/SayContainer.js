import * as React from 'react';
import { Button, Glyphicon, ListGroupItem } from 'react-bootstrap';
import { Speech } from './Speech';

export class Say extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      say: props.say,
      draft: props.say,
    }
  }

  /*
    componentDidMount() {
      this.setState({
        say: this.props.say,
      });
    }
  */

  componentDidUpdate(prevProps) {
    if (prevProps.say !== this.props.say) {
      this.setState({
        say: this.props.say,
        draft: this.props.say,
      });
    }
  }

  toggleView = () => {
    this.setState({
      active: !this.state.active,
    });
  };

  updateDraft = (value) => {
    this.setState({
      draft: value,
    })
  };

  editSay = () => {
    this.toggleView();
    this.props.sayEdit({ say: this.state.draft });
  };

  cancelFromEdit = () => {
    this.setState({
      active: !this.state.active,
      draft: this.props.say,
    });
  };

  render() {
    return (
      <ListGroupItem className={'say-container'}>
        {
          (this.state.active) ?
            <Button
              bsStyle={'success'}
              bsSize={'sm'}
              onClick={this.editSay}
            >
              <Glyphicon glyph={'ok'}/>
            </Button>
            :
            <Button
              bsStyle={'primary'}
              bsSize={'sm'}
              onClick={this.toggleView}
            >
              <Glyphicon glyph={'pencil'}/>
            </Button>
        }
        <div className={'speech-container'}>
          <Speech edit={this.state.active} onEdit={this.updateDraft}>{this.state.say}</Speech>
        </div>
        {
          (this.state.active) ?
            <Button
              bsStyle={'default'}
              bsSize={'sm'}
              onClick={this.cancelFromEdit}
            >
              Cancel
            </Button>
            :
            <Button
              bsStyle={'danger'}
              bsSize={'sm'}
              onClick={this.props.sayDel}
            >
              <Glyphicon glyph={'remove'}/>
            </Button>
        }
      </ListGroupItem>
    );
  }
}
