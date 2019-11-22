import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions/index'

import { Container } from 'reactstrap'
import Modal from '../UI/Modal/Modal'
import Resource from './Resource/Resource'
import CreateResource from './CreateResource/CreateResource'
import EditResource from './EditResource/EditResource'
import ResourcesList from './ResourcesList/ResourcesList'

class Resources extends Component {
  state = {
    resource: '',
    showResource: false,
    createResource: false,
    editResource: false
  }

  componentDidMount() {
    this.props.onFetchResources();
  }

  //********SHOW_RESOURCE form handling**************************
  showResourceClose = () => {
    this.setState({ showResource: false })
  }

  //********CREATE_RESOURCE form handling **************************
  createResourceForm = () => {
    this.setState({ createResource: true })
  }

  createResourceFormCancel = () => {
    this.setState({ createResource: false })
  }

  createResource = (newResourceData) => {
    const { history } = this.props
    this.props.onCreateResource(newResourceData, history)
    this.setState({ createResource: false })
  }

  //********EDIT_RESOURCE form handling**************************
  showEditResourceForm = (id) => {
    let resourceData = this.props.resources.filter(resource => resource.id === id)[0]
    this.setState({
      resource: resourceData,
      editResource: true
    })
  }

  closeEditResourceForm = () => {
    this.setState({
      editResource: false,
      resource: null
    })
  }

  //********DELETE_RESOURCE handling****************
  deleteResource = (id) => {
    let { history } = this.props
    this.props.onDeleteResource(id, history)
  }

  render() {

    const { match, resources } = this.props;

    return (
      <Container>
        <hr />

        {/*********CREATE RESOURCE MODAL********************************************/}
        <button onClick={this.createResourceForm}>Add Resource</button>
        <Modal
          show={this.state.createResource}
          modalClosed={this.createResourceFormCancel}>
          <CreateResource
            createResource={(newResourceData) => this.createResource(newResourceData)}
            createResourceCancel={this.createResourceFormCancel} />
        </Modal>

        {/**********EDIT RESOURCE MODAL**********************************************/}
        <Modal
          show={this.state.editResource}
          modalClosed={this.closeEditResourceForm}>
          {this.state.resource ? <EditResource
            resource_id={this.state.resource.id}
            close={() => this.closeEditResourceForm()}
          /> : null}
        </Modal>

        {/**********RESOURCES LIST**********************************************/}
        <div>
          <Switch>
            <Route path={`${match.url}/:id/edit`} exact component={EditResource} />
            <Route path={`${match.url}/new`} exact component={CreateResource} />
            <Route path={`${match.url}/:id`} exact component={Resource} />
            <Route path={match.ur} exact />
          </Switch>
        </div>
        <div>
          <div><h5 className="IndexHeaderBackground">ALL resources</h5>
            <ResourcesList
              resources={resources}
              edit={(id) => this.showEditResourceForm(id)}
              deleteResource={(id) => this.deleteResource(id)} />
          </div>
        </div>
      </Container >
    )
  }
};

const mapStateToProps = state => {
  return {
    resources: state.res.resources
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchResources: () => dispatch(actions.fetchResources()),
    onCreateResource: (data, history) => dispatch(actions.createResource(data, history)),
    onUpdateResource: (data, history) => dispatch(actions.updateResource(data, history)),
    onDeleteResource: (id, history) => dispatch(actions.deleteResource(id, history))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Resources);
