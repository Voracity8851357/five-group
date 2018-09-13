export default {
    namespaced: true,
    state: {
        list: []
    },
    mutations: {
        setState(state, payload) {
            Object.assign(state, payload);
        }
    },
    actions: {
        async async_getUsers(context) {
            const data = await fetch('/users/getUsers').then(response => {
                return response.json()
            });
            data.map((item) => {
                if (item.userType === '0') {
                    item.userType = '平台管理员'
                } else if (item.userType === '1') {
                    item.userType = '门店管理员'
                }
            });
            data.map((item) => {
                if (item.userStatus === '0') {
                    item.userStatus = '申请中'
                } else if (item.userStatus === '1') {
                    item.userStatus = '可用'
                } else if (item.userStatus === '2') {
                    item.userStatus = '不可用'
                }
            });
            context.commit('setState', {list: data});
            console.log(this.state.userAccount.list);
            return 'success'
        }
    }
}