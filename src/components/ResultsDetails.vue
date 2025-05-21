<template>
  <div>
    <el-card
      v-for="item in items"
      :key="item.id"
      class="product-card mb-4"
      shadow="hover"
    >
      <template #header>
        <span>{{ item.name }}</span>
      </template>
      <!-- 收益模块 -->
      <div class="mb-6">
        <h3 class="text-lg font-bold mb-2 text-primary">收益模块</h3>
            <el-table :data="getGroupData(item, GROUPS.REVENUE)" border style="width: 100%">
              <el-table-column label="项目" prop="label" width="200" />
              <el-table-column label="业务数据">
                <template #default="{ row }">
                  <!-- 自动根据是否为百分比字段格式化 -->
                  {{ format(row.business, row.label.includes('率') || row.label === '退款率') }}
                </template>
              </el-table-column>
              <el-table-column label="财务数据">
                <template #default="{ row }">
                  {{ format(row.financial, row.label.includes('率') || row.label === '退款率') }}
                </template>
              </el-table-column>
            </el-table>
      </div>
      <!-- 费用模块 -->
      <div v-if="userRole==='admin'" class="mb-6">
        <h3 class="text-lg font-bold mb-2 text-primary">费用模块</h3>
        <el-table :data="getGroupData(item, GROUPS.EXPENSE)" border style="width: 100%">
          <el-table-column label="项目" prop="label" width="200" />
          <el-table-column label="业务数据">
            <template #default="{ row }">
              <!-- 自动根据是否为百分比字段格式化 -->
              {{ format(row.business, row.label.includes('率') || row.label === '退款率') }}
            </template>
          </el-table-column>
          <el-table-column label="财务数据">
            <template #default="{ row }">
              {{ format(row.financial, row.label.includes('率') || row.label === '退款率') }}
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 利润模块 -->
      <div class="mb-6">
        <h3 class="text-lg font-bold mb-2 text-primary">利润模块</h3>
        <el-table :data="getGroupData(item, GROUPS.PROFIT)" border style="width: 100%">
          <el-table-column label="项目" prop="label" width="200" />
          <el-table-column label="业务数据">
            <template #default="{ row }">
              <!-- 自动根据是否为百分比字段格式化 -->
              {{ format(row.business, row.label.includes('率') || row.label === '退款率') }}
            </template>
          </el-table-column>
          <el-table-column label="财务数据">
            <template #default="{ row }">
              {{ format(row.financial, row.label.includes('率') || row.label === '退款率') }}
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { format } from '../utils/format';
import { ref, onMounted } from 'vue';

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  }
});

// 定义分组常量
const GROUPS = {
  REVENUE: 'revenue',    // 收益模块
  EXPENSE: 'expense',    // 费用模块
  PROFIT: 'profit'       // 利润模块
};

// 全量指标列表
const metrics = [
  // 收益模块
  { key: 'gmv', label: 'GMV' , group: GROUPS.REVENUE},
  { key: 'refund_rate', label: '退款率', group: GROUPS.REVENUE },
  { key: 'revenue', label: '收入总额' , group: GROUPS.REVENUE},
  { key: 'unit_cost', label: '成本单价', group: GROUPS.REVENUE },
  { key: 'cost', label: '成本总额', group: GROUPS.REVENUE },
  { key: 'gross_profit', label: '毛利额' , group: GROUPS.REVENUE},
  // 费用模块
  { key: 'shipping_fee', label: '快递费' , group: GROUPS.EXPENSE},
  { key: 'sample_fee', label: '寄样费用', group: GROUPS.EXPENSE },
  { key: 'platform_fee', label: '平台扣点(2%)' ,group: GROUPS.EXPENSE},
  { key: 'other_pf_fee', label: '平台其他费用(1%)', group: GROUPS.EXPENSE },
  { key: 'influencer_fee', label: '达人佣金' },
  { key: 'ad_spend', label: '投流费用' , group: GROUPS.EXPENSE},
  { key: 'kol_fee', label: 'KOL费用分摊' , group: GROUPS.EXPENSE},
  { key: 'slot_fee', label: '达人坑位费' , group: GROUPS.EXPENSE},
  { key: 'salary', label: '工资及福利' , group: GROUPS.EXPENSE},
  { key: 'travel', label: '差旅费' , group: GROUPS.EXPENSE},
  { key: 'rent', label: '租金等其他费用',group: GROUPS.EXPENSE },
  { key: 'customer_service', label: '客服部分摊' ,group: GROUPS.EXPENSE},
  { key: 'marketing', label: '市场部分摊' ,group: GROUPS.EXPENSE},
  
  // 利润模块
  { key: 'roi', label: 'ROI' , group: GROUPS.PROFIT},
  { key: 'sales_profit', label: '销售利润(扣除固定成本)', group: GROUPS.PROFIT },
  { key: 'marketing_profit', label: '营销利润(不扣除固定成本)', group: GROUPS.PROFIT },
  { key: 'marketing_margin', label: '营销利润率', group: GROUPS.PROFIT },
  { key: 'break_even_revenue', label: '保本销售额', group: GROUPS.PROFIT },
  { key: 'break_even_quantity', label: '保本销售数量', group: GROUPS.PROFIT }
];

// 为单个产品生成行数据
const getGroupData  = (item, group) => {
    return metrics
    .filter(metric => metric.group === group)
    .map(({ key, label }) => ({
      label,
      business: item.business?.[key] ?? '-',
      financial: item.financial?.[key] ?? '-'
    }));
};
// 计算当前用户角色
const userRole = ref('basic');
onMounted(() => {
  const role = localStorage.getItem('role');
  if (role) {
    userRole.value = role;
  }else {
    userRole.value = 'basic'; // 默认角色
    localStorage.removeItem('role');

  }
});
</script>

<style scoped>
.product-card {
  padding: 16px;
}
.mb-4 {
  margin-bottom: 24px;
}
</style>
