import * as React from 'react';
import { Button, Col, Grid, ListGroupItem, Row } from 'react-bootstrap';
import { Speech } from '../Says';

export class NewSay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      draft: '',
    };
  }

  toggleView = () => {
    this.setState({
      active: !this.state.active,
    });
  };

  addSay = () => {
    this.toggleView();
    this.props.sayAdd({ say: this.state.draft });
    this.setState({
      active: false,
      draft: '',
    });
  };

  updateDraft = (value) => {
    this.setState({
      draft: value,
    })
  };

  render() {
    if (this.state.active) {
      return (
        <ListGroupItem>
          <Grid fluid={true}>
            <Row>
              <Col xs={6} style={{ textAlign: 'center' }}>
                <Button
                  bsStyle={'success'}
                  bsSize={'sm'}
                  onClick={this.addSay}
                >
                  Add
                </Button>
              </Col>
              <Col xs={6}>
                <Button
                  bsStyle={'default'}
                  bsSize={'sm'}
                  onClick={this.toggleView}
                >
                  Cancel
                </Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <Speech edit={this.state.active} onEdit={this.updateDraft}>{this.state.draft}</Speech>
              </Col>
            </Row>
          </Grid>
        </ListGroupItem>
      );
    } else {
      return (
        <Button
          block={true}
          bsStyle={'success'}
          onClick={this.toggleView}
        >
          Add New Say
        </Button>
      );
    }
  }
}
