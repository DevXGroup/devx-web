import fs from 'fs'
import path from 'path'
import https from 'https'
import { promisify } from 'util'

// Project data
const projectsData = {
  projects: [
    {
      name: 'Joyful',
      description:
        'Joyful is a Qatari confectionery store whose job is to sell flowers, snacks, chocolates and cakes.',
      banner_image: '/assets/images/projects/banners/joyful.webp',
      preview_image: '/assets/images/projects/mocks/joyful.webp',
      project_url: '/projects/all/joyful',
      category: 'E-commerce/Confectionery',
    },
    {
      name: 'Lazurd',
      description:
        "The word 'Lazurd' is derived from the semi-precious stone called 'Lapis Lazuli'. This stone's beauty, and unique deep blue colour, distinguishes it from all other stones- including precious ones.",
      banner_image: '/assets/images/projects/banners/lazurd.webp',
      preview_image: '/assets/images/projects/mocks/lazurd.webp',
      project_url: '/projects/all/lazurd',
      category: 'Luxury/Jewelry',
    },
    {
      name: 'JoyJoy',
      description:
        'Begin your journey of inspiration and daily affirmations, tailored just for you, with our mobile application JoyJoy.',
      banner_image: '/assets/images/projects/banners/joyjoy.webp',
      preview_image: '/assets/images/projects/mocks/joyjoy.webp',
      project_url: '/projects/all/joyjoy',
      category: 'Mobile App/Wellness',
    },
    {
      name: 'ChatFly',
      description:
        'ChatFly combines powerful AI with a user-friendly interface. The simplicity and power of AI communication provide a pleasant user experience with features such as auto-response reading.',
      banner_image: '/assets/images/projects/banners/chatfly.webp',
      preview_image: '/assets/images/projects/mocks/chatfly.webp',
      project_url: '/projects/all/chatfly',
      category: 'AI/Communication',
    },
    {
      name: 'Lawazm',
      description:
        'A distinguished electronic platform in Kuwait and The Middle East for household products, baby & children needs.',
      banner_image: '/assets/images/projects/banners/lawazm.webp',
      preview_image: '/assets/images/projects/mocks/lawazm.webp',
      project_url: '/projects/all/lawazm',
      category: 'E-commerce/Household',
    },
    {
      name: 'I Love Food (ILF)',
      description:
        'I love food app is the simplest and most effective healthy eating & weight loss app',
      banner_image: '/assets/images/projects/banners/ilf.webp',
      preview_image: '/assets/images/projects/mocks/ilf.webp',
      project_url: '/projects/all/ilf',
      category: 'Health/Fitness',
    },
    {
      name: 'Chayyel',
      description:
        'Chayyel is a start-up Co. about gaming that wants to expand the company all over the world.',
      banner_image: '/assets/images/projects/banners/chayyel.webp',
      preview_image: '/assets/images/projects/mocks/chayyel.webp',
      project_url: '/projects/all/chayyel',
      category: 'Gaming/Startup',
    },
    {
      name: 'LetsPass',
      description: 'LetsPass is a platform founded for online education.',
      banner_image: '/assets/images/projects/banners/letspass.webp',
      preview_image: '/assets/images/projects/mocks/letspass.webp',
      project_url: '/projects/all/letspass',
      category: 'Education/E-learning',
    },
    {
      name: 'Zahra Farm',
      description: 'Buy organic products Rent plots for planting Visit greenhouses and rent huts',
      banner_image: '/assets/images/projects/banners/zahrafarm.webp',
      preview_image: '/assets/images/projects/mocks/zahrafarm.webp',
      project_url: '/projects/all/zahrafarm',
      category: 'Agriculture/Organic',
    },
    {
      name: 'Kanii',
      description:
        'Kanii is a Company for the mobile vans that provide some services for the customers.',
      banner_image: '/assets/images/projects/banners/kanii.webp',
      preview_image: '/assets/images/projects/mocks/kanii.webp',
      project_url: '/projects/all/kanii',
      category: 'Service/Mobile',
    },
    {
      name: 'Aljawda',
      description:
        'Aljawda Provide a wide variety and the finest quality with affordable prices that wanted to empower their business through mobile applications and website',
      banner_image: '/assets/images/projects/banners/aljawda.webp',
      preview_image: '/assets/images/projects/mocks/aljawda.webp',
      project_url: '/projects/all/aljawda',
      category: 'E-commerce/Quality Products',
    },
    {
      name: 'Jawaherji',
      description:
        'Are you looking for stunning jewelry that will catch the eye of any viewer? Then, this is the right place for you.',
      banner_image: '/assets/images/projects/banners/jawaherji.webp',
      preview_image: '/assets/images/projects/mocks/jawaherji.webp',
      project_url: '/projects/all/jawaherji',
      category: 'Jewelry/Luxury',
    },
  ],
}

