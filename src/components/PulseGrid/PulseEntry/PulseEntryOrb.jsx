import React from 'react';
import ReactDOM from 'react-dom';
import PulseEntry from './PulseEntry';
import PulseHelpers from '../../../helpers/PulseHelpers'

export default class PulseEntryOrb extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    var color = PulseHelpers.colorPicker(this.props.reactions);

    var firstCircleClass;
    var secondCircleClass;
    var thirdCircleClass;

    function changeCircleClass(first,second,third){
      firstCircleClass = first;
      secondCircleClass = second;
      thirdCircleClass = third;
    }

   switch (this.props.articlePopularity){
      case 'low':
        changeCircleClass('lowFirstCircle','lowSecondCircle','lowThirdCircle')
        break;
      case 'mid':
        changeCircleClass('midFirstCircle','midSecondCircle','midThirdCircle')
        break;
      case 'high':
        changeCircleClass('highFirstCircle','highSecondCircle','highThirdCircle')
        break
      default :
        break;
      }

    return (
      <div className='pulsatingCircle'>
          <span className={'firstCircle ' + firstCircleClass}  style={{'backgroundColor': color}}></span>
          <span className={'secondCircle ' + secondCircleClass} style={{'borderColor':color}} ></span>
          <span className={'thirdCircle ' + thirdCircleClass} style={{'borderColor':color}} ></span>
      </div>
    );
  }

}
