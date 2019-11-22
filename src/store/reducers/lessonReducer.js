import * as actionTypes from '../actions/actionTypes';

const initialState = {
  lessons: [],
  loading: false,
  error: false,
  message: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    //-----CREATE LESSON-----------------------------
    case actionTypes.CREATE_LESSON_START:
      return Object.assign({}, state, { loading: true })

    case actionTypes.CREATE_LESSON_SUCCESS:
      return Object.assign({}, state, { loading: false })

    case actionTypes.CREATE_LESSON_FAIL:
      return Object.assign({}, state, {
        error: action.error,
        loading: false,
        message: action.type
      })

    case actionTypes.CREATE_LESSON:
      const newLesson = action.lessonData
      return Object.assign({}, state, {
        lessons: state.lessons.concat(newLesson)
      })


    //-----FETCH LESSONS-----------------------------
    case actionTypes.FETCH_LESSONS_START:
      return Object.assign({}, state, { loading: true })

    case actionTypes.FETCH_LESSONS_SUCCESS:
      return Object.assign({}, state, { loading: false })

    case actionTypes.FETCH_LESSONS_FAIL:
      return Object.assign({}, state, {
        error: action.error,
        loading: false,
        message: action.type
      })

    case actionTypes.FETCH_LESSONS:
      const lessons = action.lessonsList
      return Object.assign({}, state, {
        lessons: lessons
      })


    //-----UPDATE LESSON-----------------------------
    case actionTypes.UPDATE_LESSON_START:
      return Object.assign({}, state, { loading: true })

    case actionTypes.UPDATE_LESSON_SUCCESS:
      return Object.assign({}, state, { loading: false })

    case actionTypes.UPDATE_LESSON_FAIL:
      return Object.assign({}, state, {
        error: action.error,
        loading: false,
        message: action.type
      })

    case actionTypes.UPDATE_LESSON:
      const lessonData = action.updatedLessonData
      const lessonIndex = state.lessons.findIndex(lesson => lesson.id === lessonData.id);
      const stateTemp = {
        ...state,
        lessons: [
          ...state.lessons.slice(0, lessonIndex),
          ...state.lessons.slice(lessonIndex + 1, state.lessons.length)
        ]
      };
      return Object.assign({}, { ...stateTemp }, { lessons: stateTemp.lessons.concat(lessonData) })


    //-----DELETE LESSON-----------------------------
    case actionTypes.DELETE_LESSON_START:
      return Object.assign({}, state, { loading: true })

    case actionTypes.DELETE_LESSON_SUCCESS:
      return Object.assign({}, state, { loading: false })

    case actionTypes.DELETE_LESSON_FAIL:
      return Object.assign({}, state, {
        error: action.error,
        loading: false,
        message: action.type
      })

    case actionTypes.DELETE_LESSON:
      const updatedLessons = state.lessons.filter(lesson => lesson.id !== action.id);
      return Object.assign({}, state, {
        lessons: updatedLessons
      })

    //----- DEFAULT --------------------------------
    default:
      return state;
  }
}

export default reducer;
