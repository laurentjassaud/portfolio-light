<template>
    <div ref="cover" class="cover">
		<div id="main">
			<div id="num_lettre" @mouseleave="mouseLeave">
				<div class="change_projet" 
					v-for="(titre, index) in content" 
					:key="`first-${index}`" 
					:data-ref="index"
					:class="{current : index === 0, trait_top : index === 0}"
					@mouseover="mouseOver"
					@click="changeProjet"
				>
					<div class="lettre">{{titre.name.charAt(0)}}</div>
				</div>
			</div>
			<div id="social">
				<a target="_blank" href="#" class="point externe">Fb</a>
				<a target="_blank" href="#" class="point externe">In</a>
			</div>
			<section id="inner_col">
				
				<div id="col1">

					<svg width="62px" height="62px" viewBox="0 0 62 62">
						<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
							<g id="Artboard-Copy-5" transform="translate(-329.000000, -269.000000)" stroke="#FFFFFF" stroke-width="2">
								<g id="Group-4" transform="translate(330.000000, 270.000000)">
									<circle id="Oval" opacity="0.2" cx="30" cy="30" r="30"></circle>
								</g>
							</g>
						</g>
					</svg>
					<svg id="cercle_blanc" width="62px" height="62px" viewBox="0 0 62 62" style="stroke-dashoffset:0;">
						<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
							<g id="Artboard-Copy-5" transform="translate(-329.000000, -269.000000)" stroke="#FFFFFF" stroke-width="2">
								<g id="Group-4" transform="translate(330.000000, 270.000000)">
									<circle id="Oval" opacity="0.5" cx="30" cy="30" r="30"></circle>
								</g>
							</g>
						</g>
					</svg>                  
					<div>
						<div class="random" style="opacity: 1; transform: matrix(1, 0, 0, 1, 0, 0);">
							<a class="update_link" @click="gotoWork()">View project</a><br>
						</div>
						<span class="random" id="year" style="opacity: 1; transform: matrix(1, 0, 0, 1, 0, 0);">{{date}}</span>
					</div>
				</div>
				
				<div id="col2">

					<div id="type" class="random" >[ {{referenceFunction}} ]</div>
					
					<div class="update_link inner_h2">
						<h2 id="titre_h2" @click="gotoWork()">
							<span class="random" v-for="titre in referenceTitre" :key="titre">{{titre}}</span>
						</h2>
					</div>
					
					<div id="prev_next">
						<div id="prev" class="to_prev" @click.prevent="prev_slide()">
							<svg width="12px" height="8px" viewBox="0 0 12 8" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
								<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
									<g id="Artboard-Copy-5" transform="translate(-569.000000, -625.000000)" stroke="#FFFFFF" stroke-width="2">
										<g id="Group-6" transform="translate(570.000000, 623.000000)">
											<polyline id="Rectangle-2" transform="translate(4.949747, 8.949747) scale(-1, -1) rotate(-45.000000) translate(-4.949747, -8.949747) " points="8.44974747 12.4497475 1.44974747 12.4497475 1.44974747 5.44974747 1.44974747 5.44974747"></polyline>
										</g>
									</g>
								</g>
							</svg>
						</div>

						<div id="next" class="to_next" @click.prevent="next_slide()">
							<svg width="12px" height="8px" viewBox="0 0 12 8" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
								<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
									<g id="Artboard-Copy-5" transform="translate(-569.000000, -625.000000)" stroke="#FFFFFF" stroke-width="2">
										<g id="Group-6" transform="translate(570.000000, 623.000000)">
											<polyline id="Rectangle-2" transform="translate(4.949747, 8.949747) scale(-1, -1) rotate(-45.000000) translate(-4.949747, -8.949747) " points="8.44974747 12.4497475 1.44974747 12.4497475 1.44974747 5.44974747 1.44974747 5.44974747"></polyline>
										</g>
									</g>
								</g>
							</svg>
						</div>
					</div>

					<div id="num" class="random">
						<span id="slash">/ </span>0<span id="num_projet">{{indexActifWork}}</span><span id="work"> [ work ]</span>
					</div>
					
				</div>
			</section>			
		</div>
		<DistortCanvas :id="'home-pixi'" ref="homePixi"/>	
    </div>
