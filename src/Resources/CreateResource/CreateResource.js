import React, { Component } from 'react';
import './CreateResource.css';

class CreateResource extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      category: '',
      description: '',
      format: '',
      location: '',
      url: 'no_url_given'
    }
  }

  handleOnChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.url === "") {
      this.setState({ url: 'no_url_given' })
    }
    const resourceData = this.state;
    this.props.createResource(resourceData)
    this.setState({
      title: '',
      category: '',
      description: '',
      format: '',
      location: '',
      url: 'no_url_given'
    });
    this.props.createResourceCancel()
  }

  render() {
    return (
      <div>
        <p className="FormInstructions">Complete form and click 'Create Resource'</p>
        <form onSubmit={this.handleSubmit}>
          <p><label htmlFor="resource_name">Title
            </label>
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={(event) => this.handleOnChange(event)}
              placeholder="title"
              required /></p>
          <p><label htmlFor="resource_name">Category
            </label>
            <input
              type="text"
              name="category"
              value={this.state.category}
              onChange={(event) => this.handleOnChange(event)}
              placeholder="category"
              required /></p>
          <p><label htmlFor="resource_name">Description
            </label>
            <input
              type="text"
              name="description"
              value={this.state.description}
              onChange={(event) => this.handleOnChange(event)}
              placeholder="description"
              required /></p>
          <p><label htmlFor="resource_name">Format
            </label>
            <input
              type="text"
              name="format"
              value={this.state.format}
              onChange={(event) => this.handleOnChange(event)}
              placeholder="format"
              required /></p>
          <p><label htmlFor="resource_name">Location
            </label>
            <input
              type="text"
              name="location"
              value={this.state.location}
              onChange={(event) => this.handleOnChange(event)}
              placeholder="location"
              required /></p>
          <p><label htmlFor="resource_name">URL
            </label>
            <input
              type="text"
              name="url"
              value={this.state.url}
              onChange={(event) => this.handleOnChange(event)}
              placeholder="url" /></p>
          <button
            type="button"
            onClick={this.props.createResourceCancel}
            className="Danger">CANCEL</button>

          <button className="Success"
          >CREATE Resource</button>
        </form>
      </div>
    )
  }
}

export default CreateResource;
