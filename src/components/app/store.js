export default {
    state: {
        userAcount: ''
    },
    mutations: {
        getUserAcount(state, payload) {
            Object.assign(state, payload);
        }
    },
    actions: {
        //登录
        async async_login(context, {userAcount, password}, fn) {
            const data = await fetch(`/users/login?userAcount=${userAcount}&password=${password}`)
                .then(response => {
                    return response.json()
                });
            console.log(context,userAcount,password,fn);
            // fn(data);
            return 'success'
        },
        //验证账号重复
        async async_getUserAcount(context, userName) {
            console.log(context, userName);
            const data = await fetch(`/users?userName=${userName}`).then(response => {
                return response.json()
            });
            console.log(data);
            context.commit('getUserAcount', data);
            return 'success'
        },
        //注册 添加账号至数据库
        async async_postUser(context, {userAcount, userPwd, userPhone, userMail, userName} = {}) {
            console.log(userAcount, userPwd, userPhone, userMail, userName);
            const data = await fetch('/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userAcount, userPwd, userPhone, userMail, userName
                })
            }).then(response => {
                return response.json()
            });
            console.log(data);
            return 'success'
        }
    }
}