</template>

<script>

    import Hammer from 'hammerjs'
    import config from '../config.json'
    import { mapGetters, mapActions } from 'vuex'
    import TweenMax from 'gsap'
    import { EventBus } from '../event-bus.js'
    import DistortCanvas from './Distort-canvas'
    export default {

        name: 'cover',
        props: {
        },

        data() {
            return { 
            }
        },

		components: {
			DistortCanvas
        },
        
        created() {
            this.$parent.setHeaderWhite()
            document.getElementById('titre').style.display = 'block'	
        },

        mounted() {
			console.log('################# Cover mounted #################')
            this.addListeners()
            if(!this.isFirstLoad) {
                this.init()
            } 
        },
       
        beforeDestroy() {
			EventBus.$off('SCROLL')
			EventBus.$off('GO_INTRO_COVER')   
			console.log('### COVER DESTROYED _____________________________')
        },
        
        computed: {        	
            ...mapGetters({
				coverWork: 'coverWork',
                isAnimated: 'isAnimated',
                isFirstLoad: 'isFirstLoad',
				isMobile: 'isMobile'
			}),
			homePixi() {
				return this.$refs.homePixi
			},			
            indexActifWork() {
                return this.coverWork + 1
			},
			content() {
				return config.content
			},
            referenceFunction() {
                return config.content[this.coverWork].function
            },
            referenceTitre() {
                let refTitre = config.content[this.coverWork].name
                refTitre = refTitre.split(' ')
                return refTitre         
			},
			date() {
				return config.content[this.coverWork].date
			},
			lien() {
				if(config.content[this.coverWork].slug){
					return `work/${config.content[this.coverWork].slug}`
				}else{
					return
				}				
			}            
        },

		methods: {
            ...mapActions({
				setCoverWork: 'setCoverWork',
				setAnimated: 'setAnimated',
				setCurrentWork: 'setCurrentWork'
            }),

            addListeners() {
				EventBus.$on('GO_INTRO_COVER', this.init)
				EventBus.$on('SCROLL', (sens) => this.updateScroll(sens) ) 
			},
			
            init() {
				this.$parent.page = 'home'
				this.intro() 
				if(this.isMobile) {
					this.initMobile()
				}				
            },

            initMobile() {
                let $mc = new Hammer(this.$el)

                $mc.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL })

                $mc.on('swipedown swipeup', (ev) => {
                    switch (ev.type) {
                        case 'swipedown':
							this.prev_slide()
                            break
                        case 'swipeup': 
							this.next_slide()
                            break
                        default:
                            break
                    }
                })
            },

            updateScroll(sens) {
				if(sens==='next') {
					this.next_slide()
				} else {
					this.prev_slide()
				}
            },

            updateTitre(sens, newIndex) {

                const multiplieur = sens === 'prev' ? -1 : 1
				// NB la methode avec Array.from du nodeList, ne marche pas !!!!
				
				// FADE OUT des elements .random
                let randomElements = []
                document.querySelectorAll('.random').forEach(x => randomElements.push(x))                
                randomElements.sort( function() { return Math.random() - .5 })

                TweenMax.staggerTo(randomElements, 0.3, {
                    x: multiplieur * 24 + 'px', 
                    opacity: 0, 
                    ease:Power2.easeIn
                    }, 0.2, () => { transitionOffDone()})

                const transitionOffDone = () => {  

					let randomElements = []   
					
					// définit l'index de la couverture à atteindre
					let refIndex
					if(newIndex === undefined){
						refIndex = this.coverWork + multiplieur
						if(refIndex < 0) {
							refIndex = config.content.length - 1
						}else if(refIndex === config.content.length){
							refIndex = 0
						}
					}else{
						refIndex = newIndex
					}

					// set le nouvelle index
					this.setCoverWork(refIndex)				
					this.$refs.homePixi.changeVisuel(refIndex)   
					this.homePixi.changeVisuel(refIndex)                
					this.changeNavigationAnnexe(refIndex, sens)

                    this.$nextTick(() => {
						this.aminCircle(sens)
                        document.querySelectorAll('.random').forEach(x => randomElements.push(x))    
                        randomElements.sort( function() { return Math.random() - .5 })
                        
                        TweenMax.staggerFromTo(randomElements, 0.3, {
                            x: -multiplieur * 40 + 'px', 
                            opacity: 0
                        }, {
                            x: '0 px', 
                            opacity: 1, 
                            ease:Power1.easeOut                     
                        }, 0.2, () => { 
							this.setAnimated(false)
							console.log(this.isAnimated, 'fin anim #######################################')
							})                      
                    })
                }
			},
			
			aminCircle(sens) {
				TweenMax.to('#cercle_blanc' , 0.9, {
					'stroke-dashoffset' : 195 * ( 1 - (this.indexActifWork / config.content.length) ),
					ease: Power4.easeInOut
				})
			},

            prev_slide() {
                if(this.isAnimated) return
				this.setAnimated(true)
				console.log(this.isAnimated, 'debut anim #######################################')
				this.updateTitre('prev')          
            },

            next_slide() {            
                if(this.isAnimated) return
				this.setAnimated(true)
				console.log(this.isAnimated, 'debut anim #######################################')
				this.updateTitre('next')
			},

			mouseOver(e) {
				this.$nextTick(() => {
					if(document.querySelector('.trait_top')){
						document.querySelector('.trait_top').classList.remove('trait_top')
					}									
					e.target.classList.add('trait_top')
				})
			},

			mouseLeave() {
				this.$nextTick(() => {
					if(document.querySelector('.trait_top')){
						document.querySelector('.trait_top').classList.remove('trait_top')
					}	
					const Elements = document.querySelectorAll('.change_projet')
					Elements[this.coverWork].classList.add('trait_top')
				})
			},

			changeNavigationAnnexe(refIndex, sens) {
				document.querySelector('.trait_top').classList.remove('trait_top')
				const direction = sens === 'next' ? '100%' : '-100%'
				TweenMax.to('.current .lettre', 0.4, {x:direction, clearProps:"x", ease:Power4.easeInOut, onComplete:function(){
					document.querySelector('#num_lettre .current').classList.remove('current')				
					const Elements = document.querySelectorAll('.change_projet')
					Elements[refIndex].classList.add('trait_top')
					Elements[refIndex].classList.add('current')
				}})
			},

			changeProjet(event){
				const element = event.target
				const newIndex = Number(element.dataset.ref)
				if(element.classList.contains('current') || this.isAnimated) return
				this.setAnimated(true)
				console.log(this.isAnimated, 'debut anim #######################################')
				const sens = newIndex > this.coverWork ? 'next' : 'prev'
				this.updateTitre(sens, newIndex)
			},

			gotoWork() {
				this.$parent.gotoWork(this.lien, this.coverWork, 'cover')
			},

			intro() {
				//Animation Intro
				this.setAnimated(true)
				console.log(this.isAnimated, 'debut anim #######################################')
				let randomElements = []
				document.querySelectorAll('.random').forEach(x => randomElements.push(x))    
                randomElements.sort( function() { return Math.random() - .5 })
				
				TweenMax.staggerFrom(randomElements, 0.4, {
						x: -1 * 20 + 'px', 
						opacity: 0,
						ease:Power1.easeOut,
						delay: 0.4  
					}, 0.2, () => { 
						this.setAnimated(false)
						this.aminCircle('next')
						console.log(this.isAnimated, 'fin anim #######################################')
					})
			}
        }
    }

</script>