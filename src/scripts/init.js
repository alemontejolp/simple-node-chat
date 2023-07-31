// const fs = require('fs')
// const cnf = require('../cnf')
// const path = require('path')
import fs from 'fs'
import cnf from '../cnf.js'
import path from 'path'
import db from '../data_access/sqlite.js'

function initDatabase() {
  // const db = require('../data-access/sqlite')
  const scriptsDir = path.join(cnf.rootDir, 'src', 'scripts')
  const tablesDefinition = fs.readFileSync(path.join(scriptsDir, 'db-schema.sql'), { encoding: 'utf8' })
  // const demoData = fs.readFileSync(path.join(scriptsDir, 'demo-data.sql'), { encoding: 'utf8' })
  db.exec(tablesDefinition)
  // db.exec(demoData)
}

export default function() {
  try {
    // Testing if the sqlite DB exists and the process can read and write.
    // fs.accessSync(cnf.dbConnectionString, fs.constants.R_OK | fs.constants.W_OK)
    // console.log('Database exists and the process can read and write it.')
    console.log('Trying to initialize the database.')
    initDatabase()
    console.log('Database setup done.')
  } catch(err) {
    switch(err.code) {
      // case 'ENOENT':
      //   console.log('Database file does not exists. Creating and initializing.')
      //   initDatabase()
      //   console.log('Database setup done.')
      //   break
      default:
        console.log(`Error: ${err.code} -> ${err.message}`)
        console.log('Refusing to start the application.')
        process.exit(1)
    }
  }
}
