<template>
    <div ref="innerCanvas" :id="id" class="innerCanvas"></div>
</template>

<script>

    import * as PIXI from 'pixi.js'
    import TweenMax from 'gsap'
    import { EventBus } from '../event-bus.js'
    import { mapGetters, mapActions } from 'vuex'
    import config from '../config.json'

    export default {

        name: 'InnerCanvas',
        props: {
            id: {
                default: 'inner-canvas',
                type: String
            },
            intensite: {
                default: 10,
                type: Number      
            },
            baseDistortion: {
                default: 'gradient-4',
                type: String      
            },
            largeur: {
                default: 80,
                type: Number      
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

        computed: {        	
            ...mapGetters({
                currentWork: 'currentWork',
                isFirstLoad: 'isFirstLoad'
			})
        },

        mounted() {
            console.log('################# Distort-canvas:',this.id,' mounted #################')

            this.addListeners()
            /*
            Si c'est la premiére fois que le composant est monté,
            les visuels ne sont peut être pas encore loadés.
            donc on ne lance pas la fonction init
            */
            if(!this.isFirstLoad){
                console.log('new pixi')
                this.$nextTick(() => this.init() )

                
            }
            
        },

        beforeDestroy() {
            console.log(this.id,'DESTROYED _____________________________')
            EventBus.$off('GO_INTRO_COVER')    
            if(this.app){
                this.app.destroy(true)
            } 
        },
        
        computed: {
            ...mapGetters({
                isFirstLoad: 'isFirstLoad',
                ressources: 'ressources',
                isMenuOpen: 'isMenuOpen',
                coverWork: 'coverWork',
                currentWork: 'currentWork'    
            }),
            canvasHolder() {
                return this.$refs.innerCanvas
            }
        },

		methods: {
            
            init(){
                switch (this.id) {
                    case 'menu-pixi':
                        this.indexVisuelMenu = 0
                        break

                    case 'work-pixi':
                        this.indexVisuelMenu = this.currentWork
                        break

                    default:
                        this.indexVisuelMenu = this.coverWork
                }

                this.createStage()
                this.createFilter()
                this.resizeStage()
                this.animateFilters()
                if(this.id === 'home-pixi'){
                    this.intro()
                }                
            },

            addListeners() {
                EventBus.$on('GO_INTRO_COVER', this.init)
                EventBus.$on('RESIZE', this.resizeStage)                 
                EventBus.$on('POSITION_MOUSE', position => this.controlPositionMouse(position))  
                //EventBus.$on('ANIME_FILTER', (ref) => this.startFilter(ref))     
            },

            controlPositionMouse(pos) {
                this.currentMousePos.x = pos.x
                this.currentMousePos.y = pos.y
            },

            createStage() {

                this.appWidth = this.canvasHolder.offsetWidth
                this.appHeight = this.canvasHolder.offsetHeight
                //console.log(this.canvasHolder,':',this.appWidth , 'x', this.appHeight )

                // céer l'application PIXI
                this.app = new PIXI.Application(this.appWidth, this.appHeight, {transparent: false})
                this.app.clearBeforeRender = true

                // placer l'application dans le containeur
                this.canvasHolder.appendChild(this.app.view)

                // créer l'image de fond
                const ref = config.content[this.indexVisuelMenu] 
                this.imgRef = this.ressources[ref.slug]
                this.imgBg = PIXI.Sprite.fromImage(this.imgRef.name)
                this.imgBg.anchor.set(0.5)

                // placer l'image de fond dans l'application
                this.app.stage.addChild(this.imgBg)
           
            },

            createFilter() {
                //displacement 1
                this.refDistort1 = this.ressources[this.baseDistortion]
                this.displacementSprite = PIXI.Sprite.fromImage(this.refDistort1.name) //gradient4_bis //gradient4
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
                this.refDistort2 = this.ressources['gradient-large']
                this.displacementSprite2 = PIXI.Sprite.fromImage(this.refDistort2.name)
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

                    this.animateFilter = TweenMax.to(this.mousePos, 0.3, {
                        x: this.currentMousePos.x,
                        intensite: (this.currentMousePos.x - this.ancien_delta) * this.intensite,
                        largeur: Math.abs(((this.currentMousePos.x - this.ancien_delta) / this.largeur) - 0.2),
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

            intro() {
                setTimeout(() => {
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
                            //if(this.app.stage !== null){
                                this.app.stage.removeChild(this.displacementSprite2)
                                this.app.stage.addChild(this.displacementSprite) 
                            //} 
                        }
                    })
                }, 200)
            },
/*
            startFilter(ref) {
                console.log(this ,'=>', this.app)
                setTimeout(() => {
                    if(ref === this.id && this.app.ticker !== null) {
                        console.log('start ticker =>', this.id)
                        if(this.id === 'menu-pixi'){
                            this.imgBg.filters = []
                            this.app.ticker.start()
                            TweenMax.from(this.canvasHolder, 0.4, {opacity: 0, onComplete: () => {
                                this.imgBg.filters = [this.displacementFilter]                                
                            }})
                            
                        }else{
                            this.app.ticker.start()
                        }                      
                    }else{
                        this.stopFilter() 
                    }
                }, 100)
            },

            stopFilter() {
                //console.log('stop ticker =>',this.app.ticker)
                if(this.app.ticker !== null) {
                    this.app.ticker.stop()
                }
            },
*/
            changeVisuel(index) {
                
                const refIndex = index
                const changementVisuel = () => {

                    this.indexVisuelMenu = refIndex                    

                    if(this.isMenuOpen){
                        TweenMax.killAll()
                    }
                    
                    // créer l'image de fond
                    const ref = config.content[this.indexVisuelMenu] 
                    //console.log(ref)
                    this.imgRef = this.ressources[ref.slug]                   
                    this.imgBg = PIXI.Sprite.fromImage(this.imgRef.name)
                    this.imgBg.anchor.set(0.5)
                    this.imgBg.alpha = 0

                    // placer l'image de fond dans l'application
                    this.app.stage.addChild(this.imgBg)

                    this.createFilter()
                    this.resizeStage()                    

                    this.attributs.alpha = 0
                    this.attributs.intensite = 150
                    const lastChildrenIndex = this.app.stage.children.length - 1

                    TweenMax.to(this.attributs, 0.6, {
                        alpha: 1,
                        intensite: 0,
                        ease: Power2.easeOut,
                        onUpdate: () => {
                            this.displacementFilter2.scale.x = this.attributs.intensite
                            this.imgBg.alpha = this.attributs.alpha
                        },
                        onComplete: () => {
                            this.app.stage.removeChildren(0,lastChildrenIndex-1)                    
                        }                      
                    }) 
                }

                if(refIndex !== this.indexVisuelMenu) {
                    changementVisuel()
                }               
                
            }
        }
    }

</script>
<style lang="scss">
    .innerCanvas{
        width: 100%;
        height: 100%;
    }
</style>