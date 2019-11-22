const API_URL = 'https://music-studio-api.herokuapp.com/api'
const LessonResourceService = {

  createLessonResource(data) {
    const request = {
      method: 'POST',
      body: JSON.stringify({ lesson_resource: data }),
      headers: { 'Content-Type': 'application/json' }
    }
    return fetch(`${API_URL}/lesson_resources`, request)
      .then(response => response.json())
      .catch(error => {
        console.log('[LessonResourceService][createLessonResource] ERROR: ', error)
      })
  },
  fetchLessonResources: () => {
    return fetch(`${API_URL}/lesson_resources`)
      .then(response => response.json())
      .catch(error => {
        console.log('[LessonResourceService][fetchLessonResources] ERROR: ', error)
      })
  },
  deleteLessonResource(id) {
    const request = {
      method: 'DELETE',
      body: JSON.stringify({ lesson_resource: id }),
      headers: { 'Content-Type': 'application/json' }
    }
    return fetch(`${API_URL}/lesson_resources/${id}`, request)
      .then(response => response.json())
      .catch(error => {
        console.log('[LessonResourceService][deleteLessonResource] ERROR: ', error)
      })
  }
}

export default LessonResourceService;
