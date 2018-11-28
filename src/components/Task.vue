<template>
  <b-card header-border-variant="primary"
          border-variant="primary"
          header-bg-variant="transparent"
          class="mb-2"
          body-class="task-body">
    <div slot="header" class="header-container">
      <textarea-autosize
        placeholder="Type something here..."
        class="form-control-plaintext h6 header-text"
        v-model="name"
        rows="1"
        spellcheck="false"
        @change.native="updateTask"
      ></textarea-autosize>
      <h6 class="task-header header-button" @click="deleteTask">
        <font-awesome-icon icon="times"/>
      </h6>
    </div>
    <textarea-autosize
      placeholder="Type something here..."
      class="form-control-plaintext card-text"
      v-model="description"
      rows="1"
      spellcheck="false"
      @change.native="updateTask"
    ></textarea-autosize>
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
  data() {
    return {
      name: this.item.name,
      description: this.item.description,
    };
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
