<template>
  <el-card>
    <div class="d-flex justify-between mb-2">
      <h3>要分摊的固定费用基数</h3>
      <div>
        <el-button v-if="!isEditing" type="primary" @click="startEditing">修改</el-button>

        <template v-else>
          <el-button type="success" @click="saveEdits">保存</el-button>
          <el-button @click="cancelEditing">取消</el-button>
        </template>
      </div>
    </div>

    <el-table :data="editedData" stripe border style="width: 100%" v-loading="loading">
      <el-table-column prop="month" label="月份" width="100">
        <template #default="{ row }">
          <span>{{ row.month }}</span>
        </template>
      </el-table-column>
    
      <el-table-column v-for="col in editableCols" :key="col.prop" :prop="col.prop" :label="col.label">
        <template #default="{ row, $index }">
          <el-input v-if="isEditing" v-model.number="editedData[$index][col.prop]" size="small" />
          <span v-else>{{ row[col.prop] }}</span>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  name: 'FixedCosts',
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const isEditing = ref(false);
    const loading = ref(false);
    const editedData = ref([]);
  
    const editableCols = [
      { prop: 'dept', label: '部门' },
      { prop: 'rent', label: '房租费用' },
      { prop: 'salary', label: '工资及福利' },
      { prop: 'travel', label: '差旅费' },
      { prop: 'other', label: '其他费用' },
      { prop: 'marketing_share', label: '市场摊销' },
      { prop: 'customer_service_share', label: '客服摊销' }
    ];

    watch(() => props.data, (newVal) => {
      editedData.value = JSON.parse(JSON.stringify(newVal));
    }, { immediate: true });

    const startEditing = () => {
      isEditing.value = true;
    };

    const cancelEditing = () => {
      editedData.value = JSON.parse(JSON.stringify(props.data));
      isEditing.value = false;
    };
    
    const saveEdits = () => {
      loading.value = true;
      fetch('/save_fixed_costs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedData.value)
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            isEditing.value = false;
            console.log('保存成功');
          } else {
            console.error('保存失败:', data.message);
          }
        })
        .catch(err => {
          console.error('请求失败:', err);
        })
        .finally(() => {
          loading.value = false;
        });
    };

    return {
      isEditing,
      editedData,
      editableCols,
      startEditing,
      cancelEditing,
      saveEdits,
      loading
    };
  }
};
</script>

<style scoped>
.d-flex {
  display: flex;
  align-items: center;
}
.justify-between {
  justify-content: space-between;
}
</style>
