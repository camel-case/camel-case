import React from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { connect } from 'react-redux';
import * as actions from '../../../actions/actions'

class ReactionBar extends React.Component{

	static childContextTypes = {
    	muiTheme: React.PropTypes.object
  	}

  	getChildContext() {
    	return {
      		muiTheme: getMuiTheme()
    	}
  	}

	render(){
		const style = {
			marginTop: '5px',
			marginRight: '5px',
			backgroundColor: 'transparent'
		};

		return (
			<div className="reactionBar">
						<RaisedButton
							style={style}
						  onClick={ () => this.props.incrementReactions(this.props.articleData.id, 'happy', this.props.articleData.reactions.happy) } >
							<i className="em em-smile"></i> ({this.props.articleData.reactions.happy})
						</RaisedButton>
						<RaisedButton
							style={style}
							onClick={ () => this.props.incrementReactions(this.props.articleData.id, 'sad', this.props.articleData.reactions.sad) } >
							<i className="em em-disappointed_relieved"></i> ({this.props.articleData.reactions.sad})
						</RaisedButton>
						<RaisedButton
							style={style}
							onClick={ () => this.props.incrementReactions(this.props.articleData.id, 'angry', this.props.articleData.reactions.angry) } >
							<i className="em em-angry"></i> ({this.props.articleData.reactions.angry})
						</RaisedButton>
						<RaisedButton
							style={style}
							onClick={ () => this.props.incrementReactions(this.props.articleData.id, 'scared', this.props.articleData.reactions.scared) } >
							<i className="em em-fearful"></i> ({this.props.articleData.reactions.scared})
     				</RaisedButton>
			</div>
		)
	}
}

export default connect(null, actions)(ReactionBar);
