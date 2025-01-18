import { I18n } from 'i18n'
import path from 'node:path'
import { __dirname } from './utils.js'

const i18n = new I18n({
    locales: ['en', 'es'],
    directory: path.join(__dirname, '..', 'locales'),
    defaultLocale: 'en',
    autoReload: true, // watch changes in JSON files to reload locale on updates
    syncFiles: true // sync locale information across all files
})

export default i18n