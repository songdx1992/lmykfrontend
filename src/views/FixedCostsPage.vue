<!-- // views/FixedCostsPage.vue -->
<template>
  <el-card>
    
    <fixed-costs :data="fixedCosts" />
  </el-card>
</template>

<script>

import FixedCosts from '../components/FixedCoststable.vue';

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
    fetch('/fixed_costs')
      .then(r => r.json())
      .then(data => {
        this.fixedCosts = data;
        console.log("固定费用返回的数据", data)
      })
      .catch(err => {
      console.error('固定费用请求失败:', err);
    });
  }
};
</script>
