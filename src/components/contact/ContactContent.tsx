"use client"
import React, { useState } from 'react';
import { Mail, MapPin, Phone, Clock, Send, CheckCircle, Loader2 } from 'lucide-react';
import { useSubmitContactForm } from '@/hooks/use-contact';
import { useSiteConfig } from '@/hooks/use-site-config';
import { toast } from 'sonner';

const Contact: React.FC = () => {
    const { data: siteConfig } = useSiteConfig();
    const [submitted, setSubmitted] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
    });

    const { mutate: submitContact, isPending: loading } = useSubmitContactForm();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        submitContact({
            name: `${formData.firstName} ${formData.lastName}`.trim(),
            email: formData.email,
            phone_number: formData.phone,
            message: formData.message
        }, {
            onSuccess: () => {
                setSubmitted(true);
                toast.success("Message sent successfully!");
                // Reset form
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    message: ''
                });
            },
            onError: () => {
                toast.error("Failed to send message. Please try again.");
            }
        });
    };

    return (
        <div className="bg-gray-50 min-h-screen">

            {/* Header Section */}
            <div className="bg-navy-950 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-brand-300 text-xs font-bold uppercase tracking-wider mb-4">
                        Support Center
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        Have a question about your order, a product, or just want to say hello?
                        We&apos;d love to hear from you.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 pb-20 relative z-10">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 flex flex-col lg:flex-row">

                    {/* Contact Information (Left Side) */}
                    <div className="lg:w-2/5 bg-navy-900 p-10 text-white relative overflow-hidden">
                        {/* Background Pattern */}
                        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-brand-600 rounded-full opacity-20 blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-purple-600 rounded-full opacity-20 blur-3xl"></div>

                        <h2 className="text-2xl font-bold mb-8 relative z-10">Contact Information</h2>

                        <div className="space-y-8 relative z-10">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Phone className="text-brand-400" size={24} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-1">Phone Number</h3>
                                    <p className="text-slate-300 text-sm mb-1">Speak with our sales team.</p>
                                    <a href={`tel:${siteConfig?.phone || '+9779800000000'}`} className="text-white font-medium hover:text-brand-300 transition-colors">
                                        {siteConfig?.phone || '+977-9800000000'}
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Mail className="text-brand-400" size={24} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-1">Email Address</h3>
                                    <p className="text-slate-300 text-sm mb-1">For general inquiries and support.</p>
                                    <a href={`mailto:${siteConfig?.email || 'support@techstore.com'}`} className="text-white font-medium hover:text-brand-300 transition-colors">
                                        {siteConfig?.email || 'support@techstore.com'}
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <MapPin className="text-brand-400" size={24} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-1">Office Location</h3>
                                    <p className="text-slate-300 text-sm">
                                        {siteConfig?.address || "123 Tech Avenue, Silicon Valley California, 94000, USA"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Clock className="text-brand-400" size={24} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-1">Working Hours</h3>
                                    <p className="text-slate-300 text-sm">
                                        {siteConfig?.working_hours || (
                                            <>
                                                Mon - Fri: 9:00 AM - 6:00 PM<br />
                                                Sat: 10:00 AM - 4:00 PM
                                            </>
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 pt-12 border-t border-white/10 relative z-10">
                            <h3 className="font-semibold mb-4">Connect with us</h3>
                            <div className="flex gap-4">
                                {siteConfig?.facebook_url && (
                                    <a href={siteConfig.facebook_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-600 transition-colors">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                                    </a>
                                )}
                                {siteConfig?.twitter_url && (
                                    <a href={siteConfig.twitter_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-600 transition-colors">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                                    </a>
                                )}
                                {siteConfig?.instagram_url && (
                                    <a href={siteConfig.instagram_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-600 transition-colors">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.468 2.373c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Contact Form (Right Side) */}
                    <div className="lg:w-3/5 p-10 bg-white">
                        {submitted ? (
                            <div className="h-full flex flex-col items-center justify-center text-center py-20 animate-fade-in-up">
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                                    <CheckCircle className="text-green-600" size={40} />
                                </div>
                                <h2 className="text-3xl font-bold text-navy-900 mb-4">Message Sent!</h2>
                                <p className="text-gray-600 max-w-md mb-8">
                                    Thank you for reaching out. Our team will get back to you within 24 hours.
                                </p>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="px-8 py-3 bg-brand-600 text-white rounded-xl font-bold hover:bg-brand-700 transition-colors"
                                >
                                    Send Another Message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="h-full flex flex-col justify-center">
                                <h2 className="text-3xl font-bold text-navy-900 mb-2">Send us a Message</h2>
                                <p className="text-gray-500 mb-8">We usually respond within 24 hours.</p>

                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-1">
                                            <label className="text-sm font-semibold text-gray-700">First Name</label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none focus:bg-white transition-colors"
                                                placeholder="John"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-sm font-semibold text-gray-700">Last Name</label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none focus:bg-white transition-colors"
                                                placeholder="Doe"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-1">
                                            <label className="text-sm font-semibold text-gray-700">Email Address</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none focus:bg-white transition-colors"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-sm font-semibold text-gray-700">Phone Number</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none focus:bg-white transition-colors"
                                                placeholder="+1 (555) 000-0000"
                                            />
                                        </div>
                                    </div>



                                    <div className="space-y-1">
                                        <label className="text-sm font-semibold text-gray-700">Message</label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={4}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:outline-none focus:bg-white transition-colors resize-none"
                                            placeholder="How can we help you?"
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className={`w-full py-4 rounded-xl font-bold text-white shadow-lg flex items-center justify-center gap-2 transition-all 
                      ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-brand-600 hover:bg-brand-700 hover:shadow-xl active:scale-95'}
                    `}
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 size={18} className="animate-spin" />
                                                <span>Sending...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Send Message</span>
                                                <Send size={18} />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>

                </div>
            </div>


        </div>
    );
};

export default Contact;