import Chart from 'chart.js/auto';

/**
 * 渲染汇总柱状图
 */
export function renderMainChart(canvas, data) {
  if (!canvas || !data) return;
  const labels = ['收入', '成本', '毛利', '营销利润'];
  const dataset = [
    data.total_revenue,
    data.total_cost,
    data.total_gross_profit,
    data.total_marketing_profit
  ];
  if (canvas.chartInstance) canvas.chartInstance.destroy();
  canvas.chartInstance = new Chart(canvas, {
    type: 'bar',
    data: { labels, datasets: [{ label: '金额', data: dataset }] },
    options: { responsive: true, scales: { y: { beginAtZero: true } } }
  });
}

/**
 * 渲染费用饼图
 */
export function renderFeeChart(canvas, data) {
  if (!canvas || !data) return;
  const labels = ['快递费','寄样费','平台费','达人佣金','广告费','坑位费'];
  const dataset = [
    data.shipping_fee,
    data.sample_fee,
    data.platform_fee,
    data.influencer_fee,
    data.ad_fee,
    data.slot_fee
  ];
  if (canvas.chartInstance) canvas.chartInstance.destroy();
  canvas.chartInstance = new Chart(canvas, {
    type: 'pie',
    data: { labels, datasets: [{ data: dataset }] },
    options: { responsive: true }
  });
}
