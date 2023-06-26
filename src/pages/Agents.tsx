import { FC, useState, useEffect } from 'react';
import Agent from '../components/Agents/Agent';
import { IAgent } from '../types/Agent';
import axios from 'axios';
import './Agents.css';
import AgentSearch from '../components/Agents/AgentSearch';

const Agents: FC = () => {
	const [agents, setAgents] = useState<IAgent[]>([]);
	const [search, setSearch] = useState('');
	const [filtered, setFiltered] = useState<IAgent[]>([]);

	const handleFilterAgents = (sch: string) => {
		if (sch) {
			const currentAgents: IAgent[] = [];
			agents.forEach((agent) => {
				let includeThisAgent = true;
				let areas = [...agent.practiceAreas.toString().split(',')];
				areas.forEach((area, index) => {
					areas[index] = area.toLowerCase();
				});

				let searchAreas = sch.split(/,\W*/);
				for (let i = 0; i < searchAreas.length; i++) {
					searchAreas[i] = searchAreas[i].toLowerCase();
					if (!areas.some((area) => area.includes(searchAreas[i]))) {
						includeThisAgent = false;
						break;
					}
				}
				if (includeThisAgent) currentAgents.push(agent);
			});
			setFiltered([...currentAgents]);
		} else {
			setFiltered([...agents]);
		}
	};

	useEffect(() => {
		handleFilterAgents(search);
	}, [search]);

	useEffect(() => {
		const fetchInitialData = async () => {
			try {
				const response = await axios.get<IAgent[]>(
					'http://localhost:3001/agents'
				);
				setAgents(response.data);
				setFiltered(response.data);
			} catch (error) {
				console.log('Error fetching agents:', error);
			}
		};

		fetchInitialData();
	}, []);
	return (
		<>
			<div>
				<AgentSearch setSearch={setSearch} />
			</div>
			<div className='agents'>
				{filtered.map((agent) => (
					<Agent key={agent.id} agent={agent} isAgentPage={false} />
				))}
			</div>
		</>
	);
};

export default Agents;
