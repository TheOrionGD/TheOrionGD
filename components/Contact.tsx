import type { FC } from 'react';
import { useState } from 'react';
import { usePortfolioData } from '../hooks/usePortfolioData';

const Contact: FC = () => {
  const { data } = usePortfolioData();
  const socialLinks = data.socialLinks || [];
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [contactType, setContactType] = useState<'professional' | 'individual'>('professional');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "fc881cfb-436b-4b5b-a54f-9a135b7b07a2");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      if (data.success) {
        setSubmitStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  return (
    <footer id="contact" className="relative overflow-hidden bg-transparent text-black">
      {/* Top Rule */}
      <div className="w-full h-px bg-[#D3D3D3]" />

      <div className="container mx-auto px-6 md:px-10 max-w-7xl">

        {/* ── Large Editorial Headline ── */}
        <div className="py-10 md:py-14 border-b border-[#D3D3D3]">
          <div className="font-section-label text-[13px] font-semibold uppercase tracking-[0.08em] text-black mb-4">
            Section 08 // Signal
          </div>
          <h2 className="font-section-heading text-3xl md:text-5xl font-bold tracking-[-0.03em] leading-tight text-black max-w-3xl mb-3">
            You can reach me via the secure form, or through the contact details provided opposite.
          </h2>
          <p className="font-small-label text-[11px] font-medium uppercase tracking-[0.12em] text-black/75 max-w-2xl">
            PLEASE DO NOT TRANSMIT SENSITIVE OR CONFIDENTIAL INFORMATION VIA THIS FORM.
          </p>
        </div>

        {/* ── Main Grid: Form (left) + Details (right) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">

          {/* ── LEFT: Form ── */}
          <div className="lg:col-span-8 py-10 lg:pr-16 border-b lg:border-b-0 border-[#D3D3D3]">

            {/* Contact Type Toggle & Top Send Action Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <span
                    onClick={() => setContactType('professional')}
                    className={`w-5 h-5 flex items-center justify-center cursor-pointer transition-all duration-200 rounded-md ${contactType === 'professional'
                      ? 'shadow-[inset_2px_2px_4px_#DCDCDC,inset_-2px_-2px_4px_#ffffff] bg-[#EDEDED]'
                      : 'shadow-[3px_3px_6px_#DCDCDC,-3px_-3px_6px_#ffffff] bg-[#EDEDED]'
                      }`}
                  >
                    {contactType === 'professional' && (
                      <span className="text-black text-[10px]">■</span>
                    )}
                  </span>
                  <span
                    onClick={() => setContactType('professional')}
                    className={`font-small-label text-[11px] font-medium uppercase tracking-[0.12em] cursor-pointer ${contactType === 'professional' ? 'text-black' : 'text-black/60'
                      }`}
                  >
                    Professional
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <span
                    onClick={() => setContactType('individual')}
                    className={`w-5 h-5 flex items-center justify-center cursor-pointer transition-all duration-200 rounded-md ${contactType === 'individual'
                      ? 'shadow-[inset_2px_2px_4px_#DCDCDC,inset_-2px_-2px_4px_#ffffff] bg-[#EDEDED]'
                      : 'shadow-[3px_3px_6px_#DCDCDC,-3px_-3px_6px_#ffffff] bg-[#EDEDED]'
                      }`}
                  >
                    {contactType === 'individual' && (
                      <span className="text-black text-[10px]">■</span>
                    )}
                  </span>
                  <span
                    onClick={() => setContactType('individual')}
                    className={`font-small-label text-[11px] font-medium uppercase tracking-[0.12em] cursor-pointer ${contactType === 'individual' ? 'text-black' : 'text-black/60'
                      }`}
                  >
                    Individual
                  </span>
                </label>
              </div>

              {/* Send Button at top control bar */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="group inline-flex items-center bg-black/80 backdrop-blur-md text-white font-space-grotesk font-bold text-xs tracking-[0.02em] uppercase py-2.5 px-6 cursor-pointer transition-all duration-300 rounded-full border border-white/20 shadow-md hover:bg-black/95 active:scale-95 disabled:opacity-60 shrink-0 self-start sm:self-auto"
              >
                <span className="text-[#B87333] group-hover:text-white mr-2 text-[9px] transition-colors duration-300">▪</span>
                {isSubmitting ? 'Sending…' : submitStatus === 'success' ? 'Sent!' : 'Send'}
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-0">
              <input type="hidden" name="subject" value={`New Portfolio Message (${contactType})`} />
              <input type="hidden" name="from_name" value="Portfolio Contact Form" />

              {/* Row 1: Name | First Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px mb-px">
                <div className="bg-transparent">
                  <label className="block font-small-label text-[11px] font-medium uppercase tracking-[0.12em] text-black mb-1.5">
                    Name<span className="text-black">*</span>
                  </label>
                  <input
                    name="last_name"
                    type="text"
                    required
                    className="w-full bg-[#EDEDED] border-0 px-3.5 py-3 focus:outline-none text-sm text-black placeholder:text-black/30 font-sans mb-4 rounded-xl shadow-[inset_3px_3px_6px_#DCDCDC,inset_-3px_-3px_6px_#ffffff] focus:shadow-[inset_3px_3px_6px_#C8C8C8,inset_-3px_-3px_6px_#ffffff] transition-all duration-200"
                  />
                </div>
                <div className="bg-transparent md:pl-4">
                  <label className="block font-small-label text-[11px] font-medium uppercase tracking-[0.12em] text-black mb-1.5">
                    First name<span className="text-black">*</span>
                  </label>
                  <input
                    name="first_name"
                    type="text"
                    required
                    className="w-full bg-[#EDEDED] border-0 px-3.5 py-3 focus:outline-none text-sm text-black placeholder:text-black/30 font-sans mb-4 rounded-xl shadow-[inset_3px_3px_6px_#DCDCDC,inset_-3px_-3px_6px_#ffffff] focus:shadow-[inset_3px_3px_6px_#C8C8C8,inset_-3px_-3px_6px_#ffffff] transition-all duration-200"
                  />
                </div>
              </div>

              {/* Row 2: Email | Subject */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px mb-px">
                <div className="bg-transparent">
                  <label className="block font-small-label text-[11px] font-medium uppercase tracking-[0.12em] text-black mb-1.5">
                    E-mail<span className="text-black">*</span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full bg-[#EDEDED] border-0 px-3.5 py-3 focus:outline-none text-sm text-black placeholder:text-black/30 font-sans mb-4 rounded-xl shadow-[inset_3px_3px_6px_#DCDCDC,inset_-3px_-3px_6px_#ffffff] focus:shadow-[inset_3px_3px_6px_#C8C8C8,inset_-3px_-3px_6px_#ffffff] transition-all duration-200"
                  />
                </div>
                <div className="bg-transparent md:pl-4">
                  <label className="block font-small-label text-[11px] font-medium uppercase tracking-[0.12em] text-black mb-1.5">
                    Subject<span className="text-black">*</span>
                  </label>
                  <input
                    name="contact_subject"
                    type="text"
                    required
                    placeholder={contactType === 'professional' ? 'e.g. Collaboration, Project inquiry' : 'e.g. General question'}
                    className="w-full bg-[#EDEDED] border-0 px-3.5 py-3 focus:outline-none text-sm text-black placeholder:text-black/25 font-sans mb-4 rounded-xl shadow-[inset_3px_3px_6px_#DCDCDC,inset_-3px_-3px_6px_#ffffff] focus:shadow-[inset_3px_3px_6px_#C8C8C8,inset_-3px_-3px_6px_#ffffff] transition-all duration-200"
                  />
                </div>
              </div>

              {/* Row 3: Message full width */}
              <div className="mb-4">
                <label className="block font-small-label text-[11px] font-medium uppercase tracking-[0.12em] text-black mb-1.5">
                  Message<span className="text-black">*</span>
                </label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  maxLength={350}
                  placeholder="Message (350 characters max)"
                  className="w-full bg-[#EDEDED] border-0 px-3.5 py-3 focus:outline-none resize-none text-sm text-black placeholder:text-black/25 font-sans rounded-xl shadow-[inset_3px_3px_6px_#DCDCDC,inset_-3px_-3px_6px_#ffffff] focus:shadow-[inset_3px_3px_6px_#C8C8C8,inset_-3px_-3px_6px_#ffffff] transition-all duration-200"
                />
              </div>

              {/* Status messages */}
              {submitStatus === 'success' && (
                <p className="font-status-badge text-[13px] font-semibold text-emerald-600 tracking-[0.06em] uppercase mb-4">
                  ✓ Message received. Expect a response soon.
                </p>
              )}
              {submitStatus === 'error' && (
                <p className="font-status-badge text-[13px] font-semibold text-red-500 tracking-[0.06em] uppercase mb-4">
                  ✗ Connection error. Please retry later.
                </p>
              )}


            </form>
          </div>

          {/* ── RIGHT: Contact Details ── */}
          <div className="lg:col-span-4 py-10 lg:pl-12 flex flex-col gap-6">

            {/* Email block */}
            <div className="p-5 bg-[#EDEDED] rounded-2xl shadow-[4px_4px_8px_#DCDCDC,-4px_-4px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_#DCDCDC,inset_-2px_-2px_4px_#ffffff] transition-all duration-300">
              <p className="font-card-subtitle text-xs text-black leading-snug mb-3 font-normal">
                Project inquiries &amp; collaboration<br />requests:
              </p>
              <div className="flex flex-col gap-1">
                <span className="text-black text-base font-bold leading-none">↘</span>
                <a
                  href={`mailto:${data.personalInfo?.email || 'godfreytr.prof@gmail.com'}`}
                  className="font-space-grotesk text-sm font-bold text-black hover:text-black transition-colors duration-200 break-all"
                >
                  {data.personalInfo?.email || 'godfreytr.prof@gmail.com'}
                </a>
              </div>
            </div>

            {/* Social Links block */}
            <div className="p-5 bg-[#EDEDED] rounded-2xl shadow-[4px_4px_8px_#DCDCDC,-4px_-4px_8px_#ffffff] hover:shadow-[inset_2px_2px_4px_#DCDCDC,inset_-2px_-2px_4px_#ffffff] transition-all duration-300">
              <p className="font-card-subtitle text-xs text-black mb-3 font-normal">
                Find me online:
              </p>
              <div className="flex flex-col gap-2">
                <span className="text-black text-base font-bold leading-none">↘</span>
                {socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-space-grotesk text-sm font-bold text-black hover:text-black transition-colors duration-200"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>


          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;