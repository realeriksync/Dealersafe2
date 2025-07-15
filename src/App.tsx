import { useState } from 'react';

const [form, setForm] = useState(() => {
  const saved = localStorage.getItem('inspection');
  return saved
    ? JSON.parse(saved)
    : {
        brakes: false,
        tires: false,
        lights: false,
        mirrors: false
      };
});


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: checked }));
  };

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  localStorage.setItem('inspection', JSON.stringify(form));
  alert('Inspection submitted and saved!');
};


  // Save to local storage
  localStorage.setItem('inspectionData', JSON.stringify(form));

  alert("Inspection submitted and saved!");
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
        </button>
      </form>
    </div>
  );
}
