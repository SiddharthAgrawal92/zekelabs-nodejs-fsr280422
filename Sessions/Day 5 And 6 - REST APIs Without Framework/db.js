const { MongoClient } = require('mongodb');

const getDBClient = async () => {
    const connectionString = 'mongodb+srv://sid1605:sT2kdICiGGtnsmgz@cluster1.tbllfyp.mongodb.net/test';
    //username - sid1605
    //password - sT2kdICiGGtnsmgz
    return new MongoClient(connectionString);
}

/**
 * list all the dbs of a cluster you are connected to
 */
const listDbs = async () => {
    const client = await getDBClient().catch(console.error);
    try {
        //connects to the mongodb cluster connection string using the credentials
        await client.connect();
        const databaseList = await client.db().admin().listDatabases();
        console.log('databaseList', JSON.stringify(databaseList));
        databaseList.databases.forEach(db => {
            console.log(db.name);
        });
    } catch (e) {
        console.log(err);
    } finally {
        await client.close();
    }
}

const insertUser = async (userData) => {
    const client = await getDBClient().catch(err => {
        console.log(err);
        return {
            error: true,
            msg: 'Something went while creating a DB client instance'
        }
    });
    try {
        //connects to the mongodb cluster connection string using the credentials
        await client.connect();
        const result = await client.db('company').collection('users').insertOne(userData);
        if (result.acknowledged) {
            return {
                success: true,
                data: result
            }
        } else {
            return {
                error: true,
                msg: 'Something went while inserting the data in the DB'
            }
        }
    } catch (e) {
        console.log(e);
        return {
            error: true,
            msg: 'Something went wrong at the DB side'
        }
    } finally {
        await client.close();
    }
}

const getUsers = async (limitDocs, skipDocs) => {
    const client = await getDBClient().catch(err => {
        console.log(err);
        return {
            error: true,
            msg: 'Something went while creating a DB client instance'
        }
    });
    try {
        //connects to the mongodb cluster connection string using the credentials
        await client.connect();
        const result = await client.db('company').collection('users').find().skip(skipDocs).limit(limitDocs).toArray();
        const totalCount = await client.db('company').collection('users').find().count();
        if (result) {
            return {
                success: true,
                data: { userList: result, totalRecords: totalCount },
            }
        } else {
            return {
                error: true,
                msg: 'Something went while inserting the data in the DB'
            }
        }
    } catch (e) {
        console.log(e);
        return {
            error: true,
            msg: 'Something went wrong at the DB side'
        }
    } finally {
        await client.close();
    }
}

module.exports = {
    listDbs,
    insertUser,
    getUsers
}