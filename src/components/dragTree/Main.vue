<template>
  <div class="tree-main">
    <el-row>
      <el-col :span="10">
        <div>
          <drag-tree :list="list"></drag-tree>
        </div>
      </el-col>
      <el-col :span="10" :offset="2">
        <pre>{{ JSON.stringify(list, null, 4) }}</pre>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import DragTree from './DragTree'
  const array = [
    'java', 'js', 'node', 'vue'
  ]
  export default {
    data () {
      return {
        list: array.map((name, index) => {
          return {name, children: name === 'js' ? [{name: 'angular', children: [{name: 'angular 1.0', children: []}]}] : []}
        })
      }
    },
    components: {
      DragTree
    }
  }
</script>
<style>
.tree-main {
  position: relative;
  padding: 20px 15px;
  border-top: solid 1px #d1d2d4;
  border-bottom: solid 1px #d1d2d4;
  max-height: 900px;
  overflow-y: auto;
  overflow-x: hidden;
  background: #ddd;
  /* border-radius: 4px; */
}
pre {
  overflow: auto;
  display: block;
  padding: 9.5px;
  margin: 0 0 10px;
  font-size: 13px;
  line-height: 1.42857143;
  color: #333;
  word-break: break-all;
  word-wrap: break-word;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: Menlo,Monaco,Consolas,"Courier New",monospace;
}
</style>
