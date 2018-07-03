
new Vue({
    el: '#main',
    data: {
        winner: null,
        playerStrikes: 0,
        playerLife: 100,
        playerDamage: false,
        monsterLife: 100,
        monsterDamage: false,
        specialDisabled: false,
        damageTimer: null,
        msgs: ['New Game !']
    },
    methods: {
        specialAttack: function() {
            var damage = this.randomNum(20)
            this.msgs.unshift('Player: Special Attack ! - ' + damage + ' DAMAGE !')
            var vm = this
            this.specialDisabled = true
            this.monsterLife -= damage
            setTimeout(function(){vm.specialDisabled = false},3000)
        },
        heal: function() {
            var health = this.randomNum(10)
            this.msgs.unshift('Player: Healed ! + ' + health + ' Health !')
            this.playerLife += health
        },
        playerAttack: function(n) {
            var damage = this.randomNum(10)
            this.msgs.unshift('Player: Attack ! - ' + damage + ' DAMAGE !')
            this.playerStrikes++
            this.monsterLife -= damage
        },
        monsterAttack: function() {
            var damage = this.randomNum(10)
            this.msgs.unshift('Monster: Attack ! - ' + damage + ' DAMAGE !')
            this.playerLife -= damage
        },
        randomNum: function(n){
            return Math.round(Math.random()*n)
        },
        resetGame: function() {
            clearInterval(this.damageTimer)
            this.playerStrikes = 0
            this.playerLife = 100
            this.monsterLife = 100
            this.specialDisabled = false
            this.winner = null
            this.msgs = ['New Game !']
        }
    },
    computed: {

    },
    watch: {
        playerLife: function(){
            if (this.playerLife < 0) {
                this.playerLife = 0
                this.winner = 'monster'
            }

        },
        monsterLife: function(){
            if (this.monsterLife < 0) {
                this.monsterLife = 0
                this.winner = 'player'
            }
        },
        playerStrikes: function(){
            if (this.playerStrikes === 1) { this.damageTimer = setInterval(this.monsterAttack,1000) }
        },
        winner: function() {
            if(this.winner){ clearInterval(this.damageTimer) }
        }
    }
})