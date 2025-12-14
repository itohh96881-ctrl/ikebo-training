import React from 'react';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';

interface HomeProps {
    onStart: () => void;
}

export const Home: React.FC<HomeProps> = ({ onStart }) => {
    return (
        <Layout>
            <div className="space-y-8">
                <section className="text-center space-y-4">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
                        <span className="block text-slate-100">Unlock Your</span>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
                            Ideal Voice
                        </span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-xl text-slate-400">
                        Professional voice training with real-time feedback and visualization.
                    </p>
                    <div className="flex justify-center gap-4 pt-4">
                        <Button size="lg" onClick={onStart}>
                            Start Training
                        </Button>
                        <Button size="lg" variant="secondary">
                            View Progress
                        </Button>
                    </div>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
                    {/* Dashboard Cards */}
                    <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 backdrop-blur-sm transition-all hover:bg-slate-900/80">
                        <h3 className="text-lg font-semibold text-slate-200 mb-2">Daily Streak</h3>
                        <div className="text-3xl font-bold text-indigo-400">0 Days</div>
                    </div>
                    <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 backdrop-blur-sm transition-all hover:bg-slate-900/80">
                        <h3 className="text-lg font-semibold text-slate-200 mb-2">Today's Goal</h3>
                        <div className="text-slate-400">Complete Basic Breathing</div>
                    </div>
                    <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 backdrop-blur-sm transition-all hover:bg-slate-900/80">
                        <h3 className="text-lg font-semibold text-slate-200 mb-2">Voice Score</h3>
                        <div className="text-3xl font-bold text-purple-400">---</div>
                    </div>
                </section>
            </div>
        </Layout>
    );
};
