<template>
  <div class="table-actions">
    <el-button type="primary" @click="$emit('add')">新增产品</el-button>
    <el-button type="success" @click="exportToExcel">导出 Excel</el-button>
    <el-button type="warning" @click="triggerFileInput">导入产品</el-button>
     <!-- 导入说明 Popover -->
    <el-popover
      placement="bottom-start"
      width="280"
      trigger="click"
    >
      <template #reference>
        <el-button text type="primary" style="padding-left: 4px;">导入说明</el-button>
      </template>
      <div style="font-size: 14px; line-height: 1.6;">
        <strong>导入要求：</strong><br />
        表格必须包含以下列：<br />
        <ul>
          <li>名称</li>
          <li>成本单价</li>
          <li>运费</li>
          <li>税率</li>
        </ul>
        除“名称”外，其余列必须为数字格式，否则导入将失败。
      </div>
    </el-popover>
  </div>
 
  <product-import
  ref="importer"
  :existing-names="products.map(p => p.name)"
  @import="handleImport"
  />
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
import ProductImport from './ProductImport.vue'


    
export default {
  name: 'ProductTable',
  components  : {
    ProductImport
  },  
  props: {
    products: {
      type: Array,
      required: true
    }
  },
  emits: ['delete', 'add', 'import'],
  
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
    },
    triggerFileInput() {
      this.$refs.importer.triggerFileInput()
    },
    handleImport(importedProducts) {
      this.$emit('import', importedProducts)
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