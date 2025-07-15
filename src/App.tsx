import { useState, useEffect } from 'react';

const [form, setForm] = useState(() => {
  const saved = localStorage.getItem('inspection');
  const handleReset = () => {
  localStorage.removeItem('inspection');
  setSaved(null);
  alert('Saved inspection cleared!');
};
  return saved
    ? JSON.parse(saved)
    : {
        brakes: false,
        tires: false,
        lights: false,
        mirrors: false
      };
});
const [saved, setSaved] = useState<{ form: { [key: string]: boolean }, timestamp: string } | null>(null);

useEffect(() => {
  const stored = localStorage.getItem('inspection');
  if (stored) {
    setSaved(JSON.parse(stored));
  }
}, []);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: checked }));
  };

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  const submission = {
    form,
    timestamp: new Date().toLocaleString(),
  };

  localStorage.setItem('inspection', JSON.stringify(submission));
  setSaved(submission);
  alert('Inspection submitted and saved!');
};


  return (
    <div style={{ maxWidth: 600, margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h1>🚛 Dealer Safety Shield</h1>
      <p>Complete your daily inspection checklist:</p>

      <form onSubmit={handleSubmit}>
        {Object.entries(form).map(([key, value]) => (
          <label key={key} style={{ display: "block", margin: "10px 0" }}>
            <input type="checkbox" name={key} checked={value} onChange={handleChange} />
            {" "}Check {key.charAt(0).toUpperCase() + key.slice(1)}
          </label>
        ))}

        <button type="submit" style={{ marginTop: 20, padding: "10px 20px" }}>
          ✅ Submit Inspection
        <button
  type="button"
  onClick={handleReset}
  style={{ marginTop: 10, padding: "8px 20px", backgroundColor: "#eee", border: "1px solid #ccc" }}
>
  ❌ Clear Last Inspection  
        </button>
{saved && saved.form && (
  <div style={{ marginTop: '30px' }}>
    <h3>🗂️ Last Saved Inspection</h3>
    <p><strong>Submitted on:</strong> {saved.timestamp}</p>
    <ul>
      {Object.entries(saved.form).map(([key, value]) => (
        <li key={key}>
          {key.charAt(0).toUpperCase() + key.slice(1)}: {value ? '✅ Done' : '❌ Not Done'}
        </li>
      ))}
    </ul>
  </div>
)}

<button type="submit" style={{ marginTop: 20, padding: "10px 20px" }}>
  ✅ Submit Inspection
</button> 
      </form>
    </div>
  );
}
