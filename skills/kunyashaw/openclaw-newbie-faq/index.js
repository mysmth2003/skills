const { spawn } = require('child_process');
const path = require('path');
const os = require('os');

const PORT = process.env.OPENCLAW_SKILL_PORT || 34567;
const SKILL_DIR = path.join(os.homedir(), '.openclaw', 'workspace', 'skills', 'openclaw-newbie-faq');

let serverProcess = null;

function startServer() {
  if (serverProcess) {
    console.log('服务器已在运行');
    return;
  }

  const serverPath = path.join(SKILL_DIR, 'server.js');
  
  serverProcess = spawn('node', [serverPath], {
    env: { ...process.env, OPENCLAW_SKILL_PORT: String(PORT) },
    detached: false,
    stdio: ['ignore', 'pipe', 'pipe']
  });

  serverProcess.stdout.on('data', (data) => {
    console.log(data.toString().trim());
  });

  serverProcess.stderr.on('data', (data) => {
    console.error(data.toString().trim());
  });

  serverProcess.on('error', (err) => {
    console.error('启动服务器失败:', err);
    serverProcess = null;
  });

  serverProcess.on('exit', (code) => {
    console.log(`服务器退出，代码: ${code}`);
    serverProcess = null;
  });

  console.log(`服务器已启动，PID: ${serverProcess.pid}`);
}

function stopServer() {
  if (serverProcess) {
    serverProcess.kill('SIGTERM');
    serverProcess = null;
    console.log('服务器已停止');
  } else {
    console.log('服务器未在运行');
  }
}

module.exports = {
  name: 'openclaw-newbie-faq',
  version: '1.0.24',
  displayName: 'openclaw新手帮帮忙',
  description: '为刚接触 OpenCLAW 的新手提供完整指南。安装后请说"启动新手帮助"来启动34567端口的Web服务',
  
  async activate() {
    console.log('正在启动 OpenCLAW 新手帮帮忙...');
    startServer();
    
    return {
      success: true,
      message: `OpenCLAW 新手帮帮忙已启动，访问地址: http://localhost:${PORT}`
    };
  },
  
  async deactivate() {
    stopServer();
    
    return {
      success: true,
      message: 'OpenCLAW 新手帮帮忙已停止'
    };
  },
  
  getWebUrl() {
    return `http://localhost:${PORT}`;
  }
};

if (require.main === module) {
  startServer();
}
