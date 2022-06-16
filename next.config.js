module.exports = ({
  swcMinify: false, // it should be false by default 
  env: {
    developer: "Iroka Ntomchukwu"
  },
  images: {
    domains: ["picsum.photos"]
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  api:  {
    bodyParser: {
      sizeLimit: '1mb',
    } || false, //for ./pages/api/***.js routes
  },
})