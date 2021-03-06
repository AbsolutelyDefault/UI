<template>
  <div id="board">
    <menu-bar :boardId="boardId" class="no-shrink"></menu-bar>
    <b-container class="column-container" fluid>
      <draggable :element="'b-row'" class="flex-row flex-nowrap h-100" @update="onUpdate"
                 :options="{draggable:'.task-column', handle: '.column-handle', disabled: noDrag}"
                 v-model="draggables">
        <b-col v-for="(item, index) in columns" :key="item._id"
               class="task-column-wrapper task-column" :id="item._id">
          <task-column :item="item" :index="index" :editable="editable" :noDrag="noDrag"
                       class="column-handle">
          </task-column>
        </b-col>
        <b-col v-if="editable" slot="footer" class="task-column-wrapper">
          <b-card class="mh-100" bg-variant="light">
            <b-button variant="outline-primary" class="add-task-btn" @click="addNewLine">
              Add new column
            </b-button>
          </b-card>
        </b-col>
      </draggable>
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
import Draggable from 'vuedraggable';
import MobileDetect from 'mobile-detect';
import TaskColumn from '../components/TaskColumn.vue';

export default {
  name: 'Board',
  components: {
    'b-container': bContainer,
    // Component is actually used instead of <draggable>
    // eslint-disable-next-line vue/no-unused-components
    'b-row': bRow,
    'b-col': bCol,
    'menu-bar': MenuBar,
    'task-column': TaskColumn,
    'b-button': bButton,
    'b-card': bCard,
    draggable: Draggable,
  },
  methods: {
    addNewLine() {
      this.$store.dispatch('addColumn', { name: '', boardId: this.$store.state.boardId });
    },
    onUpdate(evt) {
      this.$store.dispatch('sendColumnPosition', {
        id: evt.item.id,
        position: evt.newIndex,
      });
    },
  },
  computed: {
    noDrag() {
      if (!this.editable) {
        return true;
      }
      const mb = new MobileDetect(navigator.userAgent);
      return mb.mobile();
    },
    columns() {
      return this.$store.state.columns;
    },
    boardId() {
      return this.$store.state.boardId;
    },
    draggables: {
      get() {
        return this.$store.state.columns;
      },
      set(items) {
        this.$store.commit('setColumns', items);
      },
    },
    editable() { return this.$store.state.editable; },
  },
  mounted() {
    if (this.$route.query) {
      this.$store.dispatch('getColumns', { id: this.$route.query.id });
    } else {
      this.$store.dispatch('getColumns');
    }
  },
};
</script>
<style>
  .no-shrink {
    flex-shrink: 0;
  }
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

    padding-right: 2px;
    padding-left: 2px;
    -ms-flex: 0 0 272px;
    flex: 0 0 272px;
  }
  .add-task-btn {
    width: 100%;
  }
</style>