const BASE_URL = 'https://tatbiqit.com'

// Create directories
const createDirectories = () => {
  const dirs = [
    './public/images/portfolio',
    './public/images/portfolio/banners',
    './public/images/portfolio/previews',
  ]
  dirs.forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
      console.log(`Created directory: ${dir}`)
    }
  })
}

// Download function
const downloadImage = async (url, filepath) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath)

    https
      .get(url, (response) => {
        if (response.statusCode !== 200) {
          reject(new Error(`Failed to download ${url}: ${response.statusCode}`))
          return
        }

        response.pipe(file)

        file.on('finish', () => {
          file.close()
          console.log(`Downloaded: ${path.basename(filepath)}`)
          resolve()
        })

        file.on('error', (err) => {
          fs.unlink(filepath, () => {}) // Delete file on error
          reject(err)
        })
      })
      .on('error', (err) => {
        reject(err)
      })
  })
}

// Main download function
const downloadAllImages = async () => {
  console.log('Starting image downloads...\n')

  createDirectories()

  let downloadCount = 0
  let errorCount = 0

  for (const project of projectsData.projects) {
    const projectName = project.name.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '')

    // Download banner image
    try {
      const bannerUrl = BASE_URL + project.banner_image
      const bannerPath = `./public/images/portfolio/banners/${projectName}-banner.webp`
      await downloadImage(bannerUrl, bannerPath)
      downloadCount++
    } catch (err) {
      console.error(`Error downloading banner for ${project.name}:`, err.message)
      errorCount++
    }

    // Download preview image
    try {
      const previewUrl = BASE_URL + project.preview_image
      const previewPath = `./public/images/portfolio/previews/${projectName}-preview.webp`
      await downloadImage(previewUrl, previewPath)
      downloadCount++
    } catch (err) {
      console.error(`Error downloading preview for ${project.name}:`, err.message)
      errorCount++
    }

    // Small delay to be respectful to the server
    await new Promise((resolve) => setTimeout(resolve, 500))
  }

  console.log(`\nDownload completed!`)
  console.log(`Successfully downloaded: ${downloadCount} images`)
  console.log(`Errors: ${errorCount}`)

  // Update project data with local paths
  const updatedProjectsData = {
    ...projectsData,
    projects: projectsData.projects.map((project) => {
      const projectName = project.name.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '')
      return {
        ...project,
        local_banner_image: `/images/portfolio/banners/${projectName}-banner.webp`,
        local_preview_image: `/images/portfolio/previews/${projectName}-preview.webp`,
        original_banner_url: BASE_URL + project.banner_image,
        original_preview_url: BASE_URL + project.preview_image,
      }
    }),
  }

  // Save updated data
  fs.writeFileSync(
    './helper/projects-with-local-images.json',
    JSON.stringify(updatedProjectsData, null, 2)
  )
  console.log('\nSaved updated project data to: helper/projects-with-local-images.json')
}

// Alternative: Using fetch (modern approach)
const downloadWithFetch = async () => {
  console.log('Starting downloads with fetch...\n')

  createDirectories()

  for (const project of projectsData.projects) {
    const projectName = project.name.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '')

    try {
      // Banner
      const bannerResponse = await fetch(BASE_URL + project.banner_image)
      if (bannerResponse.ok) {
        const bannerBuffer = await bannerResponse.arrayBuffer()
        fs.writeFileSync(
          `./public/images/portfolio/banners/${projectName}-banner.webp`,
          Buffer.from(bannerBuffer)
        )
        console.log(`Downloaded: ${projectName}-banner.webp`)
      }

      // Preview
      const previewResponse = await fetch(BASE_URL + project.preview_image)
      if (previewResponse.ok) {
        const previewBuffer = await previewResponse.arrayBuffer()
        fs.writeFileSync(
          `./public/images/portfolio/previews/${projectName}-preview.webp`,
          Buffer.from(previewBuffer)
        )
        console.log(`Downloaded: ${projectName}-preview.webp`)
      }

      await new Promise((resolve) => setTimeout(resolve, 500))
    } catch (err) {
      console.error(`Error downloading images for ${project.name}:`, err.message)
    }
  }
}

// Run the downloader
console.log('Portfolio Images Downloader')
console.log('===========================\n')

// Choose your preferred method:
downloadAllImages().catch(console.error)

// Or use the fetch version:
// downloadWithFetch().catch(console.error);

export { downloadAllImages, downloadWithFetch, projectsData }
