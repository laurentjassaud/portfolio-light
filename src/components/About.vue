<template>
    <div ref="about" class="about">
        <div class="lien point externe" id="about-link" ref="openLink" @click.prevent="afficheAbout()">About &amp; Kontact</div>
        <div class="aboutInner">

            <div class="aboutRightBg"></div>

            <div class="close">
                <div class="closeLine1"></div>
                <div class="closeLine2"></div>
            </div>

            <div class="close2" @mouseenter="tlHoverX" @mouseleave="tlHoverXreverse" @click.prevent="afficheAbout()">
                <div class="close2inner">
                    <div class="closeLine3"></div>
                    <div class="closeLine4"></div>
                </div>

            </div>

            <div class="aboutBgCropper">
                <div class="aboutBg">
                    <img class="aboutPictureLeft" src="../assets/images/about_pic_90.jpg" alt="">
                </div>
            </div>

            <div class="aboutTextAreaOuter">
                <div class="aboutTextAreaInner">

                    <div class="aboutBgCropperMobile">
                        <div class="aboutBgMobile">
                            <img class="aboutPictureLeftMobile" src="../assets/images/about_pic_90.jpg" alt="">
                        </div>
                    </div>

                    <div class="aboutTextArea">
                        <div class="text">
                        Walter Spatzek. 40 Jahre Berufsfotograf. Pionier der digitalen Fotografie in Österreich. 17 Jahre Lehrtätigkeit in Fotografie &amp; 
                        digitalen Medien. Bildbearbeitung auf höchstem Niveau. Fotorealismus mit 3D Design. Spezialisiert auf Architektur- 
                        und Produktfotografie. Innovativ und immer bereit für neue Ideen.
                        </div>
                        <div class="subtext">
                            Künstlerische Geschicklichkeit, gelernt in einer Zeit vor digitaler Bildbearbeitung, zeichnet Walter Spatzek's Bilder aus. 
                            Die analoge Fotografie der damaligen Zeit erforderte überlegtes Handeln sowie aufwändiges Arrangieren vor der finalen 
                            Bildererfassung. Nachträgliche Korrekturen waren nur mit eingeschränkten Mitteln wie Pinsel, Farbe oder Techniken der 
                            Druckvorstufe möglich. Nachfolgend einige Auszüge aus den Werken dieser Ära aufgenommen mit Kodak Ektrachrome auf 13x18cm 
                            Planfilm mit Großformat-Kamera SINAR P2:
                        </div>
                        <div class="pic_container">
                            <div class="pic1 picStagger">
                                <!-- <div class="pic1"> -->
                                    <img class="picimg" src="../assets/images/zahnraeder_frame.png" alt="analog">
                                    <p class="picDescr">Herbstmotiv der Bilderserie "Farben des Jahres 1995". Requisiten: mit Schleifpapier 
                                        behandelte Zahnräder, rostige Stahlplatte, Herbstblätter und gemalte Wolken.
                                    <br/> <span class="analogYear">„Gequälte Natur“ - 1994</span></p>
                                <!-- </div> -->
                            </div>
                            <div class="pic2 picStagger">
                                <!-- <div class="pic2"> -->
                                    <img class="picimg" src="../assets/images/salamander_frame.png" alt="analog">
                                    <p class="picDescr">Frühlingsmotiv "Farben des Jahres 1995". Requisiten: Grasmatte, Farbstift &amp; Lack, 
                                        Blatt vom Botanischen Garten und Schmuck-Echse vom Juwelier.
                                    <br/> <span class="analogYear">„Getäuschte Echse“ - 1994</span></p>
                                <!-- </div> -->
                            </div>
                            <div class="pic3 picStagger">
                                <!-- <div class="pic3"> -->
                                    <img class="picimg" src="../assets/images/buntstifte_frame.png" alt="analog">
                                    <p class="picDescr">Sommermotiv dieser Bilderserie. Requisiten: Aquarium mit türkis Folie &amp; Wasser, 
                                        Buntstifte &amp; Superkleber, Spielzeug-Aussenbord Motor und Spritzpistole; Geduld beim hineinwerfen der 
                                        Stiftteile und Glück mit nur 3 Belichtungen!
                                    <br/> <span class="analogYear">„Wilde Floßfahrt“ - 1994</span></p>
                                <!-- </div> -->
                            </div>
                            <div class="pic4 picStagger">
                                <!-- <div class="pic1"> -->
                                    <img class="picimg" src="../assets/images/uhr_frame.png" alt="analog">
                                    <p class="picDescr">Auftragsarbeit für Buchtitel des internationalen Business-Bestsellers TIME MANAGEMENT. 
                                        Airbrush Arbeit auf Holz 80x50 cm mit ca. 35 Folienmaskierungen, mit Skalpell geschnitten. Anschließende 
                                        Reprofotografie auf 4x5 inch Planfilm.
                                    <br/> <span class="analogYear">„Zerrinnende Zeit“ - 1985</span></p>
                                <!-- </div> -->
                            </div>
                            <div class="pic5 picStagger">
                                <!-- <div class="pic2"> -->
                                    <img class="picimg" src="../assets/images/pulli_frame.png" alt="analog">
                                    <p class="picDescr">Auftragsarbeit Quelle-Katalog. Requisiten: Sehr weiche, unsichtbare Materialien, 
                                        die den Pullis Volumen und Anmutung verleihen. Spezielle Lichtquellen mit Türspalt-Charakter und Parabolspiegeln 
                                        sorgen für stimmungsvolles Licht.
                                    <br/> <span class="analogYear">„Pullover Set“ - 1996</span></p>
                                <!-- </div> -->
                            </div>
                        </div>

                        <div class="impressum_mobile">
                            <p class="h stagger">Kontakt &amp;<br/>Impressum</p>

                            <p class="t">
                                <span class="stagger">Walter Spatzek<br/></span>
                                <span class="stagger">Fotografische Manufaktur<br></span>
                                <span class="stagger">Siriusweg 14, 4030 Linz<br></span>
                                <span class="stagger">0664 1007343<br></span>
                                <span class="stagger"><a href="mailto:office@fotospatzek.at" target="blank">office@fotospatzek.at</a><br></span>
                                <span class="stagger"><a href="https://www.linkedin.com/in/walter-spatzek-21238559/" target="_blank">LinkedIn</a><br></span>
                                <span class="stagger">&nbsp;<br></span>
                                <span class="stagger">FN 415282<br></span>
                                <span class="stagger">Landesgericht Linz<br></span>
                                <span class="stagger">UID-Nr.: ATU68611433<br></span>
                            </p>
                        </div>


                        <div class="disclaimer">
                            <p class="createdBy">Webdesign &amp; Development by <a href="http://www.danielspatzek.com" target="blank" class="dsp">Daniel Spatzek</a></p>
                            <div class="breakLine"></div>
                            <p class="disclaimerHeadline">Google Analytics Disclaimer</p>
                            <p class="disclaimerText">This website uses Google Analytics, a web analytics service provided by Google, Inc. ("Google"). Google Analytics uses "cookies", which are text files placed on your computer to help the website analyse how visitors use the site. The information generated by the cookie about your use of the website (including your IP address) will be transmitted to and stored by Google on servers in the United States . Google will use this information for the purpose of evaluating your use of the website, compiling reports on website activity for website operators and providing other services relating to website activity and internet usage. Google may also transfer this information to third parties where required to do so by law, or where such third parties process the information on Google's behalf. Google will not associate your IP address with any other data held by Google. You may refuse the use of cookies by selecting the appropriate settings on your browser, however please note that if you do this you may not be able to use the full functionality of this website. By using this website, you consent to the processing of data about you by Google in the manner and for the purposes set out above.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="impressum">
                <p class="contactText">
                    <span class="stagger">Siriusweg 14, 4030 Linz<br></span>
                    <span class="stagger">0664 1007343<br></span>
                    <span class="stagger"><a href="mailto:office@fotospatzek.at" target="blank">office@fotospatzek.at</a><br></span>
                    <span class="stagger"><a href="https://www.linkedin.com/in/walter-spatzek-21238559/" target="_blank">LinkedIn</a><br></span>
                </p>

                <p class="legalText">
                    <span class="stagger">&nbsp;<br></span>
                    <span class="stagger">FN 415282<br></span>
                    <span class="stagger">Landesgericht Linz<br></span>
                    <span class="stagger">UID-Nr.: ATU68611433<br></span>
                </p>
            </div>

        </div>
    </div>
