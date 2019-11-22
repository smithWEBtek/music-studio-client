import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import studentReducer from './store/reducers/studentReducer'
import teacherReducer from './store/reducers/teacherReducer'
import resourceReducer from './store/reducers/resourceReducer'
import lessonReducer from './store/reducers/lessonReducer'
import lessonResourceReducer from './store/reducers/lessonResourceReducer'
import App from './App'
import classes from './index.css'

const rootReducer = combineReducers({
	stu: studentReducer,
	tch: teacherReducer,
	les: lessonReducer,
	res: resourceReducer,
	lesres: lessonResourceReducer
})

const logger = store => {
	console.log('[Middleware] prior state', store.getState())
	return next => {
		return action => {
			console.log('[Middleware] Dispatching', action)
			const result = next(action)
			return result
		}
	}
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)))

const app = (
	<Provider store={store}>
		<BrowserRouter>
			<App className={classes.Body} />
		</BrowserRouter>
	</Provider>
)

ReactDOM.render(app, document.getElementById('root'))
