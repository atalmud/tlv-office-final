import { useMemo, useState } from 'react'
import { offices, type Office } from './data/offices'
import './App.css'

type MediaItem =
  | { type: 'video'; src: string; poster?: string; label: string }
  | { type: 'photo'; src: string; label: string }
  | { type: 'plan'; src: string; label: string }

function formatIls(n: number) {
  return `₪${n.toLocaleString('en-IL')}`
}

/** Bust browser cache after media renames (Vite public/ URLs are otherwise sticky). */
const MEDIA_V = '20261109b'

function mediaUrl(src: string) {
  const base = import.meta.env.BASE_URL
  const path = src.replace(/^\//, '')
  return `${base}${path}?v=${MEDIA_V}`
}

function mediaItems(office: Office): MediaItem[] {
  const items: MediaItem[] = []
  // Cover photo first so gallery matches card covers after renames
  office.photos.forEach((src, i) => {
    items.push({ type: 'photo', src: mediaUrl(src), label: `Photo ${i + 1}` })
  })
  if (office.floorplan) {
    items.push({
      type: 'plan',
      src: mediaUrl(office.floorplan),
      label: 'Floor plan',
    })
  }
  for (const v of office.videos) {
    items.push({
      type: 'video',
      src: mediaUrl(v.src),
      poster: v.poster ? mediaUrl(v.poster) : undefined,
      label: v.label,
    })
  }
  return items
}

export default function App() {
  const ready = offices.filter((o) => o.ready)
  const [selectedId, setSelectedId] = useState(ready[0]?.id ?? offices[0].id)
  const [mediaIndex, setMediaIndex] = useState(0)

  const selected = useMemo(
    () => offices.find((o) => o.id === selectedId) ?? offices[0],
    [selectedId],
  )

  const media = selected.ready ? mediaItems(selected) : []
  const active = media[mediaIndex] ?? media[0]

  function openOffice(office: Office) {
    if (!office.ready) return
    setSelectedId(office.id)
    setMediaIndex(0)
    requestAnimationFrame(() => {
      document.getElementById('detail')?.scrollIntoView({ behavior: 'smooth' })
    })
  }

  return (
    <div className="app">
      <header className="hero" aria-label="Final three offices">
        <p className="brand">TLV Final Three</p>
        <p>
          Pricing, perks, floor plans, and tour videos for the three finalists.
        </p>
      </header>

      <aside className="tax-note" aria-label="Tax note for all options">
        <span className="tax-note__label">Tax note</span>
        <p>
          If we qualify for the municipal Software House exemption, we can get a
          discount on Arnona (property tax) across any of these options, which
          will shave a few thousand shekels off the monthly totals.
        </p>
      </aside>

      <section className="picks" aria-label="Shortlist">
        {offices.map((office) => (
          <button
            key={office.id}
            type="button"
            className={`pick${selectedId === office.id ? ' is-active' : ''}${
              office.ready ? '' : ' is-locked'
            }`}
            onClick={() => openOffice(office)}
          >
            <div className="pick__media">
              {office.ready && office.photos[0] ? (
                <img src={mediaUrl(office.photos[0])} alt="" />
              ) : (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'grid',
                    placeItems: 'center',
                    color: '#5a6672',
                    background: '#e4ebe7',
                  }}
                >
                  Waiting for details
                </div>
              )}
            </div>
            <div className="pick__body">
              <div className="pick__num">Option {office.number}</div>
              <h3>{office.name}</h3>
              <p>
                {office.ready
                  ? `${office.subtitle} · ${office.sqm} sqm`
                  : office.subtitle}
              </p>
            </div>
          </button>
        ))}
      </section>

      {selected.ready ? (
        <section className="detail" id="detail">
          <div className="gallery">
            {active?.type === 'video' ? (
              <video
                key={active.src}
                className="gallery__main"
                src={active.src}
                poster={active.poster}
                controls
                playsInline
              />
            ) : active ? (
              <img
                className={`gallery__main${
                  active.type === 'photo' ? ' gallery__main--img' : ''
                }`}
                src={active.src}
                alt={active.label}
              />
            ) : null}

            {active?.type === 'video' && active.label && (
              <p className="gallery__caption">{active.label}</p>
            )}

            {media.length > 1 && (
              <div className="gallery__thumbs">
                {media.map((item, index) => (
                  <button
                    key={`${item.type}-${item.src}`}
                    type="button"
                    className={index === mediaIndex ? 'is-active' : ''}
                    onClick={() => setMediaIndex(index)}
                    aria-label={item.label}
                  >
                    {item.type === 'video' ? (
                      <>
                        {item.poster ? (
                          <img src={item.poster} alt="" />
                        ) : (
                          <span className="thumb-label">Video</span>
                        )}
                        <span className="thumb-label">▶</span>
                      </>
                    ) : (
                      <img src={item.src} alt="" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="detail__body">
            <div>
              <div className="pick__num">Option {selected.number}</div>
              <h2>
                {selected.name} · {selected.subtitle}
              </h2>
              <p className="meta">{selected.address}</p>
            </div>

            <div className="pricing">
              {selected.pricing.map((tier, index) => (
                <div
                  key={tier.label}
                  className={`price-card${
                    /inclusive|all-in/i.test(tier.label) ||
                    index === selected.pricing.length - 1
                      ? ' is-featured'
                      : ''
                  }`}
                >
                  <span>{tier.label}</span>
                  <strong>{formatIls(tier.amountIls)}/mo</strong>
                  <p>{tier.note}</p>
                </div>
              ))}
            </div>

            <div className="facts">
              <div>
                <span>Size</span>
                <strong>
                  {selected.sqm} sqm · ~{selected.sqft.toLocaleString()} sq ft
                </strong>
              </div>
              <div>
                <span>Floor</span>
                <strong>{selected.floor}</strong>
              </div>
              <div>
                <span>Term</span>
                <strong>{selected.term}</strong>
              </div>
            </div>

            <ul className="perks">
              {selected.perks.map((perk) => (
                <li key={perk}>{perk}</li>
              ))}
            </ul>
          </div>
        </section>
      ) : (
        <div className="waiting">
          <strong>Option {selected.number} is next</strong>
          Send the details and media in chat and I’ll drop them in.
        </div>
      )}
    </div>
  )
}
