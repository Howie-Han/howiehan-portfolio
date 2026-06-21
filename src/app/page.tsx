"use client";

import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

const NAV_ZH = ["个人介绍", "核心技能", "工作经历", "项目经历", "社群与领导力", "联系方式"] as const;
const NAV_EN = ["About", "Skills", "Experience", "Projects", "Leadership", "Contact"] as const;
const SECTION_IDS = ["about", "skills", "experience", "projects", "leadership", "contact"] as const;

function HomeContent() {
  const [lang, setLang] = useState<"zh" | "en">("zh");
  const searchParams = useSearchParams();

  useEffect(() => {
    const urlLang = searchParams.get("lang");
    if (urlLang === "zh" || urlLang === "en") {
      setLang(urlLang);
    }
  }, [searchParams]);

  const t = (zh: string, en: string) => (lang === "zh" ? zh : en);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = (lang === "zh" ? NAV_ZH : NAV_EN).map((label, i) => ({
    label,
    id: SECTION_IDS[i],
  }));

  return (
    <div className="relative min-h-screen bg-slate-50 text-zinc-900 overflow-x-hidden">
      {/* ========== NAVBAR ========== */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-white/70 backdrop-blur-md border-b border-zinc-200 md:px-12 lg:px-24">
        <button
          onClick={() => scrollTo("hero")}
          className="text-lg font-bold tracking-tight text-zinc-900 select-none hover:text-zinc-600 transition-colors"
        >
          Howie Han
        </button>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-500">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="hover:text-zinc-900 transition-colors duration-200"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => setLang((prev) => (prev === "en" ? "zh" : "en"))}
            className="ml-4 px-3 py-1 rounded-md border border-zinc-300 text-xs tracking-wider text-zinc-600 hover:border-zinc-400 hover:text-zinc-900 transition-all duration-200"
          >
            {lang === "en" ? "EN / 中" : "中 / EN"}
          </button>
        </div>
        {/* Mobile: lang toggle only */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={() => setLang((prev) => (prev === "en" ? "zh" : "en"))}
            className="px-2.5 py-1 rounded-md border border-zinc-300 text-xs tracking-wider text-zinc-600 hover:border-zinc-400 transition-all"
          >
            {lang === "en" ? "EN / 中" : "中 / EN"}
          </button>
        </div>
      </nav>

      {/* ========== #hero ========== */}
      <section
        id="hero"
        className="flex flex-col items-center justify-center min-h-screen px-6 pt-24 pb-16 md:px-12 lg:px-24"
      >
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block mb-6 text-xs tracking-widest uppercase text-zinc-500">
            {t("我的主页 · 2026", "My Portfolio · 2026")}
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-widest bg-gradient-to-br from-zinc-900 via-zinc-700 to-zinc-500 bg-clip-text text-transparent drop-shadow-sm">
            {lang === "zh" ? "韩浩宇" : "Howie Han"}
          </h1>
          <p className="max-w-2xl mx-auto text-xl md:text-2xl font-light text-zinc-500 tracking-wide mt-6 mb-8 text-balance">
            {t(
              "将创意落地，让想法成形。",
              "Bringing Ideas to Life, Shaping Concepts into Reality."
            )}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => scrollTo("projects")}
              className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-8 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-zinc-700 hover:scale-[1.02]"
            >
              {t("更多项目", "View Projects")}
            </button>
            <a
              href="/resume.pdf"
              className="inline-flex items-center gap-2 rounded-md border border-zinc-300 px-8 py-3.5 text-sm font-medium text-zinc-600 transition-all duration-300 hover:border-zinc-400 hover:text-zinc-900"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              {t("下载简历 (CV)", "Download CV")}
            </a>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-400">
          <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-zinc-400 to-transparent" />
        </div>
      </section>

      {/* ========== #about ========== */}
      <section
        id="about"
        className="min-h-screen flex items-center px-6 py-24 md:px-12 lg:px-24"
      >
        <div className="max-w-5xl mx-auto w-full">
          <h2 className="text-3xl font-bold text-zinc-900 mb-12">
            {lang === "zh" ? "关于我" : "About"}
          </h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 items-center">
            {/* Left: Photo placeholder */}
            <div className="md:col-span-5">
              <div className="aspect-[3/4] w-full object-cover rounded-2xl bg-zinc-100 border border-zinc-200/50 shadow-md flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
            </div>
            {/* Right: Bio text */}
            <div className="md:col-span-7 space-y-6 text-zinc-600 leading-relaxed antialiased">
              <h3 className="text-3xl font-bold mb-8 text-zinc-900">
              </h3>
              {lang === "zh" ? (
                <>
                  <p className="text-justify hyphens-auto leading-relaxed">我是韩浩宇，一名专注于机器人本体、精密机械设计和机电系统研发的工程师。我的兴趣始终围绕一个问题：如何将抽象的想法转化为真实可运行的机器。</p>
                  <p className="text-justify hyphens-auto leading-relaxed">在机器人工程的学习与实践中，我积累了从方案设计、仿真分析、工程制图到制造装配和机电联调的完整工程经验，参与并主导过竞赛机器人、仿生机电系统及工业机器人产品的开发工作。相比于停留在概念验证，我更关注设计的可制造性、可靠性与实际落地价值，致力于让创意走出图纸，成为能够解决现实问题的产品。</p>
                  <p className="text-justify hyphens-auto leading-relaxed">我相信，优秀的工程设计不仅源于对机械、控制与制造技术的综合理解，更来自对物理本质的持续探索，以及对每一个细节的认真打磨。</p>
                </>
              ) : (
                <>
                  <p className="text-justify hyphens-auto leading-relaxed">I am Howie Han, an engineer dedicated to robotics hardware, precision mechanical design, and mechatronic system R&D. My passion is driven by a single core question: how to transform abstract concepts into real, fully functioning machines.</p>
                  <p className="text-justify hyphens-auto leading-relaxed">Throughout my academic and professional journey in robotics engineering, I have built a comprehensive, end-to-end engineering skill set—spanning conceptual design, simulation analysis, engineering drafting, to manufacturing assembly and mechatronic integration. I have contributed to and led the development of competition robots, biomimetic mechatronic systems, and industrial robotics products. Rather than stopping at proof-of-concept, I focus heavily on design for manufacturability (DfAM), reliability, and real-world application value, committing myself to taking ideas off the drawing board and turning them into robust products that solve practical problems.</p>
                  <p className="text-justify hyphens-auto leading-relaxed">I firmly believe that exceptional engineering design stems not only from a profound understanding of mechanics, control, and manufacturing technologies, but also from a continuous exploration of physical principles and a rigorous refinement of every detail.</p>
                </>
              )}
            </div>
          </div>

          <div className="mt-16 pt-12 border-t border-zinc-200/60 w-full">
            {/* 板块小标题 */}
            <h3 className="text-sm font-medium uppercase text-zinc-400 tracking-[0.2em] mb-8 text-left">
              {lang === 'zh' ? '教育背景' : 'Education'}
            </h3>

            {/* 双列响应式容器 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full text-left">

              {/* 卡片 1：新加坡国立大学 */}
              <div className="bg-white border border-zinc-200/60 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-zinc-300 transition-all duration-300 min-h-[180px]">
                <div className="flex items-start gap-4">
                  {/* 学校 Logo 标准替换占位符 */}
                  <div id="nus-logo-placeholder" className="w-12 h-12 rounded-xl bg-zinc-100 border border-zinc-200/40 flex items-center justify-center flex-shrink-0 font-serif font-bold text-zinc-400 text-lg">
                    NUS
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-zinc-900 leading-snug">
                      {lang === 'zh' ? '新加坡国立大学' : 'National University of Singapore'}
                    </h4>
                    <p className="text-zinc-600 text-sm md:text-base mt-1 font-medium">
                      {lang === 'zh' ? '机器人学理学硕士' : 'MSc. in Robotics'}
                    </p>
                    <p className="text-zinc-400 text-xs mt-1 font-mono">2025 - 2027</p>
                  </div>
                </div>

                {/* 新国立荣誉展示 */}
                <div className="mt-4 pt-4 border-t border-zinc-100 flex flex-wrap gap-2">
                  <span className="bg-zinc-50 border border-zinc-200/40 text-zinc-600 px-3 py-1 rounded-full text-xs font-medium tracking-wide">
                    {lang === 'zh' ? 'NUS CDE Global Fellowship 候选入围' : 'Shortlisted for NUS CDE Global Fellowship'}
                  </span>
                </div>
              </div>

              {/* 卡片 2：北京航空航天大学 */}
              <div className="bg-white border border-zinc-200/60 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-zinc-300 transition-all duration-300 min-h-[180px]">
                <div className="flex items-start gap-4">
                  {/* 学校 Logo 标准替换占位符 */}
                  <div id="buaa-logo-placeholder" className="w-12 h-12 rounded-xl bg-zinc-100 border border-zinc-200/40 flex items-center justify-center flex-shrink-0 font-serif font-bold text-zinc-400 text-lg">
                    BUAA
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-lg font-bold text-zinc-900 leading-snug">
                      {lang === 'zh' ? '北京航空航天大学' : 'Beihang University'}
                    </h4>
                    <p className="text-zinc-600 text-sm md:text-base mt-1 font-medium">
                      {lang === 'zh' ? '机器人工程工学学士' : 'BEng. in Robot Engineering'}
                    </p>
                    <p className="text-zinc-400 text-xs mt-1 font-mono">2021 - 2025</p>
                  </div>
                </div>

                {/* 北航多荣誉单行横向优雅滑动/流转容器 */}
                <div className="mt-4 pt-4 border-t border-zinc-100 w-full overflow-hidden relative">
                  <div className="flex gap-2 overflow-x-auto no-scrollbar scroll-smooth whitespace-nowrap pb-1 mask-gradient">
                    {lang === 'zh' ? (
                      <>
                        <span className="bg-zinc-50 border border-zinc-200/40 text-zinc-600 px-3 py-1 rounded-full text-xs font-medium flex-shrink-0">国家推荐免试研究生资格</span>
                        <span className="bg-zinc-50 border border-zinc-200/40 text-zinc-600 px-3 py-1 rounded-full text-xs font-medium flex-shrink-0">校级优秀生</span>
                        <span className="bg-zinc-50 border border-zinc-200/40 text-zinc-600 px-3 py-1 rounded-full text-xs font-medium flex-shrink-0">航空工业奖学金</span>
                        <span className="bg-zinc-50 border border-zinc-200/40 text-zinc-600 px-3 py-1 rounded-full text-xs font-medium flex-shrink-0">学习优秀奖学金</span>
                        <span className="bg-zinc-50 border border-zinc-200/40 text-zinc-600 px-3 py-1 rounded-full text-xs font-medium flex-shrink-0">创新创业奖学金</span>
                        <span className="bg-zinc-50 border border-zinc-200/40 text-zinc-600 px-3 py-1 rounded-full text-xs font-medium flex-shrink-0">社会工作奖学金</span>
                      </>
                    ) : (
                      <>
                        <span className="bg-zinc-50 border border-zinc-200/40 text-zinc-600 px-3 py-1 rounded-full text-xs font-medium flex-shrink-0">National Recommendation for Graduate Studies</span>
                        <span className="bg-zinc-50 border border-zinc-200/40 text-zinc-600 px-3 py-1 rounded-full text-xs font-medium flex-shrink-0">University-Level Outstanding Student</span>
                        <span className="bg-zinc-50 border border-zinc-200/40 text-zinc-600 px-3 py-1 rounded-full text-xs font-medium flex-shrink-0">AVIC Scholarship</span>
                        <span className="bg-zinc-50 border border-zinc-200/40 text-zinc-600 px-3 py-1 rounded-full text-xs font-medium flex-shrink-0">Academic Excellence Scholarship</span>
                        <span className="bg-zinc-50 border border-zinc-200/40 text-zinc-600 px-3 py-1 rounded-full text-xs font-medium flex-shrink-0">Innovation & Entrepreneurship Scholarship</span>
                        <span className="bg-zinc-50 border border-zinc-200/40 text-zinc-600 px-3 py-1 rounded-full text-xs font-medium flex-shrink-0">Social Work & Leadership Scholarship</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ========== #skills ========== */}
      <section
        id="skills"
        className="min-h-screen flex items-center px-6 py-24 md:px-12 lg:px-24"
      >
        <div className="max-w-5xl mx-auto w-full">
          <h2 className="text-3xl font-bold text-zinc-900 mb-12">
            {lang === "zh" ? "核心技能" : "Skills"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-12">
            {/* Card 1: Mechanical Design & Manufacturing (spans 3 cols) */}
            <div className="md:col-span-3 flex flex-col justify-center bg-white border border-zinc-200/60 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300">
              <h3 className="text-center text-lg font-bold text-zinc-900 mb-4 tracking-wide">
                {lang === "zh" ? "机械设计与制造" : "Mechanical Design & Manufacturing"}
              </h3>
              {lang === "zh" ? (
                <ul className="flex flex-col space-y-3 justify-center h-full w-full text-left">
                  <li className="text-sm md:text-base"><span className="font-semibold text-zinc-800 mr-2 whitespace-nowrap flex-shrink-0">设计建模：</span><span className="text-zinc-600">SolidWorks, OnShape, AutoCAD (GB&T标准与BOM出图)</span></li>
                  <li className="text-sm md:text-base"><span className="font-semibold text-zinc-800 mr-2 whitespace-nowrap flex-shrink-0">逆向工程：</span><span className="text-zinc-600">3D扫描, QuickSurface重建</span></li>
                  <li className="text-sm md:text-base"><span className="font-semibold text-zinc-800 mr-2 whitespace-nowrap flex-shrink-0">加工制造：</span><span className="text-zinc-600">CNC机加工与增材制造 (FDM/SLA)</span></li>
                  <li className="text-sm md:text-base"><span className="font-semibold text-zinc-800 mr-2 whitespace-nowrap flex-shrink-0">工程理念：</span><span className="text-zinc-600">精通 DfM/DfAM 设计，具备快速原型与产品迭代经验</span></li>
                </ul>
              ) : (
                <ul className="flex flex-col space-y-3 justify-center h-full w-full text-left">
                  <li className="text-sm md:text-base"><span className="font-semibold text-zinc-800 mr-2 whitespace-nowrap flex-shrink-0">CAD Modeling:</span><span className="text-zinc-600">SolidWorks, OnShape, AutoCAD (GB&T Standards & BOM)</span></li>
                  <li className="text-sm md:text-base"><span className="font-semibold text-zinc-800 mr-2 whitespace-nowrap flex-shrink-0">Reverse Eng.:</span><span className="text-zinc-600">3D Scanning, QuickSurface</span></li>
                  <li className="text-sm md:text-base"><span className="font-semibold text-zinc-800 mr-2 whitespace-nowrap flex-shrink-0">Manufacturing:</span><span className="text-zinc-600">CNC Machining & Additive Manufacturing (FDM/SLA)</span></li>
                  <li className="text-sm md:text-base"><span className="font-semibold text-zinc-800 mr-2 whitespace-nowrap flex-shrink-0">Methodology:</span><span className="text-zinc-600">Proficient in DfM/DfAM, Rapid Prototyping & Product Iteration</span></li>
                </ul>
              )}
            </div>
            {/* Card 2: Simulation & Analysis (spans 2 cols) */}
            <div className="md:col-span-2 flex flex-col justify-center bg-white border border-zinc-200/60 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300">
              <h3 className="text-center text-lg font-bold text-zinc-900 mb-4 tracking-wide">
                {lang === "zh" ? "仿真辅助设计" : "Simulation & Analysis"}
              </h3>
              {lang === "zh" ? (
                <ul className="flex flex-col space-y-3 justify-center h-full w-full text-left">
                  <li className="text-sm md:text-base"><span className="font-semibold text-zinc-800 mr-2 whitespace-nowrap flex-shrink-0">静力学：</span><span className="text-zinc-600">SolidWorks Simulation</span></li>
                  <li className="text-sm md:text-base"><span className="font-semibold text-zinc-800 mr-2 whitespace-nowrap flex-shrink-0">运动学：</span><span className="text-zinc-600">MATLAB Robotics</span></li>
                  <li className="text-sm md:text-base"><span className="font-semibold text-zinc-800 mr-2 whitespace-nowrap flex-shrink-0">多体动力学：</span><span className="text-zinc-600">Adams</span></li>
                  <li className="text-sm md:text-base"><span className="font-semibold text-zinc-800 mr-2 whitespace-nowrap flex-shrink-0">多物理场：</span><span className="text-zinc-600">COMSOL Multiphysics</span></li>
                </ul>
              ) : (
                <ul className="flex flex-col space-y-3 justify-center h-full w-full text-left">
                  <li className="text-sm md:text-base"><span className="font-semibold text-zinc-800 mr-2 whitespace-nowrap flex-shrink-0">Statics:</span><span className="text-zinc-600">SolidWorks Simulation</span></li>
                  <li className="text-sm md:text-base"><span className="font-semibold text-zinc-800 mr-2 whitespace-nowrap flex-shrink-0">Kinematics:</span><span className="text-zinc-600">MATLAB Robotics</span></li>
                  <li className="text-sm md:text-base"><span className="font-semibold text-zinc-800 mr-2 whitespace-nowrap flex-shrink-0">Dynamics:</span><span className="text-zinc-600">Adams</span></li>
                  <li className="text-sm md:text-base"><span className="font-semibold text-zinc-800 mr-2 whitespace-nowrap flex-shrink-0">Multiphysics:</span><span className="text-zinc-600">COMSOL Multiphysics</span></li>
                </ul>
              )}
            </div>
            {/* Card 3: Mechatronics & Integration (spans 3 cols) */}
            <div className="md:col-span-3 flex flex-col justify-center bg-white border border-zinc-200/60 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300">
              <h3 className="text-center text-lg font-bold text-zinc-900 mb-4 tracking-wide">
                {lang === "zh" ? "机电系统集成" : "Mechatronics & Integration"}
              </h3>
              {lang === "zh" ? (
                <ul className="flex flex-col space-y-3 justify-center h-full w-full text-left">
                  <li className="text-sm md:text-base"><span className="font-semibold text-zinc-800 mr-2 whitespace-nowrap flex-shrink-0">编程语言：</span><span className="text-zinc-600">C/C++, Python</span></li>
                  <li className="text-sm md:text-base"><span className="font-semibold text-zinc-800 mr-2 whitespace-nowrap flex-shrink-0">底层硬件：</span><span className="text-zinc-600">Arduino, ESP32, STM32 硬件布局与伺服控制</span></li>
                  <li className="text-sm md:text-base"><span className="font-semibold text-zinc-800 mr-2 whitespace-nowrap flex-shrink-0">系统集成：</span><span className="text-zinc-600">具备丰富的系统级软硬联调经验</span></li>
                </ul>
              ) : (
                <ul className="flex flex-col space-y-3 justify-center h-full w-full text-left">
                  <li className="text-sm md:text-base"><span className="font-semibold text-zinc-800 mr-2 whitespace-nowrap flex-shrink-0">Programming:</span><span className="text-zinc-600">C/C++, Python</span></li>
                  <li className="text-sm md:text-base"><span className="font-semibold text-zinc-800 mr-2 whitespace-nowrap flex-shrink-0">Hardware:</span><span className="text-zinc-600">Arduino, ESP32, STM32 Layout & Servo Control</span></li>
                  <li className="text-sm md:text-base"><span className="font-semibold text-zinc-800 mr-2 whitespace-nowrap flex-shrink-0">Integration:</span><span className="text-zinc-600">Extensive Experience in System-level Hardware and Software Integration.</span></li>
                </ul>
              )}
            </div>
            {/* Card 4: Professional Skills (spans 2 cols) */}
            <div className="md:col-span-2 flex flex-col justify-center bg-white border border-zinc-200/60 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300">
              <h3 className="text-center text-lg font-bold text-zinc-900 mb-4 tracking-wide">
                {lang === "zh" ? "语言与综合素养" : "Professional Skills"}
              </h3>
              {lang === "zh" ? (
                <ul className="flex flex-col space-y-3 justify-center h-full w-full text-left">
                  <li className="text-sm md:text-base"><span className="font-semibold text-zinc-800 mr-2 whitespace-nowrap flex-shrink-0">外语能力：</span><span className="text-zinc-600">英语 (IELTS 7.0), 德语 (A1)</span></li>
                  <li className="text-sm md:text-base"><span className="font-semibold text-zinc-800 mr-2 whitespace-nowrap flex-shrink-0">综合素养：</span><span className="text-zinc-600">跨文化团队协作，全生命周期敏捷交付</span></li>
                </ul>
              ) : (
                <ul className="flex flex-col space-y-3 justify-center h-full w-full text-left">
                  <li className="text-sm md:text-base"><span className="font-semibold text-zinc-800 mr-2 whitespace-nowrap flex-shrink-0">Languages:</span><span className="text-zinc-600">English (IELTS 7.0), German (A1)</span></li>
                  <li className="text-sm md:text-base"><span className="font-semibold text-zinc-800 mr-2 whitespace-nowrap flex-shrink-0">Soft Skills:</span><span className="text-zinc-600">Cross-cultural Collaboration, Full-lifecycle Agile Delivery</span></li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========== #experience ========== */}
      <section
        id="experience"
        className="min-h-screen flex items-center px-6 py-24 md:px-12 lg:px-24"
      >
        <div className="max-w-5xl mx-auto w-full">
          <h2 className="text-3xl font-bold text-zinc-900 mb-12">
            {lang === "zh" ? "工作经历" : "Experience"}
          </h2>
          <p className="text-center text-sm text-zinc-400 mb-16 tracking-wide">
            {lang === "zh"
              ? "💡 点击各经历卡片，查看详细工程交付物与技术细节"
              : "💡 Click on each experience to view engineering deliverables and technical details"}
          </p>
          <div className="max-w-4xl mx-auto relative pl-4 md:pl-0">
            {/* Left vertical axis */}
            <div className="absolute left-[23px] md:left-[39px] top-0 bottom-0 w-px bg-zinc-200 z-0"></div>

            {/* Card 1: Alstom */}
            <div className="relative pl-12 md:pl-24 py-8 group">
              {/* Timeline node */}
              <div className="absolute left-[17px] md:left-[33px] top-[52px] w-3 h-3 bg-white border-2 border-zinc-300 rounded-full group-hover:border-zinc-900 group-hover:scale-125 group-hover:bg-zinc-900 transition-all duration-300 z-10"></div>
              {/* Card */}
              <Link href={`/experience/alstom?lang=${lang}`} className="block bg-white border border-zinc-200/60 rounded-2xl p-6 md:p-8 group-hover:shadow-xl group-hover:border-zinc-300 group-hover:-translate-y-1 transition-all duration-300">
                <h3 className="text-xl font-bold text-zinc-900 mb-2">
                  {lang === "zh" ? "Alstom 工程实习" : "Alstom Engineering Internship"}
                </h3>
                <p className="text-sm text-zinc-500 mb-4">2025 &middot; {lang === "zh" ? "工程项目实习" : "Engineering Internship"}</p>
                <p className="text-zinc-600 text-sm md:text-base leading-relaxed text-justify">
                  {lang === "zh" ? "Alstom 实习经历产出总结占位符。将鼠标悬浮在这一行任意位置可查看交互效果！" : "Alstom internship outcome summary placeholder. Hover anywhere on this row to see the interaction!"}
                </p>
              </Link>
            </div>

            {/* Card 2: Duke-NUS */}
            <div className="relative pl-12 md:pl-24 py-8 group">
              {/* Timeline node */}
              <div className="absolute left-[17px] md:left-[33px] top-[52px] w-3 h-3 bg-white border-2 border-zinc-300 rounded-full group-hover:border-zinc-900 group-hover:scale-125 group-hover:bg-zinc-900 transition-all duration-300 z-10"></div>
              {/* Card */}
              <Link href={`/experience/duke-nus?lang=${lang}`} className="block bg-white border border-zinc-200/60 rounded-2xl p-6 md:p-8 group-hover:shadow-xl group-hover:border-zinc-300 group-hover:-translate-y-1 transition-all duration-300">
                <h3 className="text-xl font-bold text-zinc-900 mb-2">
                  {lang === "zh" ? "Duke-NUS 研究实习" : "Duke-NUS Research Internship"}
                </h3>
                <p className="text-sm text-zinc-500 mb-4">2024 &middot; {lang === "zh" ? "生物医学研究" : "Biomedical Research"}</p>
                <p className="text-zinc-600 text-sm md:text-base leading-relaxed text-justify">
                  {lang === "zh" ? "Duke-NUS 实习经历产出总结占位符。将鼠标悬浮在这一行任意位置可查看交互效果！" : "Duke-NUS internship outcome summary placeholder. Hover anywhere on this row to see the interaction!"}
                </p>
              </Link>
            </div>

            {/* Card 3: Aubo */}
            <div className="relative pl-12 md:pl-24 py-8 group">
              {/* Timeline node */}
              <div className="absolute left-[17px] md:left-[33px] top-[52px] w-3 h-3 bg-white border-2 border-zinc-300 rounded-full group-hover:border-zinc-900 group-hover:scale-125 group-hover:bg-zinc-900 transition-all duration-300 z-10"></div>
              {/* Card */}
              <Link href={`/experience/aubo?lang=${lang}`} className="block bg-white border border-zinc-200/60 rounded-2xl p-6 md:p-8 group-hover:shadow-xl group-hover:border-zinc-300 group-hover:-translate-y-1 transition-all duration-300">
                <h3 className="text-xl font-bold text-zinc-900 mb-2">
                  {lang === "zh" ? "Aubo 机器人实习" : "Aubo Robotics Internship"}
                </h3>
                <p className="text-sm text-zinc-500 mb-4">2023 &middot; {lang === "zh" ? "机器人研发实习" : "Robotics R&D Internship"}</p>
                <p className="text-zinc-600 text-sm md:text-base leading-relaxed text-justify">
                  {lang === "zh" ? "Aubo 实习经历产出总结占位符。将鼠标悬浮在这一行任意位置可查看交互效果！" : "Aubo internship outcome summary placeholder. Hover anywhere on this row to see the interaction!"}
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========== #projects ========== */}
      <section
        id="projects"
        className="min-h-screen flex items-center px-6 py-24 md:px-12 lg:px-24"
      >
        <div className="max-w-5xl mx-auto w-full">
          <h2 className="text-3xl font-bold text-zinc-900 mb-12">
            {lang === "zh" ? "项目经历" : "Projects"}
          </h2>
          <p className="text-center text-sm text-zinc-400 mb-16 tracking-wide">
            {lang === "zh"
              ? "💡 点击项目卡片，深入查阅 SolidWorks 爆炸图、仿真图谱与设计 SOP"
              : "💡 Click on each project to inspect SolidWorks exploded views, simulations, and SOPs"}
          </p>
          <div className="max-w-5xl mx-auto space-y-8 px-4">
            {/* Project 1: Omni Wheel (左图右文) */}
            <Link href={`/projects/omni-wheel?lang=${lang}`} className="flex flex-col md:flex-row items-center gap-12 group p-6 md:p-8 bg-white border border-transparent hover:border-zinc-200 hover:bg-zinc-50/50 rounded-3xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 block w-full text-justify">
              <div className="w-full md:w-1/2 aspect-video rounded-2xl bg-zinc-100 border border-zinc-200/60 shadow-inner flex items-center justify-center group-hover:border-zinc-300 transition-all duration-300 flex-shrink-0">
                <span className="text-sm text-zinc-400">
                  {lang === "zh" ? "全向舵轮多媒体占位" : "Omni Wheel Media Placeholder"}
                </span>
              </div>
              <div className="w-full md:w-1/2 flex flex-col justify-center text-left">
                <h3 className="text-xl md:text-2xl font-bold text-zinc-900">
                  {lang === "zh" ? "高精度全向舵轮底盘" : "High-Precision Omni-Directional Wheel"}
                </h3>
                <div className="flex flex-wrap gap-2 my-4">
                  {["SolidWorks", "AutoCAD", "GB/T1804-2000", "DFAM"].map((tag) => (
                    <span key={tag} className="bg-zinc-100 text-zinc-600 px-3 py-1 rounded-full text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-zinc-500 text-sm md:text-base leading-relaxed text-justify">
                  {lang === "zh" ? "全向舵轮底盘项目占位符描述。通过 SolidWorks 爆炸图与 GD&T 公差分析展示精密机械设计细节。" : "Omni-wheel chassis project placeholder. Detailed SolidWorks exploded views and GD&T tolerance analysis for precision mechanical design."}
                </p>
              </div>
            </Link>

            {/* Project 2: Wrist Gripper (右图左文 - md:flex-row-reverse) */}
            <Link href={`/projects/wrist-gripper?lang=${lang}`} className="flex flex-col md:flex-row-reverse items-center gap-12 group p-6 md:p-8 bg-white border border-transparent hover:border-zinc-200 hover:bg-zinc-50/50 rounded-3xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 block w-full text-justify">
              <div className="w-full md:w-1/2 aspect-video rounded-2xl bg-zinc-100 border border-zinc-200/60 shadow-inner flex items-center justify-center group-hover:border-zinc-300 transition-all duration-300 flex-shrink-0">
                <span className="text-sm text-zinc-400">
                  {lang === "zh" ? "腕关节多媒体占位" : "Wrist Gripper Media Placeholder"}
                </span>
              </div>
              <div className="w-full md:w-1/2 flex flex-col justify-center text-left">
                <h3 className="text-xl md:text-2xl font-bold text-zinc-900">
                  {lang === "zh" ? "绳驱动空间腕关节" : "Cable-Driven Spatial Wrist Gripper"}
                </h3>
                <div className="flex flex-wrap gap-2 my-4">
                  {["Cable-Driven", "Kinematics", "Biomimetic", "Lightweight"].map((tag) => (
                    <span key={tag} className="bg-zinc-100 text-zinc-600 px-3 py-1 rounded-full text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-zinc-500 text-sm md:text-base leading-relaxed text-justify">
                  {lang === "zh" ? "绳驱动腕夹爪项目占位符描述。展示运动学仿真与轻量化仿生机构设计流程。" : "Cable-driven wrist gripper project placeholder. Kinematics simulation and lightweight biomimetic mechanism design documentation."}
                </p>
              </div>
            </Link>

            {/* Project 3: LVAD Simulation (左图右文) */}
            <Link href={`/projects/lvad-simulation?lang=${lang}`} className="flex flex-col md:flex-row items-center gap-12 group p-6 md:p-8 bg-white border border-transparent hover:border-zinc-200 hover:bg-zinc-50/50 rounded-3xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 block w-full text-justify">
              <div className="w-full md:w-1/2 aspect-video rounded-2xl bg-zinc-100 border border-zinc-200/60 shadow-inner flex items-center justify-center group-hover:border-zinc-300 transition-all duration-300 flex-shrink-0">
                <span className="text-sm text-zinc-400">
                  {lang === "zh" ? "LVAD 仿真占位" : "LVAD Simulation Placeholder"}
                </span>
              </div>
              <div className="w-full md:w-1/2 flex flex-col justify-center text-left">
                <h3 className="text-xl md:text-2xl font-bold text-zinc-900">
                  {lang === "zh" ? "LVAD 血流动力学仿真" : "LVAD Hemodynamic Simulation"}
                </h3>
                <div className="flex flex-wrap gap-2 my-4">
                  {["COMSOL", "CFD", "Multiphysics", "Biomedical"].map((tag) => (
                    <span key={tag} className="bg-zinc-100 text-zinc-600 px-3 py-1 rounded-full text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-zinc-500 text-sm md:text-base leading-relaxed text-justify">
                  {lang === "zh" ? "LVAD 血流动力学仿真项目占位符。基于 COMSOL Multiphysics 的多物理场耦合仿真分析。" : "LVAD hemodynamic simulation project placeholder. Multiphysics coupled simulation analysis using COMSOL Multiphysics."}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ========== #leadership ========== */}
      <section
        id="leadership"
        className="min-h-screen flex items-center px-6 py-24 md:px-12 lg:px-24"
      >
        <div className="max-w-5xl mx-auto w-full">
          <h2 className="text-3xl font-bold text-zinc-900 mb-12">
            {lang === "zh" ? "社群与领导力" : "Leadership"}
          </h2>
          <p className="text-center text-sm text-zinc-400 mb-12 tracking-wide">
            {lang === 'zh' ? '💡 点击卡片查看跨学科团队管理、科创建队全闭环及社群运营细节' : '💡 Click on each card to explore interdisciplinary team management and organization operations'}
          </p>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
            {/* 卡片 1 */}
            <Link href={`/leadership/international-team?lang=${lang}`} className="block p-8 bg-white border border-zinc-200/60 rounded-2xl shadow-sm hover:shadow-xl hover:border-zinc-300 hover:-translate-y-1 transition-all duration-300 text-left flex flex-col justify-between min-h-[160px] group">
              <h3 className="text-lg font-bold text-zinc-900 mb-3 tracking-wide group-hover:text-zinc-700 transition-colors">
                {lang === 'zh' ? '北航国际学生机器人队创始人兼队长' : 'Founder & Captain of BUAA Int. Robotics Team'}
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed text-justify">
                {lang === 'zh' ? '社群运营与建队细节概括占位符。' : 'Organization operations and team building placeholder.'}
              </p>
            </Link>

            {/* 卡片 2 */}
            <Link href={`/leadership/robot-association?lang=${lang}`} className="block p-8 bg-white border border-zinc-200/60 rounded-2xl shadow-sm hover:shadow-xl hover:border-zinc-300 hover:-translate-y-1 transition-all duration-300 text-left flex flex-col justify-between min-h-[160px] group">
              <h3 className="text-lg font-bold text-zinc-900 mb-3 tracking-wide group-hover:text-zinc-700 transition-colors">
                {lang === 'zh' ? '北航机器人协会会长' : 'President of BUAA Robotics Association'}
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed text-justify">
                {lang === 'zh' ? '协会管理与大型赛事组织概括占位符。' : 'Association management and event organization placeholder.'}
              </p>
            </Link>

            {/* 卡片 3 */}
            <Link href={`/leadership/social-practice?lang=${lang}`} className="block p-8 bg-white border border-zinc-200/60 rounded-2xl shadow-sm hover:shadow-xl hover:border-zinc-300 hover:-translate-y-1 transition-all duration-300 text-left flex flex-col justify-between min-h-[160px] group">
              <h3 className="text-lg font-bold text-zinc-900 mb-3 tracking-wide group-hover:text-zinc-700 transition-colors">
                {lang === 'zh' ? '暑期社会实践副队长' : 'Vice Captain of Summer Social Practice'}
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed text-justify">
                {lang === 'zh' ? '跨学科项目推进与社会实践概括占位符。' : 'Interdisciplinary project and social practice placeholder.'}
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* ========== #contact ========== */}
      <section
        id="contact"
        className="px-6 py-24 md:px-12 lg:px-24"
      >
        <div className="max-w-5xl mx-auto w-full">
          <div className="border-t border-zinc-200 pt-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-sm text-zinc-400 tracking-wide">
              &copy; 2026 Howiesme {t("保留所有权利。", "All rights reserved.")}
            </p>
            <div className="flex items-center gap-6">
              <a
                href="mailto:hello@howiehan.com"
                className="text-sm text-zinc-400 hover:text-zinc-900 transition-colors duration-200"
              >
                {t("邮箱", "Email")}
              </a>
              <span className="text-zinc-300 text-sm">/</span>
              <a
                href="https://linkedin.com/in/howie-han"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-zinc-400 hover:text-zinc-900 transition-colors duration-200"
              >
                LinkedIn
              </a>
              <span className="text-zinc-300 text-sm">/</span>
              <a
                href="https://github.com/Howie-Han"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-zinc-400 hover:text-zinc-900 transition-colors duration-200"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50"></div>}>
      <HomeContent />
    </Suspense>
  );
}
