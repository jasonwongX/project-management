<template>
  <ProjectList :dev-mode="2" />
</template>
<script>
import ProjectList from './ProjectList'
export default {
  name: 'AgileProject',
  components: {
    ProjectList
  }
}
</script>
