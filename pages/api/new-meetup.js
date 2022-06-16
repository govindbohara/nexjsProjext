import { MongoClient } from 'mongodb';
const newMeetuphandler = async (req, res) => {
	// if (req.method === 'POST') {
	// 	const data = req.body;
	// 	const client = await MongoClient.connect(
	// 		'mongodb+srv://gole:gole@cluster0.auso7.mongodb.net/meetups?retryWrites=true&w=majority'
	// 	);
	// 	const db = client.db();
	// 	const meetupsCollection = db.collection('meetup');
	// 	const result = await meetupsCollection.insertOne(data);
	// 	console.log(result);
	// 	client.close();
	// 	res.status(201).json({ message: 'Meetups Inserted Succesfully' });
	// }

	if (req.method === 'POST') {
		const data = req.body;
		const client = await MongoClient.connect(
			'mongodb+srv://gole:gole@cluster0.auso7.mongodb.net/meetups?retryWrites=true&w=majority'
		);
		const db = client.db();
		const meetupCollection = db.collection('meetup');
		const result = await meetupCollection.insertOne(data);
		console.log(result);
		client.close();
		res.status(200).json({ message: 'Inserted Successfully' });
	}
};
export default newMeetuphandler;
