const getDefaultState = () => {
    return {
        loaderVisibility: false,
        checkout: [],
        discount: 0,
        couponModal: false,
        shipping: 14,
    }
}

const state = getDefaultState();

const mutations = {
    showLoader: (state, value) => {
        state.loaderVisibility = value;
    },

    setCheckout: (state, value) => {
        state.checkout.push(value);
    },

    setDiscount: (state, value) => {
        state.discount = value;
    },

    removeFromCheckout: (state, value) => {
        const index = state.checkout.indexOf(item => item.id === value);
        state.checkout.splice(index, 1);

        if (state.checkout.length <= 0) {
            state.discount = 0
        }
    },

    handleCouponVisibility: (state, value) => {
        state.couponModal = value
    },

    resetValues: (state) => {
        Object.assign(state, getDefaultState())
    },
}

const actions = {
    showLoader: (context, payload) => {
        context.commit("showLoader", payload)
    },

    setCheckout: (context, payload) => {
        context.commit("setCheckout", payload)
    },

    setDiscount: (context, payload) => {
        context.commit("setDiscount", payload)
    },

    removeFromCheckout: (context, payload) => {
        context.commit("removeFromCheckout", payload)
    },

    showCouponModal: ({ commit }) => {
        commit("handleCouponVisibility", true)
    },

    hideCouponModal: ({ commit }) => {
        commit("handleCouponVisibility", false)
    },

    resetValues: ({ commit }) => {
        commit("resetValues")
    },
}

export { state, mutations, actions }