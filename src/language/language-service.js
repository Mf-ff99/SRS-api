const LanguageService = {
  getUsersLanguage(db, user_id) {
    return db
      .from('language')
      .select(
        'language.id',
        'language.name',
        'language.user_id',
        'language.head',
        'language.total_score',
      )
      .where('language.user_id', user_id)
      .first()
  },

  getLanguageWords(db, language_id) {
    return db
      .from('word')
      .select(
        'id',
        'language_id',
        'original',
        'translation',
        'next',
        'memory_value',
        'correct_count',
        'incorrect_count',
      )
      .where({ language_id })
  },

  getLanguageHead(db, headId) {
    return db
      .from('word')
      .select('*')
      .where('id', headId)
  },

  updateLanguage(db, user_id, newLanguageFields) {
    return db
      .from('language')
      .where( { user_id })
      .update(newLanguageFields)
  },

  updateWord(db, word_id, updatedField) {
    return db
      .from('word')
      .where('id', word_id)
      .update(updatedField)
  }
}

module.exports = LanguageService
