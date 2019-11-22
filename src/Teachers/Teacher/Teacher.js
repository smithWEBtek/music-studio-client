import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import '../../App.css'
import StudentsList from '../../Students/StudentsList/StudentsList'
import LessonsList from '../../Lessons/LessonsList/LessonsList'
import EditTeacher from '../EditTeacher/EditTeacher'

const Teacher = (props) => {
  const teacher = props.teachers.filter(teacher => teacher.id === +props.match.params.id)[0]
  let teacherHeader = <div><p>Teacher component is loading...</p></div>
  let teacherLessons = <div><h5>No lessons recorded</h5></div>
  let teacherStudents = <div><h5>No students assigned</h5></div>

  if (teacher) {
    teacherHeader = (
      <div>
        <h5 className="TeacherHeaderBackground"><strong>{teacher.firstname} {teacher.lastname}</strong></h5>
        <p>Email: {teacher.email} </p>
        <p className={teacher.active.toString()}>Active: {teacher.active.toString()}</p>
        <Link
          to={`/teachers/${teacher.id}/edit`}
          component={<EditTeacher />}>EditTeacher</Link>
      </div>
    )
  }

  if (teacher && teacher.lessons) {
    teacherLessons = (
      <div>
        <hr />
        <h6 className="LessonHeaderBackground"><strong>{teacher.firstname}'s LESSONS</strong></h6>
        <div><LessonsList lessons={teacher.lessons} /></div>
      </div>
    )
  }

  if (teacher && teacher.students) {
    teacherStudents = (
      <div>
        <hr />
        <h6 className="StudentHeaderBackground"><strong>{teacher.firstname}'s STUDENTS</strong></h6>
        <div><StudentsList students={teacher.students} /></div>
      </div >
    )
  }

  return (
    <div>
      <div>
        {teacherHeader}
      </div>
      <div>
        {teacherStudents}
      </div>
      <div>
        {teacherLessons}
      </div>
    </div >
  )
}

const mapStateToProps = state => {
  return {
    students: state.stu.teachers,
    teachers: state.tch.teachers,
    resources: state.res.resources,
    lessons: state.les.lessons
  }
}

export default connect(mapStateToProps)(Teacher)
