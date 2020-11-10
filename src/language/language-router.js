const express = require('express')
const LanguageService = require('./language-service')
const { requireAuth } = require('../middleware/jwt-auth')
const { LinkedList } = require('../Utils/LinkedList')

const languageRouter = express.Router()

const jsonBodyParser = express.json()

languageRouter
  .use(requireAuth)
  .use(async (req, res, next) => {
    try {
      const language = await LanguageService.getUsersLanguage(
        req.app.get('db'),
        req.user.id,
      )

      if (!language)
        return res.status(404).json({
          error: `You don't have any languages`,
        })

      req.language = language
      next()
    } catch (error) {
      next(error)
    }
  })

languageRouter
  .get('/', async (req, res, next) => {
    try {
      const words = await LanguageService.getLanguageWords(
        req.app.get('db'),
        req.language.id,
      )

      res.json({
        language: req.language,
        words,
      })
      next()
    } catch (error) {
      next(error)
    }
  })

languageRouter
  .get('/head', async (req, res, next) => {
    try {
      const db = req.app.get('db')
      const headId = req.language.head

      const head = await LanguageService.getLanguageHead(db, headId)

      res.json({
        nextWord: head[0].original,
        wordCorrectCount: head[0].correct_count,
        wordIncorrectCount: head[0].incorrect_count,
        totalScore: req.language.total_score,
      })

      next()

    } catch (e) {
      next(e)
    }
  })

languageRouter
  .post('/guess', jsonBodyParser, async (req, res, next) => {
    try {
      const { guess } = req.body
      // console.log(req.body.guess)

      if (!guess) {
        return res.status(400).json({ error: `Missing guess in request body` })
      }

      const list = new LinkedList()
      const db = req.app.get('db')
      let headWord = await LanguageService.getLanguageHead(db, req.language.head)
      let words = await LanguageService.getLanguageWords(db, req.language.id)
      list.insertFirst(headWord[0])

      while (headWord[0].next !== null) {
        let currNode = words.find(word => word.id === headWord[0].next)
        list.insertLast(currNode)
        headWord = [currNode]
      }

      let isCorrect

      if (list.head.value.translation === guess.toLowerCase()) {
        isCorrect = true
        list.head.value.memory_value *= 2
        list.head.value.correct_count++
        req.language.total_score++
      } else {
        isCorrect = false
        list.head.value.memory_value = 1
        list.head.value.incorrect_count++
      }

      const removedHead = list.head.value
      list.remove(list.head.value)
      list.insertAt(list, removedHead, removedHead.memory_value)

      let tempNode = list.head
      let head = tempNode.value.id

      while (tempNode !== null) {
        await LanguageService.updateWord(
          db,
          tempNode.value.id,
          {
            memory_value: tempNode.value.memory_value,
            correct_count: tempNode.value.correct_count,
            incorrect_count: tempNode.value.incorrect_count,
            next: tempNode.next !== null ? tempNode.next.value.id : null
          }
        )
        tempNode = tempNode.next
      }
      await LanguageService.updateLanguage(
        db,
        req.user.id,
        {
          total_score: req.language.total_score,
          head,
        }
      )

      const response = {
        nextWord: list.head.value.original,
        wordCorrectCount: list.head.value.correct_count,
        wordIncorrectCount: list.head.value.incorrect_count,
        totalScore: req.language.total_score,
        answer: removedHead.translation,
        isCorrect,
      }

      return res.status(200).json(response)
    } catch (e) {
      next(e)
    }
})

module.exports = languageRouter
