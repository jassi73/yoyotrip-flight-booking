export const validateEmail = (email: string): string | null => {
  if (!email.trim()) return 'Email address is required';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return 'Please enter a valid email address';
  return null;
};

export const validatePhone = (phone: string): string | null => {
  if (!phone.trim()) return 'Mobile number is required';
  const cleanPhone = phone.replace(/[\s-]/g, '');
  if (!/^\d{10}$/.test(cleanPhone)) return 'Please enter a valid 10-digit mobile number';
  return null;
};

export const validateName = (name: string, fieldName: string = 'Name'): string | null => {
  if (!name.trim()) return `${fieldName} is required`;
  if (name.trim().length < 2) return `${fieldName} must be at least 2 characters`;
  if (!/^[a-zA-Z\s]+$/.test(name)) return `${fieldName} should contain letters only`;
  return null;
};

export const validateDOB = (dob: string): string | null => {
  if (!dob) return 'Date of birth is required';
  const birthDate = new Date(dob);
  if (isNaN(birthDate.getTime())) return 'Invalid date of birth';
  const today = new Date();
  if (birthDate > today) return 'Date of birth cannot be in the future';
  return null;
};
