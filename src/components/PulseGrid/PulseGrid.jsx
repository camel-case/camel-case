import React from 'react';

import { connect } from 'react-redux';
import * as actions from '../../actions/actions'

import PulseEntry from './PulseEntry/PulseEntry'
import PulseHelpers from '../../helpers/PulseHelpers';

class PulseGrid extends React.Component {

	componentDidMount() {
		this.props.fetchArticles();
	}

	mapArticles(){
		var articles = this.props.articles;
		return this.props.articles && this.props.articles.map(function(article,index){
				var popularityStatus = PulseHelpers.popularityStatus(article, articles);
				return <PulseEntry key={index} articleData={article} articlePopularity={popularityStatus}/>
		})
	}

	render(){

		let orbs = this.mapArticles();
		let grid = this.props.isFethcing ? <h2>yo</h2> : this.mapArticles();

		console.log(this.props.isFetching)

		return (
			<div className="container-fluid">
				{grid}
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		articles: state.fetchArticlesReducer.data
	};
}

export default connect(mapStateToProps, actions)(PulseGrid);
