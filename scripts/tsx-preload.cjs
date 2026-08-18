if (typeof process.geteuid !== 'function') {
  process.geteuid = () => 0
}

const os = require('node:os')
try {
  os.userInfo()
} catch {
  os.userInfo = () => ({
    uid: -1,
    gid: -1,
    username: process.env.USERNAME || 'node',
    homedir: process.env.USERPROFILE || process.cwd(),
    shell: null,
  })
}
