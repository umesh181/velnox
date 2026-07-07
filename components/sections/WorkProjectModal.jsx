'use client';

export default function WorkProjectModal({
  project,
  viewingDesign,
  onClose,
  onViewDesign,
  onBackToOptions,
}) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-gutter bg-black/60 backdrop-blur-md animate-modal-fade">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes modal-fade-in {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes modal-scale-in {
              from { transform: scale(0.95); opacity: 0; }
              to { transform: scale(1); opacity: 1; }
            }
            .animate-modal-fade {
              animation: modal-fade-in 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }
            .animate-modal-scale {
              animation: modal-scale-in 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }
          `,
        }}
      />
      <div className="relative w-full max-w-lg overflow-hidden rounded-[24px] bg-[#fdfcfa] border border-line text-ink p-8 shadow-2xl animate-modal-scale">
        <button
          onClick={onClose}
          className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-transparent hover:bg-ink hover:text-bg transition-colors duration-300 cursor-pointer"
          aria-label="Close modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {!viewingDesign ? (
          <div className="flex flex-col gap-6 pt-4">
            <div>
              <p className="eyebrow mb-2">Project Case Study</p>
              <h3 className="text-3xl font-bold tracking-tight uppercase">{project.name}</h3>
              <p className="mt-3 text-ink-60 text-sm leading-relaxed">
                We designed and developed the entire digital experience for {project.name}. How
                would you like to explore this project?
              </p>
            </div>

            <div className="flex flex-col gap-4 mt-2">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="btn-pill justify-center text-center py-4 w-full"
              >
                <span>Visit Live Website ↗</span>
              </a>

              <button
                onClick={onViewDesign}
                className="btn-outline justify-center py-4 w-full cursor-pointer"
              >
                <span>View Design Presentation {project.designUrl ? '↗' : ''}</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6 pt-4">
            <div>
              <button
                onClick={onBackToOptions}
                className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink-60 hover:text-ink transition-colors duration-200 mb-4 cursor-pointer"
              >
                ← Back to Options
              </button>
              <h3 className="text-2xl font-bold uppercase">{project.name} / Design Work</h3>
              <p className="text-ink-60 text-xs mt-1">
                High-fidelity web & mobile design mockups (Click to enlarge)
              </p>
            </div>

            {project.mockups.single ? (
              <div
                onClick={() => window.open(project.mockups.single, '_blank')}
                className="group relative overflow-hidden rounded-xl border border-line bg-bg-soft aspect-[3/2] flex items-center justify-center p-2 cursor-zoom-in"
                title="Click to view full resolution"
              >
                <img
                  src={project.mockups.single}
                  alt="Design Mockup"
                  loading="lazy"
                  decoding="async"
                  className="max-h-full max-w-full object-contain rounded transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-2 left-2 bg-ink/75 text-[10px] text-bg font-semibold px-2 py-0.5 rounded">
                  Full View
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 mt-2 max-[500px]:grid-cols-1">
                <div
                  onClick={() => window.open(project.mockups.laptop, '_blank')}
                  className="group relative overflow-hidden rounded-xl border border-line bg-bg-soft aspect-[3/2] flex items-center justify-center p-2 cursor-zoom-in"
                  title="Click to view full resolution"
                >
                  <img
                    src={project.mockups.laptop}
                    alt="Laptop Design View"
                    width={1200}
                    height={800}
                    loading="lazy"
                    decoding="async"
                    className="max-h-full max-w-full object-contain rounded transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-2 left-2 bg-ink/75 text-[10px] text-bg font-semibold px-2 py-0.5 rounded">
                    Desktop View
                  </div>
                </div>

                <div
                  onClick={() => window.open(project.mockups.mobile, '_blank')}
                  className="group relative overflow-hidden rounded-xl border border-line bg-bg-soft aspect-[3/2] flex items-center justify-center p-2 cursor-zoom-in"
                  title="Click to view full resolution"
                >
                  <img
                    src={project.mockups.mobile}
                    alt="Mobile Design View"
                    width={400}
                    height={800}
                    loading="lazy"
                    decoding="async"
                    className="max-h-full max-w-full object-contain rounded transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-2 left-2 bg-ink/75 text-[10px] text-bg font-semibold px-2 py-0.5 rounded">
                    Mobile View
                  </div>
                </div>
              </div>
            )}

            <div className="mt-4 flex justify-between gap-4">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="btn-pill justify-center text-center text-xs py-3 px-6 flex-1"
              >
                <span>Launch Live Site ↗</span>
              </a>
              <button
                onClick={onClose}
                className="btn-outline justify-center text-xs py-3 px-6 flex-1 cursor-pointer"
              >
                <span>Close</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
