import React from 'react'
import Pdf from './Pdf'
import Vid from './Vid'
import Aud from './Aud'
import Aux from '../../hoc/Aux/Aux'
import Spinner from '../../UI/Spinner/Spinner'
import './ResourceViewer.css'

const ResourceViewer = (props) => {

  let renderResource = (
    <div className="Center">
      <Spinner />
      <p>This resource has not been created yet. </p>
    </div>
  )

  if (props.resource.format === 'pdf' && props.resource.url !== 'no_url_given') {
    renderResource = <Pdf url={props.resource.url} />
  }

  if (props.resource.format === 'vid' && props.resource.url !== 'no_url_given') {
    renderResource = <Vid url={props.resource.url} />
  }

  if (props.resource.format === 'aud' && props.resource.url !== 'no_url_given') {
    renderResource = (
      <Aux>
        <hr />
        <h4>{props.resource.title}</h4>
        <Aud resource={props.resource} />
      </Aux>
    )
  }

  return (
    <div>
      {renderResource}
    </div>
  )
}

export default ResourceViewer