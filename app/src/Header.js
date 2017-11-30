import React from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { Button } from 'reactstrap';

export default class Header extends React.Component {
	render() {
		return(
			<Router>
				<div>
					<h2>The New York Times</h2>
					<div>
						<Link to={`/search`}>
							<Button>Show Search</Button>
						</Link>
						<Link to={`/saved`}>
							<Button>Show Saved</Button>
						</Link>
					</div>
				</div>
			</Router>
		)
	}
}