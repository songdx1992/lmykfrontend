<!-- // views/FixedCostsPage.vue -->
<template>
  <el-card>
    
    <fixed-costs :data="fixedCosts" />
  </el-card>
</template>

<script>

import FixedCosts from '../components/FixedCoststable.vue';
import api from '/src/utils/api';

export default {
  name: 'FixedCostsPage',
  components: { FixedCosts },
  data() {
    return {
      fixedCosts: [],
      isFetched: false
    };
  },
  created() {
      if (this.isFetched) return;
      this.isFetched = true;
      this.fetchFixedCosts()},
  methods: {
    async fetchFixedCosts() {
      try{
      const res = await api.get('/fixed_costs');
      this.fixedCosts = res.data;
      console.log("固定费用返回的数据", data)
      }catch(err) {
      console.error('固定费用请求失败:', err);
     };
   }
 }
};
</script>



