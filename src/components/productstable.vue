<template>
  <div class="table-actions">
    <el-button type="primary" @click="$emit('add')">新增产品</el-button>
    <el-button type="success" @click="exportToExcel">导出 Excel</el-button>
  </div>
  <el-table :data="products" stripe border style="width: 100%">
    <el-table-column prop="id" label="ID" width="60" />
    <el-table-column prop="name" label="名称" />
    <el-table-column prop="cost_unit_price" label="成本单价" />
    <el-table-column prop="shipping_fee" label="运费" />
    <el-table-column prop="cost_tax_rate" label="税率" />
    <el-table-column label="操作" width="180">
      <template #default="scope">
        <el-button type="danger" size="small" @click="handleDelete(scope.row)">
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
export default {
  name: 'ProductTable',
  props: {
    products: {
      type: Array,
      required: true
    }
  },
  emits: ['delete', 'add'],
  methods: {
    handleDelete(row) {
      this.$emit('delete', row.id);
    },
    exportToExcel() {
      const data = this.products.map(item => ({
        产品ID: item.id,
        产品名称: item.name,
        成本单价: item.cost_unit_price,
        运费: item.shipping_fee,
        税率: item.cost_tax_rate
      }))
      const worksheet = XLSX.utils.json_to_sheet(data)
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, '产品列表')

      const excelBuffer = XLSX.write(workbook, {
        bookType: 'xlsx',
        type: 'array'
      })

      const blob = new Blob([excelBuffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      })
      saveAs(blob, '产品列表.xlsx')
    }
  }
}

</script>

<style scoped>
.table-actions {
  margin-bottom: 12px;
  display: flex;
  justify-content: flex-start; /* 从右边改为左对齐 */
  gap: 10px;
  flex-wrap: wrap;
}
</style>