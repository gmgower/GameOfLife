import React from 'react';
import { Button, DropdownButton, DropdownItem, ButtonToolbar, Dropdown } from 'react-bootstrap';
import Item from 'react-bootstrap/DropdownItem';

class Buttons extends React.Component {
  handleSelect = (e) => {
    this.props.gridSize(e);
  };

  render() {
    return (
      <div className='center'>
        <ButtonToolbar>
          <DropdownButton
            title='Grid Size'
            id='size-menu'
            onSelect={this.handleSelect}           
          >
            <Dropdown.Item eventKey='1'> 20 x 10 </Dropdown.Item>
            <Dropdown.Item eventKey='2'> 50 x 50 </Dropdown.Item>
            <Dropdown.Item eventKey='3'> 70 x 50 </Dropdown.Item>
          </DropdownButton>

          <Button
            variant='secondary'
            className='btn btn-primary'
            onClick={this.props.playButton}
          >
            Play
          </Button>
          <Button
            variant='secondary'
            className='btn btn-primary'
            onClick={this.props.pauseButton}
          >
            Pause
          </Button>
          <Button
            variant='secondary'
            className='btn btn-primary'
            onClick={this.props.clear}
          >
            Clear
          </Button>
          <Button
            variant='secondary'
            className='btn btn-primary'
            onClick={this.props.seed}
          >
            Reset
          </Button>
          <Button
            variant='secondary'
            className='btn btn-primary'
            onClick={this.props.slow}
          >
            Slow
          </Button>
          <Button
            variant='secondary'
            className='btn btn-primary'
            onClick={this.props.fast}
          >
            Medium
          </Button>
          <Button
            variant='secondary'
            className='btn btn-primary'
            onClick={this.props.fast}
          >
            Fast
          </Button>
        </ButtonToolbar>
      </div>
    );
  }
}

export default Buttons;
