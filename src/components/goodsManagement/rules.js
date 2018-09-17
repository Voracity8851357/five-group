import moment from "moment";

export default {
    goodsName: [
        {required: true, message: '请输入商品', trigger: 'blur'},
        {min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur'},
    ],
    goodsType: [
        {required: true, message: '请输入种类', trigger: 'blur'},
    ],
    goodsMaterial: [
        {required: false, min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'},
    ],
    goodsCanFor: [
        {required: false, min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'},
    ],
    goodsOnlyFor: [
        {required: false, min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'},
    ],
    goodsTaste: [
        {required: false, min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'},
    ],
    goodsSpecial: [
        {required: false, min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'},
    ],
    goodsIntro: [
        {
            required: false,
            validator: (rule, value, callback) => {
                if (value.length > 9) {
                    return callback(new Error("商品特色不能超过10个"))
                }
                callback();
            },
            trigger: 'change',
        },
    ],
    goodsSize: [
        {required: true, message: '请输入规格', trigger: 'blur'},
        {type: 'number', min: 0.1, message: '规格不能为 0',},
    ],
    goodsPrice: [
        {
            required: true,
            validator: (rule, value, callback) => {
                if (value.match(/\s/g)) {
                    return callback(new Error('格式不正确'));
                }
                if (+value < 0) {
                    return callback(new Error('请输入正确的价格'));
                }
                else if (+value === 0) {
                    if (value === "")
                        return callback(new Error('价格不能为空'));
                    else
                        return callback(new Error('价格不能为 0'));
                }
                callback();
            },
            trigger: 'blur',
        },
    ],
    goodsImg: [
        {
            required: true,
            validator: (rule, value, callback) => {
                if (value.length === 0) {
                    return callback(new Error("请上传商品图片"))
                }
                callback();
            },
            trigger: 'change',
        },
    ],
}