/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
   MD_U:'muha',
   MD_P:'eT3PL1oLFq9dvXnG',
   MD_C:'transparent', 
   MD_D:'projects-overview' ,
   NEXTAUTH_SECRET: "secretXXx1",
   SECRET_ROLE: "whatIsYoursRole",
   DATABASE_URL: 'mongodb+srv://muha:eT3PL1oLFq9dvXnG@transparent.1bqbu.mongodb.net/projects-overview?retryWrites=true&w=majority',
  }
}

module.exports = nextConfig