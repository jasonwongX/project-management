<template>
  <risk-form :is-edit="false" />
</template>

<script>
import RiskForm from './RiskScoreForm'

export default {
  name: 'CreateRiskScore',
  components: { RiskForm }
}
</script>

