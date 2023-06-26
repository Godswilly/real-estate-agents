const { Agent } = require('./Agent');
const { Review } = require('./Review');

Agent.hasMany(Review, { foreignKey: 'agentId', as: 'reviews' });
Review.belongsTo(Agent, { foreignKey: 'agentId', as: 'agent' });
