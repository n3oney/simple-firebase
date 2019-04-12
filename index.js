const firebase = require("firebase")
module.exports = new Object();

/**
 * Initializes the database
 * @param {object} config - The config from firebase.
 * @returns {promise} The database
 */
module.exports.initializeApp = async (config) => {
    let promise1 = new Promise(async (resolve, reject) => {
        await firebase.initializeApp(config)
        module.exports.database = firebase.database();
        addFunctions();
        resolve(module.exports.database); 
        return promise1;
        })
    return promise1;
}

addFunctions = () => {
    /**
    * Gets a value from the database
    * @param {string} uri - The uri of the value.
    */
    module.exports.database.get = async (uri) => {
    let promise1 = new Promise(async (resolve, reject) => {
    module.exports.database.ref(uri).once('value').then(value => {
        resolve(value.val())
    }).catch(err => reject(err))
    })
    return promise1;
    }
    /**
    * Sets a value on the database
    * @param {string} uri - The uri of the value.
    * @param data - The value to set.
    */
    module.exports.database.set = async (uri, data) => {
        let promise1 = new Promise(async (resolve, reject) => {
        module.exports.database.ref(uri).set(data).then(() => {
            resolve(data)
        }).catch(err => {
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
    module.exports.database.increment = async (uri, num) => {
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
    module.exports.database.delete = async (uri) => {
        let promise1 = new Promise(async (resolve, reject) => {
        module.exports.database.ref(uri).set(null).then(() => {
            resolve();
        }).catch(err => {
            reject(err);
        })
    })
        return promise1;
    }
}