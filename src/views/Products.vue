<template>
  <div>
    <el-card>
      <template #header>
        <div class="header-container">
          <span>产品管理</span>
        </div>
      <div class="search-bar">
        <!-- <el-button type="primary" @click="isProductModalVisible = true">新增产品</el-button> -->
        <div> 
    
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

      <product-table 
        :products="products"
        @delete="deleteProduct" 
        @add="isProductModalVisible = true"/>

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
import api from '/src/utils/api';

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
    async fetchProductList() {
    // 构造查询参数
      const params = this.searchKeyword
        ? `?name=${encodeURIComponent(this.searchKeyword)}`
        : '';
      try {
        const res = await api.get(`/all_products${params}`);
        this.products = res.data;
        console.log("类型", typeof res.data);
        console.log("返回的数据", res.data);
      } catch (error) {
        console.error('获取产品列表失败:', error);
      }
    },
    async submitProduct(product) {
      try {
        const res = await api.post('/add_product', product);
        if (res.data.success) {
          this.$message.success('产品添加成功');
          this.isProductModalVisible = false;
        }
      } catch (error) {
        console.error('添加产品失败:', error);
      }
      this.fetchProductList(); // 刷新产品列表
    },
    async deleteProduct(productId) {
      try {
        await this.$confirm('确认删除该产品吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          });
        const res = await api.delete(`/delete_product/${productId}`);
        if (res.data.success) {
          this.$message.success('产品删除成功');
          this.fetchProductList(); // 刷新列表
        }
      } catch (err) {
         if (err !== 'cancel') {
        this.$message.error('删除产品失败');
        console.error('删除产品失败:', err);
      }
    }
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
  margin-right: 12px; /* 添加右边距 */
  width: 200px;
}

</style>
