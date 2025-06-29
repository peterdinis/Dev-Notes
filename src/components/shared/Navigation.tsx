import Link from "next/link";
import type { FC } from "react";
import { Button } from "../ui/button";
import {ArrowRight, FileText} from "lucide-react"

const Navigation: FC = () => {
    return (
         <nav className="fixed top-0 w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-md z-50 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-blue-600 rounded-lg flex items-center justify-center">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-slate-100">DevNotes</span>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <Link href="/app">
                <Button className="bg-emerald-600 hover:bg-emerald-700 gap-2 text-sm sm:text-base">
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    )
}

export default Navigation