import React from 'react'
import { Download, FileText } from 'lucide-react'

function Resume() {
    return (
        <div className="py-20 px-5 md:px-8 max-w-5xl mx-auto">
            <div className="
        relative
        bg-gradient-to-br from-gray-900 to-gray-950
        
        p-10 md:p-14
        border border-gray-800/60
        shadow-2xl shadow-black/40
        backdrop-blur-sm
        group
        transition-all duration-500
        hover:scale-[1.015] hover:shadow-purple-950/30
        cursor-pointer
      ">
                <div className="absolute bottom-0 left-0 right-0 h-[3px] overflow-hidden">
                    <div className="
            absolute bottom-0 left-0 h-full w-0
            bg-purple-600
            group-hover:w-full
            transition-all duration-700 ease-out
            origin-left
          "/>
                    <div className="
            absolute bottom-0 left-0 h-full w-0
            bg-gradient-to-r from-purple-400/40 via-fuchsia-400/40 to-pink-400/40
            blur-sm
            group-hover:w-full
            transition-all duration-900 ease-out
            origin-left
          "/>
                </div>

                <div className="relative z-10 text-center space-y-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 mx-auto rounded-full border border-purple-500/30 backdrop-blur-sm">
                        <FileText className="w-9 h-9" />
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold text-white">
                        My Resume
                    </h2>

                    <p className="text-gray-400 text-lg md:text-xl max-w-xl mx-auto">
                        Discover my experience, skills, projects and journey
                    </p>

                    <div className="flex flex-col sm:flex-row gap-5 justify-center pt-6">
                        <a
                            href="assets/Shrisant-Adhikari.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                px-8 py-4 rounded-xl font-medium
                bg-purple-600
                hover:from-purple-700 hover:to-fuchsia-700
                text-white
                transition-all duration-300
                hover:shadow-purple-700/50 hover:scale-105 active:scale-95
                flex items-center gap-2.5 justify-center
              "
                        >
                            <FileText size={20} />
                            View CV
                        </a>

                        <a
                            href="assets/Shrisant-Adhikari.pdf"
                            download="Shrisant_Adhikari_CV.pdf"
                            className="
                px-8 py-4 rounded-xl font-medium
                border border-purple-500/50 text-purple-300
                hover:bg-purple-900/30 hover:border-purple-400
                transition-all duration-300
                hover:scale-105 active:scale-95
                flex items-center gap-2.5 justify-center
              "
                        >
                            <Download size={20} />
                            Download
                        </a>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Resume