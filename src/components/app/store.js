export default {
    namespaced: true,
    state: {
        isRepeat: '',
        userAcount: '',
        isLogin: false,
        userType: '',
        userStatus: '',
        _id: ''
    },
    mutations: {
        setState(state, payload) {
            Object.assign(state, payload);
        }
    },
    actions: {
        //登录
        async async_login(context, {userAcount, password}) {
            const data = await fetch(`/users/login?userAcount=${userAcount}&userPwd=${password}`)
                .then(response => {
                    return response.json()
                });
            if (data.length > 0) {
                context.commit('setState', {
                    isLogin: true,
                    userType: data[0].userType,
                    userStatus: data[0].userStatus,
                    _id: data[0]._id
                });
            } else {
                context.commit('setState', {
                    isLogin: false
                });
            }
            return 'success'
        },
        //验证账号重复
        async async_getUserAcount(context, userName) {
            console.log(context, userName);
            const data = await fetch(`/users?userName=${userName}`).then(response => {
                return response.json()
            });
            if (data.length > 0) {
                context.commit('setState', {isRepeat: true});
            } else {
                context.commit('setState', {isRepeat: false});
            }
            return 'success'
        },
        //注册 添加账号至数据库
        async async_postUser(context, {userAcount, userPwd, userPhone, userMail, userName, userType, userStatus} = {}) {
            const data = await fetch('/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userAcount, userPwd, userPhone, userMail, userName, userType, userStatus
                })
            }).then(response => {
                return response.json()
            });
            console.log(data);
            return 'success'
        }
    }
}