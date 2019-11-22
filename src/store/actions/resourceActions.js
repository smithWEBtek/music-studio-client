import * as actionTypes from './actionTypes'
import ResourceService from '../services/ResourceService'

//-----CREATE RESOURCE ACTIONS-----------------------------
export const createResourceStart = () => {
  return { type: actionTypes.CREATE_RESOURCE_START }
}
export const createResourceSuccess = () => {
  return { type: actionTypes.CREATE_RESOURCE_SUCCESS }
}
export const createResourceFail = (error) => {
  return { type: actionTypes.CREATE_RESOURCE_FAIL, error: error }
}
export const createResource = (data, history) => {
  return dispatch => {
    dispatch(createResourceStart())
    ResourceService.createResource(data)
      .then(response => {
        dispatch({ type: actionTypes.CREATE_RESOURCE, resourceData: response })
        history.push(`/resources/${response.id}`)
        dispatch(createResourceSuccess())
      })
      .catch(error => {
        dispatch(createResourceFail(error))
      })
  }
}


//-----FETCH RESOURCES ACTIONS-----------------------------
export const fetchResourcesStart = () => {
  return { type: actionTypes.FETCH_RESOURCES_START }
}
export const fetchResourcesSuccess = (resources) => {
  return { type: actionTypes.FETCH_RESOURCES_SUCCESS }
}
export const fetchResourcesFail = (error) => {
  return { type: actionTypes.FETCH_RESOURCES_FAIL, error: error }
}
export const fetchResources = () => {
  return dispatch => {
    dispatch(fetchResourcesStart())
    ResourceService.fetchResources()
      .then(response => {
        dispatch({ type: actionTypes.FETCH_RESOURCES, resourcesList: response })
        dispatch(fetchResourcesSuccess())
      })
      .catch(error => {
        dispatch(fetchResourcesFail(error))
      })
  }
}


//-----UPDATE RESOURCE ACTIONS-----------------------------
export const updateResourceStart = () => {
  return { type: actionTypes.UPDATE_RESOURCE_START }
}
export const updateResourceSuccess = () => {
  return { type: actionTypes.UPDATE_RESOURCE_SUCCESS }
}
export const updateResourceFail = (error) => {
  return { type: actionTypes.UPDATE_RESOURCE_FAIL, error: error }
}
export const updateResource = (data, history) => {
  return dispatch => {
    dispatch(updateResourceStart())
    ResourceService.updateResource(data)
      .then(response => {
        dispatch({ type: actionTypes.UPDATE_RESOURCE, updatedResourceData: response })
        history.goBack()
        dispatch(updateResourceSuccess())
      })
      .catch(error => {
        dispatch(updateResourceFail(error))
      })
  }
}

//-----DELETE RESOURCE ACTIONS-----------------------------
export const deleteResourceStart = () => {
  return { type: actionTypes.DELETE_RESOURCE_START }
}
export const deleteResourceSuccess = () => {
  return { type: actionTypes.DELETE_RESOURCE_SUCCESS }
}
export const deleteResourceFail = (error) => {
  return { type: actionTypes.DELETE_RESOURCE_FAIL, error: error }
}
export const deleteResource = (id) => {
  return dispatch => {
    dispatch(deleteResourceStart())
    ResourceService.deleteResource(id)
      .then(response => {
        dispatch({ type: actionTypes.DELETE_RESOURCE, id: id })
        dispatch(deleteResourceSuccess())
      })
      .catch(error => {
        dispatch(deleteResourceFail(error))
      })
  }
}
