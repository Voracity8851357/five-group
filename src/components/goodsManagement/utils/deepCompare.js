export default function deepCompare(obj1, obj2) {
    const obj1Keys = Object.keys(obj1);
    const obj2Keys = Object.keys(obj2);
    if (obj1Keys.length !== obj2Keys.length) return false;
    if (!obj1Keys.length && !obj2Keys.length) return true;
    //比较key
    for (const key1 of obj1Keys)
        if (!obj2Keys.some(key2 => key1 === key2)) return false;
    // 比较值
    for (const key of obj1Keys) {
        if (getType(obj1[key]) === "Object" && getType(obj1[key]) === "Array") {
            if (!deepCompare(obj1[key], obj2[key])) return false;
        } else {
            if (obj1[key].toString().replace(/\s/g, "") !== obj2[key].toString().replace(/\s/g, "")) return false;
        }
    }
    return true;
}

function getType(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1);
}