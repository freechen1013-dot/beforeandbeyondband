'use client'

import { useState, useRef, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import * as d3 from 'd3'

const genres = ["Classical", "Taiwanese Folk", "Chinese Pop", "Contemporary Classical", "Pop", "Original"]

const songs = [
  { title: "Canon in D", composer: "Pachelbel", year: 1680, genre: "Classical", era: "Baroque", description: "One of the most famous classical pieces ever written, Pachelbel's Canon features three violins playing a canon over a ground bass. Rediscovered in the 20th century, it has become a wedding staple worldwide.", performances: 2 },
  { title: "月亮代表我的心", composer: "翁清溪 / 孫儀", year: 1972, genre: "Chinese Pop", era: "20th Century", description: "Originally sung by 陳芬蘭 in 1972, this song became a global Chinese classic when Teresa Teng rerecorded it in 1977. It remains one of the most covered Chinese songs of all time.", performances: 2 },
  { title: "望春風", composer: "鄧雨賢 / 李臨秋", year: 1933, genre: "Taiwanese Folk", era: "Early 20th Century", description: "A iconic Taiwanese folk song composed during Japanese rule. Its pentatonic melody captures the含蓄 beauty of a young woman's longing for love. Voted #1 most beloved oldie in Taiwan.", performances: 1 },
  { title: "明天會更好", composer: "羅大佑", year: 1985, genre: "Chinese Pop", era: "20th Century", description: "Taiwan's answer to 'We Are the World', this charity single brought together 60 artists. Its message of hope resonates across generations.", performances: 1 },
  { title: "River Flows in You", composer: "Yiruma (이루마)", year: 2001, genre: "Contemporary Classical", era: "21st Century", description: "Yiruma's most famous piano piece, inspired by Riverdance. Gained worldwide fame after being featured in Twilight. A modern piano classic.", performances: 1 },
  { title: "如願", composer: "錢雷 / 唐恬", year: 2021, genre: "Chinese Pop", era: "21st Century", description: "Performed by Faye Wong for the film 'My Country, My Parents'. Won multiple awards and became an anthem of跨generational传承.", performances: 1 },
  { title: "golden hour", composer: "JVKE", year: 2022, genre: "Pop", era: "21st Century", description: "JVKE's breakout hit that went viral on TikTok. A dreamy piano ballad about young love, inspired by Franz Liszt and Frank Ocean.", performances: 1 },
  { title: "繼續走", composer: "瑞Rui", year: 2025, genre: "Original", era: "21st Century", description: "Original composition by band member 瑞Rui. Created through the 'Three Notes to a Song' challenge. A testament to our band's creative spirit.", performances: 1 },
]

const images = [
  "/IMG_3092.JPG",
  "/IMG_20250420_101511.JPEG",
  "/IMG_3084.jpg",
  "/IMG_3086.jpg",
  "/F5B48205B391DB7A7802F49D2E1E40E1A1F7E5A5.jpeg",
  "/67AE669094D3D8F32327E5B44469ACD216CAD6B0.jpeg",
  "/139B950DBEB791DEE7F7CB4451789B0916C4AF7A.jpeg",
]

const videos = ["/IMG_3059.mp4", "/IMG_3077.mp4"]

const genreColors: Record<string, string> = {
  "Classical": "#8B5CF6",
  "Taiwanese Folk": "#10B981",
  "Chinese Pop": "#F59E0B",
  "Contemporary Classical": "#3B82F6",
  "Pop": "#EC4899",
  "Original": "#F97316",
}

type Song = (typeof songs)[0]

export default function ShowsPage() {
  const t = useTranslations('shows')
  const [selectedSong, setSelectedSong] = useState<Song | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return

    const container = containerRef.current
    const width = container.clientWidth
    const height = 520
    const margin = { top: 40, right: 30, bottom: 60, left: 170 }
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    d3.select(svgRef.current).selectAll('*').remove()

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .style('max-width', '100%')
      .style('display', 'block')

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    const xScale = d3.scaleLinear()
      .domain([1680, 2030])
      .range([0, innerWidth])

    const yScale = d3.scalePoint<string>()
      .domain(genres)
      .range([0, innerHeight])
      .padding(0.5)

    const rScale = d3.scaleSqrt<number>()
      .domain([1, 2])
      .range([8, 16])

    g.append('g')
      .attr('class', 'grid')
      .attr('stroke', '#ffffff15')
      .attr('stroke-dasharray', '4')
      .selectAll('line')
      .data(xScale.ticks())
      .join('line')
      .attr('x1', d => xScale(d))
      .attr('x2', d => xScale(d))
      .attr('y1', 0)
      .attr('y2', innerHeight)

    const xAxis = g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale)
        .tickValues([1650, 1700, 1750, 1800, 1850, 1900, 1950, 2000, 2025])
        .tickFormat(d3.format('d') as any)
      )

    xAxis.selectAll('path,line').attr('stroke', '#64748b')
    xAxis.selectAll('text').attr('fill', '#94a3b8').attr('font-size', '12')

    const yAxis = g.append('g')
      .call(d3.axisLeft(yScale))

    yAxis.selectAll('path,line').attr('stroke', '#64748b')
    yAxis.selectAll('text').attr('fill', '#94a3b8').attr('font-size', '12')

    g.selectAll('circle')
      .data(songs)
      .join('circle')
      .attr('cx', d => xScale(d.year))
      .attr('cy', d => yScale(d.genre)!)
      .attr('r', d => rScale(d.performances))
      .attr('fill', d => genreColors[d.genre])
      .attr('opacity', 0.85)
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 1.5)
      .style('cursor', 'pointer')
      .on('click', (_event: any, d: Song) => setSelectedSong(d))

    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 5])
      .on('zoom', (event) => {
        g.attr('transform', event.transform)
      })

    svg.call(zoom)
  }, [])

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 space-y-20">
      <h1 className="text-4xl md:text-5xl font-bold text-center">
        {t('title')}
      </h1>

      <section>
        <h2 className="text-2xl font-semibold mb-6 text-blue-300">
          {t('gallery')}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((src, i) => (
            <div key={i} className="aspect-[4/3] overflow-hidden rounded-lg bg-[#000060]">
              <img
                src={src}
                alt={`Gallery image ${i + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
          {videos.map((src, i) => (
            <div key={`v${i}`} className="aspect-[4/3] overflow-hidden rounded-lg bg-[#000060]">
              <video
                src={src}
                controls
                className="w-full h-full object-cover"
                preload="metadata"
              />
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2 text-blue-300">
          {t('eraDiagram')}
        </h2>
        <p className="text-zinc-400 text-sm mb-6">
          {t('eraDescription')}
        </p>
        <div
          ref={containerRef}
          className="w-full bg-[#000050] rounded-lg p-4 border border-blue-900/40 overflow-hidden"
        >
          <svg ref={svgRef} />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6 text-blue-300">
          {t('repertoire')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {songs.map((song, i) => (
            <div
              key={i}
              className="bg-[#000060] rounded-lg p-5 border border-blue-900/40 hover:border-blue-500/50 transition-colors"
            >
              <h3 className="text-lg font-semibold mb-1">{song.title}</h3>
              <p className="text-sm text-zinc-400 mb-2">{song.composer}</p>
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <span>{song.year}</span>
                <span className="text-zinc-600">·</span>
                <span style={{ color: genreColors[song.genre] }}>
                  {song.genre}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedSong && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          onClick={() => setSelectedSong(null)}
        >
          <div
            className="bg-[#000060] border border-blue-500/40 rounded-xl p-6 max-w-md w-full shadow-2xl relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-zinc-400 hover:text-white text-2xl leading-none"
              onClick={() => setSelectedSong(null)}
            >
              ×
            </button>
            <h3 className="text-xl font-bold mb-1 pr-6">
              {selectedSong.title}
            </h3>
            <p className="text-sm text-zinc-400 mb-3">
              {selectedSong.composer}
            </p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-500 mb-4">
              <span>{selectedSong.year}</span>
              <span className="text-zinc-600">·</span>
              <span>{selectedSong.era}</span>
              <span className="text-zinc-600">·</span>
              <span style={{ color: genreColors[selectedSong.genre] }}>
                {selectedSong.genre}
              </span>
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed mb-3">
              {selectedSong.description}
            </p>
            <p className="text-xs text-zinc-500">
              {`Performances: ${selectedSong.performances}`}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
