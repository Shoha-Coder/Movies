<template>
  <Box>
    <p class="fs-3 text-uppercase">Barcha Kinolar soni: {{ allMoviesCount }}</p>
    <p class="fs-4 text-uppercase">Korilgan Kinolar soni: {{favouriteMoviesCount}}</p>
  </Box>
</template>

<script lang="js">
export default {
    props: {
        allMoviesCount: {
            type: Number,
            required: true
        },
        favouriteMoviesCount: {
            type: Number,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
