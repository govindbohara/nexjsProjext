import MeetupDetail from '../../components/meetups/MeetupDetail';
import { MongoClient, ObjectId } from 'mongodb';
import Head from 'next/head';
const MeetupDetails = props => {
	return (
		<>
			<Head>
				<title>{props.meetupData.title}</title>
				<meta name="description" content={props.meetupData.description} />
			</Head>
			<MeetupDetail
				image={props.meetupData.image}
				title={props.meetupData.title}
				address={props.meetupData.address}
				description={props.meetupData.description}
			/>
		</>
	);
};
export const getStaticPaths = async () => {
	const client = await MongoClient.connect(
		'mongodb+srv://gole:gole@cluster0.auso7.mongodb.net/meetups?retryWrites=true&w=majority'
	);
	const db = client.db();
	const meetupCollection = db.collection('meetup');
	const meetups = await meetupCollection.find({}, { _id: 1 }).toArray();
	client.close();

	return {
		fallback: 'blocking',
		paths: meetups.map(meetup => ({
			params: { meetupId: meetup._id.toString() },
		})),
	};
};

export const getStaticProps = async context => {
	//fetch Data from an API

	const meetupID = context.params.meetupId;
	const client = await MongoClient.connect(
		'mongodb+srv://gole:gole@cluster0.auso7.mongodb.net/meetups?retryWrites=true&w=majority'
	);
	const db = client.db();
	const meetupCollection = db.collection('meetup');
	const selectedMeetup = await meetupCollection.findOne({ _id: ObjectId(meetupID) });

	client.close();

	return {
		props: {
			meetupData: {
				id: selectedMeetup._id.toString(),
				title: selectedMeetup.title,
				image: selectedMeetup.image,
				address: selectedMeetup.address,
				description: selectedMeetup.description,
			},
		},
	};
};
export default MeetupDetails;
