import * as React from 'react';
import { FormControl } from 'react-bootstrap';

export class Speech extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: props.children || '',
    }
  }

  componentDidMount() {
    if (this.props.edit) {
      this.setupInput();
    }
  }

  componentDidUpdate() {
    if (this.props.edit) {
      this.setupInput();
    } else {
      if (this.state.text !== this.props.children) {
        this.setState({
          text: this.props.children,
        });
      }
    }
  }

  setupInput = () => {
    this.input.value = this.state.text;
    this.input.focus();
    this.input.onchange = this.onChangeInput;
  };

  onChangeInput = () => {
    this.setState({
      text: this.input.value,
    });
    this.props.onEdit(this.input.value);
  };

  render() {
    if (this.props.edit) {
      return (
        <FormControl bsSize={'sm'} type={'text'} inputRef={input => this.input = input}/>
      );
    } else {
      return <p>{this.state.text}</p>;
    }
  }
}
