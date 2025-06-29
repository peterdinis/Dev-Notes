import { FileText } from "lucide-react";
import type { FC } from "react";

const Footer: FC = () => {
    return (
        <footer className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-slate-900 dark:bg-slate-950">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-blue-600 rounded-lg flex items-center justify-center">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-white">DevNotes</span>
            </div>
            <p className="text-slate-400 text-sm text-center sm:text-left">
              © 2025 DevNotes. All rights reserved. Built with ❤️ for developers.
            </p>
          </div>
        </div>
      </footer>
    )
}

export default Footer