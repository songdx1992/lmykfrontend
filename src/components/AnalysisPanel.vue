<template>
  <div v-if="summary" class="analysis-container">

    <!-- 顶部提示 -->
    <el-alert
      title="当前分析功能由系统免费提供 Token，请合理使用资源。"
      type="info"
      show-icon
      class="analysis-tip"
    />

    <!-- 分析按钮 -->
    <div class="analysis-actions">
      <el-button :loading="analyzing" type="primary" @click="analyze">测算分析</el-button>
    </div>

    <!-- 分析中提示 -->
    <div v-if="analyzing" class="analyzing-tip" style="text-align:center; margin-bottom: 20px;">
      <el-progress :percentage="100" status="active" />
      <p style="margin-top: 8px; color: #409eff; font-weight: 600;">
        正在分析，请等待分析结果，请勿重复提交...
      </p>
    </div>

    <!-- 分析结果 -->
    <div v-if="analysisResult" class="analysis-result">
      <el-card>
        <pre>{{ analysisResult }}</pre>
      </el-card>

    <!-- 点赞和踩按钮 -->
      <div class="feedback-buttons" style="text-align:center; margin-top: 16px;">
        <el-button type="success" icon="el-icon-thumb" @click="onLike">👍 点赞</el-button>
        <el-button type="danger" icon="el-icon-thumb-down" @click="onDislike" style="margin-left: 12px;">👎 踩</el-button>
      </div>
   </div>
    <!-- 没有结果时的提示 -->
    <div v-else class="no-result" style="text-align:center; margin-top: 20px;">
      <el-empty description="请先点击上方按钮进行分析" />
    </div>
</div>
</template>

<script>
import api from '/src/utils/api';



export default {
  name: 'AnalysisPanel',
  props: {
    summary: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      analysisResult: null,
      analyzing: false
    };
  },
  watch: {
    summary: {
      immediate: true,
      handler(newSummary) {
        if (newSummary) {
          this.analysisResult = null; // 切换 summary 时清空旧结果
        }
      }
    }
  },
  methods: {
    async analyze() {

      if (this.analyzing) return; // 防止重复点击
      this.analysisResult = null; // 清空旧结果
      this.analyzing = true;
      try {
        const res = await api.post('/analyze', { summary: this.summary.business});
        console.log("分析接口返回：", res);

           // 确保 data 存在
        if (res && res.data && res.data.analysis) {
        this.analysisResult = res.data.analysis;
        } else {
        console.warn('返回内容结构异常:', res.data);
        this.$message.error('分析结果异常');
        }
    } catch (error) {
        const errorMsg =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        '分析失败';
        console.error('分析失败:', error);
        this.$message.error(errorMsg);
    } finally {
      this.analyzing = false;
    }
    },
    onLike() {
      this.$message.success('谢谢，我会继续努力！');
    },
    onDislike() {
      this.$message.warning('对不起让你失望了，我会继续优化模型争取早日为你提供更好的服务。');
    }
 }
};
</script>

<style scoped>
.analysis-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.analysis-actions {
  margin-top: 8px;
}
.analysis-result {
  margin-top: 16px;
  white-space: pre-wrap;
}
</style>
