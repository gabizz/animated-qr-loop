module.exports = {
  apps: [{
    name: "animated-qr-loop",
    script: 'npm run build && npm start',
    env_production: {
      NEXT_PUBLIC_BASE_URL: "https://qr.devgate.ro",
     
    }
  }]
}
