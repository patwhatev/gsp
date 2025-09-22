import fs from 'fs'
import matter from 'gray-matter'

export default function getPostMetadata(basePath) {
    const folder = basePath + '/'
    const files = fs.readdirSync(folder)
    const markdownPosts = files.filter(file => file.endsWith('.md'))

    // get the file data
    const posts = markdownPosts.map((filename) => {
        const fileContents = fs.readFileSync(`${basePath}/${filename}`, 'utf8')
        const matterResult = matter(fileContents)
        return {
            title: matterResult.data.title,
            date: matterResult.data.date,
            img_path: matterResult.data.img_path,
            bio: matterResult.data.description,
            slug: filename.replace('.md', '')
        }
    })
    return posts.sort((a, b) => {
        // Extract year from filename (format: yyyy-mm-dd-title.md)
        const yearA = parseInt(a.slug.split('-')[0])
        const yearB = parseInt(b.slug.split('-')[0])

        if (yearA !== yearB) {
            return yearB - yearA // Sort by year descending
        }

        // If same year, sort by month from filename
        const monthA = parseInt(a.slug.split('-')[1])
        const monthB = parseInt(b.slug.split('-')[1])

        if (monthA !== monthB) {
            return monthB - monthA // Sort by month descending
        }

        // If same year and month, sort by day from filename
        const dayA = parseInt(a.slug.split('-')[2])
        const dayB = parseInt(b.slug.split('-')[2])

        return dayB - dayA // Sort by day descending
    })
}