<template lang="pug">
  v-container(grid-list-xs)
    h1.display-2 To do list
    v-layout(row justify-center)
      v-flex(xs10)
        v-layout(row justify-space-between)
          v-flex
            v-checkbox(:color="'cyan'" value="multi-line" v-model="mode")
          v-flex
            // v-text-field(placeholder="Writing..." :value='newTodo' @change="setNewTodo" solo-inverted @keyup.enter="addTodo")
            input(placeholder="Writing..." :value='newTodo' @change="setNewTodo" @keyup.enter="addTodo")
          v-flex
            v-btn(@click="addTodo")
              v-icon add
</template>

<script>
export default {
  data() {
    return {
      mode: null,
      last: ''
    };
  },
  computed: {
    newTodo() {
      return this.$store.getters.newTodo;
    }
  },
  methods: {
    setNewTodo(e) {
      this.$store.dispatch("setNewTodo", e.target.value);
    },
    addTodo(e) {
      e.target.value = "";
      this.$store.dispatch("addTodo");
      this.$store.dispatch("clearNewTodo");
    }
  }
};
</script>
