import { ArrowDown, Orbit, Rocket, Sparkles } from 'lucide-react';
import type { LocationData } from '../types';
import { getSiteMedia, PLANETARY_MEDIA } from '../data/media';

interface Props {
  activeLocation: LocationData;
  onExplore: () => void;
}

export default function Intro({ activeLocation, onExplore }: Props) {
  const media = getSiteMedia(activeLocation.id);
  const planetary = PLANETARY_MEDIA;
  const backdrop = {
    backgroundImage: `linear-gradient(105deg, rgba(6,11,21,.98) 0%, rgba(6,11,21,.9) 42%, rgba(6,11,21,.68) 100%), url("${media.path}")`,
  };

  return (
    <section className="hero-shell hero-site-backdrop" style={backdrop}>
      <div className="hero-grid" aria-hidden="true" />
      <div className="mx-auto grid max-w-[1440px] gap-12 px-4 pb-20 pt-16 sm:px-6 md:pt-24 lg:grid-cols-[1.08fr_.92fr] lg:items-center lg:px-8 lg:pb-28">
        <div className="relative z-10">
          <div className="eyebrow">
            <span className="eyebrow-line" /> NASA Space Apps Challenge · research prototype
          </div>
          <h1 className="hero-title mt-7">
            Earth holds<br />
            <span className="hero-accent">clues</span> to other worlds.
          </h1>
          <p className="hero-copy mt-7">
            EXOKEMET helps researchers explore terrestrial environments that echo the terrain, geology, and processes of the Moon and Mars—with the evidence, uncertainty, and limitations kept in view.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={onExplore} className="primary-button">
              Explore candidate sites <ArrowDown className="h-4 w-4" />
            </button>
            <a href="#methodology" className="secondary-button">
              How the evidence works <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="mt-10 grid max-w-xl grid-cols-3 gap-3 border-t border-white/[0.1] pt-5">
            <div>
              <div className="metric-number">03</div>
              <div className="metric-label">candidate sites</div>
            </div>
            <div>
              <div className="metric-number">02</div>
              <div className="metric-label">mission lenses</div>
            </div>
            <div>
              <div className="metric-number">01</div>
              <div className="metric-label">transparent dataset</div>
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[560px] lg:ml-auto">
          <div className="orbit-panel">
            <div className="orbit-panel-top">
              <span className="text-[10px] uppercase tracking-[0.22em] text-slate-500">
                Signal map / {activeLocation.name}
              </span>
              <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-amber-200">
                <span className="live-dot" /> online
              </span>
            </div>
            <div className="planet-stage">
              <div className="planet-glow" aria-hidden="true" />
              <div className="planet-orbit-path planet-orbit-path-earth">
              <div className="planet-earth">
                <img
                  src={planetary.earth.path}
                  alt={planetary.earth.alt}
                  title={planetary.earth.credit}
                  width={768}
                  height={768}
                />
              </div>
              </div>
              <div className="planet-orbit-path planet-orbit-path-moon">
              <div className="planet-moon">
                <img
                  src={planetary.moon.path}
                  alt={planetary.moon.alt}
                  title={planetary.moon.credit}
                  width={768}
                  height={768}
                />
              </div>
              </div>
              <div className="planet-orbit-path planet-orbit-path-mars">
              <div className="planet-mars">
                <img
                  src={planetary.mars.path}
                  alt={planetary.mars.alt}
                  title={planetary.mars.credit}
                  width={768}
                  height={768}
                />
              </div>
              </div>
              <div className="orbit-ring orbit-ring-one" aria-hidden="true" />
              <div className="orbit-ring orbit-ring-two" aria-hidden="true" />
              <div className="orbit-sweep" aria-hidden="true" />
              <div className="orbit-label label-earth">
                <span className="label-dot bg-amber-300" /> Earth / signal origin
              </div>
              <div className="orbit-label label-moon">
                <span className="label-dot bg-slate-300" /> Moon / basalt · caves
              </div>
              <div className="orbit-label label-mars">
                <span className="label-dot bg-orange-300" /> Mars / wind · dust
              </div>
              <div className="orbit-center" aria-hidden="true">
                <Orbit className="h-4 w-4 text-amber-200" />
              </div>
              <div className="orbit-scale-note">Illustrative orbits · not to scale</div>
            </div>
            <div className="orbit-panel-bottom">
              <span>
                <span className="text-slate-500">Coverage</span> · 3 Earth analog candidates
              </span>
              <span className="flex items-center gap-1 text-amber-200">
                <Sparkles className="h-3.5 w-3.5" /> explainable by design
              </span>
            </div>
          </div>
          <div className="floating-callout">
            <Rocket className="h-4 w-4 text-amber-200" />
            <span>
              <strong className="text-white">No black-box score.</strong>
              <br />
              Open the profile. Follow the trail.
            </span>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1440px] items-center gap-3 px-4 pb-7 text-xs text-slate-500 sm:px-6 lg:px-8">
        <span className="h-px w-8 bg-amber-300/40" />
        Candidate analogs are not landing sites, habitat sites, or NASA endorsements.
        <span className="ml-auto hidden text-right text-[10px] text-slate-500 sm:inline">
          Backdrop: {media.title} · {media.license}
        </span>
      </div>
    </section>
  );
}
