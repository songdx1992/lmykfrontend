<!-- ResultsSummary.vue -->
<template>
  <el-card shadow="always">
    <template #header>
      <span>汇总结果</span>
    </template>

    <el-table :data="rows" border style="width: 100%">
      <el-table-column label="项目" prop="label" width="250" />
      <el-table-column label="运营数值" prop="business" />
      <el-table-column label="财务数值" prop="financial" />
    </el-table>
  </el-card>
</template>




<script setup>
import { format } from '../utils/format';

const props = defineProps({
  data: Object  // 传入整个汇总对象，格式如 { business: {...}, financial: {...} }
})
// 指标列表（同明细页）
const metrics = [
  { key: 'gmv', label: 'GMV' },
  { key: 'refund_rate', label: '退款率' },
  { key: 'revenue', label: '收入总额' },
  { key: 'unit_cost', label: '成本单价' },
  { key: 'cost', label: '成本总额' },
  { key: 'gross_profit', label: '毛利额' },
  { key: 'shipping_fee', label: '快递费' },
  { key: 'sample_fee', label: '寄样费用' },
  { key: 'platform_fee', label: '平台扣点(2%)' },
  { key: 'other_pf_fee', label: '平台其他费用(1%)' },
  { key: 'influencer_fee', label: '达人佣金' },
  { key: 'ad_spend', label: '投流费用' },
  { key: 'kol_fee', label: 'KOL费用分摊' },
  { key: 'slot_fee', label: '达人坑位费' },
  { key: 'salary', label: '工资及福利' },
  { key: 'travel', label: '差旅费' },
  { key: 'rent', label: '租金等其他费用' },
  { key: 'customer_service', label: '客服部分摊' },
  { key: 'marketing', label: '市场部分摊' },
  { key: 'roi', label: 'ROI' },
  { key: 'sales_profit', label: '销售利润(扣除固定成本)' },
  { key: 'marketing_profit', label: '营销利润(不扣除固定成本)' },
  { key: 'marketing_margin', label: '营销利润率' },
  { key: 'break_even_revenue', label: '保本销售额' },
  { key: 'break_even_quantity', label: '保本销售数量' }
]

// 构造展示行
const rows = metrics.map(({ key, label }) => ({
  label,
  business: props.data?.business?.[key] ?? '-',
  financial: props.data?.financial?.[key] ?? '-'
}))
</script>