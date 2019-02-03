import { createAction, handleActions } from 'redux-actions';
import { fromJS } from 'immutable';

const INIT_STATE = 'apply/INIT_STATE';
const TEXT_ANSWER_CHANGED = 'apply/TEXT_ANSWER_CHANGED';
const FILE_ANSWER_CHANGED = 'apply/FILE_ANSWER_CHANGED';
const SELECT_ANSWER_CHANGED = 'apply/SELECT_ANSWER_CHANGED';
const CHANGE_INPUT = 'apply/CHANGE_INPUT';

export const initState = createAction(INIT_STATE);
export const textAnswerChanged = createAction(TEXT_ANSWER_CHANGED);
export const fileAnswerChanged = createAction(FILE_ANSWER_CHANGED);
export const selectAnswerChanged = createAction(SELECT_ANSWER_CHANGED);
export const changeInput = createAction(CHANGE_INPUT);

const initialState = fromJS({
  otherAssignConsent: {
    ngo: false,
    medical: false
  },
  isSecondApplyChoice: false,
  applyChoiceFormat: {
    department: '',
    team: '',
    medical: ''
  },
  applyChoice: [
    {
      department: '',
      team: '',
      medical: ''
    },
    {
      department: '',
      team: '',
      medical: ''
    },
  ],
  common: {

  },
  department: {

  }
});

export default handleActions({
  [INIT_STATE]: (state, action) => state = initialState,
  [TEXT_ANSWER_CHANGED]: (state, action) => {
    const { type, index, name, answerType, content } = action.payload;
    if (type === 'common') {
      return state.setIn([type, index], content);
    } else {
      return state.setIn([type, name, index, answerType], content);
    }
  },
  [FILE_ANSWER_CHANGED]: (state, action) => {
    const { type, index, name, answerType, file } = action.payload;
    return state.setIn([type, name, index, answerType], 
      {
        'name': file.name,
        'url': URL.createObjectURL(file)
      });
  },
  [SELECT_ANSWER_CHANGED]: (state, action) => {
    const { type, index, name, answerType, techName, abilityIndex } = action.payload;
    return state.setIn([type, name, index, answerType, techName], abilityIndex);
  },
  [CHANGE_INPUT]: (state, action) => {
    const keyPath = [...Object.keys(action.payload)[0].split('.')];
    return state.setIn(keyPath, Object.values(action.payload)[0]);
  },
}, initialState);
