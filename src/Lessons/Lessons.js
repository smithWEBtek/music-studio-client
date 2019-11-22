import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions/index'

import { Container } from 'reactstrap'
import Modal from '../UI/Modal/Modal'

import Lesson from './Lesson/Lesson'
import CreateLesson from './CreateLesson/CreateLesson'
import EditLesson from './EditLesson/EditLesson'
import LessonsList from './LessonsList/LessonsList'

class Lessons extends Component {
  state = {
    lesson: {},
    createLesson: false,
    editLesson: false
  }

  componentDidMount() {
    this.props.onFetchLessons();
  }

  //********CREATE_LESSON form handling **************************
  showCreateLessonForm = () => {
    this.setState({ createLesson: true })
  }

  closeCreateLessonForm = () => {
    this.setState({ createLesson: false })
  }

  createLesson = (newLessonData) => {
    const { history } = this.props
    this.props.onCreateLesson(newLessonData, history)
    this.setState({ createLesson: false })
  }

  //********EDIT_LESSON form handling**************************
  showEditLessonForm = (id) => {
    let lessonData = this.props.lessons.filter(lesson => lesson.id === id)[0]
    this.setState({
      lesson: lessonData,
      editLesson: true
    })
  }

  editLessonUpdate = (data) => {
    const { history } = this.props
    this.props.onUpdateLesson(data, history)
    this.setState({
      editLesson: false,
      lesson: null
    })
  }

  closeEditLessonForm = () => {
    this.setState({
      editLesson: false,
      lesson: null
    })
  }

  //********DELETE_LESSON handling****************
  deleteLesson = (id) => {
    let { history } = this.props
    this.props.onDeleteLesson(id, history)
  }

  render() {
    const { match, lessons } = this.props;

    return (
      <Container>
        <hr />

        {/*********CREATE LESSON MODAL********************/}
        <button onClick={() => this.showCreateLessonForm()}>Add Lesson</button>
        <Modal
          show={this.state.createLesson}
          modalClosed={this.closeCreateLessonForm}>
          <CreateLesson
            createLesson={(newLessonData) => this.createLesson(newLessonData)}
            closeCreateLessonForm={this.closeCreateLessonForm} />
        </Modal>

        {/**********EDIT LESSON MODAL********************/}
        <Modal
          show={this.state.editLesson}
          modalClosed={this.closeEditLessonForm}>
          {this.state.editLesson ? <EditLesson
            lesson_id={this.state.lesson.id}
            date={this.state.lesson.date}
            teacher={this.state.lesson.teacher}
            student={this.state.lesson.student}
            notes={this.state.lesson.notes}
            closeEditLessonForm={() => this.closeEditLessonForm()}
            updateLesson={(data) => this.editLessonUpdate(data)}
          /> : null}
        </Modal>

        {/**********LESSONS LIST***********************/}
        < div >
          <Switch>
            <Route path={`${match.url}/new`} exact component={CreateLesson} />
            <Route path={`${match.url}/:id`} exact component={Lesson} />
            <Route path={`${match.url}/:id/edit`} exact component={EditLesson} />
            <Route path={match.url} exact />
          </Switch>
        </div>
        <div>
          <div><h5 className="IndexHeaderBackground">ALL lessons</h5>
            <LessonsList
              lessons={lessons}
              showEditLessonForm={(id) => this.showEditLessonForm(id)}
              deleteLesson={(id) => this.deleteLesson(id)} />
          </div>
        </div >
        <hr />
      </Container >
    )
  }
};

const mapStateToProps = state => {
  return {
    lessons: state.les.lessons
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchLessons: () => dispatch(actions.fetchLessons()),
    onCreateLesson: (data, history) => dispatch(actions.createLesson(data, history)),
    onUpdateLesson: (data, history) => dispatch(actions.updateLesson(data, history)),
    onDeleteLesson: (id, history) => dispatch(actions.deleteLesson(id, history))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Lessons);
