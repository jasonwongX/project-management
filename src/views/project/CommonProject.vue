<template>
  <ProjectList :dev-mode="1" />
</template>
<script>
import ProjectList from './ProjectList'

export default {
  name: 'CommonProject',
  components: {
    ProjectList
  }
}
</script>
