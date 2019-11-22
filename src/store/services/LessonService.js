const API_URL = 'https://music-studio-api.herokuapp.com/api'

const LessonService = {
  createLesson(lesson) {
    const request = {
      method: 'POST',
      body: JSON.stringify({ lesson: lesson }),
      headers: { 'Content-Type': 'application/json' }
    }
    return fetch(`${API_URL}/lessons`, request)
      .then(response => response.json())
      .catch(error => {
        console.log('[LessonService][createLesson] ERROR: ', error)
      })
  },
  fetchLessons() {
    return fetch(`${API_URL}/lessons`)
      .then(response => response.json())
      .catch(error => {
        console.log('[LessonService][fetchLessons] ERROR: ', error)
      })
  },
  updateLesson(data) {
    const request = {
      method: 'PATCH',
      body: JSON.stringify({ lesson: data }),
      headers: { 'Content-Type': 'application/json' }
    }
    return fetch(`${API_URL}/lessons/${data.id}`, request)
      .then(response => response.json())
      .catch(error => {
        console.log('[LessonService][updateLesson] ERROR: ', error)
      })
  },
  deleteLesson(id) {
    const request = {
      method: 'DELETE',
      body: JSON.stringify({ id: id }),
      headers: { 'Content-Type': 'application/json' }
    }
    return fetch(`${API_URL}/lessons/${id}`, request)
      .then(response => response.json())
      .catch(error => {
        console.log('[LessonService][deleteLesson] ERROR: ', error)
      })
  }
}

export default LessonService;
