export interface IAgent {
	id: string;
	firstName: string;
	lastName: string;
	photoUrl: string;
	agentLicence: string;
	address: string;
	practiceAreas: string[];
	aboutMe: string;
}

export interface IReview {
	id: string;
	comment: string;
	rating: number;
}
