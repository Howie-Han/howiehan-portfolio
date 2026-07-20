"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const IMG_CLASSES = "rounded-xl object-contain w-full h-full";
const CONTAINER_CLASSES = "bg-zinc-100 rounded-xl overflow-hidden";

function DetailContent() {
    const searchParams = useSearchParams();
    const lang = searchParams.get("lang") || "zh";

    return (
        <div className="min-h-screen bg-zinc-50 text-zinc-900 selection:bg-zinc-300">
            {/* Navigation */}
            <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-zinc-50/80 border-b border-zinc-200/50">
                <div className="w-full px-6 md:px-12 lg:px-24 py-4 flex items-center">
                    <Link href={`/?lang=${lang}#projects`} className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors">
                        <span>{"<"}</span>
                        <span>{lang === "zh" ? "返回项目经历" : "Back to Projects"}</span>
                    </Link>
                </div>
            </nav>

            <main className="w-full">
                {/* ========== Module 01: Hero Section ========== */}
                <section className="w-full pt-32 pb-24 px-6">
                    <div className="w-full max-w-6xl mx-auto flex flex-col items-center text-center">
                        <h1 className="text-2xl md:text-4xl lg:text-6xl font-extrabold tracking-tight leading-tight w-full text-zinc-900">
                            {lang === "zh"
                                ? "磁驱动左心室辅助装置设计与多物理场仿真"
                                : "Magnetically-Driven Left Ventricular Assist Device Design & Multiphysics Simulation"}
                        </h1>
                        <div className="flex flex-wrap justify-center gap-3 mt-8">
                            {[
                                lang === "zh" ? "COMSOL FSI" : "COMSOL FSI",
                                lang === "zh" ? "Neo-Hookean模型" : "Neo-Hookean Model",
                                lang === "zh" ? "ALE动态网格" : "ALE Dynamic Mesh",
                                lang === "zh" ? "血流动力学" : "Hemodynamics"
                            ].map((badge) => (
                                <span key={badge} className="bg-zinc-100 text-zinc-600 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide border border-zinc-200">
                                    {badge}
                                </span>
                            ))}
                        </div>
                        <p className="text-lg text-zinc-500 md:text-xl leading-relaxed w-full mt-10">
                            {lang === "zh"
                                ? "研发基于磁场驱动的柔性左心室辅助装置。独立构建严谨的磁-固-流强耦合多物理场仿真体系，以理论闭环验证其设计满足临床级血流动力学标准。"
                                : "Engineered a biomimetic Left Ventricular Assist Device (LVAD) driven by external magnetic fields. Developed a rigorous magneto-solid-fluid coupled simulation framework to validate its hemodynamic performance and structural feasibility against clinical standards."}
                        </p>
                    </div>
                </section>

                {/* ========== Module 02: Biomimetic Design & System Architecture ========== */}
                <section className="w-full py-16 md:py-24 px-6 bg-white">
                    <div className="w-full max-w-6xl mx-auto">
                        {/* Title & Description — full width, above media */}
                        <div className="flex flex-col gap-4 mb-8 w-full">
                            <h2 className="text-3xl font-bold tracking-tight">
                                {lang === "zh" ? "仿生构型与多场理论建模" : "Biomimetic Concept & Modeling"}
                            </h2>
                            <p className="text-zinc-600 leading-relaxed w-full">
                                {lang === "zh"
                                    ? "从底层磁致驱动原理图出发，在 SolidWorks 中构建含单向阀的仿生泵体，并在 COMSOL 中完成复杂的网格划分与多场边界条件设定。"
                                    : "Initiated with a simplified working principle diagram to map the magnetic actuation mechanism. Reconstructed the biomimetic pump chamber and unidirectional valve via SolidWorks, and established fundamental boundary conditions and mesh physics in COMSOL."}
                            </p>
                        </div>

                        {/* 2-column media grid — unified aspect-[4/3] for equal height, shrunk 1/3 centered */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full md:w-2/3 mx-auto">
                            <div>
                                <div className={`${CONTAINER_CLASSES} aspect-[4/3]`}>
                                    <img
                                        src="/media/project/lvad/lvad-principle.png"
                                        alt={lang === "zh" ? "磁致驱动机理" : "Actuation Principle"}
                                        className={IMG_CLASSES}
                                    />
                                </div>
                                <p className="text-zinc-500 text-sm mt-3 text-center">
                                    {lang === "zh" ? "磁致驱动机理" : "Actuation Principle"}
                                </p>
                            </div>
                            <div>
                                <div className={`${CONTAINER_CLASSES} aspect-[4/3]`}>
                                    <img
                                        src="/media/project/lvad/lvad-comsol-mesh.png"
                                        alt={lang === "zh" ? "多场耦合网格" : "Multiphysics Mesh"}
                                        className={IMG_CLASSES}
                                    />
                                </div>
                                <p className="text-zinc-500 text-sm mt-3 text-center">
                                    {lang === "zh" ? "多场耦合网格" : "Multiphysics Mesh"}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ========== Module 03: Multiphysics FSI Simulation ========== */}
                <section className="w-full py-16 md:py-24 px-6">
                    <div className="w-full max-w-6xl mx-auto">
                        {/* Text intro */}
                        <div className="w-full mb-12">
                            <h2 className="text-3xl font-bold tracking-tight mb-6">
                                {lang === "zh" ? "三场强耦合动态仿真矩阵" : "Magneto-Solid-Fluid Strong Coupling"}
                            </h2>
                            <p className="text-zinc-600 leading-relaxed w-full mb-4">
                                {lang === "zh"
                                    ? "引入 Neo-Hookean 超弹性本构处理柔性大变形，运用麦克斯韦应力张量计算磁场驱动力，并采用 ALE 动网格技术攻克流固耦合边界极难收敛的痛点。"
                                    : "Applied Neo-Hookean hyperelastic models for material deformation, Maxwell stress tensors for magnetic induction, and ALE dynamic mesh solvers to resolve highly non-linear fluid-structure interactions."}
                            </p>
                        </div>

                        {/* 3-column gallery */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <div className={`${CONTAINER_CLASSES} aspect-[4/3]`}>
                                    <img
                                        src="/media/project/lvad/sim-magnetic.gif"
                                        alt={lang === "zh" ? "磁通密度分布与应力" : "Magnetic Flux Density"}
                                        className={IMG_CLASSES}
                                    />
                                </div>
                                <p className="text-zinc-500 text-sm mt-3 text-center">
                                    {lang === "zh" ? "磁通密度分布与应力" : "Magnetic Flux Density"}
                                </p>
                            </div>
                            <div>
                                <div className={`${CONTAINER_CLASSES} aspect-[4/3]`}>
                                    <img
                                        src="/media/project/lvad/sim-stress.gif"
                                        alt={lang === "zh" ? "固体形变与应力响应" : "Solid Stress-Strain"}
                                        className={IMG_CLASSES}
                                    />
                                </div>
                                <p className="text-zinc-500 text-sm mt-3 text-center">
                                    {lang === "zh" ? "固体形变与应力响应" : "Solid Stress-Strain"}
                                </p>
                            </div>
                            <div>
                                <div className={`${CONTAINER_CLASSES} aspect-[4/3]`}>
                                    <img
                                        src="/media/project/lvad/sim-fluid.gif"
                                        alt={lang === "zh" ? "动网格流场演化" : "FSI Fluid Streamlines"}
                                        className={IMG_CLASSES}
                                    />
                                </div>
                                <p className="text-zinc-500 text-sm mt-3 text-center">
                                    {lang === "zh" ? "动网格流场演化" : "FSI Fluid Streamlines"}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ========== Module 04: Sim-to-Real Validation & Clinical Metrics ========== */}
                <section className="w-full py-16 md:py-24 px-6 bg-white">
                    <div className="w-full max-w-6xl mx-auto flex flex-col w-full">
                        {/* Row 1: Title */}
                        <h2 className="text-3xl font-bold tracking-tight">
                            {lang === "zh" ? "临床级血流动力学指标闭环" : "Clinical Metrics Verified"}
                        </h2>

                        {/* Row 2: Description */}
                        <p className="text-zinc-600 leading-relaxed w-full mt-4">
                            {lang === "zh"
                                ? "实现类心肌稳定收缩与单向流驱动特性，各项泵血核心数据均满足预期的前临床医疗标准。"
                                : "Achieved stable myocardial-like contraction and unidirectional flow, fully meeting the expected pre-clinical hemodynamic feasibility targets."}
                        </p>

                        {/* Row 3: Metrics cards — horizontal 3-column grid, compact */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-8">
                            <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4">
                                <p className="text-xs font-medium text-zinc-500">
                                    {lang === "zh" ? "每搏输出量 (SV)" : "Stroke Volume (SV)"}
                                </p>
                                <p className="text-base font-bold text-zinc-800 mt-1">62.5 mL</p>
                            </div>
                            <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4">
                                <p className="text-xs font-medium text-zinc-500">
                                    {lang === "zh" ? "心输出量 (CO)" : "Cardiac Output (CO)"}
                                </p>
                                <p className="text-base font-bold text-zinc-800 mt-1">3.75 L/min</p>
                            </div>
                            <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4">
                                <p className="text-xs font-medium text-zinc-500">
                                    {lang === "zh" ? "射血分数 (EF)" : "Ejection Fraction (EF)"}
                                </p>
                                <p className="text-base font-bold text-zinc-800 mt-1">{'>'} 65%</p>
                            </div>
                        </div>

                        {/* Row 4: GIFs — horizontal 2-column grid, shrunk 1/3 centered with captions */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full md:w-2/3 mx-auto mt-8">
                            <div>
                                <div className={`${CONTAINER_CLASSES} aspect-[16/9]`}>
                                    <img
                                        src="/media/project/lvad/sim-deformation.gif"
                                        alt={lang === "zh" ? "COMSOL仿真模拟" : "Theoretical Simulation"}
                                        className={IMG_CLASSES}
                                    />
                                </div>
                                <p className="text-sm text-zinc-500 text-center mt-3">
                                    {lang === "zh" ? "COMSOL仿真模拟" : "Theoretical Simulation"}
                                </p>
                            </div>
                            <div>
                                <div className={`${CONTAINER_CLASSES} aspect-[16/9]`}>
                                    <img
                                        src="/media/project/lvad/real-deformation.gif"
                                        alt={lang === "zh" ? "物理原型机运转" : "Physical Prototype"}
                                        className={IMG_CLASSES}
                                    />
                                </div>
                                <p className="text-sm text-zinc-500 text-center mt-3">
                                    {lang === "zh" ? "物理原型机运转" : "Physical Prototype"}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default function ProjectDetail() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-zinc-50"></div>}>
            <DetailContent />
        </Suspense>
    );
}