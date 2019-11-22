const API_URL = 'https://music-studio-api.herokuapp.com/api'

const StudentService = {
  createStudent(student) {
    const request = {
      method: 'POST',
      body: JSON.stringify({ student: student }),
      headers: { 'Content-Type': 'application/json' }
    }
    return fetch(`${API_URL}/students`, request)
      .then(response => response.json())
      .catch(error => {
        console.log('[StudentService][createStudent] ERROR: ', error)
      })
  },
  fetchStudents() {
    return fetch(`${API_URL}/students`)
      .then(response => response.json())
      .catch(error => {
        console.log('[StudentService][fetchStudents] ERROR: ', error)
      })
  },
  updateStudent(data) {
    const request = {
      method: 'PATCH',
      body: JSON.stringify({ student: data }),
      headers: { 'Content-Type': 'application/json' }
    }
    return fetch(`${API_URL}/students/${data.id}`, request)
      .then(response => response.json())
      .catch(error => {
        console.log('[StudentService][updateStudent] ERROR: ', error)
      })
  },
  deleteStudent(id) {
    const request = {
      method: 'DELETE',
      body: JSON.stringify({ id: id }),
      headers: { 'Content-Type': 'application/json' }
    }
    return fetch(`${API_URL}/students/${id}`, request)
      .then(response => response.json())
      .catch(error => {
        console.log('[StudentService][deleteStudent] ERROR: ', error)
      })
  }
}

export default StudentService;
