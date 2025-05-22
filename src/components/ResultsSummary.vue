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

// 定义指标分组
const GROUPS = {
  REVENUE: 'revenue', // 收入模块
  EXPENSE: 'expense', // 费用模块
  PROFIT: 'profit'    // 利润模块
}

// 指标列表（同明细页）
const metrics = [
  { key: 'gmv', label: 'GMV',group: GROUPS.REVENUE },
  { key: 'refund_rate', label: '退款率',group: GROUPS.REVENUE },
  { key: 'revenue', label: '收入总额',group: GROUPS.REVENUE },
  { key: 'unit_cost', label: '成本单价',group: GROUPS.REVENUE },
  { key: 'cost', label: '成本总额' ,group: GROUPS.REVENUE},
  { key: 'gross_profit', label: '毛利额' ,group: GROUPS.REVENUE},
  { key: 'shipping_fee', label: '快递费' ,group: GROUPS.REVENUE},
  { key: 'sample_fee', label: '寄样费用' ,group: GROUPS.REVENUE},
  { key: 'platform_fee', label: '平台扣点(2%)' ,group: GROUPS.REVENUE},
  { key: 'other_pf_fee', label: '平台其他费用(1%)' ,group: GROUPS.REVENUE},
  { key: 'influencer_fee', label: '达人佣金',group: GROUPS.REVENUE},
  { key: 'ad_spend', label: '投流费用',group: GROUPS.REVENUE },
  { key: 'kol_fee', label: 'KOL费用分摊' ,group: GROUPS.REVENUE},
  { key: 'slot_fee', label: '达人坑位费' ,group: GROUPS.REVENUE},
  { key: 'salary', label: '工资及福利' ,group: GROUPS.REVENUE},
  { key: 'travel', label: '差旅费' ,group: GROUPS.REVENUE},
  { key: 'rent', label: '租金等其他费用' ,group: GROUPS.REVENUE},
  { key: 'customer_service', label: '客服部分摊',group: GROUPS.REVENUE },
  { key: 'marketing', label: '市场部分摊',group: GROUPS.REVENUE },
  { key: 'roi', label: 'ROI' ,group: GROUPS.PROFIT},
  { key: 'sales_profit', label: '销售利润(扣除固定成本)',group: GROUPS.PROFIT },
  { key: 'marketing_profit', label: '营销利润(不扣除固定成本)' ,group: GROUPS.PROFIT},
  { key: 'marketing_margin', label: '营销利润率' ,group: GROUPS.PROFIT},
  { key: 'break_even_revenue', label: '保本销售额' ,group: GROUPS.PROFIT},
  { key: 'break_even_quantity', label: '保本销售数量' ,group: GROUPS.PROFIT}
]

// 构造展示行
const rows = metrics.map(({ key, label }) => ({
  label,
  business: props.data?.business?.[key] ?? '-',
  financial: props.data?.financial?.[key] ?? '-'
}))
</script>