const API_URL = 'https://music-studio-api.herokuapp.com/api'

const ResourceService = {
  createResource(resource) {
    const request = {
      method: 'POST',
      body: JSON.stringify({ resource: resource }),
      headers: { 'Content-Type': 'application/json' }
    }
    return fetch(`${API_URL}/resources`, request)
      .then(response => response.json())
      .catch(error => {
        console.log('[ResourceService][createResource] ERROR: ', error)
      })
  },
  fetchResources() {
    return fetch(`${API_URL}/resources`)
      .then(response => response.json())
      .catch(error => {
        console.log('[ResourceService][fetchResources] ERROR: ', error)
      })
  },
  updateResource(data) {
    const request = {
      method: 'PATCH',
      body: JSON.stringify({ resource: data }),
      headers: { 'Content-Type': 'application/json' }
    }
    return fetch(`${API_URL}/resources/${data.id}`, request)
      .then(response => response.json())
      .catch(error => {
        console.log('[ResourceService][updateResource] ERROR: ', error)
      })
  },
  deleteResource(id) {
    const request = {
      method: 'DELETE',
      body: JSON.stringify({ id: id }),
      headers: { 'Content-Type': 'application/json' }
    }
    return fetch(`${API_URL}/resources/${id}`, request)
      .then(response => response.json())
      .catch(error => {
        console.log('[ResourceService][deleteResource] ERROR: ', error)
      })
  }
}

export default ResourceService;
