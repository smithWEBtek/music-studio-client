import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../store/actions/index'

import { Container } from 'reactstrap'
import Modal from '../UI/Modal/Modal'

import Student from './Student/Student'
import CreateStudent from './CreateStudent/CreateStudent'
import EditStudent from './EditStudent/EditStudent'
import StudentsList from './StudentsList/StudentsList'

class Students extends Component {
	state = {
		student: null,
		createStudent: false,
		editStudent: false,
		rerender: false
	}

	componentDidMount() {
		this.props.onFetchStudents()
	}

	//********SHOW_STUDENT handling*****************
	showStudentClose = () => {
		this.setState({ showStudent: false })
	}

	//********CREATE_STUDENT form handling ***************
	createStudentForm = () => {
		this.setState({ createStudent: true })
	}

	createStudentFormCancel = () => {
		this.setState({ createStudent: false })
	}

	createStudent = (newStudentData) => {
		const { history } = this.props
		this.props.onCreateStudent(newStudentData, history)
		this.setState({ createStudent: false })
	}

	//********EDIT_STUDENT handling****************
	showEditStudentForm = (id) => {
		let student = this.props.students.find(student => student.id === id)
		let copyOfStudent = { ...student }
		this.setState({
			student: copyOfStudent,
			editStudent: true
		})
	}

	editStudentUpdate = (data) => {
		let { history } = this.props
		this.props.onUpdateStudent(data, history)
		this.setState({
			editStudent: false,
			student: null
		})
	}

	closeEditStudentForm = () => {
		this.setState({
			editStudent: false,
			student: null
		})
	}

	//********DELETE_STUDENT handling****************
	deleteStudent = (id) => {
		let { history } = this.props
		this.props.onDeleteStudent(id, history)
	}

	//********LIKE_STUDENT handling****************
	likeStudent = (id) => {
		let { history } = this.props
		history.push('/students')
		let student = this.props.students.find(stu => stu.id === id)
		let data = Object.assign({}, student, { likes: student.likes + 1 })
		this.props.onUpdateStudent(data, history)
	}

	render() {
		const { match, students } = this.props

		return (
			<Container>
				<hr />
				{/*********CREATE STUDENT MODAL********************/}
				<button onClick={this.createStudentForm}>Add Student</button>
				<Modal
					show={this.state.createStudent}
					modalClosed={this.createStudentFormCancel}>
					<CreateStudent
						createStudent={(newStudentData) => this.createStudent(newStudentData)}
						createStudentCancel={this.createStudentFormCancel} />
				</Modal>

				{/**********EDIT STUDENT MODAL********************/}
				<Modal
					show={this.state.editStudent}
					modalClosed={this.closeEditStudentForm}>
					{this.state.student ? <EditStudent
						student_id={this.state.student.id}
						// id={this.state.student.id}
						// firstname={this.state.student.firstname}
						// lastname={this.state.student.lastname}
						// email={this.state.student.email}
						// level={this.state.student.level}
						// teacher_id={this.state.student.teacher_id}
						// teacher={this.state.student.teacher}
						// teachers={this.props.teachers}
						// active={this.state.student.active}
						close={() => this.closeEditStudentForm()}
					// editStudentUpdate={(data) => this.editStudentUpdate(data)}
					/> : null}
				</Modal>

				{/**********STUDENTS LIST************************/}
				<div>
					<Switch>
						<Route path={`${match.url}/:id/edit`} exact component={EditStudent} />
						<Route path={`${match.url}/new`} exact component={CreateStudent} />
						<Route path={`${match.url}/:id`} exact component={Student} />
						<Route path={match.url} exact />
					</Switch>
				</div>
				<div>
					<div><h5 className="IndexHeaderBackground">ALL students</h5>
						<StudentsList
							students={students}
							edit={(id) => this.showEditStudentForm(id)}
							deleteStudent={(id) => this.deleteStudent(id)}
							likeStudent={(id) => this.likeStudent(id)}
						/></div>
				</div>
				<hr />
			</Container>
		)
	}
}

const mapStateToProps = state => {
	return {
		students: state.stu.students,
		teachers: state.tch.teachers
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onFetchStudents: () => dispatch(actions.fetchStudents()),
		onCreateStudent: (data, history) => dispatch(actions.createStudent(data, history)),
		// onUpdateStudent: (data, history) => dispatch(actions.updateStudent(data, history)),
		onDeleteStudent: (id, history) => dispatch(actions.deleteStudent(id, history))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Students)
