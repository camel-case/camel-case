import React from 'react';
import reactDom from 'react-dom';
import DatePicker from 'material-ui/DatePicker';
import _ from 'underscore';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from "react-tap-event-plugin";
import AppBar from 'material-ui/AppBar';
import moment from 'moment';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {Link} from 'react-router'

import { connect } from 'react-redux';
import * as actions from '../../actions/actions';

class Nav extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			open: false,
			currentSection: 'U.S.'
		}
	}

	componentDidMount() {
		this.props.fetchSections();
	}

	handleFilter(sectionFilter) {
		this.setState({ currentSection: sectionFilter })
		this.props.fetchArticles(sectionFilter);
	}

	renderMenuItems() {
		return this.props.sections && _.map(this.props.sections, function(num, section) {
			 return <MenuItem
			 						checked={section === this.state.currentSection ? true : false}
			 						key={section}
									onTouchTap={this.handleClose.bind(this)}
									onClick={() => this.handleFilter(section)}>
									{section} ({num})
							</MenuItem>
		}, this)
	}

	handleDate(date) {
		return moment(date).format('dddd MMMM Do, YYYY')
	}

	handleDateChange(a, newDate) {
		this.setState({currentSection: 'U.S.'})
		let newDateFormatted = moment(newDate).format('MM-DD-YY');
		this.props.fetchSections(newDateFormatted);
		this.props.fetchArticles(this.state.currentSection, newDateFormatted);
	}

	handleToggle() {
		this.setState({open: !this.state.open})
	}

	handleClose() {
		this.setState({open: false});
	}

	render() {


		let MenuItems = this.renderMenuItems();
		let style = {
			color:'#FFFFFF'
		}
		let AboutLink = <Link style={style} to={"/about"}>News Pulse</Link>
		return(

			<div>
				<MuiThemeProvider>
					<AppBar
					    title = {AboutLink}
					    onLeftIconButtonTouchTap = { this.handleToggle.bind(this) }
					    style = {
					    	{ 'backgroundColor': '#0097A7' }
					    	}
					    iconElementRight = {
					    	<DatePicker
								onChange = { this.handleDateChange.bind(this) }
								maxDate = { new Date() }
					    		formatDate = { this.handleDate.bind(this) }
					    		defaultDate = { new Date() }
									inputStyle = {
									{
										'color': 'white',
										'textAlign': 'center',
										'width': '100%' }
									}
						    	autoOk = { true }
						    />
						}
					>
						<h id="centerIcon">{ this.state.currentSection }</h>
					</AppBar>
				</MuiThemeProvider>
				<MuiThemeProvider>
						<Drawer
							open = { this.state.open }
							docked = { false }>
								<div>
									{ MenuItems }
	       						</div>
       				</Drawer>

   				</MuiThemeProvider>
   			</div>
  		)
	}
}

function mapStateToProps(state) {
	return {
		sections: state.fetchSectionsReducer.data,
		articles: state.fetchArticlesReducer.data
	};
}

export default connect(mapStateToProps, actions)(Nav);
