import * as actionTypes from './actionTypes'
import LessonResourceService from '../services/LessonResourceService'
import { fetchLessons } from './lessonActions';

//-----CREATE LESSON_RESOURCE ACTIONS-----------------------------
export const createLessonResourceStart = () => {
  return { type: actionTypes.CREATE_LESSON_RESOURCE_START }
}
export const createLessonResourceSuccess = () => {
  return { type: actionTypes.CREATE_LESSON_RESOURCE_SUCCESS }
}
export const createLessonResourceFail = (error) => {
  return { type: actionTypes.CREATE_LESSON_RESOURCE_FAIL, error: error }
}
export const createLessonResource = (data, history) => {
  return dispatch => {
    dispatch(createLessonResourceStart())
    LessonResourceService.createLessonResource(data)
      .then(response => {
        dispatch({ type: actionTypes.CREATE_LESSON_RESOURCE, lessonResourceData: response })
        dispatch(createLessonResourceSuccess())
        dispatch(fetchLessons())
      })
      .catch(error => {
        dispatch(createLessonResourceFail(error))
      })
  }
}


//-----FETCH LESSON_RESOURCES ACTIONS-----------------------------
export const fetchLessonResourcesStart = () => {
  return { type: actionTypes.FETCH_LESSON_RESOURCES_START }
}
export const fetchLessonResourcesSuccess = (lessonResources) => {
  return { type: actionTypes.FETCH_LESSON_RESOURCES_SUCCESS, lessonResourcesList: lessonResources }
}
export const fetchLessonResourcesFail = (error) => {
  return { type: actionTypes.FETCH_LESSON_RESOURCES_FAIL, error: error }
}
export const fetchLessonResources = () => {
  return dispatch => {
    dispatch(fetchLessonResourcesStart())
    LessonResourceService.fetchLessonResources()
      .then(response => {
        dispatch({ type: actionTypes.FETCH_LESSON_RESOURCES, lessonResourcesList: response })
        dispatch(fetchLessonResourcesSuccess())
      })
      .catch(error => {
        dispatch(fetchLessonResourcesFail(error))
      })
  }
}


//-----UPDATE RESOURCE ACTIONS-----------------------------
export const updateLessonResourceStart = () => {
  return { type: actionTypes.UPDATE_RESOURCE_START }
}
export const updateLessonResourceSuccess = () => {
  return { type: actionTypes.UPDATE_RESOURCE_SUCCESS }
}
export const updateLessonResourceFail = (error) => {
  return { type: actionTypes.UPDATE_RESOURCE_FAIL, error: error }
}
export const updateLessonResource = (data, history) => {
  return dispatch => {
    dispatch(updateLessonResourceStart())
    LessonResourceService.updateLessonResource(data)
      .then(response => {
        dispatch({ type: actionTypes.UPDATE_RESOURCE, updatedResourceData: response })
        history.goBack()
        dispatch(updateLessonResourceSuccess())
      })
      .catch(error => {
        dispatch(updateLessonResourceFail(error))
      })
  }
}


//-----DELETE LESSON_RESOURCE ACTIONS-----------------------------
export const deleteLessonResourceStart = () => {
  return { type: actionTypes.DELETE_LESSON_RESOURCE_START }
}
export const deleteLessonResourceSuccess = () => {
  return { type: actionTypes.DELETE_LESSON_RESOURCE_SUCCESS }
}
export const deleteLessonResourceFail = (error) => {
  return { type: actionTypes.DELETE_LESSON_RESOURCE_FAIL, error: error }
}
export const deleteLessonResource = (id, lesson_id, history) => {
  return dispatch => {
    dispatch(deleteLessonResourceStart())
    LessonResourceService.deleteLessonResource(id)
      .then(response => {
        dispatch({ type: actionTypes.DELETE_LESSON_RESOURCE, id: id })
        dispatch(deleteLessonResourceSuccess())
        // history.push(`/lessons/${lesson_id}`)
        dispatch(fetchLessons())
      })
      .catch(error => {
        dispatch(deleteLessonResourceFail(error))
      })
  }
}
