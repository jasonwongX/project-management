<template>
  <risk-form :is-edit="true" />
</template>

<script>
import RiskForm from './RiskScoreForm'

export default {
  name: 'EditRiskScore',
  components: { RiskForm }
}
</script>

