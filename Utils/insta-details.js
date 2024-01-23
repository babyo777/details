import axios from "axios"
import cheerio from "cheerio"

async function scrapeInstagramProfile(username,res){
try {
  const data = await Promise.all(username.map(async username=>{
        const url = `https://www.instagram.com/${username}`
        const response = await axios.get(url)
        const $ = cheerio.load(response.data)
        const data = {
            username:username,
            fname:$('meta[property="og:title"]').attr("content")?.replace(` (@${username}) • Instagram photos and videos`,""),
            dp:$('meta[property="og:image"]').attr("content"),
            url:url
        }
        return data
    }))

    res.status(200).json(data)
} catch (error) {
    res.status(500).json(error.message)
}
}
export {scrapeInstagramProfile}