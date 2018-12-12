<template>
  <b-card class="mh-100" bg-variant="light" body-class="card-column-body">
    <div slot="header" class="header-container">
      <textarea-autosize placeholder="Column name here..."
                         class="form-control-plaintext h5 header-text" v-model="name" rows="1"
                         spellcheck="false" @change.native="updateName"
      ></textarea-autosize>
      <edit-menu class="task-header header-button" v-on:remove="deleteColumn"
                 :initial-position="index" v-on:closed="updatePosition">
      </edit-menu>
    </div>
    <draggable v-model="item.tasks" :options="{ group: 'tasks', disabled: isMobile }"
               @update="onUpdate" @add="onAdd" :id="item._id" class="tasks-container">
      <div v-for="(task, taskIndex) in item.tasks" :key="task._id" :id="task._id">
        <item :item="task" :columnId="item._id" :index="taskIndex"></item>
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
import MobileDetect from 'mobile-detect';
import Task from './Task.vue';
import EditMenu from './EditMenu.vue';

export default {
  name: 'TaskColumn',
  props: {
    item: Object,
    index: Number,
  },
  components: {
    item: Task,
    'b-card': bCard,
    'b-button': bButton,
    draggable: Draggable,
    editMenu: EditMenu,
  },
  data() {
    return {
      name: this.item.name,
    };
  },
  computed: {
    isMobile() {
      const mb = new MobileDetect(navigator.userAgent);
      return mb.mobile();
    },
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
      this.$store.dispatch('updateColumnName', {
        id: this.item._id,
        name: this.name,
      });
    },
    onAdd(evt) {
      this.$store.dispatch('sendTaskPosition', {
        columnId: evt.from.id,
        taskId: evt.item.id,
        columnNewId: evt.to.id,
        position: evt.newIndex,
      });
    },
    onUpdate(evt) {
      this.$store.dispatch('sendTaskPosition', {
        columnId: evt.to.id,
        taskId: evt.item.id,
        columnNewId: evt.to.id,
        position: evt.newIndex,
      });
    },
    updatePosition({ position }) {
      this.$store.dispatch('setColumnPosition', {
        id: this.item._id,
        position,
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
    overflow: auto;
    padding: 8px;
  }
  .header-text {
    flex-grow: 1;
    padding-top: 0;
    padding-right: 0;
  }
  .header-button {
    flex-grow: 0;
  }
  .tasks-container {
    min-height: 15px;
  }
  .card-header {
    padding-top: 12px;
    padding-left: 20px;
    padding-right: 0;
    padding-bottom: 0;
  }
</style>
