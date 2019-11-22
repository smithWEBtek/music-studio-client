import React from 'react'
import './ResourceRow.css'
import { Link } from 'react-router-dom'
import Aux from '../../hoc/Aux/Aux'

const ResourceRow = (props) => {

  return (
    <Aux>
      <tr>
        <th scope="row">{props.resource.id}</th>

        {props.resource.url === 'no_url_given' ? (
          <td><button
            type='button'
            className="Disabled">empty</button></td>)
          :
          (<td><button
            className="Success"><Link
              to={`/resources/${props.resource.id}`}
              params={{ id: props.resource.id }}
              key={props.resource.id}>show</Link></button></td>)}

        <td><Link
          to={`/resources/${props.resource.id}`}
          params={{ id: props.resource.id }}
          key={props.resource.id}
        >{props.resource.title}</Link></td>

        <td>{props.resource.category}</td>
        <td>{props.resource.description}</td>
        <td>{props.resource.format}</td>
        <td>{props.resource.location}</td>

        {props.edit ?
          <td><button
            type='button'
            className="Edit"
            onClick={() => props.edit(props.resource.id)}>edit
        </button></td>
          : null}

        {props.deleteResource ?
          <td><button
            onClick={() => props.deleteResource(props.resource.id)}
            className="Danger">x</button></td>
          : null}
      </tr>
    </Aux>
  )
}

export default ResourceRow
