exports.signup = (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: 'Email and password required' });
  const user  = { name: name || email.split('@')[0], email };
  const token = 'token_' + Date.now();
  res.json({ user, token, message: 'Signup successful' });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: 'Email and password required' });
  const user  = { name: email.split('@')[0], email };
  const token = 'token_' + Date.now();
  res.json({ user, token, message: 'Login successful' });
};

exports.sendOtp = (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ error: 'Phone required' });
  res.json({ message: 'OTP sent', otp: '123456' });
};

exports.verifyOtp = (req, res) => {
  const { phone, otp } = req.body;
  if (!phone || !otp)
    return res.status(400).json({ error: 'Phone and OTP required' });
  const user  = { name: 'User_' + phone.slice(-4), phone };
  const token = 'token_' + Date.now();
  res.json({ user, token, message: 'Verified' });
};