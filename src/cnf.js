import path from 'path'
import { fileURLToPath } from 'url'

const rootDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')

export default {
  port: 3000,
  rootDir: rootDir,
  dbConnectionString: `${rootDir}/db.sqlite3`,
  staticFilesDir: path.join(rootDir, 'src', 'public'),
  viewsDir: path.join(rootDir, 'src', 'views')
}
