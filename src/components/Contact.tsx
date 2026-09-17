import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Send, Check, AlertCircle, Loader2, Mail, User, MessageSquare, Copy, FileText, CheckCircle2, X } from 'lucide-react';
import logo from '../assets/images/logo.png';

const Connect: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Form input state
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    subject: '',
    message: ''
  });

  // Submission state: 'idle' | 'sending' | 'success' | 'error'
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [senderName, setSenderName] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('polidarioandrewlloyd@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // Validation check for empty environment variables
    if (!serviceId || !templateId || !publicKey) {
      setStatus('error');
      setErrorMessage(
        'EmailJS keys are not configured yet! Please update your .env file with your Service ID, Template ID, and Public Key.'
      );
      return;
    }

    setStatus('sending');
    setErrorMessage('');

    try {
      if (formRef.current) {
        await emailjs.sendForm(
          serviceId,
          templateId,
          formRef.current,
          publicKey
        );
      } else {
        await emailjs.send(
          serviceId,
          templateId,
          {
            from_name: formData.from_name,
            from_email: formData.from_email,
            reply_to: formData.from_email,
            subject: formData.subject || 'Portfolio Contact Message',
            message: formData.message,
            to_email: 'polidarioandrewlloyd@gmail.com'
          },
          publicKey
        );
      }

      setSenderName(formData.from_name);
      setStatus('success');
      setShowModal(true);

      setFormData({
        from_name: '',
        from_email: '',
        subject: '',
        message: ''
      });
    } catch (err: any) {
      console.error('EmailJS Error:', err);
      setStatus('error');
      setErrorMessage(
        err?.text || err?.message || 'Failed to send message. Please try again or copy email directly.'
      );
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setStatus('idle');
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      }
    }
  };

  const slideUpVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  return (
    <>
      {/* ─── Connect Section ─── */}
      <section
        id="connect"
        className="relative z-20 bg-white dark:bg-dark-surface transition-colors duration-500 py-20 md:py-32"
      >
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-[760px] mx-auto px-margin-mobile md:px-margin-desktop"
        >

          {/* Heading */}
          <motion.div variants={slideUpVariants} className="text-center mb-8">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-plus-jakarta font-extrabold text-on-surface dark:text-dark-on-surface tracking-tight mb-4">
              Let's Connect
            </h2>
            <p className="text-base sm:text-lg text-on-surface-variant dark:text-dark-on-surface-variant font-inter leading-relaxed max-w-[600px] mx-auto">
              I'm currently seeking opportunities as a Frontend Developer or Full-Stack Developer.
              Have a question or want to work together? Send me a message below!
            </p>
          </motion.div>

          {/* Quick Contact & Social Links */}
          <motion.div
            variants={slideUpVariants}
            className="flex flex-wrap items-center justify-center gap-3 mb-10"
          >
            {/* Direct Email Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-100 dark:bg-dark-surface-card border border-neutral-200/80 dark:border-white/10">
              <Mail className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
              <span className="text-xs sm:text-sm font-inter font-semibold text-on-surface dark:text-dark-on-surface">
                polidarioandrewlloyd@gmail.com
              </span>
              <button
                onClick={handleCopyEmail}
                type="button"
                className="ml-1 inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-primary text-white text-[11px] font-inter font-bold uppercase tracking-wider hover:bg-primary/90 active:scale-95 transition-all duration-200"
                title="Copy Email"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2">
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/andrew-lloyd-polidario"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-[#0077B5]/10 dark:bg-[#0077B5]/20 flex items-center justify-center text-[#0077B5] hover:bg-[#0077B5] hover:text-white hover:scale-105 active:scale-95 transition-all duration-200"
                title="LinkedIn"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/Andoyyy-rakon"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-[#181717]/10 dark:bg-[#e8e8f0]/10 flex items-center justify-center text-[#181717] dark:text-dark-on-surface hover:bg-[#181717] dark:hover:bg-[#e8e8f0] hover:text-white dark:hover:text-dark-surface hover:scale-105 active:scale-95 transition-all duration-200"
                title="GitHub"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
              </a>

              {/* View Resume */}
              <a
                href="/PolidarioAndrewLloydResume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-on-surface/5 dark:bg-dark-on-surface-variant/10 text-on-surface dark:text-dark-on-surface hover:bg-on-surface hover:text-white hover:scale-105 active:scale-95 transition-all duration-200"
                title="View Resume"
              >
                <FileText className="w-4 h-4" />
                <span className="text-xs font-inter font-bold uppercase tracking-wider">Resume</span>
              </a>
            </div>
          </motion.div>

          {/* Contact Form Container */}
          <motion.div
            variants={slideUpVariants}
            className="p-6 sm:p-8 md:p-10 rounded-3xl bg-neutral-50 dark:bg-dark-surface-card border border-neutral-200/80 dark:border-white/10 shadow-lg transition-all duration-300"
          >
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              {/* Hidden field for reply-to mapping */}
              <input type="hidden" name="reply_to" value={formData.from_email} />

              {/* Row 1: Name and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Your Name */}
                <div className="space-y-2 text-left">
                  <label htmlFor="from_name" className="block text-xs font-inter font-bold uppercase tracking-wider text-on-surface dark:text-dark-on-surface">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400 dark:text-neutral-500">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      id="from_name"
                      name="from_name"
                      required
                      value={formData.from_name}
                      onChange={handleChange}
                      placeholder="e.g. Justin Hamilton"
                      className="w-full pl-10 pr-4 py-3 text-sm font-inter rounded-xl bg-white dark:bg-[#18181b] border border-neutral-200 dark:border-neutral-700/60 text-on-surface dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:border-primary dark:focus:border-primary focus:ring-0 transition-colors duration-200"
                    />
                  </div>
                </div>

                {/* Your Email */}
                <div className="space-y-2 text-left">
                  <label htmlFor="from_email" className="block text-xs font-inter font-bold uppercase tracking-wider text-on-surface dark:text-dark-on-surface">
                    Your Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400 dark:text-neutral-500">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      id="from_email"
                      name="from_email"
                      required
                      value={formData.from_email}
                      onChange={handleChange}
                      placeholder="e.g. justin@example.com"
                      className="w-full pl-10 pr-4 py-3 text-sm font-inter rounded-xl bg-white dark:bg-[#18181b] border border-neutral-200 dark:border-neutral-700/60 text-on-surface dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:border-primary dark:focus:border-primary focus:ring-0 transition-colors duration-200"
                    />
                  </div>
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-2 text-left">
                <label htmlFor="subject" className="block text-xs font-inter font-bold uppercase tracking-wider text-on-surface dark:text-dark-on-surface">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Project Inquiry / Job Opportunity"
                  className="w-full px-4 py-3 text-sm font-inter rounded-xl bg-white dark:bg-[#18181b] border border-neutral-200 dark:border-neutral-700/60 text-on-surface dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:border-primary dark:focus:border-primary focus:ring-0 transition-colors duration-200"
                />
              </div>

              {/* Message */}
              <div className="space-y-2 text-left">
                <label htmlFor="message" className="block text-xs font-inter font-bold uppercase tracking-wider text-on-surface dark:text-dark-on-surface">
                  Message <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute top-3.5 left-3.5 pointer-events-none text-neutral-400 dark:text-neutral-500">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Hi Andrew, I'd like to discuss a project..."
                    className="w-full pl-10 pr-4 py-3 text-sm font-inter rounded-xl bg-white dark:bg-[#18181b] border border-neutral-200 dark:border-neutral-700/60 text-on-surface dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:border-primary dark:focus:border-primary focus:ring-0 transition-colors duration-200 resize-none"
                  />
                </div>
              </div>

              {/* Error Status Banner */}
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm font-inter leading-relaxed text-left"
                >
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block mb-0.5">Message Couldn't Be Sent</span>
                    <span className="text-xs opacity-90">{errorMessage}</span>
                  </div>
                </motion.div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full py-3.5 px-6 rounded-xl bg-primary text-white font-inter font-bold text-sm tracking-wide hover:bg-primary/90 active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>

            </form>
          </motion.div>

        </motion.div>
      </section>

      {/* ─── Professional Modal Overlay (Aligned with Site Primary Color Scheme) ─── */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", duration: 0.4, bounce: 0.2 }}
              className="relative z-10 w-full max-w-md p-8 rounded-3xl bg-white dark:bg-dark-surface-card border border-neutral-200/80 dark:border-white/10 text-center shadow-xl overflow-hidden"
            >
              {/* Close Icon */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 rounded-full text-neutral-400 hover:text-on-surface dark:hover:text-dark-on-surface hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Clean Checkmark Icon Container */}
              <div className="mx-auto mb-5 flex items-center justify-center w-16 h-16 rounded-2xl bg-neutral-100 dark:bg-[#18181b] border border-neutral-200 dark:border-neutral-700/60 text-primary dark:text-primary-fixed-dim">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h3 className="text-2xl font-plus-jakarta font-extrabold text-on-surface dark:text-dark-on-surface mb-2">
                Message Sent{senderName ? `, ${senderName}` : ''}!
              </h3>

              <p className="text-sm font-inter text-on-surface-variant dark:text-dark-on-surface-variant leading-relaxed mb-6">
                Thank you for reaching out. Your message has been delivered to Andrew's inbox and he will respond shortly.
              </p>

              {/* Primary Action Button */}
              <button
                onClick={closeModal}
                className="w-full py-3.5 px-6 rounded-xl bg-primary hover:bg-primary/90 active:scale-[0.98] text-white font-inter font-bold text-sm tracking-wide transition-all duration-200 shadow-md shadow-primary/25 flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>Done</span>
              </button>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─── Footer ─── */}
      <div className='relative z-20 bg-white dark:bg-dark-surface border-t border-black/10 dark:border-[#3a3a55] py-6'>
        <div className="max-w-[1440px] bg-white dark:bg-dark-surface mx-auto px-margin-mobile md:px-margin-desktop flex items-center justify-center gap-2">
          <span className="text-sm font-inter text-on-surface-variant dark:text-dark-on-surface-variant">
            Designed & Built by Andrew
          </span>
          <img src={logo} alt="Andrew Logo" className="h-5 w-auto object-contain" />
        </div>
      </div>
    </>
  );
};

export default Connect;
