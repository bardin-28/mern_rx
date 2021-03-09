const {Router} = require('express')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const router = Router()


// /api/auth/register
router.post(
  '/register',
  [
    check('email', 'Некорректный Email').isEmail(),
    check('password', 'Минимальная длина пароля 6 символов').isLength({ min: 6 })
  ],
  async (req, res)=>{
  try{
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array(),
            message: errors.array()[0].msg
        })
    }

    let {email, password} = req.body
    email = email.toLowerCase()

    const candidate = await User.findOne({ email })

    if(candidate){

      return res.status(400).json({message: 'Такой пользователь уже существует'})

    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const user = new User({ email, password: hashedPassword})

    await user.save()

    res.status(201).json({message: 'Пользователь создан'})

  }catch (e){

    res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})

  }
})

// /api/auth/login
router.post(
  '/login',
  [
    check('email', 'Неверный email').isEmail(),
    check('password', 'Неверный пароль').exists()
  ],
  async (req, res)=>{

    try{
      const errors = validationResult(req)

      if(!errors.isEmpty()){
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные'
        })
      }

      let {email, password} = req.body
      email = email.toLowerCase()

      const user = await User.findOne({ email })

      if(!user){
        return res.status(400).json({ message: 'Неверный логин или пароль'})
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if(!isMatch){
        return res.status(400).json({ message: 'Неверный логин или пароль'})
      }
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        {expiresIn: '5h'}
        )

      res.json({token, userId: user._id})

    }catch (e){

      res.status(500).json({e, message: 'Что-то пошло не так, попробуйте снова'})

    }
})



module.exports = router
