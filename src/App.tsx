import { useState, useEffect } from 'react';

type Status = 'pass' | 'fail' | null;

const defaultForm: Record<string, Status> = {
  brakes: null,
  tires: null,
  lights: null,
  mirrors: null,
};

export default function App() {
  const [form, setForm] = useState<Record<string, Status>>(() => {
    const saved = localStorage.getItem('inspection');
    return saved ? JSON.parse(saved) : defaultForm;
  });

  const handleStatus = (key: string, status: Status) => {
    setForm(prev => ({ ...prev, [key]: status }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('inspection', JSON.stringify(form));
    alert('Inspection submitted and saved!');
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h1>🚛 Dealer Safety Shield</h1>
      <p>Complete your daily inspection checklist:</p>

      <form onSubmit={handleSubmit}>
        {Object.entries(form).map(([key, value]) => (
          <div key={key} style={{ margin: '10px 0' }}>
            <label style={{ display: 'block', marginBottom: 5 }}>
              {`Check ${key.charAt(0).toUpperCase() + key.slice(1)}`}
            </label>
            <button
              type="button"
              style={{
                marginRight: 10,
                background: value === 'pass' ? '#4CAF50' : '#eee',
                color: value === 'pass' ? 'white' : 'black',
                padding: '6px 12px',
                borderRadius: 4,
                border: '1px solid #ccc',
              }}
              onClick={() => handleStatus(key, 'pass')}
            >
              ✅ Pass
            </button>
            <button
              type="button"
              style={{
                background: value === 'fail' ? '#F44336' : '#eee',
                color: value === 'fail' ? 'white' : 'black',
                padding: '6px 12px',
                borderRadius: 4,
                border: '1px solid #ccc',
              }}
              onClick={() => handleStatus(key, 'fail')}
            >
              ❌ Fail
            </button>
          </div>
        ))}

        <button
          type="submit"
          style={{
            marginTop: 20,
            padding: '10px 20px',
            background: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
          }}
        >
          📋 Submit Inspection
        </button>
      </form>
    </div>
  );
}
