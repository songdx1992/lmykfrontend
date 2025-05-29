<template>
  <div>
    <el-card>
      <template #header>
        <div class="header-container">
          <span>产品管理</span>
        </div>
        <div class="search-bar">
        <el-button type="primary" @click="isProductModalVisible = true">新增产品</el-button>
        <div> 
            <label>产品名称</label>
          <el-input
            v-model="searchKeyword"
            placeholder="按名称搜索"
            clearable
            class="search-input"
            />
          <el-button type="primary" @click="fetchProductList">
            查询
          </el-button>
        </div>
        </div>
      </template>

      <product-table :products="products" />

      <add-product-dialog
        v-model:visible="isProductModalVisible"
        @submit="submitProduct"
      />
    </el-card>
  </div>
</template>

<script>
import ProductTable from '../components/Productstable.vue';
import AddProductDialog from '../components/AddProductDialog.vue';

export default {
  name: 'ProductsView',
  components: {
    ProductTable,
    AddProductDialog
  },
  data() {
    return {
      products: [],
      searchKeyword: '',
      isProductModalVisible: false
    };
  },
  created() {
    this.fetchProductList();
  },
  methods: {
    fetchProductList() {
    // 构造查询参数
      const params = this.searchKeyword
        ? `?name=${encodeURIComponent(this.searchKeyword)}`
        : '';
      fetch(`/all_products${params}`)
        .then(r => r.json())
        .then(data => {
          this.products = data;
              console.log("类型", typeof data);
              console.log("返回的数据", data);
            if (data.length) {
                console.log("第一个产品详情", data[0]);
            }
        })
        .catch(() => {
          this.$message.error('无法加载产品列表');
        });
    },
    submitProduct(product) {
      fetch('/add_product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            this.$message.success('产品添加成功');
            this.isProductModalVisible = false;
            this.fetchProductList(); // 刷新产品列表
          } else {
            if (data.detail && data.detail.includes('产品名称已存在')) {
              this.$message.error('产品添加失败：产品名称已存在');
            } else {
              this.$message.error(data.message || '添加失败');
            }
          }
        })
        .catch(() => {
          this.$message.error('请求失败');
        });
    }
  }
};
</script>

<style scoped>
.header-container {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.add-button-bar {
  margin-bottom: 10px;
}

.search-bar {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.search-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.search-label {
  font-weight: 500;
  margin-right: 4px;
}

.search-input {
  width: 200px;
}
</style>
