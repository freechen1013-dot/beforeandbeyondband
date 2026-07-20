import { createClient } from '@sanity/client'
import { readFile } from 'fs/promises'
import { extname } from 'path'

const client = createClient({
  projectId: '73xn8klv',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN!,
})

const images = [
  { file: 'public/IMG_3092.JPG', caption: 'Performance at 耕莘醫院' },
  { file: 'public/IMG_20250420_101511.JPEG', caption: 'Ensemble rehearsal' },
  { file: 'public/IMG_3084.jpg', caption: 'Before and Beyond' },
  { file: 'public/IMG_3086.jpg', caption: 'Concert' },
  { file: 'public/F5B48205B391DB7A7802F49D2E1E40E1A1F7E5A5.jpeg', caption: 'Studio session' },
  { file: 'public/67AE669094D3D8F32327E5B44469ACD216CAD6B0.jpeg', caption: 'Performance' },
  { file: 'public/139B950DBEB791DEE7F7CB4451789B0916C4AF7A.jpeg', caption: 'Group photo' },
]

async function main() {
  for (const img of images) {
    const ext = extname(img.file).toLowerCase()
    const mime = ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' : 'image/png'

    const buffer = await readFile(img.file)
    const asset = await client.assets.upload('image', buffer, {
      filename: img.file.replace('public/', ''),
      contentType: mime,
    })

    const doc = await client.create({
      _type: 'galleryImage',
      caption: img.caption,
      placement: 'both',
      order: images.indexOf(img),
      image: {
        _type: 'image',
        asset: { _type: 'reference', _ref: asset._id },
      },
    })
    console.log(`Uploaded: ${img.file} → ${doc._id}`)
  }
  console.log('Done!')
}

main().catch(console.error)
