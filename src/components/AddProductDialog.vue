<template>
  <el-dialog title="新增产品" :model-value="visible" @update:model-value="updateVisible" width="30%">
    <el-form :model="localProduct" ref="productForm" label-width="100px">
      <el-form-item
        label="产品名称"
        prop="name"
        :rules="[{ required: true, message: '请输入产品名称', trigger: 'blur' }]"
      >
        <el-input
          v-model="localProduct.name"
          placeholder="请输入产品名称"
          maxlength="100"
        />
      </el-form-item>

      <el-form-item
        label="成本单价"
        prop="cost_unit_price"
        :rules="[
          { required: true, message: '请输入成本单价', trigger: 'blur' },
          { validator: validatePositive, trigger: ['blur', 'change'] }
        ]"
      >
        <el-input-number
          v-model="localProduct.cost_unit_price"
          :min="0.00"
          precision="2"
          placeholder="请输入成本单价"
        />
      </el-form-item>

      <el-form-item
        label="运费"
        prop="shipping_fee"
        :rules="[
          { required: true, message: '请输入运费', trigger: 'blur' },
          { validator: validatePositive, trigger: ['blur', 'change'] }
        ]"
      >
        <el-input-number
          v-model="localProduct.shipping_fee"
          :min="0.00"
          precision="2"
          placeholder="请输入运费"
        />
      </el-form-item>

      <el-form-item
        label="税率"
        prop="cost_tax_rate"
        :rules="[
          { required: true, message: '请输入税率', trigger: 'blur' },
          { validator: validatePositive, trigger: ['blur', 'change'] }
        ]"
      >
        <el-input-number
          v-model="localProduct.cost_tax_rate"
          :min="0.000"
          precision="2"
          placeholder="请输入税率"
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button @click="updateVisible(false)">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: 'AddProductDialog',
  props: {
    visible: Boolean
  },
  emits: ['update:visible', 'submit'],
  data() {
    return {
      localProduct: {
        name: '',
        cost_unit_price: null,
        shipping_fee: null,
        cost_tax_rate: null
      }
    };
  },
  methods: {
    updateVisible(val) {
      this.$emit('update:visible', val);
    },
    validatePositive(rule, value, callback) {
      if (value === null || value === undefined || value === '') {
        callback(new Error('请输入数值'));
      } else if (value <= 0.001) {
        callback(new Error('值必须大于 0.001'));
      } else {
        callback();
      }
    },
    handleSubmit() {
      this.$refs.productForm.validate(valid => {
        if (valid) {
          this.$emit('submit', { ...this.localProduct });
          console.log('准备提交的 product:', this.localProduct);
        } else {
          this.$message.error('请完整填写表单信息');
        }
      });
    },
    resetForm() {
      this.localProduct = {
        name: '',
        cost_unit_price: null,
        shipping_fee: null,
        cost_tax_rate: null
      };
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.resetForm(); // 每次打开前重置表单
      }
    }
  }
};
</script>
