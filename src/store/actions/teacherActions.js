import * as actionTypes from './actionTypes'
import TeacherService from '../services/TeacherService'

//-----CREATE TEACHER ACTIONS-----------------------------
export const createTeacherStart = () => {
  return { type: actionTypes.CREATE_TEACHER_START }
}
export const createTeacherSuccess = () => {
  return { type: actionTypes.CREATE_TEACHER_SUCCESS }
}
export const createTeacherFail = (error) => {
  return { type: actionTypes.CREATE_TEACHER_FAIL, error: error }
}
export const createTeacher = (data, history) => {
  return dispatch => {
    dispatch(createTeacherStart())
    TeacherService.createTeacher(data)
      .then(response => {
        dispatch({ type: actionTypes.CREATE_TEACHER, teacherData: response })
        history.push(`/teachers/${response.id}`)
        dispatch(createTeacherSuccess())
      })
      .catch(error => {
        dispatch(createTeacherFail(error))
      })
  }
}


//-----FETCH TEACHERS ACTIONS-----------------------------
export const fetchTeachersStart = () => {
  return { type: actionTypes.FETCH_TEACHERS_START }
}
export const fetchTeachersSuccess = (teachers) => {
  return { type: actionTypes.FETCH_TEACHERS_SUCCESS }
}
export const fetchTeachersFail = (error) => {
  return { type: actionTypes.FETCH_TEACHERS_FAIL, error: error }
}
export const fetchTeachers = () => {
  return dispatch => {
    dispatch(fetchTeachersStart())
    TeacherService.fetchTeachers()
      .then(response => {
        dispatch({ type: actionTypes.FETCH_TEACHERS, teachersList: response })
        dispatch(fetchTeachersSuccess())
      })
      .catch(error => {
        dispatch(fetchTeachersFail(error))
      })
  }
}


//-----UPDATE TEACHER ACTIONS-----------------------------
export const updateTeacherStart = () => {
  return { type: actionTypes.UPDATE_TEACHER_START }
}
export const updateTeacherSuccess = () => {
  return { type: actionTypes.UPDATE_TEACHER_SUCCESS }
}
export const updateTeacherFail = (error) => {
  return { type: actionTypes.UPDATE_TEACHER_FAIL, error: error }
}
export const updateTeacher = (data, history) => {
  return dispatch => {
    dispatch(updateTeacherStart())
    TeacherService.updateTeacher(data)
      .then(response => {
        dispatch({ type: actionTypes.UPDATE_TEACHER, updatedTeacherData: response })
        history.goBack()
        dispatch(updateTeacherSuccess())
      })
      .catch(error => {
        dispatch(updateTeacherFail(error))
      })
  }
}

//-----DELETE TEACHER ACTIONS-----------------------------
export const deleteTeacherStart = () => {
  return { type: actionTypes.DELETE_TEACHER_START }
}
export const deleteTeacherSuccess = () => {
  return { type: actionTypes.DELETE_TEACHER_SUCCESS }
}
export const deleteTeacherFail = (error) => {
  return { type: actionTypes.DELETE_TEACHER_FAIL, error: error }
}
export const deleteTeacher = (id, history) => {
  return dispatch => {
    dispatch(deleteTeacherStart())
    TeacherService.deleteTeacher(id)
      .then(response => {
        dispatch({ type: actionTypes.DELETE_TEACHER, id: id })
        dispatch(deleteTeacherSuccess())
        history.push('/teachers')
      })
      .catch(error => {
        dispatch(deleteTeacherFail(error))
      })
  }
}
