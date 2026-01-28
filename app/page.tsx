import Background from '@/components/Background';
import AsciiHeader from '@/components/AsciiHeader';
import TerminalChat from '@/components/TerminalChat';
import PhotoPanel from '@/components/PhotoPanel';
import ProjectCarousel from '@/components/ProjectCarousel';

export default function Home() {
  return (
    <>
      <Background />

      <main className="min-h-screen flex flex-col">
        {/* Main content: Terminal on left, ASCII + Photo on right */}
        <section className="flex-1 flex items-center justify-center px-4 md:px-8 py-12">
          <div className="w-full max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Terminal - left side */}
              <div className="h-[420px]">
                <TerminalChat />
              </div>

              {/* ASCII name + Photo - right side, stacked, same height as terminal */}
              <div className="h-[420px] flex flex-col gap-4">
                <div className="flex-shrink-0">
                  <AsciiHeader />
                </div>
                <div className="flex-1 min-h-0 flex items-center justify-center pr-12 pt-2">
                  <PhotoPanel />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects section */}
        <section className="py-12">
          <ProjectCarousel />
        </section>
      </main>
    </>
  );
}
