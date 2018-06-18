<template lang="pug">
  v-container(grid-list-xl text-xs-center)
    v-layout(row wrap)
      v-flex(xs10 offset-xs1)
        v-card
          v-content
            HeaderComponet
      v-flex(xs10 offset-xs1)
        MainComponent
</template>

<script>
import axios from "axios";
import HeaderComponet from "../components/Header-component.vue";
import MainComponent from "../components/Main-component.vue";

export default {
  components: {
    HeaderComponet,
    MainComponent
  },
  computed: {
    binding() {
      const binding = {};
      if (this.$vuetify.breakpoint.mdAndUp) binding.column = true;
      return binding;
    }
  }
};
</script>
