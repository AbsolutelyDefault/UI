<template>
  <div id="board">
    <menu-bar></menu-bar>
    <b-container class="column-container" fluid>
      <b-row class="flex-row flex-nowrap h-100">
        <b-col v-for="item in columns" :key="item.id" class="task-column-wrapper">
          <task-column :item="item"></task-column>
        </b-col>
        <b-col class="task-column-wrapper">
          <b-card class="mh-100" bg-variant="light">
            <b-button variant="outline-primary" class="add-task-btn" @click="addNewLine">
              Add new column
            </b-button>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import bContainer from 'bootstrap-vue/es/components/layout/container';
import bRow from 'bootstrap-vue/es/components/layout/row';
import bCol from 'bootstrap-vue/es/components/layout/col';
import bCard from 'bootstrap-vue/es/components/card/card';
import bButton from 'bootstrap-vue/es/components/button/button';
import MenuBar from '@/components/MenuBar.vue';
import TaskColumn from '../components/TaskColumn.vue';

export default {
  name: 'Board',
  components: {
    'b-container': bContainer,
    'b-row': bRow,
    'b-col': bCol,
    'menu-bar': MenuBar,
    'task-column': TaskColumn,
    'b-button': bButton,
    'b-card': bCard,
  },
  methods: {
    addNewLine() {
      this.$store.commit('addLine', { name: 'New line' });
    },
  },
  computed: {
    columns() {
      return this.$store.state.columns;
    },
  },
};
</script>
<style>
  #board {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .column-container {
    height: 100%;
    flex-grow: 1;
    overflow-x: auto;
  }
  .task-column-wrapper {
    height: 100%;
    padding-right: 2px;
    padding-left: 2px;
    -ms-flex: 0 0 272px;
    flex: 0 0 272px;
  }
  .add-task-btn {
    width: 100%;
  }
</style>
