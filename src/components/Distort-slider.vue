<template>
    <div ref="distortSlider" id="distort-slider">
        <button class="scene-nav scene-nav--prev" @click="go('previous')">
            <svg id="icon-arrow-nav" viewBox="208.3 352 4.2 6.4" width="100%" height="100%">
				<title>arrow-nav</title>
				<polygon points="212.1,357.3 211.5,358 208.7,355.1 211.5,352.3 212.1,353 209.9,355.1"></polygon>
			</svg>
        </button>
		<button class="scene-nav scene-nav--next" @click="go('next')">
            <svg id="icon-arrow-nav" viewBox="208.3 352 4.2 6.4" width="100%" height="100%">
				<title>arrow-nav</title>
				<polygon points="212.1,357.3 211.5,358 208.7,355.1 211.5,352.3 212.1,353 209.9,355.1"></polygon>
			</svg>
        </button>
    </div>
</template>

<script>

    import * as PIXI from 'pixi.js'
    import { mapGetters, mapActions } from 'vuex'
    import TweenMax from 'gsap'
    import { EventBus } from '../event-bus.js'
    import DistortCanvas from './Distort-canvas'
    export default {

        name: 'distort-slider',

        props: {
            specificsOptions: {
                defaut: {},
                type: Object
            }
        },

        data() {
            return {
                options: {             
                    stageWidth: 1920, 
                    stageHeight: 1080, 
                    pixiSprites: [],
                    centerSprites: false,
                    autoPlay: false,
                    autoPlaySpeed: [20, 20],
                    fullScreen: true,
                    displaceScale: [200, 200],
                    displacementImage: 'clouds',
                    navElement: document.querySelectorAll( '.scene-nav' ),
                    displaceAutoFit: false,
                    wacky: false,
                    interactive: false,
                    interactionEvent: '',
                    displaceScaleTo: [20, 20],
                    textColor: '#DAA520',
                    displacementCenter: false,
                    dispatchPointerOver: false,
                    ...this.specificsOptions
                },
                currentIndex: 0,
                isPlaying: false
            }
        },

		components: {
        },
        
        created() {
        },

        mounted() {
			console.log('################# DISTORT-SLIDER mounted #################')
            this.addListeners()
            if(!this.isFirstLoad) {
                this.init()
            } 
        },
       
        beforeDestroy() {
			EventBus.$off('GO_INTRO_COVER')   
			console.log('### DISTORT-SLIDER DESTROYED _____________________________')
        },
        
        computed: {  
            distortSlider(){
                return this.$refs.distortSlider
            },     	
            ...mapGetters({
                isFirstLoad: 'isFirstLoad',
                ressources: 'ressources'
			})           
        },

		methods: {
            ...mapActions({
                setAnimated: 'setAnimated'
            }),

            addListeners() {
				EventBus.$on('GO_INTRO_COVER', this.init)
			},
			
            init() {
                this.createStage()
                this.createFilter()
                this.animateFilters()				
            },

            createStage() {

                const style = new PIXI.TextStyle({
                    fill: this.options.textColor,
                    wordWrap: true,
                    wordWrapWidth: 800,
                    letterSpacing: 8,
                    fontSize: 72
                })

                // céer l'application PIXI
                this.app                    = new PIXI.Application( this.options.stageWidth, this.options.stageHeight, { transparent: false })
                this.app.clearBeforeRender  = false
                this.slidesContainer        = new PIXI.Container()

                // placer le slider dans l'application
                this.app.stage.addChild(this.slidesContainer)

                if ( this.options.fullScreen === true ) {  
                    this.app.view.style.objectFit = 'cover'
                    this.app.view.style.width     = '100%'
                    this.app.view.style.height    = '100%'        
                    this.app.view.style.position  = 'absolute' 
                    this.app.view.style.top       = '50%'
                    this.app.view.style.left      = '50%'   
                    this.app.view.style.webkitTransform = 'translate( -50%, -50% ) scale(1.2)'          
                    this.app.view.style.transform = 'translate( -50%, -50% ) scale(1.2)'          
                } else {
                    this.app.view.style.maxWidth  = '100%'
                    this.app.view.style.top       = '50%'
                    this.app.view.style.left      = '50%'                   
                    this.app.view.style.position  = 'absolute'  
                    this.app.view.style.webkitTransform = 'translate( -50%, -50% )'           
                    this.app.view.style.transform = 'translate( -50%, -50% )' 
                }

                this.options.pixiSprites.map( ( sprite, index ) => {

                    const texture = new PIXI.Texture.fromImage( this.ressources[sprite.slug].name )
                    const image   = new PIXI.Sprite( texture )

                    if(sprite.name !== '') {
                        const richText = new PIXI.Text( sprite.name, style)
                        image.addChild(richText)
                        richText.anchor.set(0.5)
                        richText.x = this.app.renderer.width / 2
                        richText.y = this.app.renderer.height / 2                     
                    }

                    if ( this.options.centerSprites === true ) {
                        image.anchor.set(0.5)
                        image.x = this.app.renderer.width / 2
                        image.y = this.app.renderer.height / 2           
                    }

                    if ( index !== 0  ) {
                        TweenMax.set( image, { alpha: 0 } )
                    }

                    this.slidesContainer.addChild( image )

                })

                this.slideImages = this.slidesContainer.children

                // placer l'application dans le containeur
                this.distortSlider.appendChild(this.app.view)
        
            },

            createFilter() {
                const slug               = this.options.displacementImage                
                this.displacementSprite  = new PIXI.Sprite.fromImage( this.ressources[slug].name )
                this.displacementFilter  = new PIXI.filters.DisplacementFilter( this.displacementSprite )
                this.displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT
                this.app.stage.filters = [this.displacementFilter]

                if ( this.options.autoPlay === false ) {
                    this.displacementFilter.scale.x = 0
                    this.displacementFilter.scale.y = 0
                }else{
                    this.displacementFilter.scale.x = this.options.displaceScaleTo[0]
                    this.displacementFilter.scale.y = this.options.displaceScaleTo[1]                    
                }
  
                if ( this.options.wacky === true ||  this.options.displacementCenter === true) {
                    this.displacementSprite.anchor.set(0.5)
                    this.displacementSprite.x = this.app.renderer.width / 2
                    this.displacementSprite.y = this.app.renderer.height / 2
                }

                // PIXI tries to fit the filter bounding box to the renderer so we optionally bypass
                this.displacementFilter.autoFit = this.options.displaceAutoFit
                this.app.stage.addChild(this.displacementSprite) 
            },

            animateFilters() {
                if ( this.options.autoPlay === true ) {
                    this.app.ticker.autoStart = this.options.autoPlay
                    this.app.ticker.add( (delta) => {
                        this.displacementSprite.x += (this.options.autoPlaySpeed[0] * delta)
                        this.displacementSprite.y += (this.options.autoPlaySpeed[1] )
                    })
                }   

                if ( this.options.interactive === true ) { 

                    this.app.ticker.add( (delta) => {
                        this.displacementSprite.x += 2 * delta
                        this.displacementSprite.y += 2 * delta
                    })

                    this.slidesContainer.interactive = true
                    this.slidesContainer.buttonMode  = true 

                    if (    this.options.interactionEvent === 'click' || 
                            this.options.interactionEvent === 'both'  )    {
                        
                        this.slidesContainer.pointerdown = ( mouseData ) => {
                            this.mouseX = mouseData.data.global.x
                            this.mouseY = mouseData.data.global.y        
                            TweenMax.to( this.displacementFilter.scale, 1, { 
                                x: '+=' + Math.sin( this.mouseX ) * 200 , 
                                y: '+=' + Math.cos( this.mouseY ) * 200  
                            })
                        }
                        
                        this.slidesContainer.pointerup = ( mouseData ) => {
                            if ( this.options.dispatchPointerOver === true ) {
                                TweenMax.to( this.displacementFilter.scale, 2, { 
                                    x: 0, 
                                    y: 0, 
                                    onComplete: () => {
                                        TweenMax.to( this.displacementFilter.scale, 1, { 
                                            x: 20, 
                                            y: 20  
                                        })     
                                    } 
                                })            
                            } else {
                                TweenMax.to( this.displacementFilter.scale, 2, { 
                                    x: 0, 
                                    y: 0 
                                })                    
                            }
                        }

                        this.slidesContainer.pointerout = ( mouseData ) => {
                            if ( this.options.dispatchPointerOver === true ) {
                                TweenMax.to( this.displacementFilter.scale, 1, { 
                                    x: 0, 
                                    y: 0, 
                                    onComplete: () => {
                                        TweenMax.to( this.displacementFilter.scale, 1, { 
                                            x: 20, 
                                            y: 20  
                                        })        
                                    } 
                                })            
                            } else {
                                TweenMax.to( this.displacementFilter.scale, 1, { 
                                    x: 0, 
                                    y: 0
                                })                      

                            }
                        }
                    }  
                    
                    if ( this.options.interactionEvent === 'hover' || this.options.interactionEvent === 'both'  )  {
                        
                        this.slidesContainer.pointerover = ( mouseData ) => {
                            this.mouseX = mouseData.data.global.x
                            this.mouseY = mouseData.data.global.y   
                            TweenMax.to( this.displacementFilter.scale, 2, { 
                                x: '+=' + Math.sin( this.mouseX ) * 50, 
                                y: '+=' + Math.cos( this.mouseY ) * 50  
                            })
                            this.displacementSprite.rotation += 0.001
                        }  

                        this.slidesContainer.pointerout = ( mouseData ) => {
                            TweenMax.to( this.displacementFilter.scale, 2, { 
                                x: 0, 
                                y: 0 
                            })
                        }    
                    
                    }
                }
            },

            go( direction ) {
                if ( this.isPlaying ) return   
                if ( direction === 'next' ) {
                    if ( this.currentIndex >= 0 && this.currentIndex < this.slideImages.length - 1 ) {
                        this.moveSlider( this.currentIndex + 1 )
                    } else {
                        this.moveSlider( 0 )
                    }
                } else {
                    if ( this.currentIndex > 0 && this.currentIndex < this.slideImages.length ) {
                        this.moveSlider( this.currentIndex - 1 );
                    } else {
                        this.moveSlider( this.slideImages.length - 1 );
                    }                      
                }
            },

            moveSlider(newIndex) {
                this.isPlaying = true

                const baseTimeline = new TimelineMax( { 
                    onComplete:  () => {
                        this.currentIndex = newIndex
                        this.isPlaying = false      
                    }
                })

                baseTimeline.clear()
                this.refSet = 0
                baseTimeline                    
                    .to(this.slideImages[this.currentIndex], 0.5, { 
                        alpha: 0 
                    })
                    .to(this.displacementFilter.scale, 1, { 
                        x: this.options.displaceScale[0], 
                        y: this.options.displaceScale[1],
                        onUpdate: () => {
                            if ( this.options.wacky === true ) {
                                this.refSet = baseTimeline.progress() * 3
                                this.displacementSprite.scale.set(this.refSet)
                                this.displacementSprite.rotation += this.refSet * 0.075
                            }
                        }
                    }, '-=0.5')
                    .to(this.slideImages[newIndex], 0.5, { 
                        alpha: 1 
                    }, '-=0.5')          
                    .to(this.displacementFilter.scale, 1, { 
                        x: this.options.displaceScaleTo[0], 
                        y: this.options.displaceScaleTo[1],
                        onUpdate: () => {
                            if ( this.options.wacky === true ) {
                                this.newRef = 1 / baseTimeline.progress() * 0.6 - 0.6
                                this.displacementSprite.scale.set(this.newRef)
                                this.displacementSprite.rotation -= this.newRef * 0.075
                            }
                        }
                    }, '-=0.5')
            }

        }
    }

</script>

<style lang="scss" scoped>

	#distort-slider {
        position: fixed;
        width: 100vw;
        height: 100vh;
        canvas{
            position: absolute;
            display: block;
        }

        .scene-nav {
            font-size: 1.15em;
            position: absolute;
            top: 50%;
            
            z-index: 10;
            background: none;
            border: 0;         
            -webkit-appearance: button;
            cursor: pointer;
            fill: beige;
            width: 60px;
            height: 60px;
            stroke: #101010;
            stroke-width: 0.25px;
        }
        .scene-nav--prev {
            left: calc(7vw - 16px);
            right: auto;
            transform: translateY(-50%);
        }
        .scene-nav--next {
            left: auto;
            right: calc(7vw - 16px);
            transform: translateY(-50%) rotate(180deg);
        }
	}

</style>