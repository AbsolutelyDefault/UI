<template>
  <b-card header-border-variant="primary"
          border-variant="primary"
          header-bg-variant="transparent"
          class="mb-2"
          body-class="task-body">
    <div slot="header">
      <h6 class="task-header float-left">{{item.name}}</h6>
      <h6 class="task-header float-right" @click="deleteTask"><font-awesome-icon icon="times"/></h6>
    </div>
    <p class="card-text">
      {{item.description}}
    </p>
  </b-card>
</template>

<script>
import bCard from 'bootstrap-vue/es/components/card/card';

export default {
  name: 'Task',
  props: ['item', 'columnId'],
  components: {
    'b-card': bCard,
  },
  methods: {
    deleteTask() {
      this.$store.commit('deleteTask', {
        id: this.item.id,
        columnId: this.columnId,
      });
    },
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
