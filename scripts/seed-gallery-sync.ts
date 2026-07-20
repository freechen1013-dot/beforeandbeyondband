import { createClient } from '@sanity/client'
import { readFile } from 'fs/promises'

const client = createClient({
  projectId: '73xn8klv',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN!,
})

const images = [
  { file: 'public/IMG_3086.jpg', caption: 'Concert' },
  { file: 'public/F5B48205B391DB7A7802F49D2E1E40E1A1F7E5A5.jpeg', caption: 'Studio session' },
  { file: 'public/67AE669094D3D8F32327E5B44469ACD216CAD6B0.jpeg', caption: 'Performance' },
  { file: 'public/139B950DBEB791DEE7F7CB4451789B0916C4AF7A.jpeg', caption: 'Group photo' },
  { file: 'public/IMG_3092.JPG', caption: 'Performance at 耕莘醫院' },
  { file: 'public/IMG_20250420_101511.JPEG', caption: 'Ensemble rehearsal' },
  { file: 'public/IMG_3084.jpg', caption: 'Before and Beyond' },
]

async function upload(i: number) {
  const img = images[i]
  if (!img) return
  console.log(`[${i+1}/${images.length}] Uploading ${img.file}...`)
  const buf = await readFile(img.file)
  const asset = await client.assets.upload('image', buf, {
    filename: img.file.replace('public/', ''),
    contentType: 'image/jpeg',
  })
  const doc = await client.create({
    _type: 'galleryImage',
    caption: img.caption,
    placement: 'both',
    order: i,
    image: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } },
  })
  console.log(`[${i+1}/${images.length}] OK ${doc._id}`)
  if (i + 1 < images.length) await upload(i + 1)
}

upload(0).catch(console.error)
