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
import RaisedButton from 'material-ui/RaisedButton';
import RadioButton from 'material-ui/RadioButton';
import Popover from 'material-ui/Popover/Popover';
import Menu from 'material-ui/Menu';
import $ from 'jquery';

const styles = {
  h3: {
    marginTop: 20,
    fontWeight: 400,
  },
  block: {
    display: 'flex',
  },
  block2: {
    margin: 10,
  },
};


class Nav extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			date: moment().format('MM-DD-YY'),
			open: false,
			currentSection: 'U.S.',

      openSignUp: false,
      anchorOrigin: {
        horizontal: 'right',
        vertical: 'bottom',
      },
      targetOrigin: {
        horizontal: 'right',
        vertical: 'top',
      },
    };
	}

	componentDidMount() {
		this.props.fetchSections();
    $('#logoutButton').hide();
	}

	handleFilter(sectionFilter) {
		this.setState({ currentSection: sectionFilter })
		this.props.fetchArticles(sectionFilter, this.state.date);
	}

	renderMenuItems() {
    console.log(this.props.authentication, 'the state inside of Nav')
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

 
  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();
    this.setState({
      openSignUp: true,
      anchorEl: event.currentTarget
    });
    
  };

  handleTouchSignin = (event) => {
    event.preventDefault();
    this.setState({
      openSignIn : true,
      anchorEl : event.currentTarget
    });
  }

  handleRequestClose = () => {
    this.setState({
      openSignUp: false,
      openSignIn: false,
      name    : '',
      username: '',
      password: ''
    });
  };

  setAnchor = (positionElement, position) => {
    const {anchorOrigin} = this.state;
    anchorOrigin[positionElement] = position;

    this.setState({
      anchorOrigin: anchorOrigin,
    });
  };

  setTarget = (positionElement, position) => {
    const {targetOrigin} = this.state;
    targetOrigin[positionElement] = position;

    this.setState({
      targetOrigin: targetOrigin,
    });
  };

  onNameInputChange(event) {
    console.log("username input change!!")
    this.setState({
      name: event.target.value
    })
  };


  onUsernameInputChange(event) {
  	console.log("username input change!!")
  	this.setState({
  		username: event.target.value
  	})
  };

  onPasswordInputChange(event) {
  	this.setState({
  		password: event.target.value
  	})
  };

  onSignupSubmit(event) {
  	event.preventDefault();
    this.props.submitUsernameAndPassword({
      name    : this.state.name,
      username: this.state.username,
      password: this.state.password
    });
    this.handleRequestClose();
    // this.loginButton();
    //this.showLogOut();
  };

  onSigninSubmit(event) {
    event.preventDefault();
    this.props.submitSignin({
      username: this.state.username,
      password: this.state.password
    });
    console.log("props in logout : ", this.props)
    this.handleRequestClose();
    //this.showLogOut();
  };

  // showLogOut() {
  //   $('#signup').hide()
  //   $('#signin').hide()
  //   $('#logoutButton').show()
  // }

  // hideLogOut() {
  //   $('#signup').show()
  //   $('#signin').show()
  //   $('#logoutButton').hide()
  // }

  onLogout() {
    console.log("props in logout : ", this.props)
    console.log("localStorage : ", window.localStorage.token)
    window.localStorage.token = ''
    this.props.logoutUser();
    // if(this.props.authentication.authentication === false) {
    //   this.hideLogOut();
    // }
  }

  loginButton() {
    console.log("in loginButton")
    if(this.props.authentication.authentication === false){
      console.log('true');
      return (
        <div>
            <span id="signin">
              <RaisedButton
                id="signinButton"
                onTouchTap={this.handleTouchSignin}
                label="Sign In"
              />
            </span>

            <span id="signup">
              <RaisedButton
                id="signupButton"
                onTouchTap={this.handleTouchTap}
                label="Sign Up"
              />
            </span>
          </div>
        )
    } else {
      return (
          <div id="logoutButton">
              <div>Welcome, {this.props.authName}!</div>
              <RaisedButton
                onTouchTap={this.onLogout.bind(this)}
                label="Log Out"
              />
          </div>
          )
    }
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
					>
					<div id="rightButtons">
            {this.loginButton.bind(this)()}
            </div>


						<div id="centerIcon">
							<h id="centerSection">{ this.state.currentSection } </h>
							<span id="centerDate">
								<DatePicker
										onChange = { this.handleDateChange.bind(this) }
										minDate = {new Date(2016, 6, 12)}
										maxDate = { new Date() }
										dateTimeFormat = { this.handleDate.bind(this) }
						    		formatDate = { this.handleDate.bind(this) }
						    		defaultDate = { new Date() }
										inputStyle = {{
											'color': '#141414'
										}}
							    	autoOk = { true }
							    />
							 </span>
						</div>
						 <Popover
			          open={this.state.openSignUp}
			          anchorEl={this.state.anchorEl}
			          anchorOrigin={this.state.anchorOrigin}
			          targetOrigin={this.state.targetOrigin}
			          onRequestClose={this.handleRequestClose}
			        >
              <div>

                <div id="signupModal">
                  <div id='signupName'>
                    <form onSubmit={this.onSignupSubmit.bind(this)}>    
                      <input value={this.state.name} onChange={this.onNameInputChange.bind(this)} type='text' placeholder='Name'></input>       
                    </form>
                  </div>   
                  <div id='signupUser'>
    			        	<form onSubmit={this.onSignupSubmit.bind(this)}>   	
    				         	<input value={this.state.username} onChange={this.onUsernameInputChange.bind(this)} type='text' placeholder='Username'></input>      	
    				 				</form>
                  </div>
                  <div id='signupPass'>
    				 				<form onSubmit={this.onSignupSubmit.bind(this)}>	         
    					        <input value={this.state.password} onChange={this.onPasswordInputChange.bind(this)} type='password' placeholder='Password'></input>
    				 				</form>
                  </div>
                </div>
                <div id='signupButtons'>
                    <span id="signupConfirm">
                      <button 
                        className='btn btn-default'
                        onClick={this.onSignupSubmit.bind(this)}
                      >Sign Up
                      </button>
                    </span>

                    <span id='signupCancel'>
                      <button 
                        className='btn btn-default'
                        onClick={this.handleRequestClose}
                      >Cancel
                      </button>
                    </span>
                </div>  
              </div>
								
			        </Popover>

              <Popover
                open={this.state.openSignIn}
                anchorEl={this.state.anchorEl}
                anchorOrigin={this.state.anchorOrigin}
                targetOrigin={this.state.targetOrigin}
                onRequestClose={this.handleRequestClose}
              >
              <div>
                <div id="signinModal">
                  <div id="signinUser">
                    <form onSubmit={this.onSigninSubmit.bind(this)}>    
                      <input value={this.state.username} onChange={this.onUsernameInputChange.bind(this)} type='text' placeholder='Username'></input>       
                    </form>
                  </div>
                  <div id="signinPass">
                    <form onSubmit={this.onSigninSubmit.bind(this)}>           
                          <input value={this.state.password} onChange={this.onPasswordInputChange.bind(this)} type='password' placeholder='Password'></input>
                  
                    </form>
                  </div>
                </div>
                <div id='signinButtons'>
                  <span id="signinConfirm">
                    <button 
                      className='btn btn-default'
                      onClick={this.onSigninSubmit.bind(this)}
                    >Sign In
                    </button>
                  </span>
                  <span id='signinCancel'>
                    <button 
                      className='btn btn-default'
                      onClick={this.handleRequestClose}
                    >Cancel
                    </button>
                  </span>
                </div>
              </div>
                
              </Popover>
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
		articles: state.fetchArticlesReducer.data,
    authentication: state.authenticationReducer,
    authName: state.authNameReducer
	};
}

export default connect(mapStateToProps, actions)(Nav);

//****************************************************************************


