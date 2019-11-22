import React, { Component } from 'react';
import './EditTeacher.css';
import { connect } from 'react-redux'
import * as actions from '../../store/actions/teacherActions'

class EditTeacher extends Component {
  constructor(props) {
    super(props)

    this.state = {
      teacher: '',
      id: '',
      firstname: '',
      lastname: '',
      email: '',
      active: '',
      close: null
    }
  }

  componentDidMount() {
    let teacher = this.state.teacher
    if (this.props.teacher_id) {
      teacher = this.props.teachers.find(tch => tch.id === this.props.teacher_id)
      this.setState({
        teacher: teacher,
        close: this.props.close
      })
    } else {
      teacher = this.props.teachers.find(tch => tch.id === +this.props.match.params.id)
      this.setState({ teacher: teacher })
    }

    this.setState({
      id: teacher.id,
      firstname: teacher.firstname,
      lastname: teacher.lastname,
      email: teacher.email,
      active: teacher.active
    })
  }

  toggleActiveSelect = () => {
    let toggle = this.state.active
    this.setState({ active: !toggle })
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    e.preventDefault()
  }

  handleCancel = () => {
    if (this.state.close) {
      this.props.close()
    } else {
      this.props.history.goBack()
    }
  }

  handleSubmit = (e) => {
    let { history } = this.props
    let data = {
      id: this.state.id,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      active: this.state.active
    }

    this.props.onUpdateTeacher(data, history)
    if (this.state.close) {
      this.props.close()
    }
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <p className="FormInstructions">Edit form and click 'Update Teacher'</p>
        <form className="Form">
          <p><label htmlFor="teacher_name">First name </label>
            <input
              type="text"
              name="firstname"
              value={this.state.firstname}
              onChange={this.handleChange}
            /></p>
          <p><label>Last name </label>
            <input
              type="text"
              name="lastname"
              value={this.state.lastname}
              onChange={this.handleChange}
            /></p>
          <p><label>Email </label>
            <input
              type="text"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            /></p>
          <p><label>Active?</label>
            <button
              type="button"
              name="active"
              value={this.state.active}
              onClick={() => this.toggleActiveSelect()}
              className={this.state.active ? "true" : "false"}
            >{this.state.active.toString()}</button></p>
          <button
            type="button"
            name="cancel"
            onClick={this.handleCancel}
            className="Danger"
          >CANCEL</button>
          <button
            type='button'
            className="Success"
            onClick={(e) => this.handleSubmit(e)}
          >SAVE</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    teachers: state.tch.teachers
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onUpdateTeacher: (data, history) => dispatch(actions.updateTeacher(data, history))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTeacher)
