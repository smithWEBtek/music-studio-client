import * as actionTypes from '../actions/actionTypes';

const initialState = {
  resources: [],
  loading: false,
  error: false,
  message: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    //-----CREATE RESOURCE-----------------------------
    case actionTypes.CREATE_RESOURCE_START:
      return Object.assign({}, state, { loading: true })

    case actionTypes.CREATE_RESOURCE_SUCCESS:
      return Object.assign({}, state, { loading: false })

    case actionTypes.CREATE_RESOURCE_FAIL:
      return Object.assign({}, state, {
        error: action.error,
        loading: false,
        message: action.type
      })

    case actionTypes.CREATE_RESOURCE:
      const newResource = action.resourceData
      return Object.assign({}, state, {
        resources: state.resources.concat(newResource)
      })


    //-----FETCH RESOURCES-----------------------------
    case actionTypes.FETCH_RESOURCES_START:
      return Object.assign({}, state, { loading: true })

    case actionTypes.FETCH_RESOURCES_SUCCESS:
      return Object.assign({}, state, { loading: false })

    case actionTypes.FETCH_RESOURCES_FAIL:
      return Object.assign({}, state, {
        error: action.error,
        loading: false,
        message: action.type
      })

    case actionTypes.FETCH_RESOURCES:
      const resources = action.resourcesList
      return Object.assign({}, state, {
        resources: resources
      })


    //-----UPDATE RESOURCE-----------------------------
    case actionTypes.UPDATE_RESOURCE_START:
      return Object.assign({}, state, { loading: true })

    case actionTypes.UPDATE_RESOURCE_SUCCESS:
      return Object.assign({}, state, { loading: false })

    case actionTypes.UPDATE_RESOURCE_FAIL:
      return Object.assign({}, state, {
        error: action.error,
        loading: false,
        message: action.type
      })

    case actionTypes.UPDATE_RESOURCE:
      const resourceData = action.updatedResourceData
      const resourceIndex = state.resources.findIndex(resource => resource.id === resourceData.id);
      const stateTemp = {
        ...state,
        resources: [
          ...state.resources.slice(0, resourceIndex),
          ...state.resources.slice(resourceIndex + 1, state.resources.length)
        ]
      };
      return Object.assign({}, { ...stateTemp }, { resources: stateTemp.resources.concat(resourceData) })


    //-----DELETE RESOURCE-----------------------------
    case actionTypes.DELETE_RESOURCE_START:
      return Object.assign({}, state, { loading: true })

    case actionTypes.DELETE_RESOURCE_SUCCESS:
      return Object.assign({}, state, { loading: false })

    case actionTypes.DELETE_RESOURCE_FAIL:
      return Object.assign({}, state, {
        error: action.error,
        loading: false,
        message: action.type
      })

    case actionTypes.DELETE_RESOURCE:
      const updatedResources = state.resources.filter(resource => resource.id !== action.id);

      return Object.assign({}, state, {
        resources: updatedResources
      })

    //----- DEFAULT --------------------------------
    default:
      return state;
  }
}

export default reducer;
