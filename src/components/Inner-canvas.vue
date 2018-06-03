<template>
    <div ref="innerCanvas" id="inner-canvas"></div>
</template>

<script>

    import * as PIXI from 'pixi.js'
    import TweenMax from 'gsap'
    import { EventBus } from '../event-bus.js'
    
    export default {

        name: 'InnerCanvas',
        props: {
            bgImg: {
                default: 'tp-hm2.jpg',
                type: String
            },
            distortImg: {
                default () {
                    return [
                        'distort/gradient4.png', 
                        'distort/gradient_large.png'
                    ]
                },
                type: Array
            }
        },

        data() {
            return { 
                mousePos: {},
                currentMousePos: {},
                ancien_delta: 0,
                attributs: {}
            }
        },
        
        created() {

        },

        mounted() {
            this.init()
            this.addListeners()
        },

        beforeDestroy() {
            if(this.app){
                this.app.destroy(true)
            } 
        },
        
        computed: {
            canvasHolder() {
                return this.$refs.innerCanvas
            }
        },

		methods: {
            init(){
                this.imgSrc = require('../assets/images/' + this.bgImg)
                this.loadImage()
            },

            addListeners() {
                EventBus.$on('RESIZE', this.resizeStage) 
                document.addEventListener("mousemove", (event) => {
                    this.currentMousePos.x = event.pageX
                    this.currentMousePos.y = event.pageY
                })
            },

            loadImage() {
                this.loader = new PIXI.loaders.Loader()
                this.loader.add( 'imgRef', this.imgSrc )
                this.distortImg.map( (img, index) => {
                    let refIndex = index + 1
                    this.loader.add( `distortRef_${refIndex}`, require('../assets/images/' + img) )
                })
                this.loader.load( (loader, resources) => {
                    this.imgRef = resources.imgRef
                    this.distortRef1 = resources.distortRef_1
                    this.distortRef2 = resources.distortRef_2
                    this.createStage()
                    this.createFilter()
                    this.resizeStage()
                    this.animateFilters()
                    this.ready()
                })    
            },

            createStage() {
                
                this.appWidth = this.canvasHolder.offsetWidth
                this.appHeight = this.canvasHolder.offsetHeight

                // céer l'application PIXI
                this.app = new PIXI.Application(this.appWidth, this.appHeight, {transparent: true})
                this.app.clearBeforeRender = true

                // placer l'application dans le containeur
                this.canvasHolder.appendChild(this.app.view)

                // créer l'image de fond
                this.imgBg = PIXI.Sprite.fromImage(this.imgRef.name)
                this.imgBg.anchor.set(0.5)

                // placer l'image de fond dans l'application
                this.app.stage.addChild(this.imgBg)
           
            },

            createFilter() {
                //displacement 1
                this.displacementSprite = PIXI.Sprite.fromImage(this.distortRef1.name) //gradient4_bis //gradient4
                this.displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.CLAMP //REPEAT //  //CLAMP
                this.displacementFilter = new PIXI.filters.DisplacementFilter(this.displacementSprite)

                //settings displacement1
                //intensité
                this.displacementFilter.scale.x = 0
                this.displacementFilter.scale.y = 0
                //centre pour curseur
                this.displacementSprite.pivot.x = 256
                this.displacementSprite.pivot.y = 256
                //echelle x/y
                this.displacementSprite.scale.x = 0.2

                //displacement 2
                this.displacementSprite2 = PIXI.Sprite.fromImage(this.distortRef2.name)
                this.displacementSprite2.texture.baseTexture.wrapMode=PIXI.WRAP_MODES.REPEAT
                this.displacementFilter2 = new PIXI.filters.DisplacementFilter(this.displacementSprite2)

                //settings displacement2
                //intensité
                this.displacementFilter2.scale.x = 0
                this.displacementFilter2.scale.y = 0
                //centre pour curseur
                this.displacementSprite2.pivot.x = 256
                this.displacementSprite2.pivot.y = 256
                //echelle x/y
                this.displacementSprite2.scale.x = 0.8

                this.app.stage.addChild(this.displacementSprite)                
                this.imgBg.filters = [this.displacementFilter, this.displacementFilter2]
            },

            resizeImages() {
                const ratioImgBg = (this.imgRef.data.width / this.imgRef.data.height)  
                const ratioApp = (this.appWidth / this.appHeight)
                    
                if( ratioApp >= ratioImgBg ){
                    this.imgBg.width = this.appWidth + 10
                    const newRatio = this.appWidth / this.imgRef.data.width
                    this.imgBg.scale.y = newRatio
                }else{
                    this.imgBg.height = this.appHeight
                    const newRatio = this.appHeight / this.imgRef.data.height
                    this.imgBg.scale.x = newRatio     
                } 
                this.imgBg.x = this.appWidth / 2
                this.imgBg.y = this.appHeight / 2 
            },

            animateFilters() {
                this.app.ticker.add(() => {


                        this.mousePos.x = this.displacementSprite.x
                        this.mousePos.intensite = this.displacementFilter.scale.x
                        this.mousePos.largeur = this.displacementSprite.scale.x

                        TweenMax.to(this.mousePos, 0.3, {
                            x: this.currentMousePos.x,
                            intensite: (this.currentMousePos.x - this.ancien_delta) * 10,
                            largeur: Math.abs(((this.currentMousePos.x - this.ancien_delta) / 80) - 0.2),
                            ease: Power2.easeOut,
                            onUpdate: () => {
                                this.displacementSprite.x = this.mousePos.x
                                this.displacementFilter.scale.x = this.mousePos.intensite
                                this.displacementSprite.scale.x = this.mousePos.largeur
                            }       
                        })
                        this.ancien_delta = this.currentMousePos.x
                    })

            },

            resizeStage() {
                // définir la nouvelle largeur du containeur
                this.appWidth = this.canvasHolder.offsetWidth
                this.appHeight = this.canvasHolder.offsetHeight
                //const newHeight = Number( this.appWidth * this.imgRatio ).toFixed()

                // retailler l'app
                this.app.renderer.resize(this.appWidth , this.appHeight)

                //postionner l'image de fond 
                this.resizeImages()
            },

            ready() {
                TweenMax.to(this.canvasHolder, 0.6, {opacity: 1, ease: Power2.easeOut})
                this.intro()
                this.$nextTick(() => EventBus.$emit('INNER_CANVAS_LOADED'))
            },
            
            intro(){   
                this.app.stage.removeChild(this.displacementSprite)
                this.app.stage.addChild(this.displacementSprite2)

                this.attributs.intensite = 150
                TweenMax.to(this.attributs, 1.3, {
                    intensite: 0,
                    ease: Power2.easeOut,
                    onUpdate: () => {
                        this.displacementFilter2.scale.x = this.attributs.intensite
                    },
                    onComplete: () => {                        
                        this.app.stage.removeChild(this.displacementSprite2)
                        this.app.stage.addChild(this.displacementSprite)                  
                    }
                })
            }
        }
    }

</script>

<style scoped>

    #inner-canvas{
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: -1;
        opacity: 0;
    }

</style>