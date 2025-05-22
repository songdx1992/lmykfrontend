<template>
   <div>
    <!-- 汇总标题 -->
    <div class="summary-title">
      <span>汇总结果</span>
    </div>
    <!-- 遍历分组后的指标列表，渲染每个模块 -->
    <div v-for="(metricsList, groupKey) in groupedMetrics" :key="groupKey">
      <!-- 模块标题（中文） -->
      <h3>{{ GROUP_LABELS[groupKey] }}</h3>
      <!-- 使用 Element Plus 的表格组件显示数据 -->
      <el-table :data="metricsList" style="width: 100%">
        <el-table-column label="项目" width="300">
          <template #default="{ row }">{{ row.label }}</template>
        </el-table-column>
        <el-table-column label="运营数值" >
          <template #default="{ row }">
            {{ formatValue(props.data.business[row.key]) }}
          </template>
        </el-table-column>
        <el-table-column label="财务数值" >
          <template #default="{ row }">
            {{ formatValue(props.data.financial[row.key]) }}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
// 导入 Vue 组合式 API
import { computed, onMounted } from 'vue';

// 定义组件 Props：role（字符串）和 data（包含 business 和 financial 两个对象）
const props = defineProps({
  role: {
    type: String,
    required: true
  },
  data: {
    type: Object,
    required: true
  }
});

// 定义指标分组常量
const GROUPS = {
  REVENUE: 'revenue', // 收入模块
  EXPENSE: 'expense', // 费用模块
  PROFIT: 'profit'    // 利润模块
};

// 模块中文名映射
const GROUP_LABELS = {
  [GROUPS.REVENUE]: '收入模块',
  [GROUPS.EXPENSE]: '费用模块',
  [GROUPS.PROFIT]: '利润模块'
};

// 指标定义（用于分组展示）
const metrics = [
  // 收入模块（REVENUE）
  { key: 'gmv', label: 'GMV（成交额）', group: GROUPS.REVENUE },
  { key: 'refund_rate', label: '退款率', group: GROUPS.REVENUE },
  { key: 'revenue', label: '收入总额', group: GROUPS.REVENUE },
  { key: 'unit_cost', label: '成本单价', group: GROUPS.REVENUE },
  { key: 'cost', label: '成本总额', group: GROUPS.REVENUE },
  { key: 'gross_profit', label: '毛利额', group: GROUPS.REVENUE },

  // 费用模块（EXPENSE）
  { key: 'shipping_fee', label: '快递费', group: GROUPS.EXPENSE },
  { key: 'sample_fee', label: '寄样费用', group: GROUPS.EXPENSE },
  { key: 'platform_fee', label: '平台扣点（2%）', group: GROUPS.EXPENSE },
  { key: 'other_pf_fee', label: '平台其他费用（1%）', group: GROUPS.EXPENSE },
  { key: 'influencer_fee', label: '达人佣金', group: GROUPS.EXPENSE },
  { key: 'ad_spend', label: '投流费用', group: GROUPS.EXPENSE },
  { key: 'kol_fee', label: 'KOL费用分摊', group: GROUPS.EXPENSE },
  { key: 'slot_fee', label: '达人坑位费', group: GROUPS.EXPENSE },
  { key: 'salary', label: '工资及福利', group: GROUPS.EXPENSE },
  { key: 'travel', label: '差旅费', group: GROUPS.EXPENSE },
  { key: 'rent', label: '租金等其他费用', group: GROUPS.EXPENSE },
  { key: 'customer_service', label: '客服部分摊', group: GROUPS.EXPENSE },
  { key: 'marketing', label: '市场部分摊', group: GROUPS.EXPENSE },

  // 利润模块（PROFIT）
  { key: 'roi', label: 'ROI（投入产出比）', group: GROUPS.PROFIT },
  { key: 'sales_profit', label: '销售利润（扣除固定成本）', group: GROUPS.PROFIT },
  { key: 'marketing_profit', label: '营销利润（不扣除固定成本）', group: GROUPS.PROFIT },
  { key: 'marketing_margin', label: '营销利润率', group: GROUPS.PROFIT },
  { key: 'break_even_revenue', label: '保本销售额', group: GROUPS.PROFIT },
  { key: 'break_even_quantity', label: '保本销售数量', group: GROUPS.PROFIT }
];
// 格式化值：如果缺失则返回 "-"
function formatValue(value) {
  if (value === undefined || value === null || value === '') {
    return '-';
  }
  return value;
}

// 计算属性：按组分类 metrics，并根据角色过滤 expense
const groupedMetrics = computed(() => {
  const groups = {};
  metrics.forEach(metric => {
    const groupKey = metric.group;
    console.log('处理指标:', metric.key, '所属模块:', groupKey);
    // 如果没有指定组或映射中没有该组，跳过该指标
    if (!groupKey || !(groupKey in GROUP_LABELS)) {
      console.warn(`跳过未知分组的指标: ${metric.key} (group: ${groupKey})`);
      return;
    }
    // 如果角色不是 admin，跳过 expense 组
    if (groupKey === 'expense' && props.role !== 'admin') {
      console.log(`非管理员角色，跳过费用模块指标: ${metric.key}`);
      return;
    }
    // 初始化数组并添加指标
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(metric);
  });
  console.log('分组结果:', groups);
  return groups;
});

// 组件挂载时打印当前角色信息
onMounted(() => {
  console.log('组件挂载，当前角色:', props.role);
});
</script>

<style scoped>
.summary-title {
  font-size: 24px; /* 加大字体 */
  font-weight: bold;
  color: #333;
  text-align: center;
  padding: 24px 0 12px;
  border-bottom: 1px solid #dcdfe6; /* Element Plus 风格的分割线颜色 */
  margin-bottom: 24px;
}
.product-card {
  padding: 16px;
}
.mb-4 {
  margin-bottom: 24px;
}
</style>
