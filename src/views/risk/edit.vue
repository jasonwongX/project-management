<template>
  <risk-form :is-edit="true" />
</template>

<script>
import RiskForm from './RiskForm'

export default {
  name: 'EditRisk',
  components: { RiskForm }
}
</script>

