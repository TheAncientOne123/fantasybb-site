// Keep the preload active if tsx starts a child process. This only changes
// behavior in restricted Windows shells where os.userInfo() itself fails.
const path = require('node:path')
const preload = path.join(__dirname, 'tsx-preload.cjs').replace(/\\/g, '/')
const preloadOption = `--require="${preload.replace(/"/g, '\\"')}"`
process.env.NODE_OPTIONS = [process.env.NODE_OPTIONS, preloadOption].filter(Boolean).join(' ')
require(preload)

import('tsx/cli')