</template>

<script>

    import { TweenMax, TimelineMax } from 'gsap'
    import Scrollbar from 'smooth-scrollbar'
    import ScrollMagic from 'scrollmagic'
    import { setTween } from 'imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js'
    import { addIndicators } from 'imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js'
    import { SplitText } from '../assets/js/SplitText.js'
    import config from '../config.json'
    import { mapGetters, mapActions } from 'vuex' 
    import { EventBus } from '../event-bus.js'

    export default {

        name: 'about',

        data() {
            return { 
                aboutOpen: false,
            }
        },

		components: {
        },
        
        created() {
        },

        mounted() {

            console.log('init about')

            this.scrollbarAbout = Scrollbar.init(
                document.querySelector('.aboutTextAreaInner'),
                { damping: .08 }
            )

            this.mySplitText2 = new SplitText(".subtext", {
                type: "words",
                wordsClass: "word word++",
                charsClass: "char char++",
                linesClass: "line line++"
            })

            this.mySplitText = new SplitText(".text", {
                type: "words",
                wordsClass: "word word++",
                charsClass: "char char++",
                linesClass: "line line++"
            })
 
            this.scrollMagicController = new ScrollMagic.Controller()

            this.scene1 = (new ScrollMagic.Scene({
                    triggerElement: ".disclaimer",
                    triggerHook: 0.75,
                    duration: 270
                }))
                .setClassToggle('.disclaimer', 'active')
                .addTo(this.scrollMagicController )

            let actionOnScroll = document.querySelectorAll('.picStagger')
            Array.from(actionOnScroll).forEach( (el) => {
                let scene = new ScrollMagic.Scene({
                    triggerHook: 0.5,
                    triggerElement: el,
                    duration: '100%'
                })  
                .setClassToggle(el, 'active')
                .addTo(this.scrollMagicController )          
            })
            
        },
       
        beforeDestroy() {
        },
        
        computed: {  
        },

		methods: {

            afficheAbout() {
                if(this.moving) return
                this.moving = true
                const timeLine = new TimelineMax({
                    pause: !0
                })
                const refWords = document.querySelectorAll('.text .word')

                if(!this.aboutOpen){
                    this.aboutOpen = true
                    this.$refs.openLink.style.display = 'none'
                    this.$refs.about.style.pointerEvents = 'auto'
                    timeLine
                        .to(".aboutInner", 0, {
                            opacity: 1, 
                            ease: Power2.easeOut
                        })                        
                        .fromTo(".aboutRightBg", 1, {
                            scaleX: 0
                        }, {
                            scaleX: 1,
                            ease: Power2.easeOut
                        }, 0)
                        .fromTo(".aboutTextAreaOuter", .2, {
                            opacity: 0
                        }, {
                            opacity: 1,
                            ease: Power0.easeOut
                        })
                        .fromTo(".aboutBg", 1.6, {
                            x: "100%"
                        }, {
                            x: "0%",
                            ease: Power3.easeOut
                        }, .7)
                        .fromTo(".aboutBgCropper", 1.6, {
                            x: "10%"
                        }, {
                            x: "0%",
                            ease: Power1.easeOut
                        }, .7)
                        .fromTo(".aboutPictureLeft", 1.8, {
                            opacity: 0
                        }, {
                            opacity: 1,
                            ease: Power1.easeOut
                        }, 1.3)
                        .staggerFromTo(refWords, .5, {
                            opacity: 0,
                            x: 20,
                            y: 30,
                            rotationX: -50,
                            rotationY: 0,
                            rotationZ: 5,
                            transformOrigin: "50% 50%"
                        }, {
                            opacity: 1,
                            x: 0,
                            y: 0,
                            rotationX: 0,
                            rotationY: 0,
                            rotationZ: 0,
                            ease: Power2.easeOut
                        }, .02, .4)
                        .fromTo(".closeLine1", .4, {
                            scaleX: 0
                        }, {
                            scaleX: 1,
                            ease: Power2.easeOut
                        }, .7)
                        .fromTo(".closeLine2", .4, {
                            scaleY: 0
                        }, {
                            scaleY: 1,
                            ease: Power2.easeOut
                        }, .9)
                        .staggerFromTo(".subtext .word", .5, {
                            opacity: 0,
                            y: -20,
                            x: 0
                        }, {
                            opacity: 1,
                            y: 0,
                            x: 0,
                            ease: Power2.easeOut
                        }, .01, 1)
                        .staggerFromTo(".contactText .stagger", .5, {
                            opacity: 0,
                            top: 20
                        }, {
                            opacity: 1,
                            top: 0,
                            ease: Power2.easeOut
                        }, .02, 1.4)
                        .staggerFromTo(".legalText .stagger", .5, {
                            opacity: 0,
                            top: 20
                        }, {
                            opacity: 1,
                            top: 0,
                            ease: Power2.easeOut,
                            onComplete: () => {
                                this.moving = false
                            }
                        }, .02, 1.5)
                } else {
                timeLine

                    .staggerFromTo(".contactText .stagger", .3, {
                            opacity: 1
                        }, {
                            opacity: 0,
                            ease: Power2.easeOut
                        }, 0, 0)
                    .staggerFromTo(".legalText .stagger", .3, {
                            opacity: 1
                        }, {
                            opacity: 0,
                            ease: Power2.easeOut
                        }, 0, 0)
                    .staggerFromTo(".subtext .word", .3, {
                            opacity: 1,
                            x: 0,
                            y: 0
                        }, {
                            opacity: 0,
                            x: 40,
                            y: 0,
                            ease: Power2.easeOut
                        }, .005, 0)

                    .fromTo(".closeLine2, .closeLine4", .4, {
                            scaleY: 1
                        }, {
                            scaleY: 0,
                            ease: Power2.easeOut
                        }, 0)
                    .fromTo(".closeLine1, .closeLine3", .4, {
                            scaleX: 1
                        }, {
                            scaleX: 0,
                            ease: Power2.easeOut
                        }, 0)
                    .staggerFromTo(refWords, .3, {
                        opacity: 1,
                        x: 0,
                        y: 0,
                        rotationX: 0,
                        rotationY: 0,
                        rotationZ: 0,
                        transformOrigin: "50% 50%"
                    }, {
                        opacity: 0,
                        x: 20,
                        y: -30,
                        rotationX: 60,
                        rotationY: 0,
                        rotationZ: 5,
                        ease: Power2.easeOut
                    }, .005, 0)
                    .fromTo(".aboutPictureLeft", .1, {
                            opacity: 1
                        }, {
                            opacity: 0,
                            ease: Power0.easeOut
                        }, 0)
                    .fromTo(".aboutBgCropper", .5, {
                            x: "0%"
                        }, {
                            x: "10%",
                            ease: Power1.easeOut
                        }, 0)
                    .fromTo(".aboutBg", .6, {
                            x: "0%"
                        }, {
                            x: "100%",
                            ease: Power1.easeOut
                        }, 0)
                    .fromTo(".aboutRightBg", 1, {
                            scaleX: 1
                        }, {
                            scaleX: 0,
                            ease: Power3.easeOut
                        }, .5)
                    .fromTo(".aboutTextAreaOuter", .2, {
                            opacity: 1
                        }, {
                            opacity: 0,
                            ease: Power0.easeOut
                        }, .6) 
                    .to(".aboutInner", 0, {
                        opacity: 0,
                        onComplete: () => {
                            this.aboutOpen = false
                            this.$refs.about.style.pointerEvents = 'none'
                            this.$refs.openLink.style.display = 'block'
                            this.moving = false
                        }
                    })
                }

            },

            tlHoverX() {
                this.tl_HoverX = new TimelineMax({
                    paused: !0
                })
                this.tl_HoverXreverse = new TimelineMax({
                    paused: !0
                })
                this.tl_HoverX
                .set(".close2", {
                    opacity: 1
                })
                .fromTo(".closeLine3", .5, {
                    scaleX: 0
                }, {
                    scaleX: 1,
                    ease: Power1.easeOut
                })
                .fromTo(".closeLine4", .5, {
                    scaleY: 0
                }, {
                    scaleY: 1,
                    ease: Power1.easeOut
                }, .2)
                this.tl_HoverXreverse.kill()
                this.tl_HoverX.play()
            },

            tlHoverXreverse() {

                this.tl_HoverXreverse
                .fromTo(".closeLine3", .5, {
                    scaleX: 1
                }, {
                    scaleX: 0,
                    ease: Power2.easeOut
                })
                .fromTo(".closeLine4", .5, {
                    scaleY: 1
                }, {
                    scaleY: 0,
                    ease: Power2.easeOut
                }, .2)
                this.tl_HoverX.kill()
                this.tl_HoverXreverse.play()
            }
        }
    }

