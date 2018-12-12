<template>
  <div>
  <b-dropdown variant="link" no-caret boundary="viewport">
    <template slot="text">
        <font-awesome-icon class="h6 text-dark" icon="ellipsis-h"/>
    </template>
    <b-dropdown-item @click="remove">Remove</b-dropdown-item>
    <b-dropdown-item @click="switchModalShow">Move to</b-dropdown-item>
    <div v-if="type === 'task'">
      <b-dropdown-divider></b-dropdown-divider>
      <b-dropdown-header>Color</b-dropdown-header>
      <b-dropdown-item>
        <b-container class="no-padding">
          <b-row no-gutters>
            <b-col v-for="color in this.colorsTop" :key="color">
              <b-button v-bind:style="{ 'background-color': color, 'border-color': color }"
                        @click="setColor(color)">&nbsp;
              </b-button>
            </b-col>
          </b-row>
          <b-row no-gutters>
            <b-col v-for="color in this.colorsBottom" :key="color">
              <b-button v-bind:style="{ 'background-color': color, 'border-color': color }"
                        @click="setColor(color)">&nbsp;
              </b-button>
            </b-col>
          </b-row>
        </b-container>
      </b-dropdown-item>
    </div>
  </b-dropdown>
  <b-modal size="md" v-model="modalShow" @hidden="onHidden" hide-header-close>
    <b-container fluid>
      <b-row>
        <b-col v-if="type === 'task'">
          <h6>Column</h6>
          <b-form-select v-model="selectedColumn" :options="columns" class="mb-2"/>
        </b-col>
        <b-col>
          <h6>Position</h6>
          <b-form-select v-model="selectedPosition" :options="positions" class="mb-2"/>
        </b-col>
      </b-row>
    </b-container>
    <div slot="modal-footer"></div>
  </b-modal>
  </div>
</template>

<script>
import bDropdown from 'bootstrap-vue/es/components/dropdown/dropdown';
import bDropdownItem from 'bootstrap-vue/es/components/dropdown/dropdown-item';
import bDropdownHeader from 'bootstrap-vue/es/components/dropdown/dropdown-header';
import bButton from 'bootstrap-vue/es/components/button/button';
import bModal from 'bootstrap-vue/es/components/modal/modal';
import bDropdownDivider from 'bootstrap-vue/es/components/dropdown/dropdown-divider';
import bContainer from 'bootstrap-vue/es/components/layout/container';
import bRow from 'bootstrap-vue/es/components/layout/row';
import bCol from 'bootstrap-vue/es/components/layout/col';
import bFormSelect from 'bootstrap-vue/es/components/form-select/form-select';

export default {
  name: 'EditMenu',
  props: {
    type: String,
    initialColumn: String,
    initialPosition: Number,
  },
  components: {
    'b-dropdown': bDropdown,
    'b-dropdown-item': bDropdownItem,
    'b-dropdown-header': bDropdownHeader,
    'b-dropdown-divider': bDropdownDivider,
    'b-button': bButton,
    'b-modal': bModal,
    'b-container': bContainer,
    'b-row': bRow,
    'b-col': bCol,
    'b-form-select': bFormSelect,
  },
  data() {
    return {
      colorsTop: [
        '#007bff',
        '#6c757d',
        '#28a745',
        '#17a2b8',
      ],
      colorsBottom: [
        '#ffc107',
        '#dc3545',
        '#fff',
        '#343a40',
      ],
      modalShow: false,
      selectedColumn: this.initialColumn,
      selectedPosition: this.initialPosition,
    };
  },
  computed: {
    columns() { return this.$store.getters.getColumnNames; },
    columnsNumber() { return this.$store.getters.getColumnsNumber; },
    tasksNumber() { return this.$store.getters.getTasksNumber(this.selectedColumn); },
    positions() {
      if (this.type === 'task') {
        return Array.from(Array(this.tasksNumber).keys());
      }
      return Array.from(Array(this.columnsNumber).keys());
    },
  },
  methods: {
    setColor(color) {
      this.$emit('color', color);
    },
    remove() {
      this.$emit('remove');
    },
    switchModalShow() {
      if (!this.modalShow) {
        this.selectedColumn = this.$props.initialColumn;
        this.selectedPosition = this.$props.initialPosition;
      }
      this.modalShow = !this.modalShow;
    },
    onHidden() {
      if (this.type === 'task') {
        this.$emit('closed', { position: this.selectedPosition, column: this.selectedColumn });
      } else {
        this.$emit('closed', { position: this.selectedPosition });
      }
    },
  },
};
</script>
<style>
  .no-padding {
    padding:0;
  }
</style>
