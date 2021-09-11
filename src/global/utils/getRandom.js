/* eslint-disable */

export default function getRandom(maxNum, qtdMax) {
    let n = 1;
    const list = [];
    const value = () => Math.floor(Math.random() * maxNum + 1);

    do {
        while (n <= qtdMax) {
            let num = value();

            if (list.indexOf(num) === -1) {
                list.push(num)
            } else {
                n -= 1
            };
            n += 1
        };
    } while (list.length < qtdMax);

    list.sort((a, b) => a - b);
    return list;
}