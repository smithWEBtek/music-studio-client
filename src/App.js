import React, { Component } from 'react'
import MainNav from './UI/MainNav/MainNav'
import 'bootstrap/dist/css/bootstrap.css'
import { Route } from 'react-router-dom'
import Aux from '../src/hoc/Aux/Aux'

import Students from '../src/Students/Students'
import Teachers from '../src/Teachers/Teachers'
import Lessons from '../src/Lessons/Lessons'
import Resources from '../src/Resources/Resources'
import LessonResources from '../src/Lessons/LessonResources/LessonResources'

class App extends Component {

	render() {
		return (
			<div>
				<MainNav />
				<Aux>
					<Route path="/students" component={Students} />
					<Route path="/teachers" component={Teachers} />
					<Route path="/lessons/" component={Lessons} />
					<Route path="/resources" component={Resources} />
					<Route path="/lesson_resources" component={LessonResources} />
				</Aux>
			</div>)
	}
}

export default App
