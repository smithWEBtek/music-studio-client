import React, { Component } from 'react';
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'
import './EditLesson.css';

class EditLesson extends Component {
  state = {
    id: '',
    date: '',
    teacher: '',
    studen: '',
    notes: ''
  }

  componentWillMount() {
    this.props.onFetchStudents()
    this.props.onFetchTeachers()

    this.setState({
      id: this.props.lesson_id,
      date: this.props.date,
      teacher: this.props.teacher,
      student: this.props.student,
      notes: this.props.notes
    })
  }

  //********EDIT_LESSON form handling **************************
  handleSubmit = (e) => {
    const lessonData = {
      id: this.state.id,
      date: this.state.date,
      teacher_id: this.state.teacher.id,
      student_id: this.state.student.id,
      notes: this.state.notes
    }
    this.props.updateLesson(lessonData)
    this.clearState()
  }

  clearState = () => {
    this.setState({
      id: '',
      date: '',
      teacher: '',
      student: '',
      notes: ''
    })
    this.props.closeEditLessonForm()
  }

  //********EDIT_LESSON selector functions **************************
  handleTeacherSelect = (event) => {
    this.setState({
      teacher: this.props.teachers.find(teacher => teacher.lastname === event.target.value)
    })
  }

  handleStudentSelect = (event) => {
    this.setState({
      student: this.props.students.find(student => student.lastname === event.target.value)
    })
  }

  render() {
    const teacherOptions = this.props.teachers.map(teacher => {
      return <option value={teacher.lastname} id={teacher.id} key={teacher.id}>{teacher.lastname}</option>
    })

    const studentOptions = this.props.students.map(student => {
      return <option value={student.lastname} id={student.id} key={student.id}>{student.lastname}</option>
    })

    return (
      <div className="EditLesson">
        <p className="FormInstructions">Complete form and click 'UPDATE Lesson'</p>
        <form onSubmit={(event) => this.handleSubmit(event)} className="Form">
          <p>
            <label>Date</label>
            <input
              type="date"
              value={this.state.date}
              onChange={(event) => this.setState({ date: event.target.value })}
              placeholder="date"
              required
            />
          </p>
          <p>
            <label>TeacherSelector</label>
            <select
              value={this.state.teacher.lastname}
              onChange={(event) => this.handleTeacherSelect(event)}>
              {teacherOptions}
            </select>
          </p>
          <p>
            <label>StudentSelector</label>
            <select
              value={this.state.student.lastname}
              onChange={(event) => this.handleStudentSelect(event)}>
              {studentOptions}
            </select>
          </p>
          <p>
            <label>Notes</label>
            <input
              type="text"
              value={this.state.notes}
              onChange={(event) => this.setState({ notes: event.target.value })}
              placeholder="notes"
              required />
          </p>
          <button
            type="button"
            onClick={this.props.closeEditLessonForm}
            className="Danger">CANCEL</button>

          <button
            className="Success">UPDATE Lesson</button>
        </form >
      </div>
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
    onFetchTeachers: () => dispatch(actions.fetchTeachers())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditLesson)
