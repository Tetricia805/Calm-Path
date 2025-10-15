import React, { useState } from 'react';
import './Onboarding.css';


const COLORS = {
  primary: '#6EC6FF',
  accent: '#FFD54F',
  background: '#F9FAFB',
  secondary: '#B39DDB',
  gradient: 'linear-gradient(135deg, #6EC6FF 0%, #B39DDB 100%)',
};

const steps = [
  {
    id: 'name',
    message: 'What should I call you, friend?',
    input: { type: 'text', placeholder: 'Your first name' },
  },
  {
    id: 'pronouns',
    message: 'What pronouns do you use? (optional)',
    input: { type: 'text', placeholder: 'e.g. she/her, he/him, they/them' },
  },
  {
    id: 'mood',
    message: 'How are you feeling today?',
    input: { type: 'emoji', options: ['😊','😐','😢','😠','😰','🥳'] },
  },
  {
    id: 'privacy',
    message: 'Everything you share is safe and private. Ready to begin your journey?',
    button: 'Finish',
  },
];


function WelcomeScreen({ onStart }) {
  return (
    <div className="onboarding-container" style={{ background: COLORS.gradient, minHeight: '100vh' }}>
      <div className="onboarding-card" style={{ background: 'rgba(255,255,255,0.95)', boxShadow: '0 8px 32px rgba(110,198,255,0.18)' }}>
        <h2 style={{ color: COLORS.primary, fontSize: 36, marginBottom: 8 }}>🌸 CalmPath</h2>
        <p className="onboarding-message" style={{ fontWeight: 600, fontSize: 20, color: '#333', marginBottom: 24 }}>
          You are not alone.<br />
          <span style={{ color: COLORS.secondary }}>Take a deep breath.</span><br />
          CalmPath is here to support you, every step of the way.
        </p>
        <div style={{ margin: '32px 0' }}>
          <div className="breathing-circle" style={{ width: 100, height: 100, margin: '0 auto', border: `3px solid ${COLORS.primary}33`, borderRadius: '50%', animation: 'breathe 4s ease-in-out infinite' }} />
        </div>
        <button
          className="onboarding-btn"
          style={{ background: COLORS.primary, color: '#fff', fontSize: 18, fontWeight: 600 }}
          onClick={onStart}
        >
          Begin Your Journey
        </button>
      </div>
    </div>
  );
}

export default function Onboarding({ onComplete }) {
  const [showWelcome, setShowWelcome] = useState(true);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: '', pronouns: '', mood: '' });

  const handleNext = () => setStep((s) => s + 1);

  const handleInput = (e) => {
    const { value } = e.target;
    if (steps[step].id === 'name') setForm({ ...form, name: value });
    if (steps[step].id === 'pronouns') setForm({ ...form, pronouns: value });
  };

  const handleEmoji = (emoji) => setForm({ ...form, mood: emoji });

  const handleFinish = () => {
    if (onComplete) onComplete(form);
  };

  const current = steps[step];

  if (showWelcome) {
    return <WelcomeScreen onStart={() => setShowWelcome(false)} />;
  }

  return (
    <div className="onboarding-container" style={{ background: COLORS.background }}>
      <div className="onboarding-card">
        <h2 style={{ color: COLORS.primary }}>🌸 CalmPath</h2>
        <p className="onboarding-message">{current.message}</p>
        {current.input && current.input.type === 'text' && (
          <input
            className="onboarding-input"
            type="text"
            placeholder={current.input.placeholder}
            value={form[current.id] || ''}
            onChange={handleInput}
            autoFocus
          />
        )}
        {current.input && current.input.type === 'emoji' && (
          <div className="emoji-row">
            {current.input.options.map((emoji) => (
              <button
                key={emoji}
                className={`emoji-btn${form.mood === emoji ? ' selected' : ''}`}
                onClick={() => handleEmoji(emoji)}
                type="button"
              >
                {emoji}
              </button>
            ))}
          </div>
        )}
        {current.button && (
          <button
            className="onboarding-btn"
            style={{ background: COLORS.primary, color: '#fff' }}
            onClick={step === steps.length - 1 ? handleFinish : handleNext}
          >
            {current.button}
          </button>
        )}
        {step > 0 && step < steps.length - 1 && (
          <button className="onboarding-back" onClick={() => setStep(step - 1)}>
            ← Back
          </button>
        )}
      </div>
    </div>
  );
}
