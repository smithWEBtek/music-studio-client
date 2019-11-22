import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions/index'

import { Container } from 'reactstrap'
import Modal from '../UI/Modal/Modal'

import Teacher from './Teacher/Teacher'
import CreateTeacher from './CreateTeacher/CreateTeacher'
import EditTeacher from './EditTeacher/EditTeacher'
import TeachersList from './TeachersList/TeachersList'

class Teachers extends Component {
  state = {
    teacher: null,
    createTeacher: false,
    editTeacher: false
  }

  componentDidMount() {
    this.props.onFetchTeachers();
  }

  //********SHOW_TEACHER form handling**************************
  showTeacherClose = () => {
    this.setState({ showTeacher: false })
  }

  //********CREATE_TEACHER form handling ***********************
  createTeacherForm = () => {
    this.setState({ createTeacher: true })
  }

  createTeacherFormCancel = () => {
    this.setState({ createTeacher: false })
  }

  createTeacher = (data) => {
    let { history } = this.props
    this.props.onCreateTeacher(data, history)
    this.setState({ createTeacher: false })
  }

  //********EDIT_TEACHER form handling**************************
  showEditTeacherForm = (id) => {
    let teacherData = this.props.teachers.filter(teacher => teacher.id === id)[0]
    this.setState({
      teacher: teacherData,
      editTeacher: true
    })
  }

  closeEditTeacherForm = () => {
    this.setState({
      editTeacher: false,
      teacher: null
    })
  }

  //********DELETE_TEACHER handling****************
  deleteTeacher = (id) => {
    let { history } = this.props
    this.props.onDeleteTeacher(id, history)
  }

  render() {
    const { match, teachers } = this.props;
    return (
      <Container>
        <hr />

        {/*********CREATE TEACHER MODAL********************/}
        <button onClick={this.createTeacherForm}>Add Teacher</button>
        <Modal
          show={this.state.createTeacher}
          modalClosed={this.createTeacherFormCancel}>
          <CreateTeacher
            createTeacher={(newTeacherData) => this.createTeacher(newTeacherData)}
            createTeacherCancel={this.createTeacherFormCancel} />
        </Modal>

        {/**********EDIT TEACHER MODAL*********************/}
        <Modal
          show={this.state.editTeacher}
          modalClosed={this.editTeacherCancelHandler}>
          {this.state.teacher ? <EditTeacher
            teacher_id={this.state.teacher.id}
            close={() => this.closeEditTeacherForm()}
          /> : null}
        </Modal>

        {/**********TEACHERS LIST************************/}
        <div>
          <Switch>
            <Route path={`${match.url}/:id/edit`} component={EditTeacher} />
            <Route path={`${match.url}/new`} exact component={CreateTeacher} />
            <Route path={`${match.url}/:id`} component={Teacher} />
            <Route path={match.url} exact />
          </Switch>
        </div>
        <div>
          <div><h5 className="IndexHeaderBackground">ALL teachers</h5>
            <TeachersList
              teachers={teachers}
              edit={(id) => this.showEditTeacherForm(id)}
              deleteTeacher={(id) => this.props.onDeleteTeacher(id)}
            />
          </div>
        </div>
        <hr />
      </Container>
    )
  }
};

const mapStateToProps = state => {
  return {
    teachers: state.tch.teachers
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchTeachers: () => dispatch(actions.fetchTeachers()),
    onCreateTeacher: (data, history) => dispatch(actions.createTeacher(data, history)),
    onDeleteTeacher: (id, history) => dispatch(actions.deleteTeacher(id, history))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Teachers);
