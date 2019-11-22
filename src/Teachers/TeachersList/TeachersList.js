import React from 'react'
import { Table } from 'reactstrap'
import TeacherRow from '../TeacherRow/TeacherRow'
import './TeachersList.css'

const TeachersList = (props) => {
  let sortedTeachers = props.teachers.sort((a, b) => a.lastname.toLowerCase() < b.lastname.toLowerCase() ? -1 : a.lastname.toLowerCase() > b.lastname.toLowerCase() ? 1 : 0)

  let renderTeachers = sortedTeachers.map((teacher, index) => {
    return (
      <TeacherRow
        key={index}
        teacher={teacher}
        edit={props.edit}
        deleteTeacher={props.deleteTeacher}
      />
    )
  })

  return (
    <div>
      <Table striped size="sm" className="TeachersList">
        <thead>
          <tr>
            <th>ID</th>
            <th>Last, First</th>
            <th>Email</th>
            <th>Active?</th>
            <th>Show</th>
            {props.edit ? <th>Edit</th> : null}
            {props.deleteTeacher ? <th>Delete</th> : null}
          </tr>
        </thead>
        <tbody>
          {renderTeachers}
        </tbody>
      </Table>
    </div>
  )
}

export default TeachersList
