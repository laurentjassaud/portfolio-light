<template>
    <div ref="work" class="work">
        <div class="vs-section">        
            <h1 class="random">{{work.name}}</h1>
            <div class="datas">
                <span class="random" >{{work.function}}</span>
                <a target="_blank" class="random externe point noir" href="work.link">
                    Visit the website
                </a>
                <span class="random">{{work.date}}</span>
            </div>
            <div id="cover" class="cover" ref="cover">
                <DistortCanvas :id="'work-pixi'" ref="workPixi"/>	
            </div>        
            <div class="inner_img">
                <div id="les_imgs" class="wrap">
                    <img v-for="(img, index) in images" :src="img" alt="" :key="`img-${index}`">
                </div>
            </div>
            <div id="next_proj">
                <div id="demi_haut">
                    <a id="to_next_proj" class="lien_bas"
                        @mouseleave="animNextOff" 
                        @click="goNext" 
                        @mouseover="animNext"
                    >
                        <div class="affiche affiche-off">                        
                            <span>N</span>
                            <span>e</span>
                            <span>x</span>
                            <span>t</span>
                        </div>
                        <div class="split affiche affiche-on">  
                            {{nextWork.name}}
                        </div>


                    </a>
                    <div id="inner_nom_projet">
                        <span id="nom_projet">
                            <span class="stag">n</span>
                            <span class="stag">e</span>
                            <span class="stag">x</span>
                            <span class="stag">t</span>
                        </span>
                        project
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import { TweenMax, TimelineMax } from 'gsap'
    import Scrollbar, { ScrollbarPlugin }  from 'smooth-scrollbar'
    import config from '../config.json'
    import { mapGetters, mapActions } from 'vuex' 
    import { EventBus } from '../event-bus.js'
    import DistortCanvas from './Distort-canvas'
    import { SplitText } from '../assets/js/SplitText.js'

    export default {

        name: 'work',

        data() {
            return { 
                onAnim: false,
                lastRef: 0,
                animationCover: false
            }
        },

		components: {
            DistortCanvas
        },
        
        created() {
            this.$parent.page = 'work'
            this.$parent.setHeaderBlack()
            document.getElementById('titre').style.display = 'none'		
        },

        mounted() {
            console.log('################# WORK mounted #################')
            this.addListeners()
            if(!this.isFirstLoad) {
                this.init()
            } 
        },
       
        beforeDestroy() {
            EventBus.$off('GO_INTRO_COVER')  
            window.cancelAnimationFrame(this.raf_pixi_single)
            console.log('### WORK DESTROYED _____________________________')
        },
        
        computed: {  
            ...mapGetters({
                currentWork: 'currentWork',
                isFirstLoad: 'isFirstLoad'
            }),
            
            work() {
                return config.content[this.currentWork]
            },

            images() {
                const refVisuels = config.content[this.currentWork].visuels
                console.log(this.currentWork ,'=>', refVisuels)
                const visuelsReturn = []
                const slug = config.content[this.currentWork].slug
                const media = require.context('../assets/images/work/', true)

                refVisuels.forEach( (ref) => {
                    const srcReduite = slug + '/' + ref + '.jpg'
                    const src = media('./' + srcReduite)
                    visuelsReturn.push(src)
                })
                console.log('visuelsReturn', visuelsReturn)
                return visuelsReturn
            },

            nextWork() {
                let refNext = this.currentWork + 1
                refNext === config.content.length ? refNext = 0 : refNext = refNext
                return config.content[refNext]
            }
        },

		methods: {
			...mapActions({
                setCurrentWork: 'setCurrentWork',
                setCoverWork: 'setCoverWork'
            }),

            addListeners() {
				EventBus.$on('GO_INTRO_COVER', this.init)
            },

            init() {
                // GESTION du SCROLL
                this.workScrollBar = Scrollbar.init(
                    document.querySelector('.vs-section'),
                    { 
                        damping: .05
                    }
                )

                this.mySplitLink = new SplitText(".split", {
                    type: "chars",
                    wordsClass: "word word++",
                    charsClass: "char char++",
                    linesClass: "line line++"
                })

                // control l'animation au deplacement de #cover
                this.controlAnimationCover()
                this.intro() 
            },

            intro() {
                const elements = document.querySelectorAll('.random')
                const introAnim = new TimelineMax()
                introAnim
                    .to('#content', 0.3, {
                        opacity: 1, 
                        ease:Power2.easeOut,
                        delay: 0.4
                    })
                    .staggerFrom(elements, 0.3, {
                        x: -12 + 'px', 
                        opacity: 0, 
                        ease:Power2.easeIn
                    }, 0.2) 
                    .from('#cover', 0.3, {
                        opacity: 0, 
                        ease:Power2.easeOut
                    })    
            },

            outro() {
                const elements = document.querySelectorAll('.random')
                const introAnim = new TimelineMax()
                introAnim                    
                    .to('#cover', 0.3, {
                        opacity: 0, 
                        ease:Power2.easeIn
                    })                    
                    .staggerTo(elements, 0.3, {
                        x: 12 + 'px', 
                        opacity: 0, 
                        ease:Power2.easeIn
                    }, 0.2, '-=0.3')   
                    .to('#content', 0.3, {
                        opacity: 0, 
                        ease:Power2.easeIn,
                        onComplete: () => {
                            this.$router.push('/') 
                            this.$parent.setHeaderWhite()                           
                            this.setCurrentWork(null)
                            this.setCoverWork(0)
                            TweenMax.to('#content', 0.6, {
                                opacity: 1, 
                                ease:Power2.easeIn
                            })
                        }
                    }, '-=0.3')
            },

            goNext() {
                let index = this.currentWork + 1
                index === config.content.length ? index = 0 : index = index
                const ref = `/work/${this.nextWork.slug}`
                //this.setCurrentWork(index)
                this.$parent.gotoWork(ref, index, 'next') 
            },

            animNext() {

                if(this.onAnim === false){
                    this.onAnim = true

                    const random = []
                    document.querySelectorAll('.affiche-off span').forEach( x=> random.push(x))
                    random.sort(() => { return 0.5 - Math.random() })

                    TweenMax.staggerTo(random, 0.4, {
                        opacity: 0, 
                        ease: Power2.easeIn
                    }, 0.05, () => { allDoneNext() })

                    TweenMax.to('#inner_nom_projet', 0.4, {x: '+=24px', ease:Power2.easeOut})
                    TweenMax.staggerTo('.stag', 0.4, {opacity: 1, ease: Power2.easeOut}, 0.1)

                    const allDoneNext = () => {

                        const random = []
                        this.mySplitLink.chars.forEach( x=> random.push(x))
                        random.sort(() => { return 0.5 - Math.random() })

                        document.querySelector('.affiche-off').style.display = 'none'
                        document.querySelector('.affiche-on').style.display = 'block'
                        TweenMax.staggerFromTo(random, 0.6,{
                            opacity: 0,
                        }, {
                            opacity: 1,
                            ease: Power2.easeOut
                        }, 0.05)


                    }
                }
            },

            animNextOff() {
                if(this.onAnim === true){
                    this.onAnim = false

                    const random = []
                    this.mySplitLink.chars.forEach( x=> random.push(x))
                    random.sort(() => { return 0.5 - Math.random() })

                    TweenMax.staggerTo(random, 0.4, {
                        opacity: 0, 
                        ease: Power2.easeIn
                    }, 0.05, () => { allDoneNext() })

                    const allDoneNext = () => {

                        const random = []
                        document.querySelectorAll('.affiche-off span').forEach( x=> random.push(x))
                        random.sort(() => { return 0.5 - Math.random() })

                        document.querySelector('.affiche-on').style.display = 'none'
                        document.querySelector('.affiche-off').style.display = 'block'
                        TweenMax.staggerTo(random, 0.6, {
                            opacity: 1,
                            ease: Power2.easeOut
                        }, 0.05)

                        TweenMax.to('#inner_nom_projet', 0.4, {x: '0px', ease:Power2.easeOut})
                        TweenMax.staggerTo('.stag', 0.4, {opacity: 0, ease: Power2.easeOut}, 0.02)
                    }
                }
            },

            controlAnimationCover() {
                
                this.raf_pixi_single = requestAnimationFrame(this.controlAnimationCover)
                const refBottom = this.$refs.cover.getBoundingClientRect().bottom
                
                if(refBottom > 0){
                    if(this.lastRef !== refBottom){
                        if(!this.animationCover){
                            this.animationCover = true
                            this.$refs.workPixi.animateWorkCover()
                        }
                        this.lastRef = refBottom
                    }
                }
            }
        }
    }

