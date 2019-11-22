import React from 'react'
import './TeacherRow.css'
import { Link } from 'react-router-dom'
import Aux from '../../hoc/Aux/Aux'

const TeacherRow = (props) => {

  return (
    <Aux key={props.index}>
      <tr>
        <th scope="row">{props.teacher.id}</th>

        <td><Link to={`/teachers/${props.teacher.id}`}
          style={{ marginRight: '5px' }}
          onClick={props.close}
          key={props.teacher.id}>{props.teacher.lastname}, {props.teacher.firstname} </Link></td>
        <td>{props.teacher.email}</td>

        {props.teacher.active ? <td className="true">{props.teacher.active.toString()}</td> :
          <td className="false">{props.teacher.active.toString()}</td>}

        <td><button
          type='button'
          className="Success"
          onClick={props.close}>
          <Link
            to={`/teachers/${props.teacher.id}`}
            key={props.teacher.id}
          >show</Link>
        </button></td>

        {props.edit ?
          <td><button
            type='button'
            className="Edit"
            onClick={() => props.edit(props.teacher.id)}>edit
        </button></td>
          : null}

        {props.deleteTeacher ?
          <td><button
            onClick={() => props.deleteTeacher(props.teacher.id)}
            className="Danger">x</button></td>
          : null}
      </tr>
    </Aux>
  )
}

export default TeacherRow
