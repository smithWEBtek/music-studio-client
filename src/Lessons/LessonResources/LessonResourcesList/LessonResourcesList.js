import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Link, withRouter } from 'react-router-dom'
import './LessonResourcesList.css'
import { Table } from 'reactstrap'
import Aux from '../../../hoc/Aux/Aux'
import * as actions from '../../../store/actions/index'
import '../../../App.css'

const LessonResourcesList = (props) => {

  const addLessonResource = (lesson_id, resource_id) => {
    let { history } = props
    let data = {
      lesson_id: lesson_id,
      resource_id: resource_id
    }
    props.onCreateLessonResource(data, history)
  }

  const removeLessonResource = (id) => {
    let { history } = props
    props.onDeleteLessonResource(id, props.lesson.id, history)
  }

  let renderLessonResources = <tr><td>No resources for this lesson</td></tr>
  let allResources = <tr><td>Loading full resources list ...</td></tr>

  if (props.lesson.resources) {
    renderLessonResources = props.lesson.resources.map((resource, index) => {
      let resourceLRID = props.lesson.lesson_resources.find(lr => lr.resource_id === resource.id).id
      console.log('[LessonResourcesList] resourceLRID', resourceLRID)
      return (
        <tr key={index}>
          <th scope="row">{resource.id}</th>
          <td><button type='button' onClick={() => removeLessonResource(resourceLRID)} className="Danger">
            Remove</button></td>
          <td><Link to={`/resources/${resource.id}`}>{resource.title}</Link></td>
          <td>{resource.format}</td>
          <td>{resource.category}</td>
          <td>{resource.description}</td>
        </tr>
      )
    })
  }

  allResources = props.resources.map((resource, index) => {
    return (
      <tr key={index}>
        <th scope="row">{resource.id}</th>
        <td><button
          type='button'
          onClick={() => addLessonResource(props.lesson.id, resource.id)}
          className="Success">Add</button></td>

        {resource.url === 'no_url_given' ? (
          <td><button
            type='button'
            className="Disabled"
          >Empty</button></td>)
          : (<td><button><Link
            to={`/resources/${resource.id}`}
            params={{ id: resource.id }}
            key={resource.id}
            onClick={props.close}
          >Show</Link></button></td>)}

        <td><Link to={`/resources/${resource.id}`}>{resource.title}</Link></td>
        <td>{resource.format}</td>
        <td>{resource.category}</td>
        <td>{resource.description}</td>
      </tr>
    )
  })

  return (
    <Aux>
      < Table striped size="sm" >
        <thead>
          <tr>
            <th>ID</th>
            <th>Remove</th>
            <th>Title</th>
            <th>Format</th>
            <th>Category</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {renderLessonResources}
        </tbody>
      </Table>
      <div><h5 className="ResourceHeaderBackground">Add Additional Resources</h5></div>
      < Table striped size="sm" >
        <thead>
          <tr>
            <th>ID</th>
            <th>Add</th>
            <th>Available</th>
            <th>Title</th>
            <th>Format</th>
            <th>Category</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {allResources}
        </tbody>
      </Table>
      <div>
        <Switch>
          <Route path='/lesson_resources/:id' exact />
          <Route path='/lesson_resources' exact />
        </Switch>
      </div>
    </Aux>
  )
}

const mapStateToProps = state => {
  return {
    lessonResources: state.lesres.lessonResources,
    resources: state.res.resources
  }
}

const addDispatchToProps = dispatch => {
  return {
    onCreateLessonResource: (data, history) => dispatch(actions.createLessonResource(data, history)),
    onDeleteLessonResource: (id, lesson_id, history) => dispatch(actions.deleteLessonResource(id, lesson_id, history))
  }
}

export default connect(mapStateToProps, addDispatchToProps)(withRouter(LessonResourcesList))
