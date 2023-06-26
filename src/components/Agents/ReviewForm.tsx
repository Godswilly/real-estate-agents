import { useState, Dispatch, SetStateAction } from 'react';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocation } from 'react-router';
import './AgentForm.css';

const formSchema = z.object({
	rating: z.coerce
		.number()
		.min(1)
		.max(5)
		.transform((value) => {
			if (typeof value === 'string') {
				return parseInt(value, 10);
			}
			return value;
		}),
	comment: z.string().min(3, 'Comment is required').max(50),
});

type FormSchemaType = z.infer<typeof formSchema>;

type ReviewFormProps = {
	setShowPopup: Dispatch<SetStateAction<boolean>>;
	showPopup: boolean;
};

const ReviewForm = ({ setShowPopup, showPopup }: ReviewFormProps) => {
	const [postErrors, setPostErrors] = useState('');
	const location = useLocation();
	const agentId = location.pathname.split('/')[2];

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<FormSchemaType>({
		resolver: zodResolver(formSchema),
	});

	function handleClosingForm() {
		reset();
		setShowPopup(!showPopup);
	}
	const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
		console.log(data);
		fetch(`http://localhost:3001/agents/${agentId}/reviews/`, {
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
				handleClosingForm();
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
			<section className='form-section'>
				<div className='form-container'>
					<button className='form-close-button' onClick={handleClosingForm}>
						close
					</button>
					<div className='form-wrapper'>
						<div className='form-header'>
							<h1 className='form-title'>Leave a review</h1>
							<form className='form' onSubmit={handleSubmit(onSubmit)}>
								<div className='form-group'>
									<label htmlFor='rating' className='form-label'>
										Rating
									</label>
									<input
										type='number'
										id='rating'
										className='form-input'
										placeholder='Rating'
										{...register('rating')}
									/>
									{errors.rating && (
										<span className='form-error'>{errors.rating?.message}</span>
									)}
								</div>
								<div className='form-group'>
									<label htmlFor='comment' className='form-label'>
										Comment
									</label>
									<textarea
										id='comment'
										className='form-textarea'
										placeholder='Comment'
										{...register('comment')}
									/>
									{errors.comment && (
										<span className='form-error'>
											{errors.comment?.message}
										</span>
									)}
								</div>
								<button
									type='submit'
									className='form-submit'
									disabled={isSubmitting}
								>
									Leave a Review
								</button>
							</form>
							{postErrors && <p>{postErrors}</p>}
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default ReviewForm;
