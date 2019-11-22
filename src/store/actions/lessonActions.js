import * as actionTypes from './actionTypes'
import LessonService from '../services/LessonService'

//-----CREATE LESSON ACTIONS-----------------------------
export const createLessonStart = () => {
  return { type: actionTypes.CREATE_LESSON_START }
}
export const createLessonSuccess = () => {
  return { type: actionTypes.CREATE_LESSON_SUCCESS }
}
export const createLessonFail = (error) => {
  return { type: actionTypes.CREATE_LESSON_FAIL, error: error }
}
export const createLesson = (data, history) => {
  return dispatch => {
    dispatch(createLessonStart())
    LessonService.createLesson(data)
      .then(response => {
        dispatch({ type: actionTypes.CREATE_LESSON, lessonData: response })
        history.push(`/lessons/${response.id}`)
        console.log('createLesson', response)
        dispatch(createLessonSuccess())
      })
      .catch(error => {
        dispatch(createLessonFail(error))
      })
  }
}


//-----FETCH LESSONS ACTIONS-----------------------------
export const fetchLessonsStart = () => {
  return { type: actionTypes.FETCH_LESSONS_START }
}
export const fetchLessonsSuccess = (lessons) => {
  return { type: actionTypes.FETCH_LESSONS_SUCCESS, lessonsList: lessons }
}
export const fetchLessonsFail = (error) => {
  return { type: actionTypes.FETCH_LESSONS_FAIL, error: error }
}
export const fetchLessons = () => {
  return dispatch => {
    dispatch(fetchLessonsStart())
    LessonService.fetchLessons()
      .then(response => {
        dispatch({ type: actionTypes.FETCH_LESSONS, lessonsList: response })
        dispatch(fetchLessonsSuccess())
      })
      .catch(error => {
        dispatch(fetchLessonsFail(error))
      })
  }
}


//-----UPDATE LESSON ACTIONS-----------------------------
export const updateLessonStart = () => {
  return { type: actionTypes.UPDATE_LESSON_START }
}
export const updateLessonSuccess = () => {
  return { type: actionTypes.UPDATE_LESSON_SUCCESS }
}
export const updateLessonFail = (error) => {
  return { type: actionTypes.UPDATE_LESSON_FAIL, error: error }
}
export const updateLesson = (data, history) => {
  return dispatch => {
    dispatch(updateLessonStart())
    LessonService.updateLesson(data)
      .then(response => {
        dispatch({ type: actionTypes.UPDATE_LESSON, updatedLessonData: response })
        history.goBack()
        dispatch(updateLessonSuccess())
      })
      .catch(error => {
        dispatch(updateLessonFail(error))
      })
  }
}

//-----DELETE LESSON ACTIONS-----------------------------
export const deleteLessonStart = () => {
  return { type: actionTypes.DELETE_LESSON_START }
}
export const deleteLessonSuccess = () => {
  return { type: actionTypes.DELETE_LESSON_SUCCESS }
}
export const deleteLessonFail = (error) => {
  return { type: actionTypes.DELETE_LESSON_FAIL, error: error }
}
export const deleteLesson = (id, history) => {
  return dispatch => {
    dispatch(deleteLessonStart())
    LessonService.deleteLesson(id)
      .then(response => {
        dispatch({ type: actionTypes.DELETE_LESSON, id: id })
        dispatch(deleteLessonSuccess())
        history.push('/lessons')
      })
      .catch(error => {
        dispatch(deleteLessonFail(error))
      })
  }
}
