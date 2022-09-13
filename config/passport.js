const passport = require('passport')
const player = require('../models/player')
const LocalStrategy = require('passport-local').Strategy

const Player = require('../models/player')

module.exports = app => {
  // 初始化 passport 模組
  app.use(passport.initialize())
  app.use(passport.session())
  // 設定本地登入策略
  passport.use(new LocalStrategy({ usernameField: 'playerName'}, (playerName, password, done) => {
    Player.findOne({ playerName: playerName })
      .then(user => {
        console.log('user', user)
        if (!user) {
          return done(null, false, { message: '這個帳號並不存在'})
        } 
        if (user.password !== password) {
          return done(null, false, { message: '密碼並不正確'})
        }
        return done(null, user)
      })
      .catch(error => done(error, false))
  }))
  // 序列化與反序列化
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    Player.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(error => done(error, null))
  })
}