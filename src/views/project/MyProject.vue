<template>
  <project-list :is-my-project="true" />
</template>

<script>
import ProjectList from './index'

export default {
  name: 'MyProjectList',
  components: { ProjectList }
}
</script>

