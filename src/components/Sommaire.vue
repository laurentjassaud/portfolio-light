<template>
    <div ref="sommaire" id="sommaire">
        <DistortSlider ref="distortSlider" :specificsOptions="sliderOptions"/>
    </div>
</template>

<script>

    import config from '../config.json'
    import { mapGetters, mapActions } from 'vuex'
    import { EventBus } from '../event-bus.js'
    import DistortSlider from './Distort-slider'
    export default {

        name: 'sommaire',

        data() {
            return {
                sliderOptions: {
                    pixiSprites: config.slider,
                    displacementImage: 'clouds',
                    autoPlay: false,
                    centerSprites: false,
                    autoPlaySpeed: [2,2],
                    displaceScaleTo: [4,4],
                    displaceScale: [500,500],
                    interactive: true,
                    interactionEvent: 'both',
                    dispatchPointerOver: true
                }
            }
        },

		components: {
			DistortSlider
        },
        
        created() {
            document.querySelector('header').style.display = 'none'
        },

        mounted() {
			console.log('################# SOMMAIRE mounted #################')
            this.addListeners()
            if(!this.isFirstLoad) {
                this.init()
            } 
        },
       
        beforeDestroy() {
			EventBus.$off('GO_INTRO_COVER')   
			console.log('### SOMMAIRE DESTROYED _____________________________')
        },
        
        computed: {  
            sommaire(){
                return this.$refs.sommaire
            }        
        },

		methods: {
            ...mapActions({
                setAnimated: 'setAnimated'
            }),

            addListeners() {
				EventBus.$on('GO_INTRO_COVER', this.init)
			},
			
            init() {
                this.$parent.page = 'sommaire'
				this.intro() 				
            },

			intro() {
				//Animation Intro
				this.setAnimated(true)
				console.log(this.isAnimated, 'debut anim #######################################')

				
                this.setAnimated(false)
                console.log(this.isAnimated, 'fin anim #######################################')

            }
        }
    }

</script>

<style lang="scss" scoped>
</style>