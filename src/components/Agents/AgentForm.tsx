import { useState } from 'react';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import './AgentForm.css';

const formSchema = z.object({
	firstName: z.string().min(3, 'First name is required').max(50),
	lastName: z.string().min(3, 'Last name is required').max(50),
	photoUrl: z.string().url(),
	agentLicence: z.string().regex(/^\d{10}$/),
	address: z.string().min(1, 'Address is required').max(100),
	practiceAreas: z
		.string()
		.min(1, 'Practice area is required')
		.max(50)
		.min(1, 'At least one practice area is required'),
	aboutMe: z.string().min(1, 'About me is required').max(500),
});

type FormSchemaType = z.infer<typeof formSchema>;

function AgentForm() {
	const [postErrors, setPostErrors] = useState('');
	const location = useLocation();
	const agents = location.pathname.split('/')[2];
	const navigate = useNavigate();

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<FormSchemaType>({
		resolver: zodResolver(formSchema),
	});

	const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
		fetch('http://localhost:3001/agents', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then((response) => {
				return response.json();
			})
			.then((result) => {
				if (result.error) throw result;
				setPostErrors('');
				reset();
				return navigate('/agents');
			})
			.catch((err) => {
				if (!(err.message === 'Failed to fetch')) {
					setPostErrors(err.message);
				} else {
					setPostErrors(
						'Network Error!, This could be due to a number of issues, please try again later. '
					);
				}
			});
	};

	return (
		<>
			<div>
				<Link to='/agents'>
					<button className='back-button'>Back to Agents</button>
				</Link>
			</div>
			<section className='form-section'>
				<div className='form-container'>
					<div className='form-wrapper'>
						<div className='form-header'>
							<h1 className='form-title'>Create an Agent</h1>
							<form className='form' onSubmit={handleSubmit(onSubmit)}>
								<div className='form-group'>
									<label htmlFor='firstName' className='form-label'>
										First Name
									</label>
									<input
										type='text'
										id='firstName'
										className='form-input'
										placeholder='Your first name'
										{...register('firstName')}
									/>
									{errors.firstName && (
										<span className='form-error'>
											{errors.firstName?.message}
										</span>
									)}
								</div>
								<div className='form-group'>
									<label htmlFor='lastName' className='form-label'>
										Last Name
									</label>
									<input
										type='text'
										id='lastName'
										className='form-input'
										placeholder='Your last name'
										{...register('lastName')}
									/>
									{errors.lastName && (
										<span className='form-error'>
											{errors.lastName?.message}
										</span>
									)}
								</div>
								<div className='form-group'>
									<label htmlFor='photoUrl' className='form-label'>
										Photo URL
									</label>
									<input
										type='text'
										id='photoUrl'
										className='form-input'
										placeholder='https://example.com/photo.jpg'
										{...register('photoUrl')}
									/>
									{errors.photoUrl && (
										<span className='form-error'>
											{errors.photoUrl?.message}
										</span>
									)}
								</div>
								<div className='form-group'>
									<label htmlFor='agentLicense' className='form-label'>
										Agent Licence
									</label>
									<input
										type='text'
										id='agentLicense'
										className='form-input'
										placeholder='1234567890'
										{...register('agentLicence')}
									/>
									{errors.agentLicence && (
										<span className='form-error'>
											{errors.agentLicence?.message}
										</span>
									)}
								</div>
								<div className='form-group'>
									<label htmlFor='address' className='form-label'>
										Address
									</label>
									<input
										type='text'
										id='address'
										className='form-input'
										placeholder='Your address'
										{...register('address')}
									/>
									{errors.address && (
										<span className='form-error'>
											{errors.address?.message}
										</span>
									)}
								</div>
								<div className='form-group'>
									<label htmlFor='practiceAreas' className='form-label'>
										Practice Areas
									</label>
									<input
										type='text'
										id='practiceAreas'
										className='form-input'
										placeholder='Comma-separated practice areas'
										{...register('practiceAreas')}
									/>
									{errors.practiceAreas && (
										<span className='form-error'>
											{errors.practiceAreas?.message}
										</span>
									)}
								</div>
								<div className='form-group'>
									<label htmlFor='aboutMe' className='form-label'>
										About Me
									</label>
									<textarea
										id='aboutMe'
										className='form-textarea'
										placeholder='Tell us about yourself'
										{...register('aboutMe')}
									/>
									{errors.aboutMe && (
										<span className='form-error'>
											{errors.aboutMe?.message}
										</span>
									)}
								</div>
								<button
									type='submit'
									className='form-submit'
									disabled={isSubmitting}
								>
									Create an Agent
								</button>
							</form>
							{postErrors && <p>{postErrors}</p>}
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export default AgentForm;
