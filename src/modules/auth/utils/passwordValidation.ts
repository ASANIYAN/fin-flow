export const passwordHas8Characters = (password: string): boolean => {
  return Boolean(password && password.length >= 8);
};

export const passwordHasNumber = (password: string): boolean => {
  return Boolean(password && /\d/.test(password));
};

export const passwordHasSymbol = (password: string): boolean => {
  return Boolean(password && /[!@#$%^&*(),.?":{}|<>]/.test(password));
};

const passwordHasUpperCase = (password: string): boolean => {
  return Boolean(password && /[A-Z]/.test(password));
};

const passwordHasLowerCase = (password: string): boolean => {
  return Boolean(password && /[a-z]/.test(password));
};

export const passwordHasUpperAndLowerCase = (password: string): boolean => {
  return passwordHasUpperCase(password) && passwordHasLowerCase(password);
};
