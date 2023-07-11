<template>
  <div>
    <el-card class="elcard" style="height:80px">
      <el-form :inline="true" class="form">
        <el-form-item label="用户名：">
          <el-input placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="elcard">
      <el-button type="primary">添加用户</el-button>
      <el-button>批量删除</el-button>
      <el-table border>
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column label="#" align="center"></el-table-column>
        <el-table-column label="id" width="80px" align="center"></el-table-column>
        <el-table-column label="用户名" align="center"></el-table-column>
        <el-table-column label="用户名称" align="center"></el-table-column>
        <el-table-column label="用户职位" align="center"></el-table-column>
        <el-table-column label="创建时间" align="center"></el-table-column>
        <el-table-column label="更新时间" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="260px"></el-table-column>
      </el-table>
      <!-- 分页器组件 -->
      <el-pagination v-model:current-page="pageNo" :background="true" :page-sizes="[10,15,20,25]"
        v-model:page-size="limit" :prev-icon="9" layout="prev, pager, next, jumper,->,total, sizes" :total="400"
        @current-change="getHasSup" @size-change="changeSize">
      </el-pagination>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue'
let pageNo = ref<number>(1)
let pageSize = ref<number>(10)
</script>

<style scoped lang="scss">
.elcard {
  width: 96%;
  margin: auto;
  margin-top: 2%;
  .form {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>