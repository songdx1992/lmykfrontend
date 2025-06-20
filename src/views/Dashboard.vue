<template>
  <div>
    <el-card >
      <!-- 上半部分：输入参数 -->
      <el-row>
        <el-col :span="24">
          <calculation-form
            :products="products"
            :departments="departments"
            :monthOptions="monthOptions"
            mode="dashboard"  
            @on-add-product="showProductModal"
            @on-calculate="calculate"
          />
        </el-col>
      </el-row>

      <add-product-dialog
        v-model:visible="isProductModalVisible"
        @submit="submitProduct"
      />

      <!-- 下半部分：结果页签 -->
      <el-row class="mt-4">
        <el-col :span="24">
          <el-tabs v-model="activeTab">
            <el-tab-pane label="产品汇总" name="summary">
              <results-summary v-if="summary" :key="summaryKey" :data="summary" :role="currentUser?.role" />
            </el-tab-pane>

            <el-tab-pane label="产品明细" name="details">
              <results-details v-if="details" :items="details" />
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm.vue';
import CalculationForm from '../components/CalculationForm.vue';
import ResultsSummary from '../components/ResultsSummary.vue';
import ResultsDetails from '../components/ResultsDetails.vue';
import AddProductDialog from '../components/AddProductDialog.vue';
import api from '/src/utils/api';
import { useUserStore } from '/src/stores/user';

export default {
  name: 'Dashboard',
  components: {
    LoginForm,
    CalculationForm,
    ResultsSummary,
    ResultsDetails,
    AddProductDialog
  },
  data() {
    return {
      loggedIn: false,   // 登录状态
      currentUser: {username: '', role: ''}, // 当前用户信息
      products: [],      // 从后端获取的产品列表
      departments: [     // 部门选项
        '抖音达播-季节品',
        '抖音自播-冰品',
        '天猫-季节品',
        "天猫-冰品",
        '京东-季节品',
        "京东-冰品",
        "拼多多-冰品",
        '拼多多-季节品',
        "小红书-季节品",
        "小红书-冰品",
        "有赞-季节品",
        "有赞-冰品"
      ],
      monthOptions: [    // 月份选项
        '202501'
      ],
      activeTab: 'summary',  // 默认展示汇总

      isProductModalVisible: false, // 控制弹窗显示
  
      summary: null,
      summaryKey: 0,       // 汇总结果数据
      details: []// 明细结果数据
    };
  },
  created() {

    const userStore = useUserStore();
    userStore.restoreFromLocalStorage();



    // 检查是否已有 localStorage 登录信息
    // const savedUsername = localStorage.getItem('username');
    // const savedRole = localStorage.getItem('role');

   if (!userStore.username || !userStore.role) {
      this.$router.push('/login');
    } else {
      this.loggedIn = true;
      this.currentUser.username = userStore.username;
      this.currentUser.role = userStore.role;
    }

    // 应用创建时，拉取产品列表
    this.fetchProductList();
 
    // fetch('/fixed_costs')
    //   .then(r => r.json())
    //   .then(data => {
    //     this.fixedCosts = data;
    //     console.log('返回数据结构:', data); // ⬅️ 打印完整返回体
    //   })
      
    //   .catch(() => {
    //     this.$message.error('无法加载固定费用数据');
    //   });

  },
  methods: {
    // onLogin(userInfo) {
    //   this.loggedIn = true;
    //   this.currentUser = userInfo;
    // },
    // logout() {
    //   localStorage.removeItem('username');
    //   localStorage.removeItem('role');
    //   this.$router.push('/login');
    //   this.loggedIn = false;
    //   this.currentUser = null;
    // },
    async fetchProductList() {
      try {
        const res = await api.get('/products');
        this.products = res.data;
        console.log("产品列表返回的数据", this.products);
      } catch (err) {
        console.error('产品列表请求失败:', err);
        this.$message.error('无法加载产品列表');
      }
    },
    showProductModal() {this.resetForm();this.isProductModalVisible = true;},

    // 自定义表单验证函数
    validateTaxRate(rule, value, callback) {
      if (value === null || value === undefined || value === '') {
        callback(new Error('请输入税率'))
      } else if (value <= 0.001) {
        callback(new Error('单价，税率，运费必须大于 0.001'))
      } else {
        callback()
      }
    },
    async submitProduct(product) {
  
      // 调用后端 API 添加产品
      try {
        const res = await api.post('/add_product', product);
        if (res.data.success) {
          this.$message.success('产品添加成功');
          this.isProductModalVisible = false;
          this.fetchProductList(); // 刷新产品列表
        }
    } catch (error)  {
    // ✅ 从 error.response.data 里取后端返回的错误信息
        const errorMsg = error.response?.data?.detail || error.response?.data?.message || '添加失败';

        if (errorMsg.includes('产品名称已存在')) {
          this.$message.error('产品添加失败：产品名称已存在');
        } else {
          this.$message.error(errorMsg);
        }

        console.error('添加产品失败:', errorMsg);
      }
    },


    resetForm() {
    // 重置表单数据
      this.newProduct = {
        name: '',
        cost_unit_price: null,
        shipping_fee: null,
        cost_tax_rate: null
      };
  },

    // 处理“计算”事件
    async calculate({ form, products }) {

      // ✅ 先定义 payload 对象
      const payload = {department: form.department,month: form.month,products};

      // ✅ 打印 payload，调试用
      console.log("请求 JSON：", JSON.stringify(payload, null, 2));

      try {
        const res = await api.post('/calculate', payload);
        
        // 假设后端成功直接返回 { summary, details }
        const data = res.data;
        this.summary = data.summary;
        this.summaryKey += 1; // 更新 key 以强制重新渲染
        this.details = data.details;
        // 切换到汇总页签
        this.activeTab = 'summary'; 
      } catch (error) {
        // ✅ 错误处理：从 error.response.data 里取后端返回的错误信息
        const errorMsg = error.response?.data?.detail || error.response?.data?.message || '计算失败';
        this.$message.error(errorMsg);
        console.error('计算失败:', errorMsg);
        // ✅ 这里可以选择抛出错误或其他处理
        throw error;
      }
    }
  }
};
</script>



<style scoped>
/* 根据需要添加局部样式 */
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.mt-4 {
  margin-top: 16px;
}
</style>

