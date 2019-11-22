import React, { Component } from 'react';
import './EditResource.css';
import { connect } from 'react-redux'
import * as actions from '../../store/actions/resourceActions'

class EditResource extends Component {
  constructor(props) {
    super(props)

    this.state = {
      resource: '',
      id: '',
      title: '',
      category: '',
      description: '',
      format: '',
      location: '',
      url: '',
      close: ''
    }
  }

  componentDidMount() {
    let resource = this.state.resource

    if (this.props.resource_id) {
      resource = this.props.resources.find(res => res.id === this.props.resource_id)
      this.setState({
        resource: resource,
        close: this.props.close
      })
    } else {
      resource = this.props.resources.find(res => res.id === +this.props.match.params.id)
      this.setState({ resource: resource })
    }

    this.setState({
      id: resource.id,
      title: resource.title,
      category: resource.category,
      description: resource.description,
      format: resource.format,
      location: resource.location,
      url: resource.url
    })
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    e.preventDefault()
  }

  handleCancel = () => {
    if (this.state.close) {
      this.props.close()
    } else {
      this.props.history.goBack()
    }
  }

  handleSubmit = (e) => {
    let { history } = this.props
    if (this.state.url === "") {
      this.setState({ url: 'no_url_given' })
    }
    let data = {
      id: this.state.id,
      title: this.state.title,
      category: this.state.category,
      description: this.state.description,
      format: this.state.format,
      location: this.state.location,
      url: this.state.url
    }

    this.props.onUpdateResource(data, history)
    if (this.state.close) {
      this.props.close()
    }
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <p className="FormInstructions">Edit form and click 'Save'</p>
        <form className="Form">
          <p><label htmlFor="resource_title">Title </label>
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
            /></p>
          <p><label>Category</label>
            <input
              type="text"
              name="category"
              value={this.state.category}
              onChange={this.handleChange}
            /></p>
          <p><label>Description</label>
            <input
              type="text"
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
            /></p>
          <p><label>Format</label>
            <input
              type="text"
              name="format"
              value={this.state.format}
              onChange={this.handleChange}
            /></p>
          <p><label>Location</label>
            <input
              type="text"
              name="location"
              value={this.state.location}
              onChange={this.handleChange}
            /></p>
          <p><label>URL</label>
            <input
              type="text"
              name="url"
              value={this.state.url}
              onChange={this.handleChange}
            /></p>
          <button
            type="button"
            name="cancel"
            onClick={this.handleCancel}
            className="Danger"
          >CANCEL</button>
          <button
            type='button'
            className="Success"
            onClick={(e) => this.handleSubmit(e)}
          >SAVE</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    resources: state.res.resources,
    teachers: state.tch.teachers
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onUpdateResource: (data, history) => dispatch(actions.updateResource(data, history))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditResource)
