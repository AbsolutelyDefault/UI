<template>
  <div>
  <b-card header-bg-variant="transparent" class="mb-2 task-card" body-class="task-body"
          v-bind:style="{ 'border-color': mainColor }">
    <div slot="header" class="header-container">
      <textarea-autosize placeholder="Task name here..."
                         class="form-control-plaintext h6 header-text" v-model="name" rows="1"
                         spellcheck="false" @change.native="updateTask" :readonly="!editable"
      ></textarea-autosize>
      <edit-menu v-if="editable" class="task-header header-button" v-on:color="setColor"
                 v-on:remove="deleteTask" :type="'task'" :initialColumn="columnId"
                 :initialPosition="index" v-on:closed="updatePosition"
      ></edit-menu>
    </div>
    <textarea-autosize placeholder="Task description here..."
                       class="form-control-plaintext card-text" v-model="description" rows="1"
                       spellcheck="false" @change.native="updateTask" :readonly="!editable"
    ></textarea-autosize>
  </b-card>
  </div>
</template>

<script>
import bCard from 'bootstrap-vue/es/components/card/card';
import EditMenu from './EditMenu.vue';

export default {
  name: 'Task',
  props: {
    item: Object,
    columnId: String,
    index: Number,
    editable: Boolean,
  },
  components: {
    'b-card': bCard,
    editMenu: EditMenu,
  },
  data() {
    return {
      name: this.item.name,
      description: this.item.description,
    };
  },
  computed: {
    mainColor() { return this.item.color ? this.item.color : '#ffffff'; },
  },
  methods: {
    deleteTask() {
      this.$store.dispatch('deleteTask', {
        taskId: this.item._id,
        columnId: this.columnId,
      });
    },
    updateTask() {
      this.$store.dispatch('updateTask', {
        columnId: this.columnId,
        taskId: this.item._id,
        name: this.name,
        description: this.description,
        color: this.item.color,
      });
    },
    setColor(event) {
      this.$store.dispatch('setTaskColor', {
        columnId: this.columnId,
        taskId: this.item._id,
        color: event,
        description: this.item.description,
        name: this.item.name,
      });
    },
    updatePosition({ position, column }) {
      if (position !== this.index || column !== this.columnId) {
        this.$store.dispatch('setTaskPosition', {
          columnId: this.columnId,
          taskId: this.item._id,
          columnNewId: column,
          position,
        });
      }
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
  .task-card {
    border-width: 4px;
  }
  .card {
    position: static;
  }
</style>

<style scoped>
  .card-header {
    padding-top: 6px;
    padding-left: 10px;
  }
</style>
