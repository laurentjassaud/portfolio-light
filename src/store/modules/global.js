const state = {

    isFirstLoad: true,
    isMobile: false,
    isPortrait: true,
    isLandscape: false,
    windowSize: {}, 
    ressources: [],
    coverWork: 0,
    isMenuOpen: false,
    isAnimated: false,
    currentWork: null
}

const getters = {

    isFirstLoad: state => state.isFirstLoad,
    isMobile: state => state.isMobile,
    isPortrait: state => state.isPortrait,
    isLandscape: state => state.isLandscape,
    windowSize: state => state.windowSize,
    ressources: state => state.ressources,
    coverWork: state => state.coverWork, 
    isMenuOpen: state => state.isMenuOpen,
    isAnimated: state => state.isAnimated,
    currentWork: state => state.currentWork
}

const mutations = {

    SET_FIRST_LOAD(state, isFirstLoad){
        state.isFirstLoad = (typeof isFirstLoad !== 'undefined') ? isFirstLoad : true
    },

    SET_MOBILE(state, isMobile) {
        state.isMobile = (typeof isMobile !== 'undefined') ? isMobile : false
    },

    SET_PORTRAIT(state, isPortrait) {
        state.isPortrait = (typeof isPortrait !== 'undefined') ? isPortrait : true
    },

    SET_LANDSCAPE(state, isLandscape) {
        state.isLandscape = (typeof isLandscape !== 'undefined') ? isLandscape : false
    },

    SET_WINDOW_SIZE(state, windowSize) {
        state.windowSize = (typeof windowSize !== 'undefined') ? windowSize : {}
    },

    SET_RESSOURCES(state, ressources) {
        state.ressources = (typeof ressources !== 'undefined') ? ressources : []
    },

    SET_COVER_WORK(state, coverWork) {
        state.coverWork = (typeof coverWork !== 'undefined') ? coverWork : 0
    },

    SET_MENU_OPEN(state, isMenuOpen) {
        state.isMenuOpen = (typeof isMenuOpen !== 'undefined') ? isMenuOpen : 0
    },

    SET_ANIMATED(state, isAnimated) {
        state.isAnimated = (typeof isAnimated !== 'undefined') ? isAnimated : false
    },

    SET_CURRENT_WORK(state, currentWork) {
        state.currentWork = (typeof currentWork !== 'undefined') ? currentWork : null
    }
}

const actions = {

    setFirstLoad: ({ commit }, isFirstLoad) => commit('SET_FIRST_LOAD', isFirstLoad),
    setMobile: ({ commit }, isMobile) => commit('SET_MOBILE', isMobile),
    setPortrait: ({ commit }, isPortrait) => commit('SET_PORTRAIT', isPortrait),
    setLandscape: ({ commit }, isLandscape) => commit('SET_LANDSCAPE', isLandscape),
    setWindowSize: ({ commit }, windowSize) => commit('SET_WINDOW_SIZE', windowSize),
    setRessources: ({ commit }, ressources) => commit('SET_RESSOURCES', ressources),
    setCoverWork: ({ commit }, coverWork) => commit('SET_COVER_WORK', coverWork),
    setMenuOpen: ({ commit }, isMenuOpen) => commit('SET_MENU_OPEN', isMenuOpen),
    setAnimated: ({ commit }, isAnimated) => commit('SET_ANIMATED', isAnimated),
    setCurrentWork: ({ commit }, currentWork) => commit('SET_CURRENT_WORK', currentWork)
}

export default {

    state,
    getters,
    mutations,
    actions

}