import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'reactstrap'
import './LessonsList.css'

const LessonsList = (props) => {

  const renderLessons = props.lessons.sort((a, b) => a.date > b.date ? -1 : a.date < b.date ? 1 : 0).map((lesson, index) => {
    return (
      <tr key={index}>
        <th scope="row">{lesson.id}</th>

        <td>
          <button
            type='button'
            className="Success">
            <Link
              to={`/lessons/${lesson.id}`}
              key={lesson.id}>show
            </Link>
          </button>
        </td>

        <td>
          <Link
            to={`/lessons/${lesson.id}`}
            style={{ marginRight: '5px' }}
            key={lesson.id}>{lesson.teacher.lastname} ~ {lesson.student.lastname}
          </Link>
        </td>

        <td>{lesson.date}</td>
        <td><Link to={`/teachers/${lesson.teacher_id}`}>{lesson.teacher.firstname} {lesson.teacher.lastname}</Link></td>
        <td><Link to={`/students/${lesson.student_id}`}>{lesson.student.firstname} {lesson.student.lastname}</Link></td>
        <td>{lesson.resources ? lesson.resources.length : 0}</td>
        <td>{lesson.notes}</td>

        {props.showEditLessonForm ?
          <td>
            <button
              type='button'
              className="Edit"
              onClick={() => props.showEditLessonForm(lesson.id)}>edit
            </button>
          </td>
          : null}

        {props.deleteLesson ?
          <td>
            <button
              onClick={() => props.deleteLesson(lesson.id)}
              className="Danger">X
            </button>
          </td>
          : null}

      </tr>
    )
  })

  return (
    <Table striped size="sm" className="LessonsList">
      <thead>
        <tr>
          <th>ID</th>
          <th>Show</th>
          <th>Teacher - Student</th>
          <th>Date</th>
          <th>Teacher</th>
          <th>Student</th>
          <th>#Resources</th>
          <th>Notes</th>
          {props.edit ? <th>Edit</th> : null}
          {props.deleteLesson ? <th>Delete</th> : null}
        </tr>
      </thead>
      <tbody>
        {renderLessons}
      </tbody>
    </Table>
  )
}

export default LessonsList
