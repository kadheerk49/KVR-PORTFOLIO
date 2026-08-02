import { motion } from 'framer-motion';
import SpecularButton from '../components/SpecularButton';

export function HeroSection() {
  return (
    <section id="hero" className="min-h-screen relative flex flex-col justify-between items-center pt-20 pb-10 px-6 sm:px-12 overflow-hidden">
      {/* Background Giant Text Layer - 100% Visible & Bold */}
      <div className="absolute top-14 sm:top-16 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none z-0">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.95, y: 0 }}
          transition={{ duration: 1.0, ease: 'easeOut' }}
          className="text-[12.5vw] sm:text-[14vw] font-black uppercase tracking-tight leading-none text-white select-none drop-shadow-[0_12px_40px_rgba(0,0,0,0.95)]"
        >
          HI, I'M KADHEER
        </motion.h1>
      </div>

      {/* Central Kadheer Real Photo Portrait Layer - Positioned below DH letters */}
      <div className="relative z-10 my-auto flex items-center justify-center pt-36 sm:pt-44 md:pt-48">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.15 }}
          className="relative cursor-pointer"
        >
          {/* Ambient Lighting Glow behind Portrait */}
          <div className="absolute top-16 left-1/2 -translate-x-1/2 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-sky-400/25 via-indigo-500/25 to-purple-500/25 blur-3xl scale-125 pointer-events-none" />

          {/* Kadheer Real Photo Portrait Cutout */}
          <motion.img
            src="images/kadheer_bright_3d_avatar_transparent.png"
            alt="Kadheer Real Photo Portrait"
            className="w-72 sm:w-[22rem] md:w-[26rem] lg:w-[29rem] h-auto object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)] relative z-10"
            animate={{ y: [-5, 5, -5] }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        </motion.div>
      </div>

      {/* Bottom Footer Row: Left Bio Text & Right Specular CTA Buttons */}
      <div className="w-full max-w-7xl mx-auto relative z-20 flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6 pt-6 border-t border-white/10">
        {/* Left Subtitle Bio */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-md text-center sm:text-left"
        >
          <p className="text-xs sm:text-sm font-bold tracking-[0.2em] text-slate-200 uppercase leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            A DATA SCIENCE CREATOR DRIVEN BY CRAFTING STRIKING INTELLIGENT AUTOMATION AND FINANCIAL MARKET SYSTEMS
          </p>
        </motion.div>

        {/* Right Action CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex items-center gap-4"
        >
          <SpecularButton
            href="#projects"
            size="md"
            radius={28}
            tint="#ffffff"
            tintOpacity={0.08}
            blur={10}
            textColor="#f8fafc"
            lineColor="#38BDF8"
            baseColor="#1e293b"
            intensity={1.3}
            shineSize={18}
            shineFade={35}
            thickness={1.5}
            speed={0.35}
            autoAnimate={true}
          >
            VIEW PROJECTS
          </SpecularButton>

          <SpecularButton
            href="#contact"
            size="lg"
            radius={30}
            tint="#ffffff"
            tintOpacity={0.15}
            blur={12}
            textColor="#ffffff"
            lineColor="#E087FF"
            baseColor="#4c1d95"
            intensity={1.6}
            shineSize={22}
            shineFade={40}
            thickness={1.8}
            speed={0.4}
            autoAnimate={true}
          >
            CONTACT ME
          </SpecularButton>
        </motion.div>
      </div>
    </section>
  );
}