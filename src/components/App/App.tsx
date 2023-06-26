import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Agents from '../../pages/Agents';
import AgentForm from '../Agents/AgentForm';
import AgentDetails from '../../pages/AgentDetails';
import './App.css';

const App: React.FC = () => {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Agents />} />
				<Route path='/agents' element={<Agents />} />
				<Route path='/agents/:id' element={<AgentDetails />} />
				<Route path='/create-agent' element={<AgentForm />} />
			</Routes>
		</Router>
	);
};

export default App;
