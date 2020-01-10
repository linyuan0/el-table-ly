import lyTable from './lyTable.vue';
export default lyTable;
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('ly-table', lyTable);
}
