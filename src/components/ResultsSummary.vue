<!-- ResultsSummary.vue -->
<template>
  <el-card shadow="always">
    <template #header>
      <span>汇总结果</span>
    </template>

    <!-- 按模块展示的汇总结果 -->
    <div  v-for="(groupItems, groupKey) in groupedMetrics" :key="groupKey" class="group-container" >
      <h3 class="group-title">{{ getGroupLabel(groupKey) }}</h3>
      <el-table 
        :data="groupItems"  border style="width: 100%" class="group-table">
        <el-table-column label="项目" prop="label" width="250" />
        <el-table-column label="运营数值" prop="business" />
        <el-table-column label="财务数值" prop="financial" />
    </el-table>
    </div>
  </el-card>
</template>




<script setup>
import { computed } from 'vue';


const props = defineProps({
  data: Object  // 传入整个汇总对象，格式如 { business: {...}, financial: {...} }
})

// 定义指标分组
const GROUPS = {
  REVENUE: 'revenue', // 收入模块
  EXPENSE: 'expense', // 费用模块
  PROFIT: 'profit'    // 利润模块
}

const GROUP_LABELS = {
  [GROUPS.REVENUE]: '收入模块',
  [GROUPS.EXPENSE]: '费用模块',
  [GROUPS.PROFIT]: '利润模块'
};

// 指标列表（同明细页）
const metrics = [
  { key: 'gmv', label: 'GMV',group: GROUPS.REVENUE },
  { key: 'refund_rate', label: '退款率',group: GROUPS.REVENUE },
  { key: 'revenue', label: '收入总额',group: GROUPS.REVENUE },
  { key: 'unit_cost', label: '成本单价',group: GROUPS.REVENUE },
  { key: 'cost', label: '成本总额' ,group: GROUPS.REVENUE},
  { key: 'gross_profit', label: '毛利额' ,group: GROUPS.REVENUE},
  { key: 'shipping_fee', label: '快递费' ,group: GROUPS.EXPENSE},
  { key: 'sample_fee', label: '寄样费用' ,group: GROUPS.EXPENSE},
  { key: 'platform_fee', label: '平台扣点(2%)' ,group: GROUPS.EXPENSE},
  { key: 'other_pf_fee', label: '平台其他费用(1%)' ,group: GROUPS.EXPENSE},
  { key: 'influencer_fee', label: '达人佣金',group: GROUPS.EXPENSE},
  { key: 'ad_spend', label: '投流费用',group: GROUPS.EXPENSE },
  { key: 'kol_fee', label: 'KOL费用分摊' ,group: GROUPS.EXPENSE},
  { key: 'slot_fee', label: '达人坑位费' ,group: GROUPS.EXPENSE},
  { key: 'salary', label: '工资及福利' ,group: GROUPS.EXPENSE},
  { key: 'travel', label: '差旅费' ,group: GROUPS.EXPENSE},
  { key: 'rent', label: '租金等其他费用' ,group: GROUPS.EXPENSE},
  { key: 'customer_service', label: '客服部分摊',group: GROUPS.EXPENSE },
  { key: 'marketing', label: '市场部分摊',group: GROUPS.EXPENSE },
  { key: 'roi', label: 'ROI' ,group: GROUPS.PROFIT},
  { key: 'sales_profit', label: '销售利润(扣除固定成本)',group: GROUPS.PROFIT },
  { key: 'marketing_profit', label: '营销利润(不扣除固定成本)' ,group: GROUPS.PROFIT},
  { key: 'marketing_margin', label: '营销利润率' ,group: GROUPS.PROFIT},
  { key: 'break_even_revenue', label: '保本销售额' ,group: GROUPS.PROFIT},
  { key: 'break_even_quantity', label: '保本销售数量' ,group: GROUPS.PROFIT}
]

// // 构造展示行
// const rows = metrics.map(({ key, label }) => ({
//   label,
//   business: props.data?.business?.[key] ?? '-',
//   financial: props.data?.financial?.[key] ?? '-'
// }))


// 计算属性：按模块分组指标
const groupedMetrics = computed(() => {
  return metrics.reduce((acc, metric) => {
    const groupKey = metric.group;
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push({
      label: metric.label,
      business: props.data?.business?.[metric.key] ?? '-',
      financial: props.data?.financial?.[metric.key] ?? '-'
    });
    return acc;
  }, {});
});

// 获取模块标签的辅助函数
const getGroupLabel = (groupKey) => GROUP_LABELS[groupKey] || '未知模块';

</script>

<style scoped>
.group-container {
  margin-bottom: 20px; /* 模块间间距 */
  padding: 15px; /* 模块内边距 */
  border: 1px solid #e4e7ed; /* 模块边框 */
  border-radius: 8px; /* 圆角 */
}

.group-title {
  font-size: 16px;
  font-weight: 500;
  color: #4a4e69;
  margin-bottom: 12px; /* 标题与表格间距 */
  padding-left: 10px; /* 标题缩进 */
}

.group-table {
  margin-top: 8px; /* 表格与标题间距 */
  border-top: none; /* 隐藏表格顶部边框，避免与模块边框重复 */
}

.group-table .el-table__header-wrapper {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>