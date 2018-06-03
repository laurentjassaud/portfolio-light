<template>
	<div id="app">		
		<Preloader :arrayImg="ArrayImagesForPreloader" :chargementPixi="true"/>
		<header>
            <a @click="returnHome" class="logo lien point devant">
				<div>DMS</div>
			</a>
            <h2 class="nom fil" id="titre">
				<div class="lien">Dark Muses Society</div>
			</h2>
			<a @click="goAbout" class="about-link lien point devant" id="trigger-about">about</a>
			<a href="mailto:mustcelik@gmail.com" class="lien point externe devant" id="contact">contact</a>			         
        </header>
		
		<Menu ref="menu"/>

		<div id="content" ref="content">
			<router-view name="main" :key="$route.fullPath" ref="routerView"/>
		</div>	
	
	</div>
</template>

<script>

	import { Lethargy } from 'lethargy'
	import TweenMax from 'gsap'
	import config from './config.json'
	import { EventBus } from './event-bus.js'
	import { mapGetters, mapActions } from 'vuex'
	import Detector from './utils/Detector'
	import webFontsLoaderTool from './utils/webFontsLoaderTool'
	import Preloader from './components/Preloader'
	import DistortCanvas from './components/Distort-canvas'
	import Menu from './components/Menu'
	import Cover from './components/Cover'
	import About from './components/About-left'

	export default {
		name: 'app',
		data() {
			return {
				ticking: false,
				currentMousePos: {
					x: window.innerWidth / 2,
					y: window.innerHeight / 2
				},
				ArrayImagesForPreloader: [],
				aboutActive: false,
				page: null,
				from: null
			}
		},

		components: {
			Preloader,
			Cover,
			Menu,
			About
		},

		beforeCreate() {
			// load fonts
			webFontsLoaderTool(
				config.families, 
				config.fontAwesome,
				() => {  
					console.log('fonts... ok!') 			
					this.$nextTick(() => EventBus.$emit('FONTS_LOADED'))
				}
			)
		},

		created(){

			// Je ne peux pas utiliser $router
            // car le router-view est conditionnel 

			const path = window.location.pathname
			let pageType = path.split('/')[1]
			this.page = pageType ==='' ? 'home' : pageType
			console.log('this.page :', this.page)

			// si on arrive sur une page type work
			// on definit l'index du work
			if( this.page === 'work') {
				let ref = path.split('/')[2]
				const indice = config.content.findIndex(
                    (element) => {
                        return element.slug === ref
                    }
                )
                console.log(ref)
                console.log('je suis sur', indice)
                this.setCurrentWork(indice)
			}


			// create Lethargy
			this.lethargy = new Lethargy()

			// create Detector
			this.detector = new Detector()
			this.setMobile(this.detector.isMobile())
			console.log('isMobile:',this.isMobile)


			// fletchData
			this.fletchDatas()
		},

		mounted() {			// defini la page de base
			
			console.log('################# APP mounted #################')
			this.init()
			this.addListeners()
		},

        computed: {
        	...mapGetters({
				isFirstLoad: 'isFirstLoad',
				isMobile: 'isMobile',
				isPortrait: 'isPortrait',
				isLandscape: 'isLandscape',
				windowSize: 'windowSize',
				coverWork: 'coverWork',
				currentWork: 'currentWork',
				isMenuOpen: 'isMenuOpen',
				isAnimated: 'isAnimated'
	        })
		},
		
		methods: {       
		
			...mapActions({
				setFirstLoad: 'setFirstLoad',
				setMobile: 'setMobile',
				setPortrait: 'setPortrait',
				setLandscape: 'setLandscape',
				setWindowSize: 'setWindowSize',
				setCoverWork: 'setCoverWork',
				setCurrentWork: 'setCurrentWork'
			}),

			init(){
				this.loadComponent()	
				this.setCoverWork(0)

				// enleve l'effet point pour mobile
				if(this.isMobile){
					const points = document.querySelectorAll('.point')
					Array.from(points).map((x) => x.classList.remove('point'))
				}

			},

			addListeners() {
				window.addEventListener('resize', this.resizeThrottler, false)
				window.addEventListener('orientationchange', this.changeOrientation)
				document.addEventListener('mousemove', (e) => this.positionMouse(e))
				document.addEventListener('wheel', this.scrollThrottler)
				document.addEventListener('mousewheel', this.scrollThrottler)
				document.addEventListener('DOMMouseScroll', this.scrollThrottler)
			},

			resizeThrottler() {
				if (!this.ticking) {
					window.requestAnimationFrame( () => {	
						this.resize()					
						this.ticking = false
					})
				}
				this.ticking = true
			},

            scrollThrottler(e) {						
				if( this.lethargy.check(e) !== false ){
					const delta = (e.deltaY || -e.wheelDelta || e.detail) || 1
					const sens = ( delta > 0 ) ? 'next' : 'prev'
					if(this.page !== 'work'){
						this.$nextTick(() => EventBus.$emit('SCROLL', sens))
					}
				}						
			},

			resize() {
				let size = this.detector.getScreenSize()
				this.$nextTick(() => EventBus.$emit('RESIZE', {
					size: size.w
				}))

				this.setWindowSize(size)
				console.log('size',this.windowSize)
				this.setPortrait(this.detector.isPortrait())
				this.setLandscape(this.detector.isLandscape())

			},	

			changeOrientation() {
				this.resize()
				this.$nextTick(() => EventBus.$emit('CHANGE_ORIENTATION'))			
			},

			loadComponent() {
				// promesse pour les composants
				let PreloaderOK = new Promise( (resolve) => {
					EventBus.$on('IMG_LOADED', () => { resolve(true) })
				})	

				let fontsOK = new Promise( (resolve) => {
					EventBus.$on('FONTS_LOADED', () => { resolve(true) })
				})	

				Promise
					.all( [
						PreloaderOK,
						fontsOK
					])
					.then((result) => {
						//console.log('promesses:', result)
						this.ready()
					})
			},

			positionMouse(event){	
				//console.log('event :', event)				
				this.currentMousePos.x = event.pageX
				this.currentMousePos.y = event.pageY
				//console.log('currentMousePosY =>',this.currentMousePos.y, '<')
				this.$nextTick(() => EventBus.$emit('POSITION_MOUSE', this.currentMousePos))	
			},

			fletchDatas() {
				config.content.map( work =>{
					const refWork = {slug: work.slug, image: work.image}
					this.ArrayImagesForPreloader = [...this.ArrayImagesForPreloader, refWork ]
				})
				config.ambiance.map( work =>{
					const refWork = {slug: work.slug, image: work.image}
					this.ArrayImagesForPreloader = [...this.ArrayImagesForPreloader, refWork ]
				})
				config.slider.map( work =>{
					const refWork = {slug: work.slug, image: work.image}
					this.ArrayImagesForPreloader = [...this.ArrayImagesForPreloader, refWork ]
				})
				console.log(this.ArrayImagesForPreloader)
			},

			ready() {				
				document.getElementById('loader').style.opacity = '0'
				//document.body.className += ' ' + 'home'
				//this.$nextTick(() => EventBus.$emit('ANIME_FILTER', 'home-pixi'))
				if(this.isFirstLoad){
					this.$nextTick(() => EventBus.$emit('GO_INTRO_COVER'))
					this.setFirstLoad(false)
				}
			},

			returnHome() {
				if(this.page !== 'home' ) {
					this.$refs.routerView.outro(true)
				}
				if(this.isMenuOpen){
					this.$refs.menu.afficheMenu()
				}
			},

			setHeaderWhite() {
				TweenMax.to('#titre', 0.3, {opacity: 1, ease: Power2.easeIn})
				const poitsNoir = document.querySelectorAll('.noir').forEach(
					x => x.classList.remove('noir')
				)

			},

			setHeaderBlack() {
				document.querySelectorAll('header, .all_works').forEach(
					x => x.classList.add('noir')
				)				
			},

			gotoWork(work, index, fromMenu) {				

				switch (fromMenu) {	
					case 'cover':
						const elements = document.querySelectorAll('.random')
						const animOut = new TimelineMax()
						animOut
							.staggerTo(elements, 0.3, {
								x: 24 + 'px', 
								opacity: 0, 
								ease:Power2.easeIn
								}, 0.2)
							.call(this.setHeaderBlack)
							.to('#titre', 0.5, {
								opacity: 0, 
								ease:Power2.easeIn
								}, '-=0.6') 
							.to('#content', 0.3, {
								opacity: 0, 
								ease:Power2.easeIn,
								onComplete: () => {
									this.setCurrentWork(index)
									console.log('goto =>', this.currentWork)									
									this.$router.push(work)
								}}, '-=0.2')
						break

					case 'menu':	
						this.$refs.content.style.opacity = '0'							
						this.setCurrentWork(index)
						console.log('goto =>',  this.currentWork)
						this.$router.push(work)			

						break

					case 'next':			
						TweenMax.to('#content', 0.6,{
							opacity: 0,
							ease:Power2.easeIn,
							onComplete: () => {							
								//document.getElementById('titre').style.display = 'none'
								this.setCurrentWork(index)
								console.log('goto =>',  this.currentWork)
								this.$router.push(work)			
							}
						})
						break
				}		
			},

			goAbout() {
				if (this.page !== 'about'){
					const elements = document.querySelectorAll('.random')
					const animOut = new TimelineMax()
					animOut
						.staggerTo(elements, 0.3, {
							x: 24 + 'px', 
							opacity: 0, 
							ease:Power2.easeIn
							}, 0.2)
						.call(this.setHeaderBlack)
						.to('#titre', 0.5, {
							opacity: 0, 
							ease:Power2.easeIn
							}, '-=0.6') 
						.to('#content', 0.3, {
							opacity: 0, 
							ease:Power2.easeIn,
							onComplete: () => {
								//document.getElementById('titre').style.display = 'none'
								console.log('goto => About')
								this.from = this.page
								this.$router.push('/about')
							}})						
				}else{
					this.$refs.routerView.outro()
				}			
			}

		}
	}

</script>


<style lang="scss">
	@import "./assets/css/main";
</style>
