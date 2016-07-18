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
import { Link } from 'react-router'

import { connect } from 'react-redux';
import * as actions from '../../actions/actions';

class Nav extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			date: moment().format('MM-DD-YY'),
			open: false,
			currentSection: 'U.S.'
		}
	}

	componentDidMount() {
		this.props.fetchSections();
	}

	handleFilter(sectionFilter) {
		this.setState({ currentSection: sectionFilter })
		this.props.fetchArticles(sectionFilter, this.state.date);
	}

	renderMenuItems() {
		return _.map(this.props.sections, function(num, section) {
			 return <MenuItem
			 						checked={section === this.state.currentSection ? true : false}
			 						key={section}
									onTouchTap={this.handleClose.bind(this)}
									onClick={() => this.handleFilter(section)}>
									{section} <span style={{'opacity':'0.4'}}> ({num})</span>
							</MenuItem>
		}, this)
	}

	handleDate(date) {
		return moment(date).format('dddd, MMMM D, YYYY')
	}

	handleDateChange(a, newDate) {
		let newDateFormatted = moment(newDate).format('MM-DD-YY');
		this.setState({
			currentSection: 'U.S.',
			date: newDateFormatted
		})
		this.props.fetchSections(newDateFormatted);
		this.props.fetchArticles(this.state.currentSection, this.state.date);
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
			color:'#141414',
			fontWeight: 600
		}
		let AboutLink = <Link style={style} to={"/about"}>News Pulse</Link>
		return(

			<div>
				<MuiThemeProvider>
					<AppBar
					    title = {AboutLink}
					    onLeftIconButtonTouchTap = { this.handleToggle.bind(this) }
					    style = {
					    	{ 'backgroundColor': '#fff' }
					    	}
					    iconElementRight = {
					    	<DatePicker
									onChange = { this.handleDateChange.bind(this) }
									minDate = {new Date(2016, 6, 12)}
									maxDate = { new Date() }
									dateTimeFormat = { this.handleDate.bind(this) }
					    		formatDate = { this.handleDate.bind(this) }
					    		defaultDate = { new Date() }
									inputStyle = {{
										'color': '#141414',
										'textAlign': 'right',
									}}
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
