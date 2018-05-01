import * as React from 'react';
import { Nav as BsNav, NavItem } from 'react-bootstrap';

export class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: props.activeKey || '',
    };
  }

  onSelect = (selectedKey) => {
    this.props.onSelect(selectedKey);
  };

  componentDidUpdate(prevProps) {
    if (
      (this.props.activeKey || this.props.activeKey === 0)
      && (prevProps.activeKey !== this.props.activeKey)
    ) {
      this.setState({
        activeKey: this.props.activeKey,
      });
    }
  }

  render() {
    if (this.props.data && Array.isArray(this.props.data)) {
      return (
        <BsNav
          bsStyle={'pills'}
          stacked={true}
          onSelect={this.onSelect}
          activeKey={this.state.activeKey}
        >
          {
            this.props.data.map((item) => {
              return (
                <NavItem key={item.key} eventKey={item.key}>
                  {item.body}
                </NavItem>
              );
            })
          }
        </BsNav>
      );
    } else {
      console.warn('"data" props is required and should be an array');
      return <div/>;
    }
  }
}
