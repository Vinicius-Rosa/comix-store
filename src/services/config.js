import axios from 'axios'

export const http = axios.create({
    baseURL: 'https://gateway.marvel.com',
    headers: {
        "Content-Type": "application/json; charset=utf-8",
    },
    params: {
        ts: 1,
        apikey: "458368ab0b57d1d241edf158e9d13491",
        hash: "408ae96db1f85dfb0ec60daa98152e5a"
    }
})

/**
 * bakavini99
 * public key: 458368ab0b57d1d241edf158e9d13491
 * private key: 04f27cd5df9f129708bcb740bc15e921bc6a73ed
 * hash: 408ae96db1f85dfb0ec60daa98152e5a
 */

/**
 * viniciusrosarafaeldeoliveira
 * public key: 2dd89d14f20cf698d27835ff8a62b9ea
 * private key: 89bb6bbcfc708d5ade72ae7254e9c4e919784a5b
 * hash: 73b368558a22f2e7358eef2aaa57ee24
 */