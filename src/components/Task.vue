<template>
  <b-card header-border-variant="primary"
          border-variant="primary"
          header-bg-variant="transparent"
          class="mb-2"
          body-class="task-body">
    <h6 slot="header" class="text-center task-header">{{item.name}}</h6>
    <p class="card-text">
      {{item.description}}
    </p>
  </b-card>
</template>

<script>
import bCard from 'bootstrap-vue/es/components/card/card';

export default {
  name: 'Task',
  props: ['item'],
  components: {
    'b-card': bCard,
  },
};
</script>
<style>
  .task-header {
    margin-bottom: 0;
  }
  .task-body {
    padding: 8px;
  }
</style>

<style scoped>
  .card-header {
    padding: 8px;
  }
</style>
