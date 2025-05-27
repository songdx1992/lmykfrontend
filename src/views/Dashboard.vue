<template>
  <div>
    <!-- 如果未登录，显示登录表单 -->
    <!-- <login-form v-if="!loggedIn" @on-login="onLogin" /> -->

    <!-- 登录后，展示卡片式多标签页 -->
    <el-card >
      <header class="header-container">
        <h2>
          欢迎，{{ currentUser.username }}
          <el-button @click="logout">退出登录</el-button>
        </h2>
      </header>

   

    <el-row class="mt-2"></el-row>  <!-- 用 margin class 替代换行 -->

      <!-- 上半部分：输入参数 -->
      <el-row>
        <el-col :span="24">
          <calculation-form
            :products="products"
            :departments="departments"
            :monthOptions="monthOptions"
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

              <el-tab-pane label="要分摊的固定费用基数" name="FixedCosts">
                <fixed-costs :data="fixedCosts" />
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
import FixedCosts from '../components/FixedCosts.vue';
import AddProductDialog from '../components/AddProductDialog.vue';

export default {
  name: 'Dashboard',
  components: {
    LoginForm,
    CalculationForm,
    ResultsSummary,
    ResultsDetails,
    FixedCosts,
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
      details: [],
      fixedCosts: [],         // 明细结果数据
    };
  },
  created() {
    // 检查是否已有 localStorage 登录信息
    const savedUsername = localStorage.getItem('username');
    const savedRole = localStorage.getItem('role');
   if (!savedUsername || !savedRole) {
      this.$router.push('/login');}
      else {
      this.loggedIn = true;
      this.currentUser.username = savedUsername;
      this.currentUser.role = savedRole;
    }

    // 应用创建时，拉取产品列表
    this.fetchProductList();
 
    fetch('/fixed_costs')
      .then(r => r.json())
      .then(data => {
        this.fixedCosts = data;
        console.log('返回数据结构:', data); // ⬅️ 打印完整返回体
      })
      
      .catch(() => {
        this.$message.error('无法加载固定费用数据');
      });

  },
  methods: {
    onLogin(userInfo) {
      this.loggedIn = true;
      this.currentUser = userInfo;
    },
    logout() {
      localStorage.removeItem('username');
      localStorage.removeItem('role');
      this.$router.push('/login');
      this.loggedIn = false;
      this.currentUser = null;
    },
    fetchProductList() {
      fetch('/products')
        .then(r => r.json())
        .then(data => {
          this.products = data;
        })
        .catch(() => {
          this.$message.error('无法加载产品列表');
        });
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
    submitProduct(product) {
  
      // 调用后端 API 添加产品
  
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
          // 处理后端返回的具体错误信息
                if (data.detail && data.detail.includes('产品名称已存在')) {
                  this.$message.error('产品添加失败：产品名称已存在');
                } else {
                  this.$message.error(data.message || '添加失败');
                }
                
                // 保留模态框打开，让用户可以修改错误
                // this.isProductModalVisible = false;
                // this.resetForm(); // 不重置表单，让用户可以修改错误
              }
          })
          .catch(() => {
            this.$message.error('请求失败');
          });
        
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
    calculate({ form, products }) {

      // ✅ 先定义 payload 对象
      const payload = {department: form.department,month: form.month,products};

      // ✅ 打印 payload，调试用
      console.log("请求 JSON：", JSON.stringify(payload, null, 2));

      
      fetch('/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          department: form.department,
          month: form.month,
          products
        })
      })
      .then(async res => {
        if (!res.ok) {const err = await res.json();this.$message.error(err.detail || '计算失败');throw new Error(err.detail);}return res.json();
      })
      .then(data => {
        // 读取后端返回的 summary 和 details
        this.summary = data.summary;
         this.summaryKey += 1;
        this.details = data.details;
        // 切到汇总页签
        this.activeTab = 'summary';
      })
      .catch(() => {
        // 错误已提示，无需额外处理
      });
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
