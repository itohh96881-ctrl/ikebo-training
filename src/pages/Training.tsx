import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { AudioRecorder } from '../components/AudioRecorder';
import { Button } from '../components/Button';
import { Timer } from '../components/Timer';

interface TrainingProps {
    onBack: () => void;
}

type Tab = 'breathing' | 'vocal';

export const Training: React.FC<TrainingProps> = ({ onBack }) => {
    const [activeTab, setActiveTab] = useState<Tab>('breathing');

    return (
        <Layout>
            <div className="max-w-4xl mx-auto space-y-8">
                <header className="flex items-center justify-between mb-8">
                    <Button variant="secondary" size="sm" onClick={onBack}>&larr; Back</Button>
                    <h1 className="text-3xl font-bold text-slate-100">Daily Training</h1>
                    <div className="w-16"></div>
                </header>

                <div className="flex justify-center gap-4 mb-8">
                    <Button
                        variant={activeTab === 'breathing' ? 'primary' : 'secondary'}
                        onClick={() => setActiveTab('breathing')}
                    >
                        1. Breathing
                    </Button>
                    <Button
                        variant={activeTab === 'vocal' ? 'primary' : 'secondary'}
                        onClick={() => setActiveTab('vocal')}
                    >
                        2. Vocal Practice
                    </Button>
                </div>

                {activeTab === 'breathing' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <section className="text-center space-y-4">
                            <h2 className="text-2xl font-bold text-slate-200">Diaphragmatic Breathing</h2>
                            <p className="text-slate-400 max-w-lg mx-auto">
                                Inhale deeply through your nose for 4 seconds, hold for 4 seconds, and exhale slowly through your mouth for 8 seconds.
                            </p>
                        </section>

                        <div className="max-w-sm mx-auto">
                            <Timer initialSeconds={180} label="Breathing Exercise" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8 text-center text-sm text-slate-500">
                            <div className="p-4 bg-slate-900/30 rounded-lg border border-slate-800">
                                <div className="font-bold text-slate-300 mb-1">Step 1</div>
                                Relax your shoulders
                            </div>
                            <div className="p-4 bg-slate-900/30 rounded-lg border border-slate-800">
                                <div className="font-bold text-slate-300 mb-1">Step 2</div>
                                Deep belly breath
                            </div>
                            <div className="p-4 bg-slate-900/30 rounded-lg border border-slate-800">
                                <div className="font-bold text-slate-300 mb-1">Step 3</div>
                                Steady exhale
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'vocal' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <section className="text-center space-y-4">
                            <h2 className="text-2xl font-bold text-slate-200">Vocal Analysis</h2>
                            <p className="text-slate-400 max-w-lg mx-auto">
                                Record your voice while reading a passage or holding a note. Visualizing your frequency helps improve stability.
                            </p>
                        </section>

                        <section>
                            <AudioRecorder />
                        </section>

                        <section className="bg-slate-900/30 p-6 rounded-xl border border-slate-800 max-w-2xl mx-auto">
                            <h3 className="text-lg font-semibold text-slate-200 mb-4">Tips for a better voice</h3>
                            <ul className="list-disc list-inside space-y-2 text-slate-400">
                                <li>Keep your posture straight.</li>
                                <li>Breathe from your diaphragm (hara).</li>
                                <li>Speak slowly and clearly.</li>
                                <li>Imagine projecting your voice to the wall.</li>
                            </ul>
                        </section>
                    </div>
                )}
            </div>
        </Layout>
    );
};
