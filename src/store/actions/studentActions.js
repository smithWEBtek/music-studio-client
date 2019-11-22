import * as actionTypes from './actionTypes'
import StudentService from '../services/StudentService'

//-----CREATE STUDENT ACTIONS-----------------------------
export const createStudentStart = () => {
  return { type: actionTypes.CREATE_STUDENT_START }
}
export const createStudentSuccess = () => {
  return { type: actionTypes.CREATE_STUDENT_SUCCESS }
}
export const createStudentFail = (error) => {
  return { type: actionTypes.CREATE_STUDENT_FAIL, error: error }
}
export const createStudent = (data, history) => {
  return dispatch => {
    dispatch(createStudentStart())
    StudentService.createStudent(data)
      .then(response => {
        dispatch({ type: actionTypes.CREATE_STUDENT, studentData: response })
        history.push(`/students/${response.id}`)
        dispatch(createStudentSuccess())
      })
      .catch(error => {
        dispatch(createStudentFail(error))
      })
  }
}


//-----FETCH STUDENTS ACTIONS-----------------------------
export const fetchStudentsStart = () => {
  return { type: actionTypes.FETCH_STUDENTS_START }
}
export const fetchStudentsSuccess = (students) => {
  return { type: actionTypes.FETCH_STUDENTS_SUCCESS, studentsList: students }
}
export const fetchStudentsFail = (error) => {
  return { type: actionTypes.FETCH_STUDENTS_FAIL, error: error }
}
export const fetchStudents = () => {
  return dispatch => {
    dispatch(fetchStudentsStart())
    StudentService.fetchStudents()
      .then(response => {

        dispatch({ type: actionTypes.FETCH_STUDENTS, studentsList: response })
        dispatch(fetchStudentsSuccess())
      })
      .catch(error => {
        dispatch(fetchStudentsFail(error))
      })
  }
}


//-----UPDATE STUDENT ACTIONS-----------------------------
export const updateStudentStart = () => {
  return { type: actionTypes.UPDATE_STUDENT_START }
}
export const updateStudentSuccess = () => {
  return { type: actionTypes.UPDATE_STUDENT_SUCCESS }
}
export const updateStudentFail = (error) => {
  return { type: actionTypes.UPDATE_STUDENT_FAIL, error: error }
}
export const updateStudent = (data, history) => {
  return dispatch => {
    dispatch(updateStudentStart())
    StudentService.updateStudent(data)
      .then(response => {
        dispatch({ type: actionTypes.UPDATE_STUDENT, updatedStudentData: response })
        history.goBack()
        dispatch(updateStudentSuccess())
      })
      .catch(error => {
        dispatch(updateStudentFail(error))
      })
  }
}

//-----DELETE STUDENT ACTIONS-----------------------------
export const deleteStudentStart = () => {
  return { type: actionTypes.DELETE_STUDENT_START }
}
export const deleteStudentSuccess = () => {
  return { type: actionTypes.DELETE_STUDENT_SUCCESS }
}
export const deleteStudentFail = (error) => {
  return { type: actionTypes.DELETE_STUDENT_FAIL, error: error }
}
export const deleteStudent = (id, history) => {
  return dispatch => {
    dispatch(deleteStudentStart())
    StudentService.deleteStudent(id)
      .then(response => {
        dispatch({ type: actionTypes.DELETE_STUDENT, id: id })
        dispatch(deleteStudentSuccess())
        history.push('/students')
      })
      .catch(error => {
        dispatch(deleteStudentFail(error))
      })
  }
}
