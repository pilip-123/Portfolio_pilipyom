import { useEffect, useState } from 'react';
import SectionHeading from './SectionHeading';
import { useInView } from '@/hooks';
import { CONTACT_INFO } from '@/data';
import { getContactApiUrl } from '@/utils';

const INITIAL_FORM = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState(null); // { type: 'success' | 'error', title, message }
  const [sending, setSending] = useState(false);
  const [formRef, formInView] = useInView({ threshold: 0.1 });
  const [infoRef, infoInView] = useInView({ threshold: 0.15 });

  // Auto-dismiss the toast after a few seconds
  useEffect(() => {
    if (!status) return;
    const timer = setTimeout(() => setStatus(null), 4500);
    return () => clearTimeout(timer);
  }, [status]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, subject, message } = form;

    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setStatus({
        type: 'error',
        title: 'Missing Information',
        message: 'Please complete all fields before sending your message.'
      });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setStatus({
        type: 'error',
        title: 'Invalid Email',
        message: 'Please enter a valid email address.'
      });
      return;
    }

    setSending(true);
    try {
      const response = await fetch(getContactApiUrl(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (!response.ok) throw new Error('Request failed');

      setStatus({
        type: 'success',
        title: 'Message Sent Successfully',
        message: 'Thank you for reaching out. I will get back to you soon.'
      });
      setForm(INITIAL_FORM);
    } catch {
      setStatus({
        type: 'error',
        title: 'Unable To Send Message',
        message: 'Please try again in a moment or contact me directly by email.'
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="section contact" id="contact">
      <div className="container">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Let's work together"
          subtitle="Have a project in mind or just want to say hi? My inbox is always open."
        />

        <div className="contact-container">
          <div ref={infoRef} className="contact-info">
            {CONTACT_INFO.map((item, index) => (
              <div
                className={`contact-item ${infoInView ? 'in-view' : ''}`}
                key={item.label}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="contact-icon">
                  <i className={item.icon} aria-hidden="true" />
                </div>
                <div className="contact-detail">
                  <h3>{item.label}</h3>
                  {item.href ? (
                    <a href={item.href}>{item.value}</a>
                  ) : (
                    <p>{item.value}</p>
                  )}
                </div>
              </div>
            ))}

            <div className={`contact-availability ${infoInView ? 'in-view' : ''}`}>
              <div className="contact-icon">
                <i className="fas fa-heart" aria-hidden="true" />
              </div>
              <div className="contact-detail">
                <h3>Response time</h3>
                <p>Usually within 24 hours</p>
              </div>
            </div>
          </div>

          <form
            ref={formRef}
            className={`contact-form ${formInView ? 'in-view' : ''}`}
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Your Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                id="subject"
                type="text"
                name="subject"
                placeholder="Let's build something together"
                value={form.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Tell me about your project..."
                rows="5"
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-submit" disabled={sending}>
              {sending ? (
                <>
                  <i className="fas fa-spinner fa-spin" aria-hidden="true" />
                  Sending...
                </>
              ) : (
                <>
                  <i className="fas fa-paper-plane" aria-hidden="true" />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {status && (
        <div className={`toast ${status.type}`} role="status" aria-live="polite">
          <div className="toast-icon">
            <i className={status.type === 'error' ? 'fas fa-circle-exclamation' : 'fas fa-circle-check'} aria-hidden="true" />
          </div>
          <div className="toast-content">
            <h4>{status.title}</h4>
            <p>{status.message}</p>
          </div>
          <button
            type="button"
            className="toast-close"
            onClick={() => setStatus(null)}
            aria-label="Close notification"
          >
            <i className="fas fa-xmark" aria-hidden="true" />
          </button>
        </div>
      )}
    </section>
  );
}
