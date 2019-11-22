import * as actionTypes from '../actions/actionTypes';

const initialState = {
  teachers: [],
  loading: false,
  error: false,
  message: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    //-----CREATE TEACHER-----------------------------
    case actionTypes.CREATE_TEACHER_START:
      return Object.assign({}, state, { loading: true })

    case actionTypes.CREATE_TEACHER_SUCCESS:
      return Object.assign({}, state, { loading: false })

    case actionTypes.CREATE_TEACHER_FAIL:
      return Object.assign({}, state, {
        error: action.error,
        loading: false,
        message: action.type
      })

    case actionTypes.CREATE_TEACHER:
      const newTeacher = action.teacherData
      return Object.assign({}, state, {
        teachers: state.teachers.concat(newTeacher)
      })


    //-----FETCH TEACHERS-----------------------------
    case actionTypes.FETCH_TEACHERS_START:
      return Object.assign({}, state, { loading: true })

    case actionTypes.FETCH_TEACHERS_SUCCESS:
      return Object.assign({}, state, { loading: false })

    case actionTypes.FETCH_TEACHERS_FAIL:
      return Object.assign({}, state, {
        error: action.error,
        loading: false,
        message: action.type
      })

    case actionTypes.FETCH_TEACHERS:
      const teachers = action.teachersList
      return Object.assign({}, state, {
        teachers: teachers
      })


    //-----UPDATE TEACHER-----------------------------
    case actionTypes.UPDATE_TEACHER_START:
      return Object.assign({}, state, { loading: true })

    case actionTypes.UPDATE_TEACHER_SUCCESS:
      return Object.assign({}, state, { loading: false })

    case actionTypes.UPDATE_TEACHER_FAIL:
      return Object.assign({}, state, {
        error: action.error,
        loading: false,
        message: action.type
      })

    case actionTypes.UPDATE_TEACHER:
      const teacherData = action.updatedTeacherData
      const teacherIndex = state.teachers.findIndex(teacher => teacher.id === teacherData.id);
      const stateTemp = {
        ...state,
        teachers: [
          ...state.teachers.slice(0, teacherIndex),
          ...state.teachers.slice(teacherIndex + 1, state.teachers.length)
        ]
      };
      return Object.assign({}, { ...stateTemp }, { teachers: stateTemp.teachers.concat(teacherData) })


    //-----DELETE TEACHER-----------------------------
    case actionTypes.DELETE_TEACHER_START:
      return Object.assign({}, state, { loading: true })

    case actionTypes.DELETE_TEACHER_SUCCESS:
      return Object.assign({}, state, { loading: false })

    case actionTypes.DELETE_TEACHER_FAIL:
      return Object.assign({}, state, {
        error: action.error,
        loading: false,
        message: action.type
      })

    case actionTypes.DELETE_TEACHER:
      const updatedTeachers = state.teachers.filter(teacher => teacher.id !== action.id);
      return Object.assign({}, state, {
        teachers: updatedTeachers
      })

    //----- DEFAULT --------------------------------
    default:
      return state;
  }
}

export default reducer;
