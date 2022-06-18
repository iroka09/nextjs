
export default async function handler(req, res) {
  // Check for secret to confirm this is a valid request
  let secret = process.env.secret || "7070"
  if (req.query.secret !== secret) {
    return res.status(401).json({ message: 'Invalid token'})
  }
  try {
    await res.unstable_revalidate('/'+req.query.path)
    return res.json({ message: "successful" })
  } 
  catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).json({message:'Error revalidating'})
  }
}