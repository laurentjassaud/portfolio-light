<template>
    <div ref="menuPrincipal" id="menu-principal">
        <div class="all_works point devant" @click.prevent="afficheMenu()">
            <span>All Works</span>
            <div class="trait1" style="transform: matrix(1, 0, 0, 1, 0, 0);"></div>
            <div class="trait2"></div>
        </div>
        <nav id="menu-nav">
            <div id="le_menu">
                <ol>
                    <li v-for="(element, index) in content" :key="element.slug">
                        <a @click="gotoWork(element,index)" class="lien">{{element.name}}</a>
                    </li>
                </ol>
            </div>
            <a class="lien" id="contener_pixi" v-if="!isMobile">
                <DistortCanvas 
                    :id="'menu-pixi'" 
                    :baseDistortion="'gradient-large'"
                    :intensite="0.75"
                    :largeur="6"
                    ref="menuPixi"
                />
            </a>
        </nav>
    </div>
</template>

<script>

    import config from '../config.json'
    import { mapGetters, mapActions } from 'vuex'
    import TweenMax from 'gsap'
    import { EventBus } from '../event-bus.js'
    import DistortCanvas from './Distort-canvas'
    export default {

        name: 'menuPrincipal',
        props: {
        },

        data() {
            return { 
                menuOpen: false,
                content: config.content
            }
        },

		components: {
			DistortCanvas
        },
        
        created() {
        },

        mounted() {
            console.log('################# Menu mounted #################')
            this.init()
            this.addListeners()
        },
       
        beforeDestroy() {
            //EventBus.$off('POSITION_MOUSE') 
        },
        
        computed: {        	
            ...mapGetters({
                coverWork: 'coverWork',
                isMenuOpen: 'isMenuOpen',
                isAnimated: 'isAnimated',
                currentWork: 'currentWork',
                isMobile: 'isMobile'
	        }),
            menuPrincipal() {
                return this.$refs.menuPrincipal
            }
        },

		methods: {

			...mapActions({
                setAnimated: 'setAnimated',
                setMenuOpen: 'setMenuOpen',
                setCoverWork: 'setCoverWork',
                setCurrentWork: 'setCurrentWork'
            }),
            
            init() {
                this.createListLinkHover()
                if(this.isMobile) {
                    document.getElementById('menu-nav').style.height = '100vh'
                    document.getElementById('menu-nav').style.overflowY = 'scroll'

                }
            },

            addListeners() {
                EventBus.$on('POSITION_MOUSE', (pos) => this.deplaceMenu(pos) ) 
                //EventBus.$on('RESIZE', this.resizeStage) 
            },

            deplaceMenu(currentMousePos) {

               if(this.isMenuOpen && !this.isMobile){
                   
                    //console.log('deplacement', currentMousePos)
                    const hauteur_menu = document.getElementById('le_menu').clientHeight                 
                    const expression = -1 * (hauteur_menu - window.innerHeight) / window.innerHeight * currentMousePos.y
                    const positionMenuY = document.getElementById('le_menu').getBoundingClientRect().top

                    let ecart = Math.abs( expression / positionMenuY )                    
                    if( ecart < 1 ){
                        ecart = 1 - ecart + 1
                    }
                    if ( ecart > 1.15 ){
                        ecart = 1.15
                    }
                    const ecartPositionMenu = ecart

                    TweenMax.to('#le_menu', 1.4, {
                        y: expression + 'px',
                        ease: Power2.easeOut
                    })

                    TweenMax.to('#le_menu ol', 0.7, {
                        scaleY: ecartPositionMenu,
                        ease: Power0.easeNone
                    })

                    TweenMax.to('#le_menu ol', 0.7, {
                        scaleY: 1,
                        ease: Power0.easeNone,
                        delay: 0.7
                    })
                }               
            },

            fixeMenu(currentMousePos) {
                const hauteur_menu = document.getElementById('le_menu').clientHeight                 
                const expression = -1 * (hauteur_menu - window.innerHeight) / window.innerHeight * currentMousePos.y
                TweenMax.set('#le_menu', {
                    y: expression + 'px'
                })
            },

            afficheMenu() {

                if(!this.isMenuOpen){
                    console.log('ouverture MENU')
                    //this.$nextTick(() => EventBus.$emit('ANIME_FILTER', 'menu-pixi'))

                    document.getElementById('menu-principal').style.pointerEvents = 'auto'
                    TweenMax.to('#contact, #titre, #trigger-about', 0.2, {opacity: 0, ease: Power2.easeIn})
                    this.$parent.setHeaderBlack()

                    // init menu element
                    if(document.querySelector('li.actif')){
                        document.querySelector('li.actif').classList.remove('actif')                        
                    }
                    document.querySelector('#le_menu li').classList.add('actif') 

                    if(!this.isMobile) {
                        this.$refs.menuPixi.changeVisuel(0)  
                    }                     
                    
                    const currentMousePos = {}
                    currentMousePos.x = event.pageX
                    currentMousePos.y = event.pageY
                    console.log('currentMousePos:' ,currentMousePos)
                    this.fixeMenu(currentMousePos)
                    /*
                    document.getElementById('contact').style.display = 'none'
                    document.getElementById('trigger-about').style.display = 'none'
                    document.getElementById('titre').style.display = 'none' 
                    */                    
                    /*
                    document.querySelectorAll('.all_works').forEach(
                        x => x.classList.add('actif')
                    )
                    */
                    //if( this.currentWork === null){
                        
                    //}

                    TweenMax.to('.trait1', 0.2, {scaleY:0, delay:0.2, ease: Power2.easeIn})
                    document.getElementById('menu-nav').style.display = 'block'
                    TweenMax.to('#menu-nav', 0.2, {opacity:1, delay:0.2, ease: Power2.easeOut, onComplete: () => {
                        this.setMenuOpen(true)
                        
                        /*this.setAnimated(false)
                        console.log(this.isAnimated, 'fin anim #######################################')*/
                    }})

                }else{
                    console.log('fermeture MENU')
                    //if(this.isAnimated) return
                    /*this.setAnimated(true)
                    console.log(this.isAnimated, 'debut anim #######################################')*/
                    this.setMenuOpen(false)
                    /*
                    document.querySelectorAll('.all_works').forEach(
                        x=> x.classList.remove('actif')
                    ) 
                    */ 
    
                    if( this.$parent.page === 'home'){                 
                        this.$parent.setHeaderWhite()
                    }
                    TweenMax.to('#contact, #titre, #trigger-about', 0.2, {opacity: 1, ease: Power2.easeIn})
                    TweenMax.to('.trait1', 0.2, {scaleY:1, delay:0.2, ease: Power2.easeIn, onComplete: () =>{
                        document.getElementById('menu-principal').style.pointerEvents = 'none'
                        /*document.getElementById('contact').style.display = 'block'
                        document.getElementById('trigger-about').style.display = 'block'
                        document.getElementById('titre').style.display = 'block'*/
                        
                    }})
                    
                    TweenMax.to('#menu-nav', 0.2, {opacity: 0, ease: Power2.easeOut, onComplete: () => {
                        /*this.setAnimated(false)
                        console.log(this.isAnimated, 'fin anim #######################################')*/
                    }})                   
                    
                    //this.$nextTick(() => EventBus.$emit('ANIME_FILTER', 'home-pixi'))
                }

            },

            createListLinkHover() {
                this.elementsList = document.querySelectorAll('ol li')
                this.elementsList[this.coverWork].classList.add('actif')
                Array.from(this.elementsList).map( (element, index) => {
                    element.addEventListener("mouseover", () => {
                        if(document.querySelector('li.actif')){
                            document.querySelector('li.actif').classList.remove('actif')
                        }                        
                        element.classList.add('actif')
                        this.$refs.menuPixi.changeVisuel(index)                        
                    })                    
                })
            },

            gotoWork(element, index) {
                if (index !== this.currentWork) {
                    const ref = `/work/${element.slug}`
                    this.afficheMenu() 
                    this.$parent.gotoWork(ref, index, 'menu')                    
                }else{
                    this.afficheMenu()
                }
            }
        }
    }

</script>
