import USER from '../../models/userModel.js';
import jwt from 'jsonwebtoken';



export const LoginUser = async (req, res, next) => {
  try {
    const { pin } = req.body;
console.log(pin,'ping')
  

    if (!pin || typeof pin !== 'string') {
      return res.status(400).json({ message: 'A valid 4-digit PIN is required!' });
    }
     
    const user = await USER.findOne({ pin: pin ,role:'CompanyAdmin'})


    if (!user) {
      return res.status(400).json({ message: 'Invalid PIN!' });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '30d' }
    );

    return res.status(200).json({
      message: 'Login successful',
      token,
      user,
    });
  } catch (err) {
    next(err);
  }
};