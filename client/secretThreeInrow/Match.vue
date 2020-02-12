<template>
    <div ref="match" class="match">
        <h1 v-if="pause">NEXT PLAYER</h1>
        <div v-else class="map">
            <div v-for="row, y in map" class="row">
                <div v-for="cell, x in row" @click="cellClick(x, y)" class="cell">
                    <div v-if="isMarkVisible(cell, x, y)" class="block" :style="getStyle(cell)"/>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    const Vuex = require('vuex');
    const { mapState, mapGetters, mapActions } = Vuex.createNamespacedHelpers('match');

    module.exports = {
        data() {
            return {};
        },
        computed: {
            ...mapState([
                'map',
                'colors',
                'pause'
            ]),
            ...mapGetters([
                'currentPlayerNumber',
                'isMarkVisible'
            ])
        },
        methods: {
            ...mapActions([
                'placeMark'
            ]),
            getStyle(cell) {
                let color = this.colors[cell];
                return {
                    backgroundColor: color
                }
            },
            cellClick(x, y) {
                this.placeMark({ x, y });
            }
        },
        created() {
        },
        mounted() {
        },
        components: {}
    };
</script>
<style scoped lang="scss">
    .map {
        display: flex;
        flex-direction: column;
    }

    .row {
        display: flex;
    }

    .cell {
        width: 120px;
        height: 120px;
        border: 1px solid black;
        box-sizing: border-box;
    }

    .block {
        width: 100%;
        height: 100%;
    }
</style>