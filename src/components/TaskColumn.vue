<template>
  <b-card class="mh-100" bg-variant="light" body-class="card-column-body">
    <div slot="header" class="header-container">
      <textarea-autosize
        placeholder="Column name here..."
        class="form-control-plaintext h5 header-text"
        v-model="name"
        rows="1"
        spellcheck="false"
        @change.native="updateName"
      ></textarea-autosize>
      <h5 class="task-header header-button" @click="deleteColumn">
        <font-awesome-icon icon="times"/>
      </h5>
    </div>
    <div v-for="task in item.tasks" :key="task._id">
      <item :item="task" :columnId="item._id"></item>
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
  data() {
    return {
      name: this.item.name,
    };
  },
  methods: {
    addNewTask() {
      this.$store.dispatch('addTask', {
        item: { name: '', description: '' },
        columnId: this.item._id,
      });
    },
    deleteColumn() {
      this.$store.dispatch('deleteColumn', {
        id: this.item._id,
      });
    },
    updateName() {
      this.$store.dispatch('updateColumnName', { id: this.item._id, name: this.name });
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
    padding-top: 0;
    padding-right: 8px;
  }
  .header-button {
    flex-grow: 0;
  }
</style>
