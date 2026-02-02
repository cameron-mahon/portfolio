import Background from '@/components/Background';
import TerminalChat from '@/components/TerminalChat';
import PhotoPanel from '@/components/PhotoPanel';
import ProjectCarousel from '@/components/ProjectCarousel';
import ThemeSwitcher from '@/components/ThemeSwitcher';

export default function Home() {
  return (
    <>
      <ThemeSwitcher />
      <Background />

      <main className="min-h-screen flex flex-col">
        {/* Main content: Terminal on left, Photo on right */}
        <section className="flex-1 flex items-center justify-center px-4 md:px-8 py-12">
          <div className="w-full max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Terminal with ASCII name - left side */}
              <div className="h-[480px]">
                <TerminalChat />
              </div>

              {/* Photo - right side */}
              <div className="h-[480px] flex items-center justify-center">
                <PhotoPanel />
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
