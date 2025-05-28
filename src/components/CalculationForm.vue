<template>
  <div>
    <el-form>
      <!-- 部门 -->
      <el-form-item label="部门">
        <el-select v-model="form.department" placeholder="请选择部门">
          <el-option v-for="d in departments" :key="d" :label="d" :value="d" />
        </el-select>
      </el-form-item>

      <!-- 月份 -->
      <el-form-item label="月份">
        <el-select v-model="form.month" placeholder="请选择月份">
          <el-option v-for="m in monthOptions" :key="m" :label="m" :value="m" />
        </el-select>
      </el-form-item>

      <!-- 产品多选 -->
      <el-form-item label="选择产品">
        <el-select v-model="selectedProductIds" multiple placeholder="请选择产品">
          <el-option v-for="p in products" :key="p.id" :label="p.name" :value="p.id" />
        </el-select>
      </el-form-item>

      <!-- 新增产品 -->
      <el-row>
        <el-col :span="24">
            <el-button type="primary" @click="$emit('on-add-product')">新增产品</el-button>
        </el-col>
      </el-row>
    </el-form>

    <!-- 产品输入行 -->
    <el-row
  class="product-row"
  :gutter="20"
  v-for="(item, idx) in productInputs"
  :key="item.id"
>
  <el-col :span="24">
    <el-card shadow="hover" class="product-card">
      <!-- 产品名称在顶部一行 -->
      <div class="product-title"><strong>{{ item.name }}</strong></div>

      <!-- 输入项不强制对齐，换行展开 -->
      <el-row :gutter="20">
        <el-col :span="5">
          <el-form-item label="数量">
            <el-input-number v-model="item.quantity" :min="1" />
          </el-form-item>
        </el-col>

        <el-col :span="5">
          <el-form-item label="含税单价">
            <el-input-number v-model="item.unit_price" :min="0" :step="0.01" />
          </el-form-item>
        </el-col>

        <el-col :span="5">
          <el-form-item label="退款率(小数)">
            <el-input-number v-model="item.refund_rate" :min="0" :max="1" :step="0.01" />
          </el-form-item>
        </el-col>

        <el-col :span="5">
          <el-form-item label="寄样费费率(小数)">
            <el-input-number v-model="item.sample_fee_rate" :min="0" :max="1" :step="0.001" />
          </el-form-item>
        </el-col>

        <el-col :span="5">
          <el-form-item label="达人佣金率(小数)">
            <el-input-number v-model="item.influencer_rate" :min="0" :max="1" :step="0.01" />
          </el-form-item>
        </el-col>

        <el-col :span="5">
          <el-form-item label="坑位费率保GMV(小数)">
            <el-input-number v-model="item.slot_fee_rate" :min="0" :max="1" :step="0.01" />
          </el-form-item>
        </el-col>

        <el-col :span="5">
          <el-form-item label="广告支出(元)">
            <el-input-number v-model="item.ad_spend_amount" :min="0" :step="1" />
          </el-form-item>
        </el-col>

        <el-col :span="5">
          <el-form-item label="坑位费不保GMV固定(元)">
            <el-input-number v-model="item.slot_fee_amount" :min="0" :step="1" />
          </el-form-item>
        </el-col>

        <el-col :span="5">
          <el-form-item label="达人佣金税率(小数)">
            <el-input-number v-model="item.influencer_tax_rate" :min="0" :max="1" :step="0.01" />
          </el-form-item>
        </el-col>

        <el-col :span="4">
          <el-form-item label="坑位税率(小数)">
            <el-input-number v-model="item.slot_fee_tax_rate" :min="0" :max="1" :step="0.01" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-card>
  </el-col>
</el-row>


    <!-- 提交按钮 -->
    <el-button
      type="success"
      @click="handleSubmit"
      :disabled="!productInputs.length"
      style="margin-top: 16px;"
    >
      汇总计算
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'CalculationForm',
  props: {
    products: Array,
    departments: Array,
    monthOptions: Array
  },
  data() {
    return {
      form: {
        department: '',
        month: ''
      },
      selectedProductIds: [],
      productInputs: []
    };
  },
  watch: {
    selectedProductIds(newVal) {
      this.productInputs = newVal.map(id => {
        const existing = this.productInputs.find(i => i.id === id);
        if (existing) return existing;
        const product = this.products.find(p => p.id === id);
        return {
          id: product.id,
          name: product.name,
          quantity: 1,
          unit_price: 0,
          refund_rate: 0,
          sample_fee_rate: 0,
          influencer_rate: 0,
          slot_fee_rate: 0,
          ad_spend_amount: 0,
          slot_fee_amount: 0,
          influencer_tax_rate: 0,
          slot_fee_tax_rate: 0
        };
      });
    }
  },
  methods: {
    handleSubmit() {
      if (!this.form.department || !this.form.month) {
        this.$message.warning('请选择部门和月份');
        return;
      }
      if (!this.productInputs.length) {
        this.$message.warning('请至少选择一个产品并填写参数');
        return;
      }

      // 发出计算事件，父组件 Dashboard.vue 会接收处理
      this.$emit('on-calculate', {
        form: this.form,
        products: this.productInputs
      });
    }
  }
};
</script>

<style scoped>
.product-row {
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  padding-bottom: 12px;
}

.custom-input-number .el-input__inner {
  width: 250px;
}
.product-card {
  margin-bottom: 20px;
  padding: 10px;
}

.product-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
}

</style>
