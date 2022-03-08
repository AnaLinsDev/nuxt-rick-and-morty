const middleware = {}

middleware['adminAuth'] = require('..\\middleware\\adminAuth.js')
middleware['adminAuth'] = middleware['adminAuth'].default || middleware['adminAuth']

middleware['auth'] = require('..\\middleware\\auth.js')
middleware['auth'] = middleware['auth'].default || middleware['auth']

export default middleware
