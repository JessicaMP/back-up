<template lang="pug">
  v-list-tile
    v-list-tile-action
      v-checkbox(:color="'cyan'" value="multi-line" @change="$emit('toggle', todo)" v-model="selected")
    v-list-tile-content
      input(type="text" v-if='todo === editing' v-model="inputTodo" @keyup.enter="doneEdit")
      v-list-tile-title(@dblclick="$emit('edit', todo)" v-text="inputTodo" :class="{completed: todo.completed}")
      span {{ todo.Created_date }}
    v-list-tile-action
      v-btn(@click="$emit('remove', todo)")
        v-icon delete_forever
      // div {{ inputTodo }}
</template>

<script>

export default {
  props: {
    name: {
      type: String
    },
    todo: {
      type: Object
    },
  },
  data() {
    return {
      inputTodo: this.name,
      selected: ['']
    };
  },
  watch: {
    name(val) {
      this.inputTodo = val;
    }
  },
  computed: {
    editing() {
      return this.$store.getters.editing
    }
  },
  methods: {
    doneEdit() {
      // console.log(this.inputTodo, this.todo)
      this.$emit('doneEdit', {
        _id: this.todo._id,
        name: this.inputTodo
      })
    }
  }
};
</script>

<style lang="sass">
.completed
  color: rgb(65, 184, 131);
  text-decoration: line-through;
</style>