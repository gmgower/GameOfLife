import React from 'react';
import { Button, DropdownButton, ButtonToolbar} from 'react-bootstrap';
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
            id='dropdown-basic-button'
            variant='secondary'
            onSelect={this.handleSelect}
          >
            <Item eventKey='1'>
              <item>
                <Button>20x10</Button>
              </item>{' '}
            </Item>
            <Item eventKey='2'>
              {' '}
              <item>
                <Button>50x30</Button>
              </item>{' '}
            </Item>
            <Item eventKey='3'>
              <item>
                <Button>70x50</Button>
              </item>
            </Item>
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
