const { exec } = require('child_process');

exec('tailscaled --tun=userspace-networking --state=/tmp/tailscale.state --socket=/tmp/tailscale.sock &', (err) => {
  if (err) {
    console.error('Failed to start tailscaled:', err);
    process.exit(1);
  }
  console.log('tailscaled started');

  exec(`tailscale up --authkey=${process.env.TAILSCALE_AUTHKEY} --hostname=railway-relay --accept-routes`, (err2) => {
    if (err2) {
      console.error('Failed to authenticate tailscale:', err2);
      process.exit(1);
    }
    console.log('tailscale authenticated');
    setInterval(() => {}, 1 << 30);
  });
});