</script>

<style lang="scss" scoped>
.about{
    position: absolute;
    display: block;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vh;
    z-index: 120;
    user-select: none;
    pointer-events: none;
    #about-link {
        top: 50vh;
        right: calc(4vw - 16px);
        -webkit-transform: rotate(90deg);
        transform: rotate(90deg);
        -webkit-transform-origin: 50% 0%;
        transform-origin: 50% 0%;    
        font: 400 normal 13px/13px 'fira sans';
        position: fixed;
        padding: 6px;
        z-index: 13;
        -webkit-transition: 0.1s;
        transition: 0.1s;
        -webkit-transition-property: top;
        transition-property: top;
        pointer-events: auto;
        cursor: pointer;
    }

    .point {
        color: #FFF;
        -webkit-transition: 1s;
        transition: 1s;
        -webkit-transition-property: color;
        transition-property: color;
    }
    .point::after {
        content: "";
        width: 3px;
        height: 3px;
        background: #FFF;
        border-radius: 100%;
        position: absolute;
        top: calc(100% + 12px);
        left: 7px;
        pointer-events: none;
        opacity: 0;
        -webkit-transform-origin: 0 100%;
        transform-origin: 0 100%;
        -webkit-transform: scaleY(5);
        transform: scaleY(5);
        transition-property: background, opacity, transform, -webkit-transform;
        -webkit-transition-duration: 1s, 0.1s, 0.1s, 0.1s;
        transition-duration: 1s, 0.1s, 0.1s, 0.1s;
    }
    .point:hover::after {
        opacity: 1;
        transform: scaleY(1);
    }
    a {
        text-decoration: none;
    }
    .aboutInner{
        position: absolute;
        top: 0px;
        left: 0px;
        opacity: 0;
        width: 100%;
        height: 100%;
        .close {
            width: 25px;
            height: 25px;
            position: absolute;
            right: 70px;
            top: 70px;
            opacity: 0.3;
            -webkit-transform: rotate(-45deg);
            -moz-transform: rotate(-45deg);
            -ms-transform: rotate(-45deg);
            -o-transform: rotate(-45deg);
            transform: rotate(-45deg);
            .closeLine1 {
                position: absolute;
                width: 100%;
                height: 1px;
                background-color: #262324;
                top: 12px;
                left: 0;
                -webkit-transform-origin: 100% 50%;
                -ms-transform-origin: 100% 50%;
                transform-origin: 100% 50%;
            }
             .closeLine2 {
                position: absolute;
                width: 1px;
                height: 100%;
                background-color: #262324;
                left: 12px;
                -webkit-transform-origin: 50% 0%;
                -ms-transform-origin: 50% 0%;
                transform-origin: 50% 0%;
             }
        }
        .close2 {
            width: 65px;
            height: 65px;
            position: absolute;
            right: 50px;
            top: 50px;
            z-index: 100000000;
            -webkit-transform: rotate(-45deg);
            -moz-transform: rotate(-45deg);
            -ms-transform: rotate(-45deg);
            -o-transform: rotate(-45deg);
            transform: rotate(-45deg);
            opacity: 0;
            cursor: pointer;
            .close2inner {
                position: absolute;
                width: 25px;
                height: 25px;
                margin: 20px 20px 20px 20px;
                .closeLine3 {
                    position: absolute;
                    width: 100%;
                    height: 1px;
                    background-color: #262324;
                    top: 12px;
                    z-index: 100000000;
                    left: 0;
                    -webkit-transform-origin: 100% 50%;
                    -ms-transform-origin: 100% 50%;
                    transform-origin: 100% 50%;
                }
                .closeLine4 {
                    position: absolute;
                    width: 1px;
                    height: 100%;
                    background-color: #262324;
                    left: 12px;
                    z-index: 100000000;
                    -webkit-transform-origin: 50% 0%;
                    -ms-transform-origin: 50% 0%;
                    transform-origin: 50% 0%;
                }
            }
        }
        .disclaimer {
            position: relative;
            font-family: 'Fira sans', sans-serif;
            font-weight: 300;
            color: #848384;
            font-size: 12px;
            line-height: 18px;
            margin-bottom: 50px;
            text-align: justify;
            padding-bottom: 85px;
            opacity: 0;
            transition: opacity .6s ease-in-out;
            &.active{
                opacity: 1;
            }
            .createdBy {
                margin-bottom: 30px;
                .dsp {
                    color: #262324;
                    font-weight: 700;
                    text-decoration: underline;
                }
            }
            .breakLine {
                margin-bottom: 30px;
                position: relative;
                height: 1px;
                width: 100%;
                background-color: #262324;
                opacity: 0.1;
            }
            .disclaimerHeadline {
                margin-bottom: 15px;
            }
        }
        .impressum_mobile {
            display: none;
            font-family: 'Fira sans', sans-serif;
            font-weight: 300;
            font-size: 14px;
            color: #f5f5f5;
            z-index: 3;
            position: relative;
            color: #262324;
            bottom: 0px;
            right: 0px;
            font-size: 12px;
            line-height: 18px;
            margin-top: 50px;
            .h {
                font-weight: 500;
                opacity: 1;
                position: relative;
                text-transform: uppercase;
                font-size: 18px;
                line-height: 22px;
                margin-bottom: 20px;
            }
            .t {
                display: block;
                position: relative;
                .stagger {
                    position: relative;
                }
            }
        }
        .impressum {
            width: calc(38.2% - 70px);
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -ms-flex-wrap: wrap;
            flex-wrap: wrap;
            z-index: 3;
            position: absolute;
            color: #F5F5F5;
            bottom: 50px;
            left: 70px;
            line-height: 24px;
            font-family: 'Fira sans', sans-serif;
            font-weight: 300;
            font-size: 14px;
            color: #f5f5f5;
            font-size: 12px;
            text-align: left;
            p {
                display: block;
                margin: 0;
            }
            .contactText {
                -webkit-box-flex: 1;
                -ms-flex: 1 50%;
                flex: 1 50%;
                position: relative;
                .stagger {
                    position: relative;
                }
                a{
                    color:#ffffff;
                    text-decoration: none;
                }
            }
            .legalText {
                -webkit-box-flex: 1;
                -ms-flex: 1 50%;
                flex: 1 50%;
                color: #848384;
                position: relative;
                .stagger {
                    position: relative;
                }
            }
        }
        .aboutBgCropperMobile {
            display: none;
        }
        .aboutRightBg {
            position: absolute;
            background-color: #ffffff;
            height: 100vh;
            width: 100vw;
            transform-origin: 100% 50%;
        }
        .pic_container {
            position: relative;
            height: auto;
            width: auto;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -ms-flex-wrap: wrap;
            flex-wrap: wrap;
            margin-bottom: 130px;
            padding-top: 70px;
            
            .picStagger{
                opacity: 0;
                transform: translate3d(0,35px,0);
                &.active{
                    opacity: 1;
                    transform: translate3d(0,0,0);
                }
            }
            .pic1 {
                transition: all 400ms;
                max-width: 28%;
                position: relative;
                margin-top: 10px;
            }
            .pic2 {
                transition: all 300ms;
                max-width: 36%;
                position: relative;
                margin-top: 40px;
                padding: 2% 2% 2% 2%;
            }
            .pic3 {
                transition: all 500ms;
                position: relative;
                max-width: 32%;
                margin-top: -100px;
            }
            .pic4 {
                transition: all 300ms;
                max-width: 40%;
                position: relative;
                margin-top: 50px;
                padding-left: 5%;
            }
            .pic5 {
                transition: all 500ms;
                max-width: 46%;
                position: relative;
                margin-top: 30px;
                padding-left: 5%;
            }
            .picimg {
                position: relative;
                width: 100%;
                height: auto;
            }
            .picDescr {
                font-family: 'Fira sans', sans-serif;
                font-weight: 300;
                font-size: 14px;
                color: #848384;
                font-size: 12px;
                line-height: 18px;
                padding-left: 4%;
                padding-right: 4%;
                margin-top: 10px;
                text-align: left;
            }
        }
       .aboutTextAreaOuter {
            width: 100%;
            position: relative;
            height: 100%;
            color: #262324;
            font-size: 24px;        
            .aboutTextAreaInner {
                position: relative;
                overflow-y: scroll;
                width: 100%;
                height: 100%;
                
                .aboutTextArea {
                    left: 38.2%;
                    width: 61.8%;
                    height: 100%;
                    padding-left: 7%;
                    padding-right: 7%;
                    perspective: 1000px;
                    position: relative;
                    z-index: 13;
                    -webkit-overflow-scrolling: touch;
                    .text {
                        font-family: 'Pridi';
                        font-weight: 500;
                        color: #262324;
                        font-size: 32px;
                        margin-top: 12%;
                        line-height: 1.25;                    
                        text-align: left;
                    }
                    .subtext {
                        font-size: 16px;
                        margin-top: 100px;
                        font-family: 'Fira sans', sans-serif;
                        font-weight: 300;
                        font-size: 14px;
                        color: #262324;
                        line-height: 26px;
                        margin-bottom: 70px;
                        width: 65%;
                        line-height: 1.5; 
                        text-align: left;  
                    }
                }
            }
        }

        .aboutBgCropper {
            overflow: hidden;
            position: absolute;
            width: 38.2%;
            left: 0px;
            height: 100%;
            .aboutBg {
                position: absolute;
                left: 0px;
                top: 0px;
                width: 100%;
                height: 100%;
                background-color: #262324;
                -webkit-transform-origin: 100% 50%;
                -ms-transform-origin: 100% 50%;
                transform-origin: 100% 50%;
                overflow: hidden;
                .aboutPictureLeft {
                    position: absolute;
                    width: calc(100% - 30px);
                    left: 30px;
                    top: 40%;
                    transform: translate(0, -50%);
                }
            }
        }
    }
}


[data-scrollbar] {
    display: block;
    position: relative;
}

.scroll-content {
    transform: translate3d(0, 0, 0);
}

.scrollbar-track {
  position: absolute;
  opacity: 1;
  z-index: 101;
  background: rgba(222, 222, 222, .75);
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
  -webkit-transition: opacity 0.5s 0.5s ease-out;
          transition: opacity 0.5s 0.5s ease-out;
}
.scrollbar-track.show,
.scrollbar-track:hover {
  opacity: 1;
  -webkit-transition-delay: 0s;
          transition-delay: 0s;
}

.scrollbar-track-x {
  bottom: 0;
  left: 0;
  width: 100%;
  height: 8px;
}
.scrollbar-track-y {
  top: 0;
  right: 0;
  width: 8px;
  height: 100%;
}
.scrollbar-thumb {
  position: absolute;
  top: 0;
  left: 0;
  width: 8px;
  height: 8px;
  background: rgba(0, 0, 0, .25)!important;
  border-radius: 0!important;
}

</style>