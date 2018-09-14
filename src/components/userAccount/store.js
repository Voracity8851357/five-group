export default {
    namespaced: true,
    state: {
        list: [],
        audit: []
    },
    mutations: {
        setState(state, payload) {
            Object.assign(state, payload);
        }
    },
    actions: {
        //获取用户
        async async_getUsers(context,) {
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
            return 'success'
        },
        //添加用户
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
        },
        //删除用户
        async async_DeleteUsers(context, {_id}) {
            await fetch(`/users?_id=${_id}`, {
                method: 'DELETE'
            });
            return 'success'
        },
        //修改用户
        async async_putUser(context, {userAcount, userPwd, userPhone, userMail, userName, userType, userStatus, _id} = {}) {
            await fetch('/users', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userAcount, userPwd, userPhone, userMail, userName, userType, userStatus, _id
                })
            });
            return 'success'
        },
        //搜索
        async async_searchUsers(context, {search, searchSelect}) {
            const data = await fetch(`/users/searchUsers?search=${search}&searchSelect=${searchSelect}`).then(response => {
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
            return 'success'
        },
        //获取审核数据
        async async_getAudit(context) {
            const data = await fetch('/users/getAudit').then(response => {
                return response.json()
            });
            context.commit('setState', {audit: data});
            return 'success'
        },
        //审核
        async async_putAudit(context, {userStatus, _id} = {}) {
            await fetch('/users/audit', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userStatus, _id
                })
            });
            return 'success'
        },
    }
}