import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Agent from '../components/Agents/Agent';
import ReviewForm from '../components/Agents/ReviewForm';
import './AgentDetails.css';

const AgentDetails = () => {
	const location = window.location.href;
	const id = location.split('agents/')[1];

	const [details, setDetails] = useState<any>(null);
	const [showPopup, setShowPopup] = useState<boolean>(false);
	const [currentReviews, setCurrentReviews] = useState([]);

	useEffect(() => {
		axios
			.get(`http://localhost:3001/agents/${id}`)
			.then((response) => {
				setDetails({ ...response.data });
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	useEffect(() => {
		if (!showPopup) {
			axios
				.get(`http://localhost:3001/agents/${id}/reviews`)
				.then((response) => {
					setCurrentReviews(response.data);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [showPopup]);

	return (
		<div className='agent-page-div'>
			<div className='btn'>
				<Link to='/agents'>
					<button className='back-button'>Back to Agents</button>
				</Link>
				<div>
					{details && (
						<button
							className='add-review'
							onClick={() => setShowPopup(!showPopup)}
						>
							Add a Review
						</button>
					)}
				</div>
			</div>
			<div className='parent'>
				<div className='single-agent'>
					{details && <Agent agent={details} isAgentPage={true} />}
				</div>
				<div className='container'>
					<h3 className='rating-label'>Reviews</h3>

					{currentReviews.map((review: any) => {
						return (
							<div key={review.id}>
								<p>
									<span className='rating-label'>Rating:</span> {review.rating}
								</p>
								<p>
									<span className='comment-label'>Comment:</span>{' '}
									{review.comment}
								</p>
								<hr />
							</div>
						);
					})}
				</div>
			</div>

			{showPopup && (
				<div className='agent-form-container'>
					<ReviewForm setShowPopup={setShowPopup} showPopup={showPopup} />
				</div>
			)}
		</div>
	);
};

export default AgentDetails;
