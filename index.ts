import * as firebase from 'firebase';

/**
 * Initializes the database
 * @param {object} config - The config from firebase.
 * @returns {promise} The database
 */
module.exports.initializeApp = (config:object) => {
    let promise1:Promise<any> = new Promise(async (resolve, reject) => {
        await firebase.initializeApp(config)
        module.exports.database = firebase.database();
        addFunctions();
        resolve(module.exports.database); 
        return promise1;
        })
    return promise1;
}

function addFunctions() {
    /**
    * Gets a value from the database
    * @param {string} uri - The uri of the value.
    */
    module.exports.database.get = (uri:string) => {
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
    module.exports.database.set = async (uri:string, data:any) => {
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
    module.exports.database.increment = async (uri:string, num:number) => {
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
    module.exports.database.delete = async (uri:string) => {
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