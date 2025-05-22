import React, { useState, useRef, useEffect } from 'react';

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: 'ibrahim shahin',
    email: 'ibrahim.saaed@gmail.com',
    phone: '',
    password: '••••••••',
    image: ''
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputRefs = {
    name: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    phone: useRef<HTMLInputElement>(null),
    password: useRef<HTMLInputElement>(null)
  };

  useEffect(() => {
    if (saveSuccess) {
      const timer = setTimeout(() => setSaveSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [saveSuccess]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const reader = new FileReader();
      
      reader.onload = (event: ProgressEvent<FileReader>) => {
        if (event.target && event.target.result && typeof event.target.result === 'string') {
          setProfile(prev => ({ ...prev, image: event.target.result }));
        }
      };
      
      reader.onerror = () => {
        console.error("Error reading file");
      };
      
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      // Reset focus
      inputRefs.name.current?.blur();
    }, 1000);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Profile Settings</h1>
      
      <form onSubmit={handleSubmit}>
        <div style={styles.profileImageContainer}>
          <div style={styles.avatarWrapper}>
            {profile.image ? (
              <img src={profile.image} alt="Profile" style={styles.avatar} />
            ) : (
              <div style={styles.avatarPlaceholder}>
                {profile.name.split(' ').map(n => n[0]).join('')}
              </div>
            )}
          </div>
          <button 
            type="button"
            style={styles.imageButton}
            onClick={triggerFileInput}
            aria-label="Upload profile photo"
          >
            {profile.image ? 'Change Photo' : 'Upload Photo'}
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            style={{ display: 'none' }}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="name" style={styles.label}>Full Name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            style={styles.input}
            ref={inputRefs.name}
            aria-required="true"
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            style={styles.input}
            ref={inputRefs.email}
            aria-required="true"
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="phone" style={styles.label}>Phone</label>
          <input
            id="phone"
            type="tel"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            style={styles.input}
            ref={inputRefs.phone}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="password" style={styles.label}>Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={profile.password}
            onChange={handleChange}
            style={styles.input}
            ref={inputRefs.password}
            aria-required="true"
          />
        </div>

        <div style={styles.buttonContainer}>
          <button 
            type="submit" 
            style={styles.saveButton}
            disabled={isSaving}
            aria-busy={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
          {saveSuccess && (
            <div style={styles.successMessage}>
              Profile updated successfully!
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  },
  header: {
    fontSize: '24px',
    marginBottom: '30px',
    textAlign: 'center' as const,
    color: '#333',
    fontWeight: '600' as const
  },
  profileImageContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    marginBottom: '30px',
    gap: '12px'
  },
  avatarWrapper: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    backgroundColor: '#f0f0f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  avatar: {
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const
  },
  avatarPlaceholder: {
    fontSize: '40px',
    color: '#888',
    fontWeight: '600' as const
  },
  imageButton: {
    padding: '10px 16px',
    backgroundColor: '#f0f0f0',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: '#e0e0e0'
    }
  },
  formGroup: {
    marginBottom: '24px'
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '14px',
    color: '#555',
    fontWeight: '500' as const
  },
  input: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    boxSizing: 'border-box' as const,
    transition: 'border-color 0.2s',
    ':focus': {
      outline: 'none',
      borderColor: '#4CAF50',
      boxShadow: '0 0 0 2px rgba(76, 175, 80, 0.2)'
    }
  },
  buttonContainer: {
    marginTop: '30px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px'
  },
  saveButton: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    cursor: 'pointer',
    fontWeight: '600' as const,
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: '#3d8b40'
    },
    ':disabled': {
      backgroundColor: '#a5d6a7',
      cursor: 'not-allowed'
    }
  },
  successMessage: {
    padding: '12px',
    backgroundColor: '#e8f5e9',
    color: '#2e7d32',
    borderRadius: '6px',
    textAlign: 'center' as const,
    fontSize: '14px'
  }
};

export default ProfilePage;