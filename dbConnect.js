import moongose from 'mongoose';

const dbConnect = () => {
    const connectionParams = { useNewUrlParser: true };
    moongose.connect(process.env.DB_URL, connectionParams);

    moongose.connection.on('connected', () => {
        console.log(`Mongoose connected to ${process.env.DB_URL} successfully`);
    });

    moongose.connection.on('error', (err) => {
        console.log(`Mongoose connection error: ${err}`);
    });

    moongose.connection.on('disconnected', () => {
        console.log('Mongoose disconnected');
    });
}

export default dbConnect;