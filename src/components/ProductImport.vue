<template>
  <input
    ref="fileInput"
    type="file"
    accept=".xlsx, .xls"
    style="display: none"
    @change="handleFileChange"
  />
</template>

<script>
import * as XLSX from 'xlsx'

export default {
  name: 'ProductImport',
  props: {
    existingNames: {
      type: Array,
      default: () => []
    }
  },
  emits: ['import'],
  methods: {
    // 手动触发文件选择
    triggerFileInput() {
      this.$refs.fileInput.click()
    },

    // 文件导入处理
    handleFileChange(e) {
      const file = e.target.files[0]
      if (!file) return

      const reader = new FileReader()
      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result)
        const workbook = XLSX.read(data, { type: 'array' })
        const sheet = workbook.Sheets[workbook.SheetNames[0]]
        const rows = XLSX.utils.sheet_to_json(sheet)

        const existingSet = new Set(this.existingNames)
        const newSet = new Set()
        const result = []

        for (let index = 0; index < rows.length; index++) {
          const row = rows[index]
          const rowNum = index + 2 // Excel 表格从第2行开始是数据

          const { 名称, 成本单价, 运费, 税率 } = row
          const cost = parseFloat(成本单价)
          const shipping = parseFloat(运费)
          const tax = parseFloat(税率)

          // 一条一条校验具体字段
          if (!名称) {
            this.$message.error(`第 ${rowNum} 行导入失败：名称不能为空`)
            console.warn(`第 ${rowNum} 行导入失败：名称不能为空`)
            e.target.value = ''
            return
          }

          if (existingSet.has(名称)) {
            this.$message.error(`第 ${rowNum} 行导入失败：名称 "${名称}" 已存在`)
            console.warn(`第 ${rowNum} 行导入失败：名称 "${名称}" 已存在`)
            e.target.value = ''
            return
          }

          if (newSet.has(名称)) {
            this.$message.error(`第 ${rowNum} 行导入失败：名称 "${名称}" 重复`)
            console.warn(`第 ${rowNum} 行导入失败：名称 "${名称}" 重复`)
            e.target.value = ''
            return
          }

          if (isNaN(cost)) {
            this.$message.error(`第 ${rowNum} 行导入失败：成本单价 "${成本单价}" 不是数字`)
            console.warn(`第 ${rowNum} 行导入失败：成本单价 "${成本单价}" 不是数字`)
            e.target.value = ''
            return
          }

          if (isNaN(shipping)) {
            this.$message.error(`第 ${rowNum} 行导入失败：运费 "${运费}" 不是数字`)
            console.warn(`第 ${rowNum} 行导入失败：运费 "${运费}" 不是数字`)
            e.target.value = ''
            return
          }

          if (isNaN(tax)) {
            this.$message.error(`第 ${rowNum} 行导入失败：税率 "${税率}" 不是数字`)
            console.warn(`第 ${rowNum} 行导入失败：税率 "${税率}" 不是数字`)
            e.target.value = ''
            return
          }

          // 校验通过后加入导入集合
          newSet.add(名称)
          result.push({
            name: 名称,
            cost_unit_price: cost,
            shipping_fee: shipping,
            cost_tax_rate: tax
          })
        }

        // 导入完成
        this.$emit('import', result)
        this.$message.success('导入成功')
        e.target.value = '' // 清空 input 以便下次导入同样文件也触发
      }

      reader.readAsArrayBuffer(file)
    }
  }
}
</script>
