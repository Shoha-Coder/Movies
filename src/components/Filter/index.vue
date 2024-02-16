<template>
    <div class="btn-group">
        <Button v-for="btn in filteredButtons" :class="[filter === btn.name ? 'btn-dark' : 'btn-outline-dark']" type="button"
            @click="onFilterChange(btn.name)">{{btn.title}}</Button>
    </div>
</template>
<script>
export default {
    props: {
        onFilterChange: {
            type: Function,
            required: true
        },
        filter: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            filteredButtons: [
                {
                    title: "Barcha kinolar",
                    name: "all"
                },
                {
                    title: "Mashhur kinolar",
                    name: "popular"
                },
                {
                    title: "Eng ko'p ko'rilgan kinolar",
                    name: "mostViewers"
                }
            ]
        }
    }
}
</script>
<style lang="scss" scoped></style>