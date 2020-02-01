var ConnectionFactory = (function (){
    const stores = ['negociacoes'];
    const version = 1;
    const dbName = 'aluraframe';

    let connection = null;

    return class ConnectionFactiory{
        constructor(){
            throw new Error('Não é possivel criar instancias de connnerctionFactory');
        }

        static getConnection(){
            return new Promise((resolve, reject)=>{
                let openRequest = window.indexedDB.open(dbName, version);

                openRequest.onupgradeneeded = e =>{
                    ConnectionFactory_createStores(e.target.result);
                };

                openRequest.onsuccess = e =>{
                    if(!connection) connection = e.target.result;
                    resolve(connection);
                };

                openRequest.onerror = e =>{
                    console.log(e.target.error);
                    reject(e.target.error.name);
                }
            });
        }

        static _createStores(connection){
            stores.forEach(store => {
                if(connection.objectStoreNames.contains(store)){
                    connection.deleteObjectStore(store);
                }

                connection.createObjectStore(store, {autoIncrement: true});
            })
        }
    }
})();