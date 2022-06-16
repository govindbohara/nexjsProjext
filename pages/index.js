import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList';
import Head from 'next/head';

const HomePage = props => {
	return (
		<>
			<Head>
				<title>React Meetups</title>
				<meta name="description" content="Browse a list of active react meetups" />
			</Head>
			<MeetupList meetups={props.meetups} />
		</>
	);
};
export const getStaticProps = async () => {
	// fetch data from an API
	const client = await MongoClient.connect(
		'mongodb+srv://gole:gole@cluster0.auso7.mongodb.net/meetups?retryWrites=true&w=majority'
	);
	const db = client.db();
	const meetupCollection = db.collection('meetup');
	const meetups = await meetupCollection.find().toArray();
	client.close();
	return {
		props: {
			meetups: meetups.map(meetup => {
				return {
					title: meetup.title,
					address: meetup.address,
					image: meetup.image,
					id: meetup._id.toString(),
				};
			}),
		},
		revalidate: 1,
	};
};
export default HomePage;
