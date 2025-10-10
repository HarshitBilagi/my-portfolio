'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import styles from './contact.module.css'
import Image from 'next/image';

const interests = [
    { id: 'anime', icon: <Image src="/connect page/zenitsu-anime.png" alt="anime" width={400} height={400} />, position: 'top-2/4 left-[5%]', delay: 0.1, rotation: -15, zIndex: 20 },
    { id: 'minecraft', icon: <Image src="/connect page/minecraft.png" alt="minecraft" width={200} height={250} />, position: 'top-1/4 right-[12%]', delay: 0.3, rotation: 10, zIndex: 30 },
    { id: 'ironman', icon: <Image src="/connect page/ironman.png" alt="ironman" width={200} height={200} />, position: 'bottom-[55%] left-[20%]', delay: 0.5, rotation: 5, zIndex: 10 },
    { id: 'rb21 f1 car', icon: <Image src="/connect page/rb21.png" alt="F1 car" width={600} height={400} />, position: 'bottom-[-4%] right-[12%]', delay: 0.2, rotation: -5, zIndex: 0 },
    { id: 'cards', icon: <Image src="/connect page/cards.png" alt="cards" width={200} height={200} />, position: 'top-[8%] left-[8%]', delay: 0.2, rotation: -5, zIndex: 5 },
];

const ContactSection = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState<string | null>(null);
	const [submitSuccess, setSubmitSuccess] = useState(false);

	const emailRegex = useMemo(() => /^(?:[a-zA-Z0-9_'^&\/+-])+(?:\.(?:[a-zA-Z0-9_'^&\/+-])+)*@(?:(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,})$/, []);

	const validate = useCallback(() => {
		if (!name.trim()) return 'Please enter your name.';
		if (!email.trim()) return 'Please enter your email.';
		if (!emailRegex.test(email.trim())) return 'Please enter a valid email.';
		if (!message.trim()) return 'Please enter a message.';
		return null;
	}, [name, email, message, emailRegex]);

	const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setSubmitError(null);
		const error = validate();
		if (error) {
			setSubmitError(error);
			return;
		}
		setIsSubmitting(true);
		try {
			const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
			const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
			const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
			if (!serviceId || !templateId || !publicKey) {
				throw new Error('Email service is not configured.');
			}
			const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					service_id: serviceId,
					template_id: templateId,
					user_id: publicKey,
					template_params: {
						from_name: name,
						from_email: email,
						message,
					},
				}),
			});
			if (!response.ok) {
				throw new Error('Failed to send message. Please try again later.');
			}
			setSubmitSuccess(true);
			setName('');
			setEmail('');
			setMessage('');
		} catch (err: unknown) {
			const msg = err instanceof Error ? err.message : 'Unexpected error occurred.';
			setSubmitError(msg);
		} finally {
			setIsSubmitting(false);
		}
	}, [validate, name, email, message]);
    // Parent container variants to orchestrate animations
    const sectionVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    // Animation for images popping up from the bottom
    const imageVariants = {
        hidden: { y: '100vh', opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1, 
            transition: { type: 'spring' as const, stiffness: 50, damping: 15 } 
        },
    };
    
    // Animation for the card flipping and popping up
    const cardVariants = {
        hidden: { y: 200, opacity: 0, rotateY: 180 },
        visible: {
            y: 0,
            opacity: 1,
            rotateY: 0,
            transition: { type: 'spring' as const, stiffness: 100, damping: 20, duration: 8 },
        },
    };

    return (
        <section
            id="contact"
            className="relative h-screen flex justify-center items-center overflow-hidden bg-[#0A0A0A] p-4"
        >
            {/* Background Aurora */}
            <div className="absolute inset-0 z-0">
                 <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255, 249, 253, 0.15),rgba(169, 240, 16, 0))]"></div>
                <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(0, 33, 223, 0.15),rgba(230, 17, 17, 0))]"></div>
            </div>

            <motion.div
                className="absolute inset-0 flex justify-center items-center w-full h-full"
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                {/* Floating Interest Images */}
                {interests.map((item) => (
                    <motion.div
                        key={item.id}
                        variants={imageVariants}
                        className={`${styles.image_border} absolute ${item.position} z-${item.zIndex}`}

                        style={{transform: `rotate(${item.rotation}deg)`, zIndex: item.zIndex}}
                    >
                        <div className="p-4 rounded-x text-cyan-400">
                           {item.icon}
                        </div>
                    </motion.div>
                ))}

                {/* Flipping Contact Card */}
                <div className="flex justify-center items-center w-full h-full" style={{ perspective: '400px' }}>
                    <motion.div
                        variants={cardVariants}
                        className="relative w-[400px] max-w-l min-h-[500px] z-20"
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        <div className="absolute inset-0 w-full h-full rounded-2xl glass-card p-8 flex flex-col justify-center" style={{ backfaceVisibility: 'hidden' }}>
						<h2 className="font-futurism text-3xl font-bold text-white mb-2 text-center">Let's Connect!</h2>
						<p className="text-gray-400 text-center mb-6">Have a project in mind or just want to say hi? <br /> Drop me a line.</p>
						<form className="space-y-3 flex flex-col items-center" onSubmit={handleSubmit} noValidate>
							<div className="w-[90%]">
								<label htmlFor="name" className="sr-only">Your Name</label>
								<input
									id="name"
									type="text"
									placeholder="Your Name"
									value={name}
									onChange={(e) => setName(e.target.value)}
									className={styles.text_field}
									aria-invalid={!!submitError && !name.trim()}
									aria-describedby="name-error"
								/>
								{submitError && !name.trim() && (
									<p id="name-error" className="text-red-400 mt-[-3] text-[0.9rem] text-sm">*Please enter your name.</p>
								)}
							</div>

							<div className="w-[90%]">
								<label htmlFor="email" className="sr-only">Your Email</label>
								<input
									id="email"
									type="email"
									placeholder="Your Email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className={styles.text_field}
									aria-invalid={!!submitError && (!email.trim() || !emailRegex.test(email.trim()))}
									aria-describedby="email-error"
								/>
								{submitError && (!email.trim() || !emailRegex.test(email.trim())) && (
									<p id="email-error" className="text-red-400 mt-[-3] text-[0.9rem] text-sm">*Please enter a valid email.</p>
								)}
							</div>

							<div className="w-[90%]">
								<label htmlFor="message" className="sr-only">Your Message</label>
								<textarea
									id="message"
									placeholder="Your Message"
									rows={5}
									value={message}
									onChange={(e) => setMessage(e.target.value)}
									className={styles.text_area_field}
									aria-invalid={!!submitError && !message.trim()}
									aria-describedby="message-error"
								/>
								{submitError && !message.trim() && (
									<p id="message-error" className="text-red-400 mt-[-3] text-[0.9rem] text-sm">*Please enter a message.</p>
								)}
							</div>

							{submitSuccess && !submitError && (
								<p className="w-[90%] text-emerald-400 text-sm">Thanks! Your message has been sent.</p>
							)}

							<button
								type="submit"
								disabled={isSubmitting}
								className={styles.contact_button}
							>
								{isSubmitting ? 'Sending…' : 'Send Message'}
								<Send className="h-5 transition-transform group-hover:translate-x-1" />
							</button>
						</form>
                        </div>

                        <div className="absolute inset-0 w-full h-full rounded-2xl glass-card flex justify-center items-center" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                           <span className="animated-gradient-text text-5xl font-bold">?</span>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

export default ContactSection;
