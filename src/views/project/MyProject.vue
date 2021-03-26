<template>
  <project-list :is-my-project="true" :dev-mode="0" />
</template>

<script>
import ProjectList from './index'

export default {
  name: 'MyProjectList',
  components: { ProjectList }
}
</script>

