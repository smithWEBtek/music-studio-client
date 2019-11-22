import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import '../../App.css'
import ResourcesList from '../../Resources/ResourcesList/ResourcesList'
import LessonsList from '../../Lessons/LessonsList/LessonsList'
import EditStudent from '../EditStudent/EditStudent'

const Student = (props) => {
  const student = props.students.find(student => student.id === +props.match.params.id)
  let studentHeader = <div><p>Student component is loading...</p></div>
  let studentLessons = <div><h5>No lessons recorded</h5></div>
  let studentResources = <div><h5>No resources assigned</h5></div>

  if (student) {
    studentHeader = (
      <div>
        <h5 className="StudentHeaderBackground"><strong>{student.firstname} {student.lastname}</strong></h5>
        <p>Level: <strong>{student.level}</strong></p>
        <p><Link to={`/teachers/${student.teacher.id}`}>Teacher: <strong>{student.teacher.lastname}</strong></Link></p>
        <p>Last lesson date: <strong>{student.lessons.length !== 0 ? student.lessons[student.lessons.length - 1].date : 'no lessons on record for this student'}</strong></p>
        <p className={student.active.toString()}>Active: {student.active.toString()}</p>
        <Link
          to={`/students/${student.id}/edit`}
          component={<EditStudent />}>EditStudent</Link>
      </div>
    )
  }

  if (student && student.lessons) {
    studentLessons = (
      <div>
        <hr />
        <h6 className="LessonHeaderBackground"><strong>{student.firstname}'s LESSONS</strong></h6>
        <div><LessonsList lessons={student.lessons} /></div>
      </div>
    )
  }

  if (student && student.resources) {
    studentResources = (
      <div>
        <hr />
        <h6 className="ResourceHeaderBackground"><strong>{student.firstname}'s assigned RESOURCES</strong> </h6>
        <div><ResourcesList resources={student.resources} /></div>
      </div >
    )
  }

  return (
    <div>
      <div>
        {studentHeader}
      </div>
      <div>
        {studentLessons}
      </div>
      <div>
        {studentResources}
      </div>
    </div >
  )
}

const mapStateToProps = state => {
  return {
    students: state.stu.students
  }
}

export default connect(mapStateToProps)(Student)
