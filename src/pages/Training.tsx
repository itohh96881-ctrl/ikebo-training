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
                    <Button variant="secondary" size="sm" onClick={onBack}>&larr; 戻る</Button>
                    <h1 className="text-3xl font-bold text-slate-100">デイリートレーニング</h1>
                    <div className="w-16"></div>
                </header>

                <div className="flex justify-center gap-4 mb-8">
                    <Button
                        variant={activeTab === 'breathing' ? 'primary' : 'secondary'}
                        onClick={() => setActiveTab('breathing')}
                    >
                        1. 呼吸法
                    </Button>
                    <Button
                        variant={activeTab === 'vocal' ? 'primary' : 'secondary'}
                        onClick={() => setActiveTab('vocal')}
                    >
                        2. 発声練習
                    </Button>
                </div>

                {activeTab === 'breathing' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <section className="text-center space-y-4">
                            <h2 className="text-2xl font-bold text-slate-200">腹式呼吸</h2>
                            <p className="text-slate-400 max-w-lg mx-auto">
                                鼻から4秒かけて深く吸い、4秒止め、口から8秒かけてゆっくり吐き出します。
                            </p>
                        </section>

                        <div className="max-w-sm mx-auto">
                            <Timer initialSeconds={180} label="呼吸トレーニング" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8 text-center text-sm text-slate-500">
                            <div className="p-4 bg-slate-900/30 rounded-lg border border-slate-800">
                                <div className="font-bold text-slate-300 mb-1">ステップ 1</div>
                                肩の力を抜く
                            </div>
                            <div className="p-4 bg-slate-900/30 rounded-lg border border-slate-800">
                                <div className="font-bold text-slate-300 mb-1">ステップ 2</div>
                                お腹を膨らませる
                            </div>
                            <div className="p-4 bg-slate-900/30 rounded-lg border border-slate-800">
                                <div className="font-bold text-slate-300 mb-1">ステップ 3</div>
                                一定の強さで吐く
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'vocal' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <section className="text-center space-y-4">
                            <h2 className="text-2xl font-bold text-slate-200">声の分析</h2>
                            <p className="text-slate-400 max-w-lg mx-auto">
                                文章を読んだり、一定の音を出したりして声を録音しましょう。周波数を可視化することで安定性を高めます。
                            </p>
                        </section>

                        <section>
                            <AudioRecorder />
                        </section>

                        <section className="bg-slate-900/30 p-6 rounded-xl border border-slate-800 max-w-2xl mx-auto">
                            <h3 className="text-lg font-semibold text-slate-200 mb-4">イケボのコツ</h3>
                            <ul className="list-disc list-inside space-y-2 text-slate-400">
                                <li>背筋を伸ばして姿勢を正す</li>
                                <li>お腹（丹田）から声を出す意識を持つ</li>
                                <li>ゆっくりとハキハキ話す</li>
                                <li>声を壁の向こうに届けるイメージで</li>
                            </ul>
                        </section>
                    </div>
                )}
            </div>
        </Layout>
    );
};
