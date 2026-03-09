module.exports = {
  apps: [
    {
      name: "project-midnight-frontend",
      script: "node_modules/.bin/next",
      args: "start",
      cwd: "/var/www/project-midnight/frontend",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      max_memory_restart: "512M",
      error_file: "/var/log/pm2/midnight-frontend-error.log",
      out_file: "/var/log/pm2/midnight-frontend-out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
    },
  ],
};
