import {createDiffieHellman, randomBytes} from 'crypto'
import CryptoJS from 'crypto-js'
//
export const createDiffie = () => {
    console.log('hello from diffie')
    return createDiffieHellman(32)
    // return {
    //     prime: diffie.getPrime('hex'),
    //     gen: diffie.getGenerator('hex'),
    //     pub: diffie.generateKeys('hex')
    // }
}

export const createDiffieByPub = (prime, gen) => {
    return createDiffieHellman(prime, gen)
}

export const generateChatKey = () => {
    return randomBytes(2048).toString('base64')
}
export const cryptMessage = (text, key) => {
    return CryptoJS.AES.encrypt(text, key).toString()
}

export const decryptMessage = (hash, key) => {
    try {
        return CryptoJS.AES.decrypt(hash, key).toString(CryptoJS.enc.Utf8)
    } catch (e) {
        return 'wrong encryption key'
    }
}