<template>
  <risk-form :is-edit="false" />
</template>

<script>
import RiskForm from './RiskForm'

export default {
  name: 'CreateRisk',
  components: { RiskForm }
}
</script>

