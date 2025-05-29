<template>
  <el-table :data="products" stripe border style="width: 100%">
    <el-table-column prop="id" label="ID" width="60" />
    <el-table-column prop="name" label="名称" />
    <el-table-column prop="cost_unit_price" label="成本单价" />
    <el-table-column prop="shipping_fee" label="运费" />
    <el-table-column prop="cost_tax_rate" label="税率" />
  </el-table>
</template>

<script>
export default {
  name: 'ProductTable',
  props: {
    products: {
      type: Array,
      required: true
    }
  }
};
</script>
