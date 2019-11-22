import React from 'react'
import './StudentRow.css'
import { Link } from 'react-router-dom'
import Aux from '../../hoc/Aux/Aux'

const StudentRow = (props) => {

	return (
		<Aux>
			<tr>
				<th scope="row">{props.student.id}</th>
				<td>
					<Link
						to={`/students/${props.student.id}`}
						style={{ marginRight: '5px' }}
						key={props.student.id}>{props.student.lastname}
					</Link>
				</td>
				<td>
					{props.student.firstname}
				</td>
				<td>{props.student.email}</td>
				<td>{props.student.teacher_id}</td>
				<td>{props.student.level}</td>

				<td className={props.student.active.toString()}>{props.student.active.toString()}</td>

				<td><button
					type='button'
					className="Success">
					<Link
						to={`/students/${props.student.id}`}
						key={props.student.id}
					>show</Link>
				</button></td>

				{props.edit ?
					<td><button
						type='button'
						className="Edit"
						onClick={() => props.edit(props.student.id)}>edit
        </button></td>
					: null}

				{props.deleteStudent ?
					<td><button
						onClick={() => props.deleteStudent(props.student.id)}
						className="Danger">X</button></td>
					: null}

				{props.likeStudent ?
					<td><button
						onClick={() => props.likeStudent(props.student.id)}
						className="Success">LIKE</button></td>
					: null}

				{props.likeStudent ?
					<td className="LikeCount">{props.student.likes.toString()}</td>
					: null}

			</tr>
		</Aux>
	)
}

export default StudentRow
