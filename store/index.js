import axios from 'axios';

function randomId() {
  return Math.random()
    .toString()
    .substr(2, 10)
}

export const state = () => ({
  todos: [],
  newTodo: '',
  editing: null
})

export const getters = {
  todos: state => state.todos,
  newTodo: state => state.newTodo,
  editing: state => state.editing,
}

export const mutations = {
  setTodos(state, todos) {
    state.todos = todos
  },
  setNewTodo(state, todo) {
    state.newTodo = todo;
    console.log(todo)
  },
  addTodo(state, todoObject) {
    console.log('addtodo', todoObject)
    state.todos.push(todoObject)
  },
  remove(state, todo) {
    let todos = state.todos
    todos.splice(todos.indexOf(todo), 1)
  },
  clearNewTodo(state) {
    state.newTodo = ''
    console.log('clearing new todo')
  },
  edit(state, todo) {
    state.editing = todo
  },
  doneEdit(state, { todo }) {
    // state.todos.filter((value, index) => {
    //   debugger
    //   if(value._id === todo._id) {
    //     state.todos[index].name = todo.name
    //   } else {
    //     console.log('error')
    //   }
    // })
    // let found = state.todos.find(todo => todo._id === todo._id);
    // found.name = todo.name
    // debugger
    let idx = state.todos.map(t => t._id).indexOf(todo._id)
    state.todos.splice(idx, 1, todo)
  },
  toggle(state, todo) {
    todo.completed = !todo.completed
  }
}

export const actions = {
  async nuxtServerInit({ commit }) {
    await axios.get(`http://localhost:8000/tasks`)
      .then((res) => res.data)
      .then(todos => {
        commit('setTodos', todos)
      })
  },
  setNewTodo({ commit }, todo) {
    commit('setNewTodo', todo)
  },
  addTodo({ commit, state }) {
    if (!state.newTodo) {
      // do not add empty todos
      return
    }
    const todo = {
      name: state.newTodo,
      completed: false,
      id: randomId()
    }
    axios.post(`http://localhost:8000/tasks`, todo).then(_ => {
      commit('addTodo', todo)
      console.log(todo.completed);
    })
  },
  remove({ commit }, todo) {
    axios.delete(`http://localhost:8000/tasks/${todo._id}`)
    .then(_ => {
      console.log('removed todo', todo._id, todo.name, 'from the server')
      commit('remove', todo)
    })
  },
  clearNewTodo({ commit }) {
    commit('clearNewTodo')
  },
  edit({ commit }, todo) {
    commit('edit', todo)
  },
  doneEdit({ commit, state }, { _id, name }) {
    // if(todo._id) {
    //   const success = axios.put(`http://localhost:8000/tasks/${todo._id}`, {name: todo.name})
    //   .then((res) => {
    //     console.log('update', todo.name, todo._id)
    //     commit('doneEdit', res.data)
    //   })
    // } else {
    //   const success =  axios.post(`http://localhost:8000/tasks`, {name: todo.name})
    //   .then((res) => {
    //     commit('doneEdit', res.data)
    //   })
    // }
    // debugger
    axios.put(`http://localhost:8000/tasks/${_id}`, { name })
    .then((res)=> {
      commit('doneEdit', {todo: res.data})
      console.log('update', name, _id)
    }, (error) => {
      console.log(error)
    })
  },
  toggle({ commit }, todo) {
    axios.get(`http://localhost:8000/tasks/${todo._id}`)
    .then(_ => {
      commit('toggle', todo)
      console.log(todo.completed)
    })
  }
}
