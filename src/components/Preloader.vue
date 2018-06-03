<template>
    <div id="loader" ref="loader"></div>
</template>

<script>

import { EventBus } from '../event-bus.js'
import { mapGetters, mapActions } from 'vuex'

export default {

    name: 'loader',

    props: ['arrayImg', 'chargementPixi'],

    data() {
        return {
        }
    },

    mounted(){
        console.log('################# Preloader mounted #################')
        this.addListeners()
        this.init()
    },

    computed: {
        ...mapGetters({
            ressources: 'ressources'
        })
    },

    methods: {

        ...mapActions({
            setRessources: 'setRessources'
        }),

        addListeners() {

        },

        init() {
            if(this.chargementPixi !== false) {
                this.chargementMediaPixi()
            }else{
                this.chargementMedia()
            }            
        },

        chargementMediaPixi() {
            // definit le tableau des images à charger 
            // avec la bonne url
            this.loader = new PIXI.loaders.Loader()
            this.arrayImg.forEach( (ref) => {
                let imgSrc = require('../assets/images/' + ref.image)
                this.loader.add( ref.slug, imgSrc )
            })

            this.loader.load( (loader, resources) => {
                this.setRessources(resources)
                console.log(this.ressources)
                this.$nextTick(() => this.imgReady()) 
            } )
        },

        chargementMedia() {
            // definit le tableau des images à charger 
            // avec la bonne url
            this.arrayImg.forEach( (ref) => {
                let img = new Image()
                let media
                media = require.context('../assets/images/', true)
                img.src = media('./' + ref )
                this.arrayFinalImages.push(img)
            })

            // librairie 'imagesLoaded'
            this.imgLoad = imagesLoaded(this.arrayFinalImages)                        
            this.imagesToLoad = this.imgLoad.images.length

            let onProgress = ( instance) => {
                this.progCount = instance.progressedCount         
                if( this.progCount < this.imagesToLoad){
                    console.log(this.progCount, ' image(s) sur ', this.imagesToLoad)
                }else{
                    
                    this.$nextTick(() => this.imgReady())                   
                }                
            }
            this.imgLoad.on( 'progress', onProgress )
        },

        imgReady(){
            console.log('============== FINITO ===================')
            this.$nextTick(() => EventBus.$emit('IMG_LOADED'))
        }
    }
}
</script>

<style lang="scss">

    #loader{
        position: fixed;
        background-color: #fff;
        height: 100vh;
        width: 100vw;
        z-index: 100;
        transition: opacity 1.4s cubic-bezier(0.775, 0.125, 1.000, 0.360); 
        pointer-events: none;
    }

</style>
