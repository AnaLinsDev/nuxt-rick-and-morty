<template>
  <div class="painel-card">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'PainelCard',
}
</script>

<style>
  .painel-card{
    margin: 30px 0;
    width: 45%;
    height: 80vh;
    border-radius: 20px;
    border: 2px solid rgb(0, 0, 0);
  }
</style>