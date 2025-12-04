import { compare } from 'bcrypt';
import User from '../models/UserModel.js';
import jwt from 'jsonwebtoken';
import { renameSync, unlinkSync } from 'fs';

const maxAge = 1000 * 60 * 60 * 24 * 3; // 3 days
const createToken = (email, userId) => {
  return jwt.sign({ email, userId }, process.env.JWTKEY, {
    expiresIn: maxAge,
  });
};

export const register = async (req, res, next) => {
  const { email, password, confirmPassword } = req.body;

  console.log('Registering user:', { email, password, confirmPassword });
  if (!email || !password || !confirmPassword) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({ email, password });
    await newUser.save();

    res.cookie('jwt', createToken(newUser.email, newUser._id), {
      httpOnly: true,
      maxAge: maxAge,
      secure: true, // Use secure cookies in production
      sameSite: 'None',
    });

    res.status(201).json({
        message: 'User created successfully',
        user: {
          id: newUser._id,
          email: newUser.email,
          userId: newUser._id,
          firstName: newUser.firstName || '',
          lastName: newUser.lastName || '',
          images: newUser.images || '',
          color: newUser.color || 0,
          profileSetup: newUser.profileSetup || false,
        },
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const isMatch = compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      res.cookie('jwt', createToken(user.email, user._id), {
        httpOnly: true,
        maxAge: maxAge,
        secure: true, // Use secure cookies in production
        sameSite: 'None',
      });
  
      res.status(200).json({
        message: 'Login successful',
        user: {
            id: user._id,
            email: user.email,
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            images: user.images || '',
            color: user.color || 0,
            profileSetup: user.profileSetup || false,
        },
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
};

export const getUserInfo = async (req, res, next) => {
  try {
    const userData = await User.findById(req.user.userId)
    if (!userData) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({
      id: userData._id,
      email: userData.email,
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      images: userData.images || '',
      color: userData.color || 0,
      profileSetup: userData.profileSetup || false,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}

export const updateProfile = async (req, res, next) => {
  const { firstName, lastName, images, color } = req.body;

  if (!firstName || !lastName || color === undefined) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const userData = await User.findByIdAndUpdate(req.user.userId, {
      firstName,
      lastName,
      images,
      color,
      profileSetup: true,
    }, { new: true, runValidators: true});

    res.status(200).json({
      id: userData._id,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      images: userData.images,
      color: userData.color,
      profileSetup: userData.profileSetup,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}

export const addProfileImage = async (req, res, next) => {
  try {
    if(!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const date = Date.now();
    const imagePath = `${req.file.destination}/${date}-${req.file.originalname}`;
    renameSync(req.file.path, imagePath);

    const userData = await User.findByIdAndUpdate(req.user.userId, {
      images: imagePath,
    }, { new: true, runValidators: true});

    res.status(200).json({
      images: userData.images
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}

export const removeProfileImage = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);
    const images = user.images;
    console.log("User images before deletion:", images);
    if (!user || !images) {
      return res.status(404).json({ message: 'User or image not found' });
    }
    if (images) {
      unlinkSync(images);
    }
    user.images = null; // Clear the image field
    const userData = await user.save(); // Save the user document after clearing the image
    console.log("User data after deletion:", userData);
    res.status(200).json({
      message: 'Profile image deleted successfully',
      images: userData.images
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}

export const logOut = async (req, res, next) => {
  try {
    res.cookie('jwt', '', { maxAge:1, secure: true, sameSite: 'None' })
    res.status(200).json({ message: 'Logout successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}
