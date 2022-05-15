import {createDiffieHellman, randomBytes} from 'crypto-browserify'
import CryptoJS from 'crypto-js'
//
// export const createDiffie = () => {
//     const diffie = createDiffieHellman(2048)
//     return {
//         prime: diffie.getPrime('hex'),
//         gen: diffie.getGenerator('hex'),
//         pub: diffie.generateKeys('hex')
//     }
// }
//
// export const createDiffieByPub = (prime, gen) => {
//     const diffie = createDiffieHellman(prime, 'hex', gen, 'hex')
//     return diffie.generateKeys('hex')
// }
//

export const generateChatKey = () => {
    return randomBytes(2048).toString('base64')
}
export const cryptMessage = (text, key) => {
    return CryptoJS.AES.encrypt(text, key).toString()
}

export const decryptMessage = (hash, key) => {
    return CryptoJS.AES.decrypt(hash, key).toString(CryptoJS.enc.Utf8)
}