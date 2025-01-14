import 'dotenv/config';
import { envs } from './config/plugins/envs.plugin';
import { MongoDataBase } from './data/mongo/init';
import { Server } from './presentation/server';

const callMain = (async() => {
    main();
});

callMain();


async function main(){

    await MongoDataBase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME,
    });


    Server.start();
}