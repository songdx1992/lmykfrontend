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
      fixedCosts: []
    };
  },
  created() {
    fetch('/fixed_costs')
      .then(r => r.json())
      .then(data => {
        this.fixedCosts = data;
      });
  }
};
</script>
