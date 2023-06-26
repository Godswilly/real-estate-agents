import { Link } from 'react-router-dom';

interface AgentProps {
	setSearch: any;
}

const AgentSearch = (props: AgentProps) => {
	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		props.setSearch(e.target.value);
	};

	return (
		<div className='search'>
			<input
				placeholder='Agent Areas of Practice..'
				type='search'
				onChange={handleSearch}
			/>
			<Link to='/create-agent'>
				<button className='join'>Join the team!</button>
			</Link>
		</div>
	);
};

export default AgentSearch;
