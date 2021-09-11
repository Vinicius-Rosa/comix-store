const validCoupons = [
    {
        code: "ABCDEFGH",
        value: 10
    },
    {
        code: "5CONTO",
        value: 5
    },
    {
        code: "15PILA",
        value: 15
    },
]

export default function (value) {
    const coupom = validCoupons.find(item => item.code === value)

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!coupom) reject({ error: "Cupom inválido!" })

            resolve(coupom)
        }, 1500)
    })
}