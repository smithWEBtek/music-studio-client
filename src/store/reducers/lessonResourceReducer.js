import * as actionTypes from '../actions/actionTypes';

const initialState = {
  lessonResources: [],
  loading: false,
  error: false,
  message: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    //-----CREATE LESSON_RESOURCE-----------------------------
    case actionTypes.CREATE_LESSON_RESOURCE_START:
      return Object.assign({}, state, { loading: true })

    case actionTypes.CREATE_LESSON_RESOURCE_SUCCESS:
      return Object.assign({}, state, { loading: false })

    case actionTypes.CREATE_LESSON_RESOURCE_FAIL:
      return Object.assign({}, state, {
        error: action.error,
        loading: false,
        message: action.type
      })

    case actionTypes.CREATE_LESSON_RESOURCE:
      const newLessonResource = action.lessonResourceData
      return Object.assign({}, state, {
        lessonResources: state.lessonResources.concat(newLessonResource)
      })


    //-----FETCH LESSON_RESOURCES-----------------------------
    case actionTypes.FETCH_LESSON_RESOURCES_START:
      return Object.assign({}, state, { loading: true })

    case actionTypes.FETCH_LESSON_RESOURCES_SUCCESS:
      return Object.assign({}, state, { loading: false })

    case actionTypes.FETCH_LESSON_RESOURCES_FAIL:
      return Object.assign({}, state, {
        error: action.error,
        loading: false,
        message: action.type
      })

    case actionTypes.FETCH_LESSON_RESOURCES:
      const lessonResources = action.lessonResourcesList
      return Object.assign({}, state, {
        lessonResources: lessonResources
      })

    //-----DELETE LESSON_RESOURCE-----------------------------
    case actionTypes.DELETE_LESSON_RESOURCE_START:
      return Object.assign({}, state, { loading: true })

    case actionTypes.DELETE_LESSON_RESOURCE_SUCCESS:
      return Object.assign({}, state, { loading: false })

    case actionTypes.DELETE_LESSON_RESOURCE_FAIL:
      return Object.assign({}, state, {
        error: action.error,
        loading: false,
        message: action.type
      })

    case actionTypes.DELETE_LESSON_RESOURCE:
      const updatedLessonResources = state.lessonResources.filter(lessonResource => lessonResource.id !== action.id);
      return Object.assign({}, state, {
        lessonResources: updatedLessonResources
      })

    //----- DEFAULT --------------------------------
    default:
      return state;
  }
}

export default reducer;
