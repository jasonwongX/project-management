<template>
  <project-change-form :is-edit="false" />
</template>

<script>
import ProjectChangeForm from './ProjectChangeForm'

export default {
  name: 'CreateProjectChange',
  components: { ProjectChangeForm }
}
</script>

