<template>
  <b-card class="mh-100" bg-variant="light" body-class="card-column-body">
    <div slot="header" class="header-container">
      <h5 class="task-header header-text">{{item.name}}</h5>
      <h5 class="task-header header-button" @click="deleteColumn">
        <font-awesome-icon icon="times"/>
      </h5>
    </div>
    <div v-for="task in item.tasks" :key="task.id">
      <item :item="task" :columnId="item.id"></item>
    </div>
    <div slot="footer">
      <b-button variant="outline-primary" class="add-task-btn" @click="addNewTask">
        Add new task
      </b-button>
    </div>
  </b-card>
</template>
<script>
import bCard from 'bootstrap-vue/es/components/card/card';
import bButton from 'bootstrap-vue/es/components/button/button';
import Task from './Task.vue';

export default {
  name: 'TaskColumn',
  props: ['item'],
  components: {
    item: Task,
    'b-card': bCard,
    'b-button': bButton,
  },
  methods: {
    addNewTask() {
      this.$store.commit('addTask', {
        item: { name: 'New task', description: 'Description' },
        lineId: this.item.id,
      });
    },
    deleteColumn() {
      this.$store.commit('deleteColumn', {
        id: this.item.id,
      });
    },
  },
};
</script>
<style>
  .header-container {
    display: flex;
    flex-direction: row;
  }
  .card-column-body {
    overflow-y: auto;
    padding: 8px;
  }
  .header-text {
    flex-grow: 1;
    padding-right: 8px;
  }
  .header-button {
    flex-grow: 0;
  }
</style>
