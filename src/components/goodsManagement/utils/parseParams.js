export default function (data) {
    const keys = Object.keys(data);
    if (!keys.length) return "";
    let str = "?";
    keys.forEach(key => {
        str += `${key}=${data[key]}&`;
    });
    return str.slice(0, -1);
}