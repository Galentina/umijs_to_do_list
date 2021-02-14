import { Effect, Reducer } from 'umi';
import {v4 as uuid4v} from "uuid";
import { history, Prompt } from 'umi';




export interface IState {
  // count: number;
  section: any;
  tasks: any;
}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    addTask: Effect;
    addSect: Effect;
    renameSect: Effect;
    deleteSect: Effect;
    updateTask: Effect;
    delTask: Effect;
    checkTask: Effect;
  };
  reducers: {
    checkTheTask: Reducer<IState>;
    deleteTask: Reducer<IState>;
    upToDateTask: Reducer<IState>;
    deleteSection: Reducer<IState>;
    renameSection: Reducer<IState>;
    addSection: Reducer<IState>;
    addNewTask: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: "Data",
  state: {
    tasks: [],
    section: [
      {id: uuid4v(), name: 'Home', taskNums: 0},
      {id: uuid4v(), name: 'Work', taskNums: 0},
      {id: uuid4v(), name: 'Kids', taskNums: 0},
      {id: uuid4v(), name: 'Study', taskNums: 0},
    ]
  },

  effects: {
    *addTask(_, { call, put }) {
      yield put({type: 'addNewTask',})
    },
    *addSect(_, { call, put }) {
      yield put({ type: 'addSection', });
    },
    *renameSect(_, { call, put }) {
      yield put({ type: 'renameSection', });
    },
    *deleteSect(_, { call, put }) {
      yield put({ type: 'deleteSection', });
    },
    *updateTask(_, { call, put }) {
      yield put({ type: 'upToDateTask', });
    },
    *delTask(_, { call, put }) {
      yield put({ type: 'deleteTask', });
    },
    *checkTask(_, { call, put }) {
      yield put({ type: 'checkTheTask', });
    },
  },

  reducers: {
    addNewTask(state: any, { payload }: any) {
      const newSection = [...state.section];
      payload = {...payload};
      console.log(payload[0], payload[1], payload[2]);
       const newTasks = state.tasks;
             newTasks.push({
                id: uuid4v(),
                data: payload[0],
                done: false,
                section: payload[1],
                title: payload[2]
       });
      newSection.map(el => (el.name===payload[1]) ? el.taskNums++ : {...el})
      console.log(newTasks);
      return {
        ...state,
        tasks: newTasks, section: newSection,
      };
    },

    addSection(state: any, { payload }: any){
      const newSections1 = [...state.section];
      console.log(newSections1);
      newSections1.push({id: uuid4v(), name: payload, taskNums: 0});
      console.log(newSections1);
      return {...state, section: newSections1};
    },

    renameSection(state: any, { payload }: any){
      const newSections = [...state.section];
      payload = {...payload};
      console.log(payload[0], payload[1]);
      newSections.map(el => {
        if (el.name === payload[0]) el.name = payload[1];
        return newSections;
      });
      const newTasks = [...state.tasks];
      newTasks.map(el => {
        if (el.section=== payload[0]) el.section=payload[1];
        return newTasks;
      });
      console.log(newSections, newTasks);
      return {...state, section: newSections, tasks: newTasks};
    },

    deleteSection(state: any, { payload }: any){
      let newSections = [...state.section];
      let id = 0;
      newSections.map((el: any) => {
        if (el.name === payload){
          (el.taskNums === 0) ? id = el.id:
            alert(`The section ${payload} cannot be deletes. There are some tasks in it.`);
          console.log(el.id);
        } return id;
      });
      newSections = state.section.filter((el: any) => el.id!==id);
      return {...state, section: newSections};
    },

    upToDateTask(state: any, { payload }: any) {
      payload = {...payload};
      const newTasks = [...state.tasks];
      newTasks.map(el => {
        if (el.id === payload[0]) {
          el.data = payload[1];
          el.title = payload[2];
          el.done = false;
        }
      });
      return {...state, tasks: newTasks};
    },

    deleteTask(state: any, { payload }: any) {
      payload = {...payload};
      const newTasks = state.tasks.filter((el: any) => el.id !== payload[0]);
      const newSection = [...state.section];
      newSection.map(el => (el.name===payload[1]) ? el.taskNums-- : {...el})
      console.log(newTasks);
      return {...state, tasks: newTasks, sections: newSection};
    },

    checkTheTask(state: any, { payload }: any){
      payload = {...payload};
      const newTasks = [...state.tasks];
      newTasks.map(el => {
        if (el.id === payload[0]) {
          el.done = payload[1] === false;
          console.log(newTasks);
        }
      });
      return {...state, tasks: newTasks};
    }
  },
};

export default Model;
