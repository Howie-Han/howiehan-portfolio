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
              {t("下载简历", "Download CV")}
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
            {lang === "zh" ? "个人介绍" : "About"}
          </h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 items-center">
            {/* Left: Photo placeholder */}
            <div className="w-full md:col-span-5 flex justify-center items-start">
              <div className="w-full max-w-md relative group rounded-2xl overflow-hidden shadow-lg border border-zinc-200/80 transition-transform duration-500 hover:scale-[1.02]">
                <img
                  src="/media/profile.png"
                  alt="Howie Han Profile"
                  className="w-full aspect-[3/4] object-cover bg-zinc-50"
                />
                {/* 极简的内阴影遮罩，增加边缘高级质感 */}
                <div className="absolute inset-0 border border-black/5 rounded-2xl pointer-events-none"></div>
              </div>
            </div>
            {/* Right: Bio text */}
            <div className="md:col-span-7 space-y-6 text-zinc-600 leading-relaxed antialiased">
              <h3 className="text-3xl font-bold mb-8 text-zinc-900">
                {lang === "zh" ? "关于我" : "About Me"}
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

          <div className="mt-16 w-full">
            {/* 板块小标题 */}
            <div className="border-t border-zinc-200/60 w-full mb-8" />
            <h3 className="text-base font-medium uppercase tracking-[0.25em] text-zinc-500 mb-8 text-left">
              {lang === 'zh' ? '教育背景' : 'Education'}
            </h3>

            {/* 双列响应式容器 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full text-left">

              {/* 卡片 1：新加坡国立大学 */}
              <div className="bg-white border border-zinc-200/60 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-zinc-300 transition-all duration-300 min-h-[180px]">
                <div className="flex items-start gap-6 w-full">
                  {/* 学校 Logo 标准替换占位符 */}
                  <div id="nus-logo-placeholder" className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center flex-shrink-0 pt-1">
                    <img src="/logos/nus-logo.png" alt="NUS Logo" className="w-full h-full object-contain drop-shadow-sm" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start w-full">
                      <h4 className="text-lg font-bold text-zinc-900 leading-snug">
                        {lang === 'zh' ? '新加坡国立大学' : 'National University of Singapore'}
                      </h4>
                      <p className="font-mono text-sm text-zinc-400 flex-shrink-0 ml-4">2025 - 2027</p>
                    </div>
                    <p className="text-zinc-600 text-sm md:text-base mt-1 font-medium">
                      {lang === 'zh' ? '机器人学 | 理学硕士' : 'MSc. in Robotics'}
                    </p>
                  </div>
                </div>

                {/* 新国立荣誉展示 */}
                <div className="mt-4 pt-1 border-t border-zinc-100 flex items-center h-12 w-full">
                  <span className="bg-zinc-100/90 text-zinc-700 px-3.5 py-1.5 rounded-full border border-zinc-200/30 shadow-sm hover:bg-zinc-200/80 transition-colors text-sm font-medium tracking-wide">
                    {lang === 'zh' ? 'NUS CDE Global Fellowship 候选入围' : 'Shortlisted for NUS CDE Global Fellowship'}
                  </span>
                </div>
              </div>

              {/* 卡片 2：北京航空航天大学 */}
              <div className="bg-white border border-zinc-200/60 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-zinc-300 transition-all duration-300 min-h-[180px]">
                <div className="flex items-start gap-6 w-full">
                  {/* 学校 Logo 标准替换占位符 */}
                  <div id="buaa-logo-placeholder" className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center flex-shrink-0 pt-1">
                    <img src="/logos/buaa-logo.png" alt="BUAA Logo" className="w-full h-full object-contain drop-shadow-sm" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start w-full">
                      <h4 className="text-lg font-bold text-zinc-900 leading-snug">
                        {lang === 'zh' ? '北京航空航天大学' : 'Beihang University'}
                      </h4>
                      <p className="font-mono text-sm text-zinc-400 flex-shrink-0 ml-4">2021 - 2025</p>
                    </div>
                    <p className="text-zinc-600 text-sm md:text-base mt-1 font-medium">
                      {lang === 'zh' ? '机器人工程 | 工学学士' : 'BEng. in Robot Engineering'}
                    </p>
                  </div>
                </div>

                {/* 北航多荣誉单行横向优雅滑动/流转容器 */}
                <div className="mt-4 pt-4 border-t border-zinc-100 flex items-center h-12 w-full">
                  <div className="flex gap-2 overflow-x-auto no-scrollbar whitespace-nowrap scroll-smooth w-full">
                    {lang === 'zh' ? (
                      <>
                        <span className="bg-zinc-100/90 text-zinc-700 px-3.5 py-1.5 rounded-full border border-zinc-200/30 shadow-sm hover:bg-zinc-200/80 transition-colors text-sm font-medium flex-shrink-0">国家推荐免试研究生资格</span>
                        <span className="bg-zinc-100/90 text-zinc-700 px-3.5 py-1.5 rounded-full border border-zinc-200/30 shadow-sm hover:bg-zinc-200/80 transition-colors text-sm font-medium flex-shrink-0">校级优秀生</span>
                        <span className="bg-zinc-100/90 text-zinc-700 px-3.5 py-1.5 rounded-full border border-zinc-200/30 shadow-sm hover:bg-zinc-200/80 transition-colors text-sm font-medium flex-shrink-0">航空工业奖学金</span>
                        <span className="bg-zinc-100/90 text-zinc-700 px-3.5 py-1.5 rounded-full border border-zinc-200/30 shadow-sm hover:bg-zinc-200/80 transition-colors text-sm font-medium flex-shrink-0">学习优秀奖学金</span>
                        <span className="bg-zinc-100/90 text-zinc-700 px-3.5 py-1.5 rounded-full border border-zinc-200/30 shadow-sm hover:bg-zinc-200/80 transition-colors text-sm font-medium flex-shrink-0">创新创业奖学金</span>
                        <span className="bg-zinc-100/90 text-zinc-700 px-3.5 py-1.5 rounded-full border border-zinc-200/30 shadow-sm hover:bg-zinc-200/80 transition-colors text-sm font-medium flex-shrink-0">社会工作奖学金</span>
                      </>
                    ) : (
                      <>
                        <span className="bg-zinc-100/90 text-zinc-700 px-3.5 py-1.5 rounded-full border border-zinc-200/30 shadow-sm hover:bg-zinc-200/80 transition-colors text-sm font-medium flex-shrink-0">National Recommendation for Graduate Studies</span>
                        <span className="bg-zinc-100/90 text-zinc-700 px-3.5 py-1.5 rounded-full border border-zinc-200/30 shadow-sm hover:bg-zinc-200/80 transition-colors text-sm font-medium flex-shrink-0">University-Level Outstanding Student</span>
                        <span className="bg-zinc-100/90 text-zinc-700 px-3.5 py-1.5 rounded-full border border-zinc-200/30 shadow-sm hover:bg-zinc-200/80 transition-colors text-sm font-medium flex-shrink-0">AVIC Scholarship</span>
                        <span className="bg-zinc-100/90 text-zinc-700 px-3.5 py-1.5 rounded-full border border-zinc-200/30 shadow-sm hover:bg-zinc-200/80 transition-colors text-sm font-medium flex-shrink-0">Academic Excellence Scholarship</span>
                        <span className="bg-zinc-100/90 text-zinc-700 px-3.5 py-1.5 rounded-full border border-zinc-200/30 shadow-sm hover:bg-zinc-200/80 transition-colors text-sm font-medium flex-shrink-0">Innovation & Entrepreneurship Scholarship</span>
                        <span className="bg-zinc-100/90 text-zinc-700 px-3.5 py-1.5 rounded-full border border-zinc-200/30 shadow-sm hover:bg-zinc-200/80 transition-colors text-sm font-medium flex-shrink-0">Social Work & Leadership Scholarship</span>
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
                  <li className="text-sm md:text-base"><span className="font-semibold text-zinc-800 mr-2 whitespace-nowrap flex-shrink-0">设计建模：</span><span className="text-zinc-600">SolidWorks, OnShape, AutoCAD (GB&T，BOM出图)</span></li>
                  <li className="text-sm md:text-base"><span className="font-semibold text-zinc-800 mr-2 whitespace-nowrap flex-shrink-0">逆向工程：</span><span className="text-zinc-600">3D扫描, QuickSurface重建</span></li>
                  <li className="text-sm md:text-base"><span className="font-semibold text-zinc-800 mr-2 whitespace-nowrap flex-shrink-0">加工制造：</span><span className="text-zinc-600">CNC机加工，3D打印/增材制造</span></li>
                  <li className="text-sm md:text-base"><span className="font-semibold text-zinc-800 mr-2 whitespace-nowrap flex-shrink-0">工程理念：</span><span className="text-zinc-600">精通 DfM/DfAM 设计理念，具备快速原型与产品迭代经验</span></li>
                </ul>
              ) : (
                <ul className="flex flex-col space-y-3 justify-center h-full w-full text-left">
                  <li className="text-sm md:text-base"><span className="font-semibold text-zinc-800 mr-2 whitespace-nowrap flex-shrink-0">CAD Modeling:</span><span className="text-zinc-600">SolidWorks, OnShape, AutoCAD (GB&T Standards & BOM)</span></li>
                  <li className="text-sm md:text-base"><span className="font-semibold text-zinc-800 mr-2 whitespace-nowrap flex-shrink-0">Reverse Eng.:</span><span className="text-zinc-600">3D Scanning, QuickSurface</span></li>
                  <li className="text-sm md:text-base"><span className="font-semibold text-zinc-800 mr-2 whitespace-nowrap flex-shrink-0">Manufacturing:</span><span className="text-zinc-600">CNC Machining, 3D Printing/Additive Manufacturing</span></li>
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
                  <li className="text-sm md:text-base"><span className="font-semibold text-zinc-800 mr-2 whitespace-nowrap flex-shrink-0">运动学：</span><span className="text-zinc-600">MATLAB Robotics Toolbox</span></li>
                  <li className="text-sm md:text-base"><span className="font-semibold text-zinc-800 mr-2 whitespace-nowrap flex-shrink-0">动力学：</span><span className="text-zinc-600">Adams</span></li>
                  <li className="text-sm md:text-base"><span className="font-semibold text-zinc-800 mr-2 whitespace-nowrap flex-shrink-0">多物理场：</span><span className="text-zinc-600">COMSOL Multiphysics</span></li>
                </ul>
              ) : (
                <ul className="flex flex-col space-y-3 justify-center h-full w-full text-left">
                  <li className="text-sm md:text-base"><span className="font-semibold text-zinc-800 mr-2 whitespace-nowrap flex-shrink-0">Statics:</span><span className="text-zinc-600">SolidWorks Simulation</span></li>
                  <li className="text-sm md:text-base"><span className="font-semibold text-zinc-800 mr-2 whitespace-nowrap flex-shrink-0">Kinematics:</span><span className="text-zinc-600">MATLAB Robotics Toolbox</span></li>
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
                  <li className="text-sm md:text-base"><span className="font-semibold text-zinc-800 mr-2 whitespace-nowrap flex-shrink-0">Languages:</span><span className="text-zinc-600">English (IELTS 7.0), Chinese (Native), German (A1)</span></li>
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
            <div className="absolute left-[23px] md:left-[39px] top-0 bottom-0 w-px bg-zinc-200 z-0"></div>

            {/* 经历 1: Alstom */}
            <div className="relative pl-12 md:pl-24 py-8 group">
              <div className="absolute left-[17px] md:left-[33px] top-[52px] w-3 h-3 bg-white border-2 border-zinc-300 rounded-full group-hover:border-zinc-900 group-hover:scale-125 group-hover:bg-zinc-900 transition-all duration-300 z-10"></div>
              <Link href={`/experience/alstom?lang=${lang}`} className="block bg-white border border-zinc-200/60 rounded-2xl p-6 md:p-8 group-hover:shadow-xl group-hover:border-zinc-300 group-hover:-translate-y-1 transition-all duration-300">
                <h3 className="text-xl font-bold text-zinc-900 mb-2">{lang === 'zh' ? '机器人与增材制造研发实习生' : 'Robotics & Additive Manufacturing R&D Intern'}</h3>
                <p className="text-sm font-medium text-zinc-500 mb-4">{lang === 'zh' ? '阿尔斯通（亚太）创新中心 | 2026.01 - 2026.07' : 'Alstom (APAC) Innovation Station | Jan 2026 - July 2026'}</p>
                <p className="text-zinc-600 text-sm md:text-base leading-relaxed text-justify">{lang === 'zh' ? '交付巡检机器人产品整机，打通企业增材制造备件企业内生产链路，助力轨交供应链降本增效。' : 'Delivered the track inspection robot product and established the localized spare-parts additive manufacturing workflow, significantly optimizing supply chain cost-efficiency.'}</p>
              </Link>
            </div>

            {/* 经历 2: Duke-NUS */}
            <div className="relative pl-12 md:pl-24 py-8 group">
              <div className="absolute left-[17px] md:left-[33px] top-[52px] w-3 h-3 bg-white border-2 border-zinc-300 rounded-full group-hover:border-zinc-900 group-hover:scale-125 group-hover:bg-zinc-900 transition-all duration-300 z-10"></div>
              <Link href={`/experience/duke-nus?lang=${lang}`} className="block bg-white border border-zinc-200/60 rounded-2xl p-6 md:p-8 group-hover:shadow-xl group-hover:border-zinc-300 group-hover:-translate-y-1 transition-all duration-300">
                <h3 className="text-xl font-bold text-zinc-900 mb-2">{lang === 'zh' ? '仿生机电系统研发实习生' : 'Bionic Mechatronic Systems R&D Intern'}</h3>
                <p className="text-sm font-medium text-zinc-500 mb-4">{lang === 'zh' ? 'Duke-NUS医学院 | 2025.08 - 2026.01' : 'Duke-NUS Medical School | Aug 2025 - Jan 2026'}</p>
                <p className="text-zinc-600 text-sm md:text-base leading-relaxed text-justify">{lang === 'zh' ? '成功开发满足医学指标的胸腔模拟器机电一体化原型，并引入一体化打印创新大幅降低了制造成本。' : 'Successfully developed a biomimetic ribcage prototype meeting stringent medical indicators, leveraging integrated DfAM guidelines to dramatically reduce manufacturing costs.'}</p>
              </Link>
            </div>

            {/* 经历 3: BMW China (新增) */}
            <div className="relative pl-12 md:pl-24 py-8 group">
              <div className="absolute left-[17px] md:left-[33px] top-[52px] w-3 h-3 bg-white border-2 border-zinc-300 rounded-full group-hover:border-zinc-900 group-hover:scale-125 group-hover:bg-zinc-900 transition-all duration-300 z-10"></div>
              <Link href={`/experience/bmw?lang=${lang}`} className="block bg-white border border-zinc-200/60 rounded-2xl p-6 md:p-8 group-hover:shadow-xl group-hover:border-zinc-300 group-hover:-translate-y-1 transition-all duration-300">
                <h3 className="text-xl font-bold text-zinc-900 mb-2">{lang === 'zh' ? '数字化创新实习生' : 'Digitalistaion Innovation Intern'}</h3>
                <p className="text-sm font-medium text-zinc-500 mb-4">{lang === 'zh' ? '宝马（中国）服务有限公司 | 2025.02 - 2025.05' : 'BMW China Service | Feb 2025 - May 2025'}</p>
                <p className="text-zinc-600 text-sm md:text-base leading-relaxed text-justify">{lang === 'zh' ? '运用 Power Automate 与 Python 开发自动化项目管理工作流，将人工耗时缩减超90%，并开展核心智驾供应商调研与内部 AI 赋能。' : 'Developed automated project management workflows via Power Automate and Python, reducing manual effort by over 90%, alongside intelligent driving market research and corporate AI enablement.'}</p>
              </Link>
            </div>

            {/* 经历 4: AUBO */}
            <div className="relative pl-12 md:pl-24 py-8 group">
              <div className="absolute left-[17px] md:left-[33px] top-[52px] w-3 h-3 bg-white border-2 border-zinc-300 rounded-full group-hover:border-zinc-900 group-hover:scale-125 group-hover:bg-zinc-900 transition-all duration-300 z-10"></div>
              <Link href={`/experience/aubo?lang=${lang}`} className="block bg-white border border-zinc-200/60 rounded-2xl p-6 md:p-8 group-hover:shadow-xl group-hover:border-zinc-300 group-hover:-translate-y-1 transition-all duration-300">
                <h3 className="text-xl font-bold text-zinc-900 mb-2">{lang === 'zh' ? '机械臂系统测试实习生' : 'Robotic Arm System Testing Intern'}</h3>
                <p className="text-sm font-medium text-zinc-500 mb-4">{lang === 'zh' ? '遨博（江苏）机器人有限公司 | 2024.06 - 2024.09' : 'AUBO Robotics | Jun 2024 - Sep 2024'}</p>
                <p className="text-zinc-600 text-sm md:text-base leading-relaxed text-justify">{lang === 'zh' ? '完成协作机械臂系统控制系统上线前联调测试并准确定位多项漏洞，协助研发团队高效进行排障工作。' : 'Executed joint debugging and testing of the control system for a 6-axis collaborative robot arm, precisely locating multiple bugs to accelerate the R&D troubleshooting efficiently.'}</p>
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
          <div className="max-w-5xl mx-auto space-y-24 px-4">
            {/* 项目 1: 全向舵轮 (左图右文) */}
            <Link href={`/projects/omni-wheel?lang=${lang}`} className="flex flex-col md:flex-row items-center gap-12 group p-6 md:p-8 bg-white border border-transparent hover:border-zinc-200 hover:bg-zinc-50/50 rounded-3xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-full text-justify">
              <div className="w-full md:w-1/2 aspect-[4/3] flex items-center justify-center flex-shrink-0 transition-transform duration-500 group-hover:scale-[1.02] bg-zinc-50/50 rounded-2xl border border-zinc-200/60 shadow-inner p-4 md:p-6">
                <img src="/media/omni-wheel.png" alt="Omni-wheel Steering Chassis" className="w-full h-full object-contain drop-shadow-sm" />
              </div>
              <div className="w-full md:w-1/2 flex flex-col justify-center text-left">
                <h3 className="text-2xl font-bold text-zinc-900 mb-2">{lang === 'zh' ? '高精度舵轮与移动机器人底盘研发' : 'High-Precision Omnidirectional Steering-Wheel Chassis R&D'}</h3>
                <div className="flex flex-wrap gap-2 my-4">
                  {(lang === 'zh' ? ['SolidWorks', 'AutoCAD', 'Adams', '公差分析', 'GB工程图', 'CNC外协加工'] : ['SolidWorks', 'AutoCAD', 'Adams', 'GB/T', 'CNC']).map(tag => (
                    <span key={tag} className="bg-zinc-100 text-zinc-600 px-3 py-1 rounded-full text-xs font-medium">{tag}</span>
                  ))}
                </div>
                <p className="text-zinc-600 text-sm md:text-base leading-relaxed text-justify">{lang === 'zh' ? '独立研发包含双电机驱动与锥/直齿轮传动的高集成度舵轮，完成10台舵轮和配套的2套移动机器人底盘的设计、加工制造、测试与部署全流程工作。' : 'Engineered a highly integrated steering-wheel drive module featuring dual-motor spur/bevel gear transmission, delivering 10 production-ready omnidirectional wheels and 2 corresponding chassis.'}</p>
              </div>
            </Link>

            {/* 项目 2: 绳驱动腕关节 (右图左文 md:flex-row-reverse) */}
            <Link href={`/projects/wrist-gripper?lang=${lang}`} className="flex flex-col md:flex-row-reverse items-center gap-12 group p-6 md:p-8 bg-white border border-transparent hover:border-zinc-200 hover:bg-zinc-50/50 rounded-3xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-full text-justify">
              <div className="w-full md:w-1/2 aspect-[4/3] flex items-center justify-center flex-shrink-0 transition-transform duration-500 group-hover:scale-[1.02] bg-zinc-50/50 rounded-2xl border border-zinc-200/60 shadow-inner p-4 md:p-6">
                <img src="/media/wrist-gripper.png" alt="Tendon-Driven Spatial Wrist" className="w-full h-full object-contain drop-shadow-sm" />
              </div>
              <div className="w-full md:w-1/2 flex flex-col justify-center text-left">
                <h3 className="text-2xl font-bold text-zinc-900 mb-2">{lang === 'zh' ? '绳驱动刚柔耦合机械臂腕关节开发' : 'Rigid-Flexible Coupling Tendon-Driven Robotic Spatial Wrist R&D'}</h3>
                <div className="flex flex-wrap gap-2 my-4">
                  {(lang === 'zh' ? ['运动学建模', 'MATLAB', '刚柔耦合', '绳驱动', '灵巧手'] : ['Kinematic Modelling', 'MATLAB', 'Rigid-Flexible Coupling', 'Tendon-Driven', 'Adaptive Gripper']).map(tag => (
                    <span key={tag} className="bg-zinc-100 text-zinc-600 px-3 py-1 rounded-full text-xs font-medium">{tag}</span>
                  ))}
                </div>
                <p className="text-zinc-600 text-sm md:text-base leading-relaxed text-justify">{lang === 'zh' ? '针对移动机器人平台，完成3自由度空间球关节运动学模型建立与结构设计，引入通过绳索拉力触发铝制薄片变形实现对日常异形物品的自适应稳定抓取的灵巧手设计。' : 'Modeled a 3 DoF spatial spherical joint workspace via MATLAB, developing a tendon-driven manipulator where line tension triggers elastic deformation of flexible sheet metals for adaptive organic object manipulation.'}</p>
              </div>
            </Link>

            {/* 项目 3: LVAD 仿真 (左图右文) */}
            <Link href={`/projects/lvad-simulation?lang=${lang}`} className="flex flex-col md:flex-row items-center gap-12 group p-6 md:p-8 bg-white border border-transparent hover:border-zinc-200 hover:bg-zinc-50/50 rounded-3xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-full text-justify">
              <div className="w-full md:w-1/2 aspect-[4/3] flex items-center justify-center flex-shrink-0 transition-transform duration-500 group-hover:scale-[1.02] bg-zinc-50/50 rounded-2xl border border-zinc-200/60 shadow-inner p-4 md:p-6">
                <img src="/media/lvad-simulation.gif" alt="LVAD Simulation" className="w-full h-full object-contain drop-shadow-sm" />
              </div>
              <div className="w-full md:w-1/2 flex flex-col justify-center text-left">
                <h3 className="text-2xl font-bold text-zinc-900 mb-2">{lang === 'zh' ? '磁驱动左心室辅助装置设计与仿真' : 'Design & Multiphysics Coupling Simulation of Magnetically Driven Left Ventricular Assist Device (LVAD)'}</h3>
                <div className="flex flex-wrap gap-2 my-4">
                  {(lang === 'zh' ? ['COMSOL', '多物理场仿真', '仿生分析', '磁场-固体-流体'] : ['COMSOL FSI', 'Simulation Validation', 'Bionic Analysis', 'Magnetic-Solid-Fluid']).map(tag => (
                    <span key={tag} className="bg-zinc-100 text-zinc-600 px-3 py-1 rounded-full text-xs font-medium">{tag}</span>
                  ))}
                </div>
                <p className="text-zinc-600 text-sm md:text-base leading-relaxed text-justify">{lang === 'zh' ? '运用 COMSOL 开展磁-固-流三场耦合动态仿真，应用 Neo-Hookean 超弹性构型与 ALE 动网格技术，全面验证左心室辅助装置（LVAD）的设计可行性与关键医学动力学指标。' : 'Conducted dynamic magnetic-solid-fluid three-field couplled simulations. Applied Neo-Hookean hyperelastic configuration and ALE dynamic mesh to fully verify the design feasibility and key medical indicators of the left ventricular assist device (LVAD).'}</p>
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
            {/* 卡片 1：国际学生机器人队 */}
            <Link href={`/leadership/international-team?lang=${lang}`} className="block p-8 bg-white border border-zinc-200/60 rounded-2xl shadow-sm hover:shadow-xl hover:border-zinc-300 hover:-translate-y-1 transition-all duration-300 flex flex-col min-h-[160px] group">
              <h3 className="text-lg font-bold text-zinc-900 mb-1.5 tracking-wide text-center group-hover:text-zinc-700 transition-colors">
                {lang === 'zh' ? '北航国际学生机器人队创始人' : 'Founder of BUAA International Robot Team'}
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed text-justify mt-1">
                {lang === 'zh' ? '从0到1统筹建队，带领40余名多国留学生斩获4项国家级赛事冠军，并主导多场科技讲座与跨文化交流活动。' : 'Founded the team from scratch and led over 40 international students to win 4 national championships, alongside directing multiple tech-lectures.'}
              </p>
            </Link>

            {/* 卡片 2：机器人协会 */}
            <Link href={`/leadership/robot-association?lang=${lang}`} className="block p-8 bg-white border border-zinc-200/60 rounded-2xl shadow-sm hover:shadow-xl hover:border-zinc-300 hover:-translate-y-1 transition-all duration-300 flex flex-col min-h-[160px] group">
              <h3 className="text-lg font-bold text-zinc-900 mb-1.5 tracking-wide text-center group-hover:text-zinc-700 transition-colors">
                {lang === 'zh' ? '北航机器人协会会长' : 'President of BUAA Robotics Association'}
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed text-justify mt-1">
                {lang === 'zh' ? '主导四足机器人原型全栈开发与微型创业试销，并组织超400人规模的大型校级机器人竞赛与12场技术工作坊。' : 'Directed the development and market-testing of a robot dog prototype, whilst organizing a 400+ participant robotics competition and 12 technical workshops.'}
              </p>
            </Link>

            {/* 卡片 3：社会实践 */}
            <Link href={`/leadership/social-practice?lang=${lang}`} className="block p-8 bg-white border border-zinc-200/60 rounded-2xl shadow-sm hover:shadow-xl hover:border-zinc-300 hover:-translate-y-1 transition-all duration-300 flex flex-col min-h-[160px] group">
              <h3 className="text-lg font-bold text-zinc-900 mb-1.5 tracking-wide text-center group-hover:text-zinc-700 transition-colors">
                {lang === 'zh' ? '暑期社会实践队副队长' : 'Vice Captain of Summer Social Practice'}
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed text-justify mt-1">
                {lang === 'zh' ? '统筹山东威海农业机器人实地调研项目，全权负责团队协调、志愿者培训及运营规划，并撰写详尽的洞察报告。' : 'Coordinated a field research project on agricultural robotics in Weihai. Managed team operations, volunteer training, and authored a comprehensive insight report.'}
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