</script>

<style lang="scss" scoped>

    .work{
        width: 100vw;
        position: fixed;
        height: 100vh;
        color: #262324;
        overflow: hidden;  
        z-index: 1;        
    }
    .vs-section{
        position: relative;
        overflow-y: scroll;
        width: 100%;
        height: 100%;       
    }
    h1 {
        font: 500 normal 120px/140px 'Pridi';
        padding: 15vw 0 0 26vw;
        margin-left: -5px;
        text-align: left;
    }
    .datas {
        font: 400 normal 13px/28px 'Fira sans';
        padding: 12px 0 5vw  68vw;
        span{
            display: block;
            text-align: left;
            &:last-child {
                margin-top: 28px;
            }
        }
        a{
            display: block;
            text-align: left;           
        }
    }
    .cover {
        height: 57vw;
        display: block;
        //opacity: 0;
        overflow: hidden;
        pointer-events: none;
        background-size: cover !important;
        canvas {
            margin-top: -10px;
        }
    }
    .inner_img {
        background: #f6f6f6;
        padding: 14vw 0 5.5vw 0;
        overflow: hidden;
        .wrap {
            margin: 0 auto;
            width: 62%;
            position: relative;
            -webkit-transform-origin: 50% 50%;
            transform-origin: 50% 50%;
            img {
                display: block;
                width: 100%;
                margin-bottom: 8.5vw;
            }
        }
    }
    #next_proj {
        height: 100vh;
        background: #000;
        #to_next_proj{
            cursor: pointer;
        }
        #demi_haut {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            position: relative;
            flex-direction: column;
            a {                
                .affiche{
                    position: relative;
                    height:120px;
                    font: 500 normal 120px/120px 'Pridi';
                    -webkit-text-stroke: 1px #FFF;
                    color: #000;               
                }

                .affiche-off{
                    z-index: 1;
                }

                .affiche-on{
                    z-index: 2;
                    display: none;
                    div {
                        opacity: 0;
                        height:120px;
                        border: 1px solid yellow;
                    }
                }
            }
            div#inner_nom_projet {
                color: #FFF;
                -webkit-text-stroke: 0px #000;
                font: 400 normal 13px/13px 'Fira sans';
                width: 100%;
                text-align: center;
                padding-top: 2vw;
                &>span {
                    display: inline-block;
                    position: absolute;
                    white-space: nowrap;
                    right: calc(50% + 28px);
                    .stag {
                        opacity: 0;
                    }
                }
            }
        }
    }
</style>