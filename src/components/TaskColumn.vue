<template>
  <b-card class="mh-100" bg-variant="light" body-class="card-column-body">
    <div slot="header" class="header-container">
      <textarea-autosize
        placeholder="Type something here..."
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
    <draggable v-model="item.tasks" :options="{ group: 'tasks' }" @update="onUpdate" @add="onAdd"
               :id="item._id" class="tasks-container">
      <div v-for="task in item.tasks" :key="task._id" :id="task._id">
        <item :item="task" :columnId="item._id"></item>
      </div>
    </draggable>
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
import Draggable from 'vuedraggable';
import axios from 'axios';
import Task from './Task.vue';

export default {
  name: 'TaskColumn',
  props: ['item'],
  components: {
    item: Task,
    'b-card': bCard,
    'b-button': bButton,
    draggable: Draggable,
  },
  data() {
    return {
      name: this.item.name,
    };
  },
  methods: {
    addNewTask() {
      this.$store.dispatch('addTask', {
        item: { name: 'New task', description: 'Description' },
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
    onAdd(evt) {
      axios.patch(`${process.env.VUE_APP_BASE_URL}/api/column/task`, {
        columnId: evt.from.id,
        id: evt.item.id,
        columnNewId: evt.to.id,
        num: evt.newIndex,
      });
    },
    onUpdate(evt) {
      axios.patch(`${process.env.VUE_APP_BASE_URL}/api/column/task`, {
        columnId: evt.to.id,
        id: evt.item.id,
        columnNewId: evt.to.id,
        num: evt.newIndex,
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
    padding-top: 0px;
    padding-right: 8px;
  }
  .header-button {
    flex-grow: 0;
  }
  .tasks-container {
    min-height: 15px;
  }
</style>
