<template>
  <div id="wangeditor">
    <div ref="editorElem" class="edit" style="text-align:left"></div>
  </div>
</template>
<script>
import E from 'wangeditor'
export default {
  name: 'wangEditor',
  data() {
    return {
      editor: null,
      editorContent: ''
    }
  },
  props: ['content'], // 接收父组件的方法
  watch: {
    content() {
      this.editor.txt.html(this.content)
    }
  },
  mounted() {
    this.editor = new E(this.$refs.editorElem)
    this.editor.customConfig.onchange = html => {
      this.editorContent = html
      this.$emit('catchData', this.editorContent)
    }
    this.editor.customConfig.uploadImgServer = '你的上传图片的接口'
    this.editor.customConfig.uploadFileName = '你自定义的文件名'
    this.editor.customConfig.menus = [
      // 菜单配置
      'head', // 标题
      'bold', // 粗体
      'fontSize', // 字号
      'fontName', // 字体
      'italic', // 斜体
      'underline', // 下划线
      'strikeThrough', // 删除线
      'link', // 插入链接
      'list', // 列表
      'justify', // 对齐方式
      'quote', // 引用
      'table', // 表格
      'undo', // 撤销
      'redo' // 重复
    ]
    this.editor.create() // 创建富文本实例
    if (!this.content) {
      this.editor.txt.html('请编辑内容1')
    }
  }
}
</script>
<style lang="scss" >
#wangeditor {
  width: 100%;
}
</style