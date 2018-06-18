<template lang="pug">
  v-list
    InputComponent(:name="todo.name" v-for="todo in todos" :key='todo._id' :todo="todo" @edit="edit" @doneEdit="doneEdit" @toggle="toggle" @remove="remove")
</template>

<script>
import InputComponent from './Input-component.vue'

export default {
  data() {
    return {
      input: this.name
    };
  },
  watch: {
    name(val) {
      this.input = val
    }
  },
  computed: {
    todos() {
      return this.$store.getters.todos;
    },
  },
  methods: {
    remove(todo) {
      console.log(todo)
      this.$store.dispatch("remove", todo);
    },
    edit(todo) {
      this.$store.dispatch("edit", todo);
    },
    doneEdit(todo) {
      this.$store.dispatch("doneEdit", todo);
    },
    toggle(todo) {
      this.$store.dispatch("toggle", todo);
    },
    uploadTodos(e) {
      const f = this.file || e.target.files[0];
      const reader = new FileReader();
      reader.onload = e => {
        const list = JSON.parse(e.target.result);
        list.forEach(todo => {
          this.$store.commit("addTodo", todo);
        });
      };
      reader.readAsText(f);
    }
  },
  components: {
    InputComponent
  }
};
</script>

<style lang="sass">
.completed 
  color: rgb(65, 184, 131);
  text-decoration: line-through;
</style>
