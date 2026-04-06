module.exports = {
  apps: [
    {
      name: "BI_Assignment_Backend",
      script: "src/index.js",
      cwd: "/root/apps/BI_Assignment_backend",
      max_restarts: 5,
      min_uptime: "10s",
    },
  ],
};
