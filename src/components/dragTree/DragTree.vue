<template>
  <div drag-tree class="drag-tree">
    <drag-tree-nodes :list="list"></drag-tree-nodes>
  </div>
</template>
<script>
  import DragTreeNodes from './DragTreeNodes'
  export default {
    name: 'DragTree',
    props: {
      list: Array
    },
    data () {
      return {}
    },
    watch: {
      list (value) {
        this.storeRootData(value)
      }
    },
    components: {
      DragTreeNodes
    },
    methods: {
      // 增加节点事件
      insert (node, index) {
        this.list.splice(index, 0, node)
        console.log('after insert ', this.list)
      },
      storeRootData (value) {
        this.$store.commit('setDragTreeData', value)
      }
    },
    mounted () {
      this.storeRootData(this.list)
    }
  }
</script>
<style>
.drag-tree-empty, .drag-tree-dropzone {
    border: 1px dashed #bbb;
    min-height: 100px;
    background-color: #e5e5e5;
    background-image: -webkit-linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff), -webkit-linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff);
    background-image: -moz-linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff), -moz-linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff);
    background-image: linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff), linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff);
    background-size: 60px 60px;
    background-position: 0 0, 30px 30px;
}

.drag-tree-empty {
    pointer-events: none;
}
</style>
