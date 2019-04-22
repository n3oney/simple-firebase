import * as firebase from 'firebase';

export class Database {
    /**
    * Gets a value from the database
    * @param {string} uri - The uri of the value.
    * @returns {Promise<any>}
    */
    get(uri:string) {
    let promise1 = new Promise(async (resolve, reject) => {
    module.exports.database.ref(uri).once('value').then((value: { val: () => {} | PromiseLike<{}> | undefined; }) => {
    resolve(value.val())
    }).catch((err: any) => reject(err))
    })
    return promise1;
    }

     /**
    * Sets a value on the database
    * @param {string} uri - The uri of the value.
    * @param data - The value to set.
    */

    async set(uri:string, data:any) {
        let promise1 = new Promise(async (resolve, reject) => {
        module.exports.database.ref(uri).set(data).then(() => {
            resolve(data)
        }).catch((err: any) => {
            reject(err)
        })
        })
        return promise1;
    }

    /**
    * Increments a number value on the database
    * @param {string} uri - The uri of the value.
    * @param {number} num - The number of how much to increment.
    */

    async increment(uri:string, num:number) {
        let promise1 = new Promise(async (resolve, reject) => {
        if(isNaN(num)) return reject("Second parameter has to be of type Number");
        const oldValue = await module.exports.database.get(uri);
        if(isNaN(oldValue)) return reject("The value has to be of type Number");
        const newValue = oldValue + num;
        module.exports.database.set(uri, newValue).then(() => {
            resolve()
        })
        })
        return promise1;
    }

    /**
    * Removes a value from the database
    * @param {string} uri - The uri of the value.
    */

    async delete(uri:string) {
        let promise1 = new Promise(async (resolve, reject) => {
        module.exports.database.ref(uri).set(null).then(() => {
            resolve();
        }).catch((err: any) => {
            reject(err);
        })
    })
        return promise1;
    }

}

/**
 * Initializes the database
 * @param {object} config - The config from firebase.
 * @returns {promise} The database
 */

export function initializeApp(config:object) {
    let promise1:Promise<Database> = new Promise(async (resolve, reject) => {
        await firebase.initializeApp(config)
        module.exports.database = firebase.database();
        resolve(module.exports.database); 
        return promise1;
        })
    return promise1;
}