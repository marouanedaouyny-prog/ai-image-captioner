"use client";

import { useState } from "react";
import { Image as ImageIcon, Sparkles, Upload, Loader2, Copy, CheckCircle, Accessibility, Search } from "lucide-react";

export default function ImageCaptionerDashboard() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    setLoading(true);
    
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("http://localhost:8003/analyze-image", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.analysis) {
        setResult(data.analysis);
      } else {
        throw new Error(data.detail || "Analysis failed");
      }
    } catch (err) {
      setResult("Error analyzing image. Please ensure the backend is running and GEMINI_API_KEY is set.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-200 selection:bg-purple-500/30 font-sans overflow-x-hidden relative">
      {/* Aurora Background Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full -z-10"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-fuchsia-600/10 blur-[120px] rounded-full -z-10"></div>

      <div className="max-w-7xl mx-auto py-16 px-6 lg:px-12 space-y-12 relative z-10">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-12">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-purple-500/10 text-purple-400 px-4 py-1.5 rounded-full text-xs font-bold border border-purple-500/20 tracking-widest uppercase">
              <Sparkles size={14} className="animate-pulse" /> Multimodal Engine v2.0
            </div>
            <h1 className="text-5xl lg:text-6xl font-black text-white tracking-tighter leading-none flex items-center gap-4">
              VisionCaption <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-400">PRO</span>
            </h1>
            <p className="text-zinc-400 text-lg max-w-2xl font-medium leading-relaxed">
              Transform visual context into high-performance metadata. Optimized for SEO, 
              accessibility, and social engagement using Gemini 1.5 Flash.
            </p>
          </div>
          <div className="flex items-center gap-4">
             <div className="text-right hidden md:block">
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">System Status</p>
                <p className="text-sm font-bold text-emerald-400 flex items-center justify-end gap-1.5 mt-0.5">
                   <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                   Operational
                </p>
             </div>
          </div>
        </header>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Upload Card - Span 5 */}
          <div className="lg:col-span-5 space-y-6">
            <div className={`relative group bg-zinc-900/50 backdrop-blur-xl rounded-[2.5rem] border-2 border-dashed ${selectedFile ? 'border-purple-500/50' : 'border-white/5'} p-2 transition-all duration-500 hover:border-purple-500/30 overflow-hidden h-[450px] flex items-center justify-center`}>
               {preview ? (
                 <div className="relative w-full h-full p-4 group">
                    <img src={preview} alt="Selected Preview" className="w-full h-full object-cover rounded-[2rem] transition-transform duration-700 group-hover:scale-[1.02]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem] flex items-end p-8">
                       <p className="text-white font-bold text-lg flex items-center gap-2">
                          <CheckCircle className="text-emerald-400" /> Image Loaded
                       </p>
                    </div>
                 </div>
               ) : (
                 <div className="flex flex-col items-center gap-6 p-12 text-zinc-500 group-hover:text-purple-400 transition-colors duration-500">
                    <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/5 shadow-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                       <Upload size={48} />
                    </div>
                    <div className="text-center space-y-2">
                       <p className="text-xl font-bold text-white tracking-tight">Drop visual content</p>
                       <p className="text-sm font-medium opacity-60">or click to explore files</p>
                    </div>
                    <div className="flex gap-3 pt-4">
                       {['JPG', 'PNG', 'WEBP'].map(ext => (
                         <span key={ext} className="text-[10px] font-black border border-white/10 px-2 py-1 rounded bg-white/5">{ext}</span>
                       ))}
                    </div>
                 </div>
               )}
               <input 
                 type="file" 
                 onChange={handleFileChange} 
                 className="absolute inset-0 opacity-0 cursor-pointer z-20" 
               />
            </div>

            <button 
              onClick={handleAnalyze}
              disabled={!selectedFile || loading}
              className="group relative w-full bg-white text-zinc-950 p-6 rounded-[2rem] font-black text-xl flex items-center justify-center gap-4 hover:bg-purple-500 hover:text-white transition-all duration-500 active:scale-95 disabled:opacity-20 disabled:grayscale disabled:scale-100 overflow-hidden shadow-[0_20px_40px_-12px_rgba(168,85,247,0.4)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-fuchsia-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 flex items-center gap-4">
                {loading ? <Loader2 className="animate-spin" size={28} /> : <Sparkles size={28} />}
                {loading ? "PROCESSING..." : "GENERATE METADATA"}
              </div>
            </button>
          </div>

          {/* Analysis Results - Span 7 */}
          <div className="lg:col-span-7 grid grid-cols-1 gap-6">
             {result ? (
               <div className="bg-zinc-900/50 backdrop-blur-xl rounded-[2.5rem] border border-white/10 p-10 relative group animate-in zoom-in-95 duration-500 shadow-2xl">
                  <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-6">
                     <h3 className="text-2xl font-black text-white tracking-tighter flex items-center gap-3">
                        <Activity className="text-purple-400" />
                        AI ANALYSIS RESULT
                     </h3>
                     <button className="p-3 bg-white/5 border border-white/10 rounded-2xl text-zinc-400 hover:text-white hover:bg-purple-500/20 hover:border-purple-500/50 transition-all active:scale-90">
                        <Copy size={20} />
                     </button>
                  </div>
                  <div className="prose prose-invert max-w-none prose-p:text-zinc-400 prose-headings:text-white prose-headings:tracking-tighter prose-strong:text-purple-400 whitespace-pre-wrap font-medium leading-relaxed">
                    {result}
                  </div>
               </div>
             ) : (
               <div className="bg-zinc-900/30 backdrop-blur-sm rounded-[2.5rem] border border-white/5 border-dashed flex flex-col items-center justify-center p-16 text-center space-y-6 opacity-40 group hover:opacity-60 transition-opacity duration-700">
                  <div className="relative">
                    <div className="absolute inset-0 bg-purple-500/20 blur-3xl rounded-full"></div>
                    <div className="relative p-10 bg-zinc-900 rounded-[2.5rem] border border-white/5 shadow-2xl text-purple-500">
                       <ImageIcon size={64} className="group-hover:rotate-6 transition-transform duration-500" />
                    </div>
                  </div>
                  <div className="max-w-xs space-y-2">
                    <h3 className="text-2xl font-black text-white tracking-tighter">WAITING FOR CONTEXT</h3>
                    <p className="text-sm font-medium text-zinc-500 uppercase tracking-widest leading-relaxed">Upload an asset to begin high-end multimodal analysis.</p>
                  </div>
               </div>
             )}

             {/* Small Bento Info Card */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-purple-600/20 to-zinc-900/50 backdrop-blur-xl p-8 rounded-[2rem] border border-purple-500/20 flex flex-col justify-between group">
                   <Accessibility className="text-purple-400 mb-4" size={32} />
                   <div>
                      <h4 className="text-lg font-black text-white tracking-tight uppercase">Accessibility Engine</h4>
                      <p className="text-sm text-zinc-400 font-medium leading-relaxed mt-2">WCAG AA compliant alt-text generation for screen readers.</p>
                   </div>
                </div>
                <div className="bg-zinc-900/50 backdrop-blur-xl p-8 rounded-[2rem] border border-white/5 flex flex-col justify-between group hover:border-white/10 transition-colors">
                   <Search className="text-fuchsia-400 mb-4" size={32} />
                   <div>
                      <h4 className="text-lg font-black text-white tracking-tight uppercase">SEO Intelligence</h4>
                      <p className="text-sm text-zinc-400 font-medium leading-relaxed mt-2">Keyword-rich captions optimized for search engine crawlers.</p>
                   </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </main>
  );
}
