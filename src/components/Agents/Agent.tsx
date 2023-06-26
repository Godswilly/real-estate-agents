import { FC } from 'react';
import { IAgent } from '../../types/Agent';
import './Agent.css';
import { Link } from 'react-router-dom';

interface AgentProps {
	agent: IAgent;
	isAgentPage?: boolean;
}

const Agent: FC<AgentProps> = ({ agent, isAgentPage = false }) => {
	const { firstName, lastName, photoUrl, practiceAreas, address, aboutMe } =
		agent;

	return (
		<Link to={`/agents/${agent.id}`}>
			<div className='container'>
				<header>
					<div className='avatar-holder'>
						<img src={photoUrl} className='avatar' alt={firstName} />
					</div>
					<h2 className='agent-name'>{firstName + ' ' + lastName}</h2>
				</header>
				{isAgentPage && (
					<>
						<div className='body'>{aboutMe}</div>
						<footer>
							<div className='full-width-flex-box'>
								<div className='one-third-flex-box'>
									<span>{address}</span>
								</div>
								<div className='one-third-flex-box'>
									<span>Areas of Practice: {practiceAreas}</span>
								</div>
							</div>
						</footer>
					</>
				)}
				{!isAgentPage && (
					<footer>
						<div className='full-width-flex-box'>
							<div className='one-third-flex-box'>
								<span>Areas of Practice: {practiceAreas}</span>
							</div>
						</div>
					</footer>
				)}
			</div>
		</Link>
	);
};

export default Agent;
