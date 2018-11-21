<template>
  <b-card class="mh-100" bg-variant="light" body-class="card-column-body">
    <h5 slot="header" class="mb-0 text-center">{{item.name}}</h5>
    <div v-for="item in item.tasks" :key="item.id">
      <item :item="item"></item>
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
  },
};
</script>
<style>
  .card-column-body {
    overflow-y: auto;
    padding: 8px;
  }
</style>